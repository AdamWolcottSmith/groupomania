const pool = require('../db')
const bcrypt = require('bcrypt')
const jwtGenerator = require('../utils/jwtGenerator')
const fs = require('fs')


exports.register = async (req, res) => {
  try {

    //destructure the req.body

    const { email, password, username } = req.body

    //check if user exists (if user exists then throw error)

    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    if (user.rows.length !== 0) {
      return res.status(401).json('User already exists!')
    }

    //bcrypt user password

    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    const bcryptPassword = await bcrypt.hash(password, salt);

    //enter user inside database 

    const newUser = await pool.query(
      "INSERT INTO users (email, password, username) VALUES ($1, $2, $3) RETURNING *",
      [email, bcryptPassword, username])

    //generate jwt 

    const token = jwtGenerator(newUser.rows[0].user_id)
    res.json({ token })

  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
}

exports.login = async (req, res) => {
  try {

    //destructure the req.body

    const { email, password } = req.body

    //check if user exists (if user exists then throw error)

    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    if (user.rows.length === 0) {
      return res.status(401).json('Password or email is incorrect')
    }

    //check if incoming pass is same as db pass

    const validPassword = await bcrypt.compare(password, user.rows[0].password)

    if (!validPassword) {
      return res.status(401).json('Password or email is incorrect')
    }

    //give token

    const token = jwtGenerator(user.rows[0].user_id)
    res.json({ token })

  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
}

exports.deleteUser = async (req, res) => {
  const userId = req.params.id
  const client = await pool.connect()
  try {
    await client.query('BEGIN')

    const queryTextPosts = 'SELECT * FROM posts WHERE user_id = $1'
    const res = await client.query(queryTextPosts, [userId])
    const deletePostsText = 'DELETE FROM posts WHERE user_id = $1'

    //unlinking files before deleting user

    res.rows.forEach(async (items) => {
      if (items.image_url) {
        const filename = items.image_url.split('/images/')[1];
        await fs.unlink('images/' + filename, () => {
          client.query(deletePostsText, [userId])
        })
      } else {
        await client.query(deletePostsText, [userId])
      }
    })

    const deleteUserText = 'DELETE FROM users WHERE user_id = $1'
    await client.query(deleteUserText, [userId])
    await client.query('COMMIT')
  } catch (e) {
    await client.query('ROLLBACK')
    throw e
  } finally {
    client.release()
  }
  res.status(200).json(`User deleted with ID: ${userId}`)
}


exports.getAllUsers = async (req, res) => {

  await pool.query('SELECT * FROM users',
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
}
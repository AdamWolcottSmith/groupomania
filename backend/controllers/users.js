const pool = require('../db')
const bcrypt = require('bcrypt')
const jwtGenerator = require('../utils/jwtGenerator')

exports.register = async (req, res) => {
 try {

  //destructure the req.body

  const { email, first_name, last_name, password, gender, country_of_birth, profile_picture_url, birth_date } = req.body

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
   "INSERT INTO users (email, first_name, last_name, password, gender, country_of_birth, profile_picture_url, birth_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
   [email, first_name, last_name, bcryptPassword, gender, country_of_birth, profile_picture_url, birth_date])

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


exports.getAllUsers = async (req, res) => {

 await pool.query('SELECT * FROM users',
  (error, results) => {
   if (error) {
    throw error
   }
   res.status(200).json(results.rows)
  })
}
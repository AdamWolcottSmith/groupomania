const pool = require('../db')
const fs = require('fs')

//display home

exports.dashboard = async (req, res) => {
  try {

    const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [req.users])

    res.json(user.rows[0])

  } catch (error) {
    console.error(error.message)
    res.status(500).json('Server Error')
  }
}

//create post

exports.createPost = async (req, res) => {
  try {

    const url = req.protocol + '://' + req.get('host');
    const userId = req.users
    const { text } = req.body
    let imageUrl = url + '/images/' + req.file.filename

    const newPost = await pool.query(
      "INSERT INTO posts (image_url, user_id, text) VALUES ($1, $2, $3) RETURNING *",
      [imageUrl, userId, text])

    res.status(201).json(newPost.rows[0])

  } catch (error) {
    console.error(error.message)
    res.status(500).json('Cannot create post')
  }
}

//get one post

exports.getOnePost = (req, res) => {
  const postId = parseInt(req.params.id)
  pool.query('SELECT * FROM posts WHERE post_id = $1', [postId],
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows[0])
    })
}

//modify post

exports.modifyPost = async (req, res) => {
  try {

    const url = req.protocol + '://' + req.get('host');
    const userId = req.users
    const postId = parseInt(req.params.id)
    const { text } = req.body

    if (req.file) {

      let imageUrl = url + '/images/' + req.file.filename
      const updatePost = await pool.query(
        "UPDATE posts SET image_url = $1, text = $2 WHERE user_id = $4 AND post_id = $5",
        [imageUrl, userId, postId, text])
      if (updatePost.rowCount === 0) {
        throw new Error('Failed to update post')
      }
      res.status(200).json(`Post ${postId} updated successfully`)

    } else {

      const updatePost = await pool.query(
        "UPDATE posts SET text = $1 WHERE user_id = $2 AND post_id = $3",
        [text, userId, postId])
      if (updatePost.rowCount === 0) {
        throw new Error('Failed to update post')
      }
      res.status(200).json(`Post ${postId} updated successfully`)
    }
  } catch (error) {
    console.error(error.message)
    res.status(500).json(error.message)
  }
}

//delete post

exports.deletePost = async (req, res) => {

  const userId = req.users
  const postId = parseInt(req.params.id)
  const client = await pool.connect()

  try {
    await client.query('BEGIN')
    const queryText = 'SELECT * FROM posts WHERE post_id = $1 AND user_id = $2'
    const values = [postId, userId]
    const res = await client.query(queryText, values)
    const deletePostText = 'DELETE FROM posts WHERE post_id = $1 AND user_id = $2'
    const filename = res.rows[0].image_url.split('/images/')[1];
    await fs.unlink('images/' + filename, () => {
      client.query(deletePostText, values)
    })
    await client.query('COMMIT')
  } catch (e) {
    await client.query('ROLLBACK')
    throw e
  } finally {
    client.release()
  }
  res.status(200).json(`Post deleted with ID: ${postId}`)
}

//get all posts

exports.getAllPosts = (req, res) => {
  pool.query('SELECT p.user_id, post_id, image_url, created_at, text, first_name, last_name FROM posts p INNER JOIN users u ON u.user_id = p.user_id ORDER BY created_at DESC',
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
}
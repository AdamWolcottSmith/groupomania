const pool = require('../db')

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

  const userId = req.users
  const { image_url, caption } = req.body

  const newPost = await pool.query(
   "INSERT INTO posts (image_url, caption, user_id) VALUES ($1, $2, $3) RETURNING *",
   [image_url, caption, userId])

  res.status(201).json(`New post added`)
  console.log(newPost.rows[0]);

 } catch (error) {
  console.error(error.message)
  res.status(500).json('Server Error Create Post')
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
   res.status(200).json(results.rows)
  })
}

//modify post

exports.modifyPost = async (req, res) => {
 try {

  const userId = req.users
  const postId = parseInt(req.params.id)

  const { image_url, caption } = req.body

  if (image_url && caption) {
   const updatePost = await pool.query(
    "UPDATE posts SET image_url = $1, caption = $2 WHERE user_id = $3 AND post_id = $4",
    [image_url, caption, userId, postId])
   res.json(updatePost.rows)
  } else if (caption) {
   const updatePost = await pool.query(
    "UPDATE posts SET caption = $1 WHERE user_id = $2 AND post_id = $3",
    [caption, userId, postId])
   res.json(updatePost.rows)
  } else if (image_url) {
   const updatePost = await pool.query(
    "UPDATE posts SET image_url = $1 WHERE user_id = $2 AND post_id = $3",
    [image_url, userId, postId])
   res.json(updatePost.rows)
  }

 } catch (error) {
  console.error(error.message)
  res.status(500).json('Server Error Create Post')
 }
}

//delete post

exports.deletePost = async (req, res) => {
 try {
  const userId = req.users
  const post_id = parseInt(req.params.id)
  await pool.query('DELETE FROM posts WHERE post_id = $1 AND user_id = $2', [post_id, userId])
  res.status(200).json(`Post deleted with ID: ${post_id}`)
 } catch (error) {
  console.log("Failed to delete post:" + error)
  res.sendStatus(500)
 }

 // const userId = req.users
 // const post_id = parseInt(req.params.id)

 // pool.query('DELETE FROM posts WHERE post_id = $1 AND user_id = $2', [post_id, userId],
 //  (error, rows) => {
 //   if (error) {
 //    console.log("Failed to delete user:" + error)
 //    res.sendStatus(500)
 //    res.end()
 //    return
 //   }
 //   res.status(200).json(`Post deleted with ID: ${post_id}`)
 //  })
}

//get all posts

exports.getAllPosts = (req, res) => {

 console.log(req.users);
 pool.query('SELECT * FROM posts ORDER BY created_at DESC',
  (error, results) => {
   if (error) {
    throw error
   }
   res.status(200).json(results.rows)
  })
}
const router = require('express').Router()
const pool = require('../db')
const auth = require('../middleware/auth')

router.get('/', auth, async (req, res) => {
 try {

  // res.json(req.users)

  const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [req.users])

  res.json(user.rows[0])

 } catch (error) {
  console.error(error.message)
  res.status(500).json('Server Error')
 }
})

module.exports = router
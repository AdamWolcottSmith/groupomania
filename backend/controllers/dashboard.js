const pool = require('../db')

exports.dashboard = async (req, res) => {
 try {

  const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [req.users])

  res.json(user.rows[0])

 } catch (error) {
  console.error(error.message)
  res.status(500).json('Server Error')
 }
}
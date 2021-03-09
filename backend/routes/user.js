const router = require('express').Router()

const validInfo = require('../middleware/validInfo')
const authorization = require('../middleware/auth')
const userCtrl = require('../controllers/users')

router.post('/register', validInfo, userCtrl.register)
router.post('/login', validInfo, userCtrl.login)

//verify

router.get('/is-verify', authorization, async (req, res) => {
 try {
  res.json(true)
 } catch (error) {
  console.error(error.message)
  res.status(500).send('Server Error')
 }
})

module.exports = router
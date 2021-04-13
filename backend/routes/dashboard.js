const router = require('express').Router()
const auth = require('../middleware/auth')

const multer = require('../middleware/multer-config')
const dashCtrl = require('../controllers/dashboard')

router.get('/', auth, dashCtrl.dashboard)
router.get('/post/:id', auth, dashCtrl.getOnePost)
router.post('/post', auth, multer, dashCtrl.createPost)
router.put('/post/:postid', auth, multer, dashCtrl.modifyPost)
router.delete('/post/:postid', auth, dashCtrl.deletePost)
router.get('/post', auth, dashCtrl.getAllPosts)

// user read

router.post('/read/:postid', auth, dashCtrl.readPost)
router.get('/read/:postid', auth, dashCtrl.didReadPost)

module.exports = router
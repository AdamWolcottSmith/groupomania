const router = require('express').Router()
const auth = require('../middleware/auth')

const multer = require('../middleware/multer-config')
const dashCtrl = require('../controllers/dashboard')

router.get('/', auth, dashCtrl.dashboard)
router.get('/post/:id', auth, dashCtrl.getOnePost)
router.post('/post', auth, multer, dashCtrl.createPost)
router.put('/post/:id', auth, multer, dashCtrl.modifyPost)
router.delete('/post/:id', auth, dashCtrl.deletePost)
router.get('/post', auth, dashCtrl.getAllPosts)

module.exports = router
const router = require('express').Router()
const auth = require('../middleware/auth')

// const multer = require('multer');

// const MIME_TYPES = {
//  'image/jpg': 'jpg',
//  'image/jpeg': 'jpg',
//  'image/png': 'png'
// };

// const storage = multer.diskStorage({
//  destination: (req, file, callback) => {
//   callback(null, 'images/');
//  },
//  filename: (req, file, callback) => {
//   const extension = MIME_TYPES[file.mimetype];
//   callback(null, Date.now() + '.' + extension);
//  }
// });

// let upload = multer({ dest: 'images/' }).single('image');



const multer = require('../middleware/multer-config')
const dashCtrl = require('../controllers/dashboard')

router.get('/', auth, dashCtrl.dashboard)
router.get('/post/:id', auth, dashCtrl.getOnePost)
router.post('/post', auth, multer, dashCtrl.createPost)

// router.post('/post', upload, function (req, res, next) {
//  const url = req.protocol + '://' + req.get('host');

//  // const { image_url } = req.file
//  let imageUrl = url + '/images/' + req.file
//  console.log(imageUrl);
//  res.status(201).send(imageUrl)
// })

router.put('/post/:id', auth, multer, dashCtrl.modifyPost)
router.delete('/post/:id', auth, dashCtrl.deletePost)
router.get('/post', auth, dashCtrl.getAllPosts)

module.exports = router
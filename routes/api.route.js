const express = require('express');
// const multer = require('multer');
// const path = require('path');

const router = express.Router();

// const storage = multer.diskStorage({
//     destination: './upload/images',
//     filename: (req, file, cb) => {
//         return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//     }
// })
// const upload = multer({
//     storage: storage
// });


const controller = require('../controllers/api.controller');

// router.get('/', controller.getProfile);

// router.post('/upload', upload.single('picture'), controller.upload);

router.post('/react', controller.react)

router.post('/match', controller.match)

module.exports = router;
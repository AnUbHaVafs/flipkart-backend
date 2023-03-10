const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware/index');
const { createProduct, getProductsBySlug } = require('../controllers/product');
// const { addCategory, getCategories } = require('../controllers/category');
const router = express.Router();
const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });
const shortid = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})

const upload = multer({ storage });

router.post('/product/create', requireSignin, adminMiddleware, upload.array('productPicture'), createProduct)
router.get('/products/:slug', getProductsBySlug);
// router.get('/category/getcategory', getCategories);

module.exports = router;    
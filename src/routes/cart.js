const express = require('express');
const { requireSignin, userMiddleware } = require('../common-middleware/index');
const { addItemsToCart } = require('../controllers/cart');
const router = express.Router();

router.post('/user/cart/addtocart', requireSignin, userMiddleware, addItemsToCart)

module.exports = router; 
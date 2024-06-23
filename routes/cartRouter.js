const Router = require('express')
const router = new Router
const cartController = require('../controllers/cartController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/getCart/:user_id',authMiddleware, cartController.openCart)
router.get('/getCartId', authMiddleware, cartController.getCartId)

module.exports = router 
const Router = require('express')
const router = new Router
const authMiddleware = require('../middleware/authMiddleware')
const cartProductController = require('../controllers/cartProductController')

router.post('/add',authMiddleware, cartProductController.add)
router.delete('/remove',authMiddleware, cartProductController.remove)
router.get('/:cartId', authMiddleware, cartProductController.getCartProducts)


module.exports = router 
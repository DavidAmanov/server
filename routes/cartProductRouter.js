const Router = require('express')
const router = new Router
const authMiddleware = require('../middleware/authMiddleware')
const cartProductController = require('../controllers/cartProductController')

router.post('/add',authMiddleware, cartProductController.add)
router.delete('/remove',authMiddleware, cartProductController.remove)
router.get('/:cart_Id', authMiddleware, cartProductController.getCartProducts)
router.post('/changeQu', authMiddleware, cartProductController.changeProductQuantity)


module.exports = router 
const Router = require('express')
const router = new Router
const authMiddleware = require('../middleware/authMiddleware')
const basketProductController = require('../controllers/basketProductController')

router.post('/add',authMiddleware, basketProductController.add)
router.post('/remove',authMiddleware, basketProductController.remove)
router.get('/:basketId', authMiddleware, basketProductController.getBasketProducts)


module.exports = router 
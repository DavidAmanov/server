const Router = require('express')
const router = new Router
const authMiddleware = require('../middleware/authMiddleware')
const favouriteProductController = require('../controllers/favouriteProductController')

router.post('/add',authMiddleware, favouriteProductController.add)
router.post('/remove',authMiddleware, favouriteProductController.remove)
router.get('/:favouriteId', authMiddleware, favouriteProductController.getFavouriteProduct)


module.exports = router 
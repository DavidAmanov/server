const Router = require('express')
const router = new Router
const cartController = require('../controllers/cartController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/',authMiddleware ,cartController.openCart)

module.exports = router 
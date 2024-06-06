const Router = require('express')
const router = new Router
const authMiddleware = require('../middleware/authMiddleware')
const basketProductController = require('../controllers/basketProductController')

router.post('/add',authMiddleware,)
router.post('/remove',authMiddleware, )
router.get('/:basketId', authMiddleware)


module.exports = router 
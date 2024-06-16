const Router = require('express')
const router = new Router
const orderItemsController = require('../controllers/orderItemsController')

router.post('/add', orderItemsController.add)
router.delete('/remove', orderItemsController.remove)
router.get('/getItem/:order_id', orderItemsController.getOrderItems)

module.exports = router
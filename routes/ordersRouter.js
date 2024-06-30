const Router = require('express')
const router = new Router
const ordersController = require('../controllers/ordersController')

router.post('/create', ordersController.create)
router.delete('/remove', ordersController.remove)
router.get('/getAll', ordersController.getAll)
router.get('/getOrders/:user_id', ordersController.getOrdersByUserId)

module.exports = router
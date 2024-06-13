const Router = require('express')
const router = new Router
const ordersController = require('../controllers/ordersController')

router.post('/create', ordersController.create)
router.post('/remove', ordersController.remove)
router.get('/getAll', ordersController.getAll)
router.get('/getOne/:id', ordersController.getOneById)

module.exports = router
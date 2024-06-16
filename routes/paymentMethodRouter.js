const Router = require('express')
const router = new Router
const paymentMethodController = require('../controllers/paymentMethodController')

router.post('/create', paymentMethodController.create)
router.delete('/remove', paymentMethodController.remove)
router.get('/getAll', paymentMethodController.getAll)

module.exports = router
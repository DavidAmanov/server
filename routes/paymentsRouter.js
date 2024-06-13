const Router = require('express')
const router = new Router
const paymentsController = require('../controllers/paymentsController')

router.post('/add', paymentsController.create)
router.post('/remove', paymentsController.remove)
router.get('/getAll', paymentsController.getAll)
router.get('/getOne', paymentsController.getOneById)

module.exports = router
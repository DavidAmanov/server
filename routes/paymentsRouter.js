const Router = require('express')
const router = new Router
const paymentsController = require('../controllers/paymentsController')

router.post('/add', paymentsController.create)
router.delete('/remove', paymentsController.remove)
router.get('/getAll', paymentsController.getAll)
router.get('/getOne/:id', paymentsController.getOneById)

module.exports = router
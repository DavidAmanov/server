const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create', checkRole('ADMIN'), productController.create)
router.delete('/remove', checkRole('ADMIN'), productController.remove)
router.get('/', productController.getAll) 
router.get('/:id', productController.getOneById)


module.exports = router
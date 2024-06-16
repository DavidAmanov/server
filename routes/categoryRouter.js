const Router = require('express')
const router = new Router
const categoryController = require('../controllers/categoryController')

router.post('/add', categoryController.add)
router.delete('/remove', categoryController.remove)
router.get('/getCategoryByName', categoryController.getCategoryByName)
router.get('/getAllCategory', categoryController.getAllCategories)

module.exports = router
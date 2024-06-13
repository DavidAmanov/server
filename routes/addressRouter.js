const Router = require('express')
const router = new Router
const addressController = require('../controllers/addressController')

router.post('/address/add', addressController.add)
router.post('/address/remove', addressController.remove)
router.get('/address/getAll/:user_id', addressController.getAddressesByUser)

module.exports = router
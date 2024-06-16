const Router = require('express')
const router = new Router
const addressController = require('../controllers/addressController')

router.post('/add', addressController.add)
router.delete('/remove', addressController.remove)
router.get('/getAll/:user_id', addressController.getAddressesByUser)

module.exports = router
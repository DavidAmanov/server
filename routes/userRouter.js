const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/auth/google', userController.googleAuth)

router.get('/auth/google/callback', userController.googleCallback) 

router.get('/check',authMiddleware , userController.check)


module.exports = router
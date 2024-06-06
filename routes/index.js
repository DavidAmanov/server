const Router = require('express')
const router = new Router()
const productRouter = require('./productRouter')
const userRouter = require('./userRouter')
const basketRouter = require('./basketRouter')
const basketProductRouter = require('./basketProductRouter')

router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/basket', basketRouter)
router.use('/basketProduct', basketProductRouter)

module.exports = router
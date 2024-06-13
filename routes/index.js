const Router = require('express')
const router = new Router()
const productRouter = require('./productRouter')
const userRouter = require('./userRouter')
const cartRouter = require('./cartRouter')
const cartProductRouter = require('./cartProductRouter')
const categoryRouter = require('./categoryRouter')
const ordersRouter = require('./ordersRouter')
const ordersItemRouter = require('./orderItemsRouter')
const paymentsRouter = require('./paymentsRouter')
const addressRouter = require('./addressRouter')
const favouriteRouter = require('./favouriteRouter')
const favouriteItemRouter = require('./favouriteItemRouter')

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Получить список пользователей
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Список пользователей
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */



router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/cart', cartRouter)
router.use('/cartProduct', cartProductRouter)
router.use('/category', categoryRouter)
router.use('/orders', ordersRouter)
router.use('/orderItem', ordersItemRouter)
router.use('/favourite', favouriteRouter)
router.use('/favouriteItem', favouriteItemRouter)
router.use('/payment', paymentsRouter)
router.use('/address', addressRouter)

module.exports = router
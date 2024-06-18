const Router = require('express')
const router = new Router()

router.use('/static', express.static(path.resolve(__dirname, '..', 'static')));
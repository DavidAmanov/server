require("dotenv").config()
const express = require('express')
const swaggerDocs = require('./swagger');
const swaggerUi = require('swagger-ui-express');
const passport = require('./auth.js')
const session = require('express-session')
const sequelize = require('./db.js')
const models = require('./models/models.js')
const cors = require('cors')
const router = require('./routes/index.js')
const fileUpLoad = require('express-fileupload')
const errorHandler = require('./middleware/ErrorHandleMiddleware.js')
const path = require('path')

const PORT = process.env.PORT || 8080;

const app = express();

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true
}))

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(passport.initialize())
app.use(passport.session())
app.use(fileUpLoad({}))
app.use('/api', router)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//always on the bottom of use section
app.use(errorHandler)


const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, ()=>{
            console.log(`Server is starting ${PORT}`)
        })
    }
    catch(e){
        console.log(e)
    }
}

start()
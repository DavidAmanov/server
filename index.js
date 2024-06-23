require("dotenv").config()
const cookieParser = require('cookie-parser');
const express = require('express')
const passport = require('./auth.js')
const session = require('express-session')
const sequelize = require('./db.js')
const models = require('./models/models.js')
const cors = require('cors')
const router = require('./routes/index.js')
const fileUpLoad = require('express-fileupload')
const errorHandler = require('./middleware/ErrorHandleMiddleware.js')
const path = require('path')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swaggerDocument.json')

const PORT = process.env.PORT || 8080;

const app = express();

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false,  maxAge: 24 * 60 * 60 * 1000 }
}))

const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true,
};

app.use(cors(corsOptions))
app.use(cookieParser());
app.use(express.json())
app.use('/static', express.static(path.resolve(__dirname, 'static')));
app.use(passport.initialize())
app.use(passport.session())
app.use(fileUpLoad({}))
app.use('/api', router)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
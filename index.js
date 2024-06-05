require("dotenv").config()
const express = require('express')
const sequelize = require('./db.js')
const models = require('./models/models.js')
const cors = require('cors')

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors())
app.use(express.json())


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
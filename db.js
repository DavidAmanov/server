const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgresql', //change to postgresql on localhost
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
)
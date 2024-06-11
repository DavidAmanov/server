const sequelize = require('../db.js')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    googleId:{type: DataTypes.STRING, primaryKey: true, unique: true, allowNull: false},
    displayName:{type: DataTypes.STRING, allowNull: false},
    email:{type: DataTypes.STRING, unique: true, allowNull: false},
    photo:{type: DataTypes.STRING, allowNull: false},
    role:{type: DataTypes.STRING, defaultValue: 'USER'}
})

const Basket = sequelize.define('basket', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: { type: DataTypes.INTEGER, allowNull: false }
})

const BasketProduct = sequelize.define('basket_product', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    productId: { type: DataTypes.INTEGER, allowNull: false },
    basketId: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
})

const Product = sequelize.define('product', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, allowNull:false},
    price:{type: DataTypes.INTEGER, allowNull:false},
    img:{type:DataTypes.STRING, allowNull:false},
    status:{type:DataTypes.STRING, allowNull:false},
    description:{type:DataTypes.STRING, allowNull:false}

})

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)

Product.hasMany(BasketProduct)
BasketProduct.belongsTo(Product)

module.exports = {
    User, Basket, BasketProduct, Product 
}
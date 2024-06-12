const sequelize = require('../db.js')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    googleId:{type: DataTypes.STRING, primaryKey: true, unique: true, allowNull: false},
    displayName:{type: DataTypes.STRING, allowNull: false},
    email:{type: DataTypes.STRING, unique: true, allowNull: false},
    photo:{type: DataTypes.STRING, allowNull: false},
    role:{type: DataTypes.STRING, defaultValue: 'USER'}
})

const Product = sequelize.define('product', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, allowNull:false},
    description:{type:DataTypes.STRING, allowNull:false},
    price:{type: DataTypes.INTEGER, allowNull:false},
    img:{type:DataTypes.STRING, allowNull:false},
    status:{type:DataTypes.STRING, allowNull:false},
    categoryId: {type:DataTypes.INTEGER, allowNull: false}

})

const Category = sequelize.define('category', {
    id:{type:DataTypes.INTEGER, primaryKey:true},
    name:{type:DataTypes.STRING}
})

const Orders = sequelize.define('orders', {
    id:{type:DataTypes.INTEGER, primaryKey: true},
    userId:{type: DataTypes.STRING, allowNull: false},
    status:{type:DataTypes.STRING}
})

const OrderItems = sequelize.define('order_items', {
    id:{type:DataTypes.INTEGER, primaryKey:true},
    orderId:{type:DataTypes.INTEGER},
    productId:{type:DataTypes.INTEGER},
    quantity:{type:DataTypes.INTEGER},
    price:{type:DataTypes.INTEGER}
})

const Payments = sequelize.define('payments', {
    id:{type:DataTypes.INTEGER, primaryKey:true},
    orderId:{type:DataTypes.INTEGER},
    method:{type:DataTypes.INTEGER},
    status:{type:DataTypes.INTEGER},
    amount:{type:DataTypes.INTEGER}
})

const Address = sequelize.define('adresses', {
    id:{type:DataTypes.INTEGER, primaryKey:true},
    userId:{type:DataTypes.INTEGER},
    street:{type:DataTypes.STRING},
    city:{type:DataTypes.STRING},
    state:{type:DataTypes.STRING},
    zip_code:{type:DataTypes.STRING},
    country:{type:DataTypes.STRING}
})

const Cart = sequelize.define('cart', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: { type: DataTypes.STRING, allowNull: false }
})

const Favourites = sequelize.define('favourites', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId:{type: DataTypes.STRING, allowNull: false}
})

const CartProduct = sequelize.define('cart_product', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    productId: { type: DataTypes.INTEGER, allowNull: false },
    cartId: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
})

const FavouriteProduct = sequelize.define('favourite_product', {
    id:{type: DataTypes.INTEGER, primaryKey: true},
    productId:{type:DataTypes.INTEGER},
    favouriteId:{type:DataTypes.INTEGER},
})

User.hasMany(Orders, { foreignKey: 'userId' });
Orders.belongsTo(User, { foreignKey: 'userId' });

Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

Orders.hasMany(OrderItems, { foreignKey: 'orderId' });
OrderItems.belongsTo(Orders, { foreignKey: 'orderId' });

Orders.hasOne(Payments, {foreignKey: 'orderId'})
Payments.belongsTo(Orders, {foreignKey: 'orderId'})

Product.hasMany(OrderItems, { foreignKey: 'productId' });
OrderItems.belongsTo(Product, { foreignKey: 'productId' });

User.hasMany(Address, { foreignKey: 'userId' });
Address.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

Cart.hasMany(CartProduct, { foreignKey: 'cartId' });
CartProduct.belongsTo(Cart, { foreignKey: 'cartId' });

Product.hasMany(CartProduct, { foreignKey: 'productId' });
CartProduct.belongsTo(Product, { foreignKey: 'productId' });

User.hasOne(Favourites, { foreignKey: 'userId' });
Favourites.belongsTo(User, { foreignKey: 'userId' });

Favourites.hasMany(FavouriteProduct, { foreignKey: 'favouriteId' });
FavouriteProduct.belongsTo(Favourites, { foreignKey: 'favouriteId' });

Product.hasMany(FavouriteProduct, { foreignKey: 'productId' });
FavouriteProduct.belongsTo(Product, { foreignKey: 'productId' });

module.exports = {
    User,
    Cart,
    CartProduct,
    Product,
    OrderItems,
    Orders,
    FavouriteProduct,
    Favourites,
    Address,
    Category,
    Payments
};
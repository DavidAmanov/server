const sequelize = require('../db.js')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    user_id:{type: DataTypes.STRING, primaryKey: true, unique: true, allowNull: false},
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
    id:{type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    user_id:{type: DataTypes.STRING, allowNull: false},
    status:{type:DataTypes.STRING},
    address_id: {type: DataTypes.INTEGER, allowNull: false},
})

const OrderItems = sequelize.define('order_items', {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    order_id:{type:DataTypes.INTEGER},
    productId:{type:DataTypes.INTEGER},
    quantity:{type:DataTypes.INTEGER},
    price:{type:DataTypes.INTEGER}
})

const Payments = sequelize.define('payments', {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    order_id:{type:DataTypes.INTEGER},
    method:{type:DataTypes.STRING},
    status:{type:DataTypes.STRING},
    amount:{type:DataTypes.INTEGER}
})

const Address = sequelize.define('address', {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    user_id:{type:DataTypes.STRING, allowNull: false},
    street:{type:DataTypes.STRING},
    city:{type:DataTypes.STRING},
    state:{type:DataTypes.STRING},
    zip_code:{type:DataTypes.STRING},
    country:{type:DataTypes.STRING}
})

const Cart = sequelize.define('cart', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    user_id: { type: DataTypes.STRING, allowNull: false }
})

const Favourites = sequelize.define('favourites', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    user_id:{type: DataTypes.STRING, allowNull: false}
})

const CartProduct = sequelize.define('cart_product', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    cart_id: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
})

const FavouriteProduct = sequelize.define('favourite_product', {
    id:{type: DataTypes.INTEGER, primaryKey: true},
    product_id:{type:DataTypes.INTEGER},
    favourite_id:{type:DataTypes.INTEGER},
})

User.hasMany(Orders, { foreignKey: 'user_id' });
Orders.belongsTo(User, { foreignKey: 'user_id' });

Category.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

Orders.hasMany(OrderItems, { foreignKey: 'order_id' });
OrderItems.belongsTo(Orders, { foreignKey: 'order_id' });

Orders.hasOne(Payments, {foreignKey: 'order_id'})
Payments.belongsTo(Orders, {foreignKey: 'order_id'})

Product.hasMany(OrderItems, { foreignKey: 'product_id' });
OrderItems.belongsTo(Product, { foreignKey: 'product_id' });

User.hasMany(Address, { foreignKey: 'user_id' });
Address.belongsTo(User, { foreignKey: 'user_id' });

User.hasOne(Cart, { foreignKey: 'user_id' });
Cart.belongsTo(User, { foreignKey: 'user_id' });

Cart.hasMany(CartProduct, { foreignKey: 'cart_id' });
CartProduct.belongsTo(Cart, { foreignKey: 'cart_id' });

Product.hasMany(CartProduct, { foreignKey: 'product_id' });
CartProduct.belongsTo(Product, { foreignKey: 'product_id' });

User.hasOne(Favourites, { foreignKey: 'user_id' });
Favourites.belongsTo(User, { foreignKey: 'user_id' });

Favourites.hasMany(FavouriteProduct, { foreignKey: 'favourite_id' });
FavouriteProduct.belongsTo(Favourites, { foreignKey: 'favourite_id' });

Product.hasMany(FavouriteProduct, { foreignKey: 'product_id' });
FavouriteProduct.belongsTo(Product, { foreignKey: 'product_id' });

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
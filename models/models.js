const sequelize = require('../db.js');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    googleId: { type: DataTypes.STRING, primaryKey: true, unique: true, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    photo: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: 'USER' }
});

const Product = sequelize.define('product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    categoryId: { type: DataTypes.INTEGER, allowNull: false }
});

const Category = sequelize.define('category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING }
});

const Order = sequelize.define('order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    status: { type: DataTypes.STRING },
    addressId: { type: DataTypes.INTEGER, allowNull: false }
});

const OrderItem = sequelize.define('order_item', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false }
});

const Payment = sequelize.define('payment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    orderId:{ type: DataTypes.INTEGER, allowNull: false},
    methodId: {type: DataTypes.INTEGER},
    status: { type: DataTypes.STRING },
    amount: { type: DataTypes.INTEGER, allowNull: false }
});

const PaymentMethod = sequelize.define('payment_method', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING }
});

const Address = sequelize.define('address', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    street: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    state: { type: DataTypes.STRING },
    zipCode: { type: DataTypes.STRING },
    country: { type: DataTypes.STRING },
    userId: { type: DataTypes.STRING, allowNull: false }
});

const Cart = sequelize.define('cart', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.STRING, allowNull: false }
});

const Favourite = sequelize.define('favourite', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.STRING, allowNull: false }
});

const CartProduct = sequelize.define('cart_product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
});

const FavouriteProduct = sequelize.define('favourite_product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    productId: { type: DataTypes.INTEGER, allowNull: false }
});


User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

Order.hasOne(Payment, { foreignKey: 'orderId' });
Payment.belongsTo(Order, { foreignKey: 'orderId' });

Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

User.hasMany(Address, { foreignKey: 'userId' });
Address.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

Cart.hasMany(CartProduct, { foreignKey: 'cartId' });
CartProduct.belongsTo(Cart, { foreignKey: 'cartId' });

Product.hasMany(CartProduct, { foreignKey: 'productId' });
CartProduct.belongsTo(Product, { foreignKey: 'productId' });

User.hasOne(Favourite, { foreignKey: 'userId' });
Favourite.belongsTo(User, { foreignKey: 'userId' });

Favourite.hasMany(FavouriteProduct, { foreignKey: 'favouriteId' });
FavouriteProduct.belongsTo(Favourite, { foreignKey: 'favouriteId' });

Product.hasMany(FavouriteProduct, { foreignKey: 'productId' });
FavouriteProduct.belongsTo(Product, { foreignKey: 'productId' });

Payment.belongsTo(PaymentMethod, { foreignKey: 'methodId',  onDelete: 'CASCADE', onUpdate: 'CASCADE' });
PaymentMethod.hasMany(Payment, { foreignKey: 'methodId' });

module.exports = {
    User,
    Cart,
    CartProduct,
    Product,
    OrderItem,
    Order,
    FavouriteProduct,
    Favourite,
    Address,
    Category,
    Payment,
    PaymentMethod
};


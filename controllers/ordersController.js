const {User, Address, Order, Payment, PaymentMethod, OrderItem, Recipient} = require('../models/models')
const sequelize = require('../db')
const ApiError = require('../error/ApiError')

class OrdersController {
    async create(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            const { order } = req.body;
            const user = await User.findOne({ where: { googleId: order.userId } });
            if (!user) {
                return next(ApiError.badRequest("User not found"));
            }

            const [address] = await Address.findOrCreate({
                where: { 
                    userId: order.userId, 
                    street: order.addressData.street, 
                    city: order.addressData.city
                },
                defaults: { 
                    userId: order.userId, 
                    street: order.addressData.street, 
                    city: order.addressData.city, 
                    state: order.addressData.state, 
                    zipCode:order.addressData.zipCode, 
                    country: order.addressData.country 
                },
                transaction
            });

            if (!address) {
                return next(ApiError.badRequest('Address not found'));
            }

            const orderObj = await Order.create({ 
                userId: order.userId, 
                status: order.orderData, 
                addressId: address.id 
            }, { transaction });
            
            if(!orderObj){
                return next(ApiError.badRequest('object problem'));
            }

            const paymentMethod = await PaymentMethod.findOne({ where: { name: order.paymentData.method }, transaction });
            if (!paymentMethod) {
                return next(ApiError.badRequest('Payment method not found'));
            }

            const payment = await Payment.create({ 
                orderId: orderObj.id, 
                methodId: paymentMethod.id, 
                status: order.paymentData.status, 
                amount: order.paymentData.amount 
            }, { transaction });

            for (const item of order.orderItems) {
                await OrderItem.create({ 
                    orderId: orderObj.id, 
                    productId: item.productId, 
                    quantity: item.quantity, 
                    price: item.product.price 
                }, { transaction });
            }

            const recipient = await Recipient.create({
                orderId: orderObj.id,
                name: order.recipientData.name,
                lastName: order.recipientData.lastName,
                mobilePhone: order.recipientData.mobilePhone,
                email: order.recipientData.email,
                comment: order.recipientData.comment
            }, { transaction })

            await transaction.commit();
            return res.json(orderObj);
        } catch (e) {
            await transaction.rollback();
            return next(ApiError.badRequest(e.message));
        }
    }

    async remove(req, res, next){
        try{
            const {order_id, user_id, address_id} = req.body
            const order = await Order.findOne({where:{id: order_id, userId: user_id, addressId: address_id}})
            await order.destroy()
            return res.json({message: "Order removed"})
        } catch(e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next){
        try{
            const orders = await Order.findAll()
            return res.json(orders)
        } catch(e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async getOrdersByUserId(req, res, next){
        try{
            let {user_id} = req.params
            const order = await Order.findAll({where: {userId: user_id}})
            return res.json(order)
        } catch(e) {
            return next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new OrdersController()








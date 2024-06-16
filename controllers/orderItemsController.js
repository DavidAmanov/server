const {Order, Product, OrderItem} = require('../models/models')
const ApiError = require('../error/ApiError')

class OrderItemsController{
    async add(req, res, next){
        try{
            const {order_id, product_id, quantity, price} = req.body
            const order = await Order.findOne({where: {id: order_id}})
            if (!order) {
                return next(ApiError.badRequest('Order not found'));
            }
            const product = await Product.findOne({where: {id: product_id}})
            if (!product) {
                return next(ApiError.badRequest('Product not found'));
            }
            const orderItem = await OrderItem.create({ orderId: order_id, productId: product_id, quantity: quantity, price: price })
            return res.json(orderItem)
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

    async remove(req, res, next){
        try{
            const {order_id, product_id} = req.body
            const orderItem = await OrderItem.findOne({where:{orderId: order_id, productId: product_id}})
            await orderItem.destroy()
            return res.json({ message: "Product removed from order" })
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getOrderItems(req, res, next){
        try{
            const { order_id } = req.params;
            const orderItems = await OrderItem.findAll({ where: { orderId: order_id }, include: [Product] });
            return res.json(orderItems);
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new OrderItemsController()
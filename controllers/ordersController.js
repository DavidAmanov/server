const {User, Address, Order} = require('../models/models')
const ApiError = require('../error/ApiError')

class OrdersController {
    async create(req, res, next){
        try{
            const {user_id, status, address_id} = req.body
            const user = await User.findOne({where:{googleId: user_id}})
            if(!user){
                return next(ApiError.badRequest("User not found"))
            }
            const address = await Address.findOne({where:{id: address_id}})
            if(!address){
                return next(ApiError.badRequest("Address not found"))
            }
            const order = await Order.create({userId: user_id, status: status, addressId: address_id})
            return res.json(order)
        } catch(e) {
            return next(ApiError.badRequest(e.message))
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

    async getOneById(req, res, next){
        try{
            let {id} = req.params
            const order = await Order.findOne({where: {id}})
            return res.json(order)
        } catch(e) {
            return next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new OrdersController()
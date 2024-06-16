const {Order, Payment} = require('../models/models')
const ApiError = require('../error/ApiError')

class PaymentsController{
    async create(req, res, next){
        try{
            const {order_id, method_id, status, amount} = req.body
            const order = await Order.findOne({where:{id: order_id}})
            if(!order){
                return next(ApiError.badRequest("Can't find this order"))
            }
            const payment = await Payment.create({orderId: order_id, methodId: method_id, status: status, amount: amount})
            return res.json(payment)
        } catch(e){
            return res.json(ApiError.badRequest(e.message))
        }
    }

    async remove(req, res, next){
        try{
            const {payment_id} = req.body
            const payment = await Payment.findOne({where:{id: payment_id}})
            await payment.destroy()
            return res.json({ message: "Payment removed from database" })
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res){
        const payments = await Payment.findAll()
        return res.json(payments)
    }

    async getOneById(req, res){
        let {id} = req.params
        const payment = await Payment.findOne({where: {id}})
        return res.json(payment)
    }
}

module.exports = new PaymentsController()
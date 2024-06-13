const {Orders, Payments} = require('../models/models')
const ApiError = require('../error/ApiError')

class PaymentsController{
    async create(req, res, next){
        try{
            const {order_id, method, status, amount} = req.body
            const order = await Orders.findOne({where:{order_id: order_id}})
            if(!order){
                return next(ApiError.badRequest("Can't find this order"))
            }
            const payment = await Payments.create({orderId: order_id, method: method, status: status, amount: amount})
            return res.json(payment)
        } catch(e){
            return res.json(ApiError.badRequest(e.message))
        }
    }

    async remove(req, res, next){
        try{
            const {payment_id} = req.body
            const payment = await Payments.findOne({where:{paymentId: payment_id}})
            await payment.destroy()
            return res.json({ message: "Payment removed from database" })
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res){
        const payments = await Payments.findAll()
        return res.json(payments)
    }

    async getOneById(req, res){
        let {id} = req.params
        const payment = await Payments.findOne({where: {id}})
        return res.json(payment)
    }
}

module.exports = new PaymentsController()
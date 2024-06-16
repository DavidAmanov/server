const {PaymentMethod} = require('../models/models')
const ApiError = require('../error/ApiError')

class PaymentMethodController{
    async create(req,res,next){
        try{
            const {name} = req.body
            const paymentMethod = await PaymentMethod.create({name:name})
            return res.json(paymentMethod)
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async remove(req, res, next){
        try{
            const {id} = req.body
            const paymentMethod = await PaymentMethod.findOne({where:{id:id}})
            await paymentMethod.destroy()
            return res.json({messsage: "Method removed"})
        } catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req,res,next){
        try{
            const paymentMethods = await PaymentMethod.findAll()
            return res.json(paymentMethods)
        }catch(e){
            next(ApiError.badRequest(e.message))
        }  
    }
}

module.exports = new PaymentMethodController()
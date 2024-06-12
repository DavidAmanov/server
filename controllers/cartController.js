const {Cart} = require('../models/models')
const ApiError = require('../error/ApiError')

class CartController {
    async create(req, res, next){
        try{
            const {user_id} = req.body
            const cart = await Cart.create({user_id})
            return res.json(cart)
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

    async openCart(req, res){
        const {user_id} = req.body
        const cart = await Cart.findOne({
            where: {user_id}
        })
        return res.json(cart)
    }
}

module.exports = new CartController()
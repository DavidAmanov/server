const {Basket} = require('../models/models')
const ApiError = require('../error/ApiError')

class BasketController {
    async create(req, res, next){
        try{
            const {user_id} = req.body
            const basket = await Basket.create({user_id})
            return res.json(basket)
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

    async openBasket(req, res){
        const {user_id} = req.body
        const basket = await Basket.findOne({
            where: {user_id}
        })
        return res.json(basket)
    }
}

module.exports = new BasketController()
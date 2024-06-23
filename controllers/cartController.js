const {Cart} = require('../models/models')
const ApiError = require('../error/ApiError')

class CartController {
    async create(req, res, next){
        try{
            const {user_id} = req.body
            const cart = await Cart.create({userId: user_id})
            return res.json(cart)
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

    async openCart(req, res){
        const {user_id} = req.params
        const cart = await Cart.findOne({where: {userId: user_id}})
        return res.json(cart)
    }

    async getCartId(req, res, next) {
        try {
            const userId = req.user.id; 
            const cart = await Cart.findOne({ where: { userId } });
            if (!cart) {
                return next(ApiError.notFound('Cart not found'));
            }
            return res.json({ cart_id: cart.id });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new CartController()
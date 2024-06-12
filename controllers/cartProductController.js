const {Cart, Product, CartProduct} = require('../models/models')
const ApiError = require('../error/ApiError')

class CartProductController {
    async add(req, res, next){
        try{
            const {cart_id, product_id, quantity} = req.body
            const cart = await Cart.findOne({where: {id: cart_id}})
            const product = await Product.findOne({whwere: {id: product_id}})
            const cartProduct = await CartProduct.create({ cartId: cart_id, productId: product_id, quantity })
            return res.json(cartProduct)
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

    async remove(req, res, next){
        try{
            const {cart_id, product_id} = req.body
            const cartProduct = await CartProduct.findOne({where:{cartId: cart_id, productId: product_id}})
            await cartProduct.destroy()
            return res.json({ message: "Product removed from cart" })
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getCartProducts(req, res, next){
        try{
            const {cartId} = req.params
            const cartProduct = await CartProduct.findAll({where:{cartId: cartId}, include: [Product]})
            return res.json(cartProduct)
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new CartProductController()
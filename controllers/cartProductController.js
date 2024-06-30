const {Cart, Product, CartProduct} = require('../models/models')
const ApiError = require('../error/ApiError')

class CartProductController {
    async add(req, res, next){
        try{
            const {cart_id, product_id, quantity} = req.body
            const cart = await Cart.findOne({where: {id: cart_id}})
            if (!cart) {
                return next(ApiError.badRequest('Cart not found'));
            }
            const cartProductChangeQua = await CartProduct.findOne({where:{cartId: cart_id, productId: product_id}})
            if(cartProductChangeQua){
                cartProductChangeQua.quantity = cartProductChangeQua.quantity + quantity
                await cartProductChangeQua.save()
                return res.json(cartProductChangeQua)
            }
            const product = await Product.findOne({where: {id: product_id}})
            if (!product) {
                return next(ApiError.badRequest('Product not found'));
            }
            const cartProduct = await CartProduct.create({ cartId: cart_id, productId: product_id, quantity: quantity })
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
            const {cart_Id} = req.params
            const cartProduct = await CartProduct.findAll({where:{cartId: cart_Id}, include: [Product]})
            const products = cartProduct.map((item)=>{
                item.product.img = `${req.protocol}://${req.get('host')}/static/${item.product.img}`;
                return item
        })
        
        return res.json(products)
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

    async changeProductQuantity(req, res, next){
        try{
            const {cart_id, product_id, quantity} = req.params
            const cartProduct = await CartProduct.findOne({where:{cartId: cart_id, productId: product_id}})
            cartProduct.quantity = quantity
            return res.json(cartProduct)
        } catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new CartProductController()
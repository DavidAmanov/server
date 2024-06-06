const {Basket, Product, BasketProduct} = require('../models/models')
const ApiError = require('../error/ApiError')

class BasketProductController {
    async add(req, res, next){
        try{
            const {basket_id, product_id} = req.body
            const basket = await Basket.findOne({where: {id: basket_id}})
            const product = await Product.findOne({whwere: {id: product_id}})
            const basketProduct = await BasketProduct.create({basket, product, quantity})
            return res.json(basketProduct)
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

    async remove(req, res, next){
        try{
            const {basket_id, product_id} = req.body
            const basketProduct = await BasketProduct.findOne({where:{basket_id, product_id}})
            await basketProduct.destroy()
            return res.json({ message: "Product removed from basket" })
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getBasketProducts(req, res, next){
        try{
            const {basket_id} = req.params
            const basketProduct = await BasketProduct.findAll({where:{basket_id}, include: [Product]})
            return res.json(basketProduct)
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new BasketProductController()
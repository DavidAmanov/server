const {Favourites, Product, FavouriteProduct} = require('../models/models')
const ApiError = require('../error/ApiError')

class FavouriteProductController {
    async add(req,res, next){
        try{
            const {favourites_id, product_id} = req.body
            const favourites = await Favourites.findOne({where:{id: favourites_id}})
            if(!favourites){
                return next(ApiError.badRequest("Favourites not found"))
            }
            const product = await Product.findOne({where:{id: product_id}})
            if (!product) {
                return next(ApiError.badRequest('Product not found'));
            }
            const favouriteProduct = await FavouriteProduct.create({favouritesId: favourites_id, productId:product_id})
            return res.json(favouriteProduct)
        } catch(e){
            return next(ApiError.badRequest(e.message))
        }
    }

    async remove(req,res,next){
        try{
            const {favourites_id, product_id} = req.body
            const favouriteProduct = await  FavouriteProduct.findOne({where:{favouritesId: favourites_id, productId: product_id}}) 
            await favouriteProduct.destroy()
            return res.json({messsage: "Product removed from Favourites"})
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async getFavouriteProduct(req,res,next){
        try{
            const {favourites_id} = req.params
            const favouriteProduct = await FavouriteProduct.findAll({where:{favouritesId:favourites_id}, include:[Product]})
            return res.json(favouriteProduct)
        } catch(e){
            return next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new FavouriteProductController()
const {Favourite, Product, FavouriteProduct} = require('../models/models')
const ApiError = require('../error/ApiError')

class FavouriteProductController {
    async add(req,res, next){
        try{
            const {favourites_id, product_id} = req.body
            console.log('favourites_id:', favourites_id);
            console.log('product_id:', product_id);
            const findfavouriteProduct = await FavouriteProduct.findOne({where:{favouriteId: favourites_id, productId:product_id}})
            if(!findfavouriteProduct){
                const favourites = await Favourite.findOne({where:{id: favourites_id}})
                if(!favourites){
                    return next(ApiError.badRequest("Favourites not found"))
                }
                const product = await Product.findOne({where:{id: product_id}})
                if (!product) {
                    return next(ApiError.badRequest('Product not found'));
                }
                const favouriteProduct = await FavouriteProduct.create({favouriteId: favourites_id, productId:product_id})
                return res.json(favouriteProduct)
            } else {
                return res.json(findfavouriteProduct)
            }
        } catch(e){
            return next(ApiError.badRequest(e.message))
        }
    }

    async remove(req,res,next){
        try{
            const {favourites_id, product_id} = req.body
            const favouriteProduct = await  FavouriteProduct.findOne({where:{favouriteId: favourites_id, productId: product_id}}) 
            await favouriteProduct.destroy()
            return res.json({messsage: "Product removed from Favourites"})
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async getFavouriteProduct(req,res,next){
        try{
            const {favourites_id} = req.params
            const favouriteProduct = await FavouriteProduct.findAll({where:{favouriteId:favourites_id}, include:[Product]})
            const products = favouriteProduct.map((item)=>{
                item.product.img = `${req.protocol}://${req.get('host')}/static/${item.product.img}`;
                return item
        })
        return res.json(products)
        } catch(e){
            return next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new FavouriteProductController()
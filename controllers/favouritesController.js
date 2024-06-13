const {User, Favourites} = require('../models/models')
const ApiError = require('../error/ApiError')

class FavouritesController{
    async add(req,res,next){
        try{
            const {user_id} = req.body
            const user = await User.findOne({where:{userId: user_id}})
            if(!user){
                return next(ApiError.badRequest("Can't find this user"))
            }
            const favourite = await Favourites.create({userId: user_id})
            return res.json(favourite)
        }catch(e){
            return res.json(ApiError.badRequest(e.message))
        }
    }

    async openFavourite(req, res, next){
        try{
            const {user_id} = req.params
            const favourite = await Favourites.findOne({where:{userId: user_id}})
            return res.json(favourite)
        } catch(e){
            return next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new FavouritesController()
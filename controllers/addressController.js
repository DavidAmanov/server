const {Address, User} = require('../models/models')
const ApiError = require('../error/ApiError')

class AddressController {
    async add(req,res,next){
        try{
            const {user_id, street, city, state, zip_code, country} = req.body
            const user = await User.findOne({where:{userId: user_id}})
            if(!user){
                return next(ApiError.badRequest("User not found"))
            }
            const address = await Address.create({userId:user_id, 
                street:street,
                city:city,
                state:state,
                zip_code:zip_code,
                country:country})
            return res.json(address)
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
    } 

    async remove(req,res,next){
        try{
            const {address_id , user_id} = req.body
            const address = await Address.findOne({where:{userId: user_id, id: address_id}})
            await address.destroy()
            return res.json({message:"Address removed from user"})
        } catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getAddressesByUser(req,res,next){
        try{
            const {user_id} = req.params
            const address = await Address.findAll({where:{userId: user_id}})
            return res.json(address)
        } catch(e){
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new AddressController()
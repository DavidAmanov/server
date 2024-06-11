const ApiError = require('../error/ApiError')
const jwt = require('jsonwebtoken')
const {Basket} = require('../models/models')
const passport = require('../auth')


const generateJwt = (id, email, role) => {
    return jwt.sign({id, email, role}, process.env.SECRET_KEY, {expiresIn: '24h'})
}
class UserController {
    async check(req, res, next){
        try{
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    } catch(e){
        next(ApiError.badRequest(e.message))
    }
    }
    googleAuth(req,res,next){
        passport.authenticate('google', {scope:['profile', 'email']})(req,res,next);
    }

    googleCallback(req,res,next){
        passport.authenticate('google', {failureRedirect: '/'}, (err, user, info)=>{
            if(err){
                return next(ApiError.badRequest(err.message))
            }
            if(!user){
                return res.redirect('/')
            }
            req.logIN(user, async (err)=>{
                if(err){
                    return next(ApiError.badRequest(err.message))
                }
                let basket = await Basket.findOne({where:{user_id: user.id}})
                if(!basket){
                    basket = await Basket.create({where:{user_id: user.id}})
                }
                const token = generateJwt(user.id, user.mail, user.role);
                return res.json({token})
            }
        )
        })(req, res, next)
    }
}

module.exports = new UserController() 
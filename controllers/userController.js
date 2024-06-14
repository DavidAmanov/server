const ApiError = require('../error/ApiError')
const jwt = require('jsonwebtoken')
const {Cart, Favourites} = require('../models/models')
const passport = require('../auth')

/**
 * Generates a JWT token.
 * @param {number} id - User ID.
 * @param {string} email - User email.
 * @param {string} role - User role.
 * @returns {string} JWT token.
 */
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
                let cart = await Cart.findOne({where:{userId: user.id}})
                if(!cart){
                    cart = await Cart.create({userId: user.userId})
                }
                let favourite = await Favourites.findOne({where:{userId: user.id}})
                if(!favourite){
                    favourite = await Favourites.create({userId: user.userId})
                }
                const token = generateJwt(user.userId, user.mail, user.role);
                return res.json({token})
            }
        )
        })(req, res, next)
    }
}

module.exports = new UserController() 
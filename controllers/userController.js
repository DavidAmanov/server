const ApiError = require('../error/ApiError');
const jwt = require('jsonwebtoken');
const { Cart, Favourite} = require('../models/models');
const passport = require('../auth');

const generateJwt = (id, email, role) => {
    return jwt.sign({ id, email, role }, process.env.SECRET_KEY, { expiresIn: '24h' });
};

class UserController {
    async check(req, res, next) {
        try {
            const token = generateJwt(req.user.googleId, req.user.email, req.user.role);
            return res.json({ token });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    googleAuth(req, res, next) {
        passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
    }

    googleCallback(req, res, next) {
        passport.authenticate('google', { failureRedirect: '/' }, async (err, user, info) => {
            if (err) {
                return next(ApiError.badRequest(err.message));
            }
            if (!user) {
                return res.redirect('/');
            }
            req.logIn(user, async (err) => {
                if (err) {
                    return next(ApiError.badRequest(err.message));
                }

                try {
                    let cart = await Cart.findOne({ where: { userId: user.googleId } });
                    if (!cart) {
                        cart = await Cart.create({ userId: user.googleId });
                    }

                    let favourite = await Favourite.findOne({ where: { userId: user.googleId } });
                    if (!favourite) {
                        favourite = await Favourite.create({ userId: user.googleId });
                    }

                    const token = generateJwt(user.googleId, user.email, user.role);
                    return res.json({ token, user });
                } catch (error) {
                    return next(ApiError.internal(error.message));
                }
            });
        })(req, res, next);
    }
}

module.exports = new UserController();

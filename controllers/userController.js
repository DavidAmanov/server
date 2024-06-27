const ApiError = require('../error/ApiError');
const jwt = require('jsonwebtoken');
const { Cart, Favourite, User } = require('../models/models');
const passport = require('../auth');

const generateJwt = (id, email, role, expiresIn = '24h') => {
    return jwt.sign({ id, email, role }, process.env.SECRET_KEY, { expiresIn });
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

                    const accessToken = generateJwt(user.googleId, user.email, user.role, '1d');
                    const refreshToken = generateJwt(user.googleId, user.email, user.role, '7d')

                    res.cookie('accessToken', accessToken, { httpOnly: false, secure: false, sameSite: 'Strict' });
                    res.cookie('refreshToken', refreshToken, { httpOnly: false, secure: false, sameSite: 'Strict' });
                    return res.redirect('http://localhost:3000/profile');
                } catch (error) {
                    return next(ApiError.internal(error.message));
                }
            });
        })(req, res, next);
    }

    async getUserData(req, res, next) {
        try {
            // const token = req.headers.authorization.split(' ')[1];
            const token = req.cookies.accessToken;
    
            if (!token) {
                return next(ApiError.badRequest('No token provided'));
            }
    
            console.log('Received token:', token);
    
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            console.log('Decoded token:', decoded);
    
            const user = await User.findOne({ where: { googleId: decoded.id } });
    
            if (!user) {
                return next(ApiError.badRequest('User not found'));
            }
    
            const cart = await Cart.findOne({ where: { userId: user.googleId } });
            if (!cart) {
                cart = await Cart.create({ userId: user.googleId });
            }
    
            const favourite = await Favourite.findOne({ where: { userId: user.googleId } });
            if (!favourite) {
                favourite = await Favourite.create({ userId: user.googleId });
            }
    
            return res.json({
                googleId: user.googleId,
                username: user.username,
                email: user.email,
                photo: user.photo,
                role: user.role,
                cartId: cart.id,
                favouriteId: favourite.id
            });
        } catch (error) {
            console.error('Error in getUserData:', error);
            return next(ApiError.badRequest('Failed to retrieve user data'));
        }
    }
    

    async refreshToken(req, res, next) {
        const refreshToken  = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({ message: 'Токен не предоставлен' });
        }
    
        try {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            const user = await User.findOne({ where: { googleId: decoded.id } });
    
            if (!user) {
                return res.status(401).json({ message: 'Пользователь не найден' });
            }
    
            const newAccessToken = generateJwt(user.googleId, user.email, user.role, '1d');
            const newRefreshToken = generateJwt(user.googleId, user.email, user.role, '7d');
    
            res.cookie('accessToken', newAccessToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
            res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
    
            return res.json({ accessToken: newAccessToken });
        } catch (error) {
            return next(ApiError.internal('Ошибка при обновлении токена'));
        }
    }
}   
module.exports = new UserController();


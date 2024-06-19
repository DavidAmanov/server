const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User, Cart } = require('./models/models');

const adminEmails = [process.env.ADMIN1, process.env.ADMIN2, process.env.ADMIN3];

passport.serializeUser((user, done) => {
    done(null, user.googleId);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findOne({where: {googleId: id}});
        done(null, user);
    } catch (err) {
        done(err);
    }
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3001/api/user/auth/google/callback',
    passReqToCallback: true
},
async function(request, accessToken, refreshToken, profile, done) {
    try {
        let user = await User.findOne({ where: { googleId: profile.id } });
        if (!user) {
            const isAdmin = adminEmails.includes(profile.emails[0].value);
            user = await User.create({
                googleId: profile.id,
                username: profile.displayName,
                email: profile.emails[0].value,
                photo: profile.photos[0].value,
                role: isAdmin ? 'ADMIN' : 'USER'
            });
            await Cart.create({ user_id: user.id });
        }
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

module.exports = passport;

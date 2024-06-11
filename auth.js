const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {User, Basket} = require('./models/models')

const adminEmails = [process.env.ADMIN1, process.env.ADMIN2]

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clinetSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3001/google/callback',
    passReqToCallback: true
},
    async function(request, accsessToken, refreshToken,  profile, done){
    try{
        let user = await User.findOne({where: {googleId: profile.id}})
        if(!user){
            const isAdmin = adminEmails.includes(profile.emails[0].value);
            user = await User.create({
                googleId: profile.id,
                displayName: profile.displayName,
                email: profile.email,
                photo: profile.photo,
                role: isAdmin ? 'ADMIN' :'USER'
            })
            await Basket.create({user_id: user.id})
        }
        return done(null, user)
    } catch(error){
        return done(error)
    }
}

))

module.exports = passport;
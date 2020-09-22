const User = require("../models/User")
const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require("passport-facebook").Strategy
const GoogleStrategy = require("passport-google-oauth20").Strategy
const bcrypt = require('bcrypt');

const facebookConfig = {
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CBURL,
    profileFields: ["id", "email", "link", "name", "photos"]
}
const googleConfig = {
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CBURL,
    profileFields: ["id", "email", "link", "name", "photos"]
}

// LOCAL
passport.use(User.createStrategy())


//LOCAL FOR CREATOS 

/* passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    (username, password, done) => {
        User.findOne({ username })
            .then(foundUser => {
                if (!foundUser) {
                    done(null, false, { message: 'Incorrect username' });
                    return;
                }

                if (!bcrypt.compareSync(password, foundUser.password)) {
                    done(null, false, { message: 'Incorrect password' });
                    return;
                }

                done(null, foundUser);
            })
            .catch(err => done(err));
    }
)); */

//FACEBOOK
passport.use(
    new FacebookStrategy(facebookConfig, async(_, __, profile, done) => {
        const user = await User.findOne({ facebookId: profile.id })
        if (!user) {
            const user = await User.create({
                name: `${profile.name.givenName} ${profile.name.familyName}`,
                facebookId: profile.id,
                email: profile.emails[0].value
            })
            return done(null, user)
        }
        return done(null, user)
    })
)

//GOOGLE

passport.use(
    new GoogleStrategy(googleConfig, async(_, __, profile, done) => {
        const user = await User.findOne({ googleId: profile.id })
        if (!user) {
            const user = await User.create({
                name: profile.displayName,
                googleId: profile.id,
                email: profile.emails[0].value
            })
            return done(null, user)
        }
        return done(null, user)
    })
)

passport.serializeUser((user, done) => {
    console.log(user)
    done(null, user.id)
})
passport.deserializeUser(async(id, done) => {
    const user = await User.findById(id)
    done(null, user)
})

module.exports = passport
const { compareSync } = require("bcrypt");
const LocalStrategry = require("passport-local").Strategy;
const UserModel = require("../model/user.model");

const initializePassportConfig = passport => {
    passport.use(new LocalStrategry(async function (username, password, done) {
        try {
            const foundUser = await UserModel.findOne({ username })
            if (foundUser) {
                const isMatch = compareSync(password, foundUser._doc.password)
                if (isMatch) {
                    done(null, foundUser)
                } else {
                    done(null, false, { message: "Bad Credentaisl" })
                }
            } else {
                done(null, false, { message: "Unable to locate user - " + username })
            }
        } catch (err) {
            done(err)
        }
    }))

    // maintain the session with User data
    passport.serializeUser((user, done) => {
        return done(null, { id: user.id })
    })
    passport.deserializeUser((user, done) => {
        return done(null, user)
    })

}

module.exports = initializePassportConfig;
const express = require("express");
const passport = require("passport");

const { userRegister, userPostRegister, userLogin, userProfile, onUserLogout } = require("../controller/user.controller");

const router = express.Router();


router.route("/register")
    .get(userRegister)
    .post(userPostRegister)

router.route("/login")
    .get(userLogin)
    .post(passport.authenticate('local', {
        successRedirect: "/users/profile",
        failureRedirect: "/users/login"
    }))

router.route("/profile")
    .get(userProfile)

router.route("/logout")
    .get(onUserLogout)
module.exports = router;
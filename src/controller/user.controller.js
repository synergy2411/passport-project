const { hashSync, compareSync } = require("bcrypt")
const UserModel = require("../model/user.model");

const userLogin = (req, res) => {
    res.render("login")
}
const userRegister = (req, res) => {
    res.render("register")
}
const userPostRegister = async (req, res) => {
    try {
        const { password } = req.body;
        const hashedPassword = hashSync(password, 10)
        const newUser = new UserModel({ ...req.body, password: hashedPassword })
        const createdUser = await newUser.save();
        return res.redirect("/users/login")
    } catch (err) {
        return res.send(err)
    }
}

const userProfile = (req, res) => {
    console.log(req.session);
    console.log("Is user authenticated : ", req.isAuthenticated());
    res.render("profile")
}

const onUserLogout = (req, res) => {
    req.logout(() => {
        res.redirect("/users/login")
    })
}

module.exports = {
    userLogin,
    userRegister,
    userPostRegister,
    userProfile,
    onUserLogout
}
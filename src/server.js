const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
require("./db")
const UserRouter = require("./routes/user.routes");
const initializePassportConfig = require("./config/passport.config");

const app = express();
const PORT = process.env.PORT || 9000
const mongoAtlasURL = `mongodb+srv://sync-user:hN1C1bDZKgy0AAHU@cluster0.e9xsq.mongodb.net/?retryWrites=true&w=majority`

app.use(session({
    secret: "MY SERECT FOR SESSION",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: mongoAtlasURL, collectionName: "sessions" })
}))

app.use(passport.initialize());
app.use(passport.session());

initializePassportConfig(passport);

app.use(express.urlencoded({ extended: false }));            // parse the form data & add it to Request
app.use("/users", UserRouter);

app.set("view engine", "ejs");
app.set("views", "./src/views");



app.listen(PORT, console.log("Server Started at PORT : " + PORT));
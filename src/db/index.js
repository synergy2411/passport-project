const { connect } = require("mongoose");
require("dotenv").config();

const { mongoURI } = process.env;
const mongoAtlasURL = `mongodb+srv://sync-user:hN1C1bDZKgy0AAHU@cluster0.e9xsq.mongodb.net/sync-db?retryWrites=true&w=majority`

connect(mongoAtlasURL)
    .then(() => console.log("Mongo Connected"))
    .catch(console.log)
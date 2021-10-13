const mongoose = require("mongoose");

//create book Schema
const bookschema= mongoose.Schema(
    {
    ISBN:String,
    title:String,
    pubdate:String,
    language:String,
    numpage:String,
    author:[Number],
    publication:[Number],
    category:[String],
    }
);

const bookmodel = mongoose.model("books",bookschema);

module.exports = bookmodel;

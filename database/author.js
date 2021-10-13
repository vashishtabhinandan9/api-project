const mongoose = require("mongoose");

//create book Schema
const authorschema= mongoose.Schema(
    {

        id:Number,
        name:String,
        books:[String]
    

    }
);

const authormodel = mongoose.model("author",authorschema);

module.exports = authormodel;

const mongoose = require("mongoose");

//create book Schema
const publicationschema= mongoose.Schema(
    {

        id:Number,
        name:String,
        books:[String]
    

    }
);

const publicationmodel = mongoose.model("publication",publicationschema);

module.exports = publicationmodel;

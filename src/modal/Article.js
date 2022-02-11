const mongoose = require('mongoose');

let mongooseSchema = mongoose.Schema;
const articleSchema = new mongooseSchema({
    title:String,
    description:String,
    comment:String,
    
    
});

var articleModelObj = mongoose.model("Articles",articleSchema);
module.exports = {articleModelObj};
const { default: mongoose } = require("mongoose");

const recipeSchema=new mongoose.Schema({
    _id:{type:mongoose.Types.ObjectId,required:true},
    name:{type:String,required:true}
})
const categorySchema=new mongoose.Schema({
    name:{type:String,required:true},
    recipes:{type:[recipeSchema],required:true}
});


module.exports.categorySchema=categorySchema;
module.exports.Category=mongoose.model('category',categorySchema);
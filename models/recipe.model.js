const { default: mongoose } = require("mongoose");

const layerSchema = new mongoose.Schema({
    description: { type: String},
    ingredients: { type: [String],required:true,minlength:2 }
});

const userOwnSchema = new mongoose.Schema({
    _id: { type:mongoose.Types.ObjectId,ref: 'user',required:true },
    name: { type: String,required:true,minlength:2 }
});

const recipeSchema= new mongoose.Schema({
    name:{type:String,required:true,minlength:2},
    description:{type:String},
    categorynames:{type:[String],required:true,minlength:2},
    preparationTime:{type:Number},
    difficulty: { type: Number,min:1,max:5,default:1},
    dateAdded:{type:Date,default:new Date()},
    layers:{type:[layerSchema],required:true},
    instructions:{type:[String],required:true,minlength:2},
    image:{type:String},
    isPrivate:{type:Boolean,default:false},
    user:{type:userOwnSchema,required:true}
})

module.exports.recipeSchema=recipeSchema;
module.exports.Recipe=mongoose.model('recipes',recipeSchema);

// module.exports.recipeValidators={
//     recipe:joi.object().keys({

//     })
// }
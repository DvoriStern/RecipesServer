const bcrypt = require('bcrypt');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema= new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlength:[6,'password length < 6']},
    address:{type:String},
    role: { type: String, default: 'user', enum: ['admin', 'user'] }
})

//Password encryption operation before each save in the collection of users
userSchema.pre('save',function(next){
    const salt=+process.env.BCRYPT_SALT|10;
    bcrypt.hash(this.password,salt,async(err,hashPass)=>{
        if(err)
            throw new Error(err.message);
        this.password=hashPass;
        next()
    })
});

module.exports.userSchema=userSchema;
module.exports.User=mongoose.model('users',userSchema);

//Validity check with the JOI library
module.exports.userValidators={
    login:Joi.object.keys({
        email:Joi.string().email().required(),
        password:joiPassword
        .string().min(6).max(10)
        .minOfNumeric(3)
        .noWhiteSpaces()
        .doesNotInclude(['password'])
        .onlyLatinCharacters()
        .minOfUppercase(1)
        .minOfSpecialCharacters(1)
    })
}
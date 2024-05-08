const bcrypt = require('bcrypt');
const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

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

//creating the token
module.exports.generateToken=(user)=>{
    const privateKey=process.env.JWT_SECRET||'JWT_SECRET';// Secret string by which the token was created
    const data={role:user.role,user_id:user._id};// The data that is relevant for user permissions
    const token=jwt.sign(data,privateKey,{expiresIn:'1h'});// Create the token + expire
    return token;
}
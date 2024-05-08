const bcrypt = require('bcrypt');
const { User, userValidators, generateToken } = require("../models/user.model");

exports.signIn=async(req,res,next)=>{
    const validation=userValidators.login.validate(req.body);
    if(validation.error)
        return next({message:validation.error.message})

    const {email,password}=req.body;

    const user=await User.findOne({email});

    if(user){
        //check password
        // Sending the unencrypted password from the message body
        // and the encrypted password from the database
        bcrypt.compare(password,user.password,(err,same)=>{
            if(err)
                return next(new Error(err.message));
            if(same){
                const token=generateToken(user);
                user.password="*****";
                return res.send({user,token});                
            }
            return next({ message: 'Auth Failed', status: 401 })
        })
    }
    else{
        return next({ message: 'Auth Failed', status: 401 })
    }
}

exports.signUp=async(req,res,next)=>{
    const { username, email, password,address } = req.body;

    try{
        const user=new User({username,email,password,address});
        await user.save();// first goes to action pre and there encrypts the password
        // If he succeeded in encrypting - tries to insert into the database

        //return the user
        const token =generateToken(user);
        user.password="*****";
        return res.status(201).json({user,token});
    }
    catch(error){
        return next({message:error.message,status:409})
    }
}

exports.getAllUsers=async(req,res,next)=>{
    try{
        const users=await User.find().select('-__v');
        return res.json(users);
    }
    catch(err){
        next(err);
    }
}

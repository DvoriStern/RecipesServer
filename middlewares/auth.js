const jwt = require('jsonwebtoken');

//a middleware that checks the token that comes from the client
exports.auth=(req,res,next)=>{
    try{
        const {authorization}=req.headers;//extracting the token from the header
        const[,token]=authorization.split(' ');
        const privateKey=process.env.JWT_SECRET || 'JWT_SECRET';
        const data=jwt.verify(token,privateKey);
        req.user=data;
        next();
    }
    catch(err){
        next({message:err,status:401});
    }
}

exports.authAdmin=(req,res,next)=>{
    try{
        const {authorization}=req.headers;//extracting the token from the header
        const[,token]=authorization.split(' ');
        const privateKey=process.env.JWT_SECRET || 'JWT_SECRET';
        const data=jwt.verify(token,privateKey);
        req.user=data;
        if(req.user.role==="admin")
            next();
        else{
            next({ message: 'only admin can add course', status: 403 })
        }
    }
    catch(err){
        next({message:err,status:401});
    }
}


const jwt = require('jsonwebtoken');
const { Recipe } = require('../models/recipe.model');

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

exports.authAdminOrEditorUser = async (req, res, next) => {
    try {
        const { authorization } = req.headers;//extracting the token from the header
        console.log(authorization);
        const [, token] = authorization.split(' ');
        const privateKey = process.env.JWT_SECRET || 'JWT_SECRET'; // secret string by which the token was created
        const data = jwt.verify(token, privateKey);// the data that the token contains
        req.user = data;//adding an data to the request
        let recipeId = req.params.id;
        //The recipe that requires authorization
        let recipe = await Recipe.findById(recipeId).then(r => {
            return r;
        })
        .catch(err => {
            next({ message: 'recipe not found', status: 404 })
        });

        if (data.role == "admin"||recipe && recipe.user._id.toString()===data.user_id.toString())
            next(); // moving to Route/Middlewar
        else
            next({ message: 'You are not allowed to edit this recipe', status: 403 });
    } catch (err) {
        console.log("error: "+err );
        next({ message: err, status: 401 });
    }
}

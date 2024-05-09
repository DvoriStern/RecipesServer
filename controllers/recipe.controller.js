const { default: mongoose } = require("mongoose");
const { Recipe } = require("../models/recipe.model");

exports.getAllRecipes = async (req, res, next) => {
    let { search, page, perPage } = req.query;

    search ??= '';
    page ??= 1;
    perPage ??= 8;

    try {
        const recipes = await Recipe.find({ name: new RegExp(search) })
            .select('-__v')
            .skip((page - 1) * perPage)
            .limit(perPage)
            .select('-__v');
        return res.json(recipes);
    }
    catch (err) {
        next(err);
    }
}

exports.getRecipeById = (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id))
        next({ message: 'id is not valid' })

    else {
        Recipe.findById(id, { __v: false })
            .then(c => {
                res.json(c);
            })
            .catch(err => {
                next({ message: 'recipe not found', status: 404 })
            })
    }
};

exports.getRecipesByUserId = async (req, res, next) => {
    const userid = req.params.userid;
    try {
        console.log("userid " + userid);
        if (!mongoose.Types.ObjectId.isValid(userid))
            next({ message: 'user id is not valid' })

        else {
            const recipes = await Recipe.find({ "user._id": userid }).select('-__v');
            return res.json(recipes);
        }
    }
    catch (error) {
        next(error);
    }


}

exports.getRecipeByPreparationTime = async (req, res, next) => {
    const preparationTime = req.params.prepTime;
    try {
        const recipes = await Recipe.find({ "preparationTime": preparationTime })
            .select('-__v');
        return res.json(recipes);
    } catch (error) {
        next(error);
    }
}

exports.addRecipe = async (req, res, next) => {
    try {
        const recipe = new Recipe(req.body);
        await recipe.save();
        return res.status(201).json(recipe);
    } catch (error) {
        next(error);
    }
}

exports.updateRecipe=async(req,res,next)=>{
    const id=req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id))
        next({ message: 'id is not valid' })
    try{
        const recipe=await Recipe.findByIdAndUpdate(id,
            {$set:req.body},
            {new:true}
        )
        return res.json(recipe);
    }catch (error) {
        next(error);
    }
}

exports.deleteRecipe=async(req,res,next)=>{
    const id=req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        next({ message: 'id is not valid' })
    else{
        try{
            if(!(await Recipe.findById(id)))
                return next({message:"recipe not found!",status:404});
            await Recipe.findByIdAndDelete(id);
            return res.status(204).send();
        } catch (error) {
            return next(error)
        }
    }
};

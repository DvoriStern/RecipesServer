const { Category } = require("../models/category.model");

exports.getAllCategories=async(req,res,next)=>{
    try {
        const categories = await Category.find()
            .select('-__v -recipes');
        return res.json(categories);
    }
    catch (err) {
        next(err);
    }
}
exports.getAllCategoriesRecipes=async(req,res,next)=>{
    try {
        const categories = await Category.find()
            .select('-__v');
        return res.json(categories);
    }
    catch (err) {
        next(err);
    }
}

exports.getCategoryById=async(req,res,next)=>{
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        next({ message: 'id is not valid' })

    else {
        Category.findById(id, { __v: false })
            .then(c => {
                res.json(c);
            })
            .catch(err => {
                next({ message: 'category not found', status: 404 })
            })
    }
}
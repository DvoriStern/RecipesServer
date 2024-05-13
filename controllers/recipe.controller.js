const { default: mongoose } = require("mongoose");
const { Recipe } = require("../models/recipe.model");
const { Category } = require("../models/category.model");
const { User} = require("../models/user.model");


exports.getAllRecipes = async (req, res, next) => {
    let { search, page, perPage } = req.query;

    search ??= '';
    page ??= 1;
    perPage ??= 8;

    try {
        const recipes = await Recipe.find({ name: new RegExp(search), isPrivate: false })
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
            .then(r => {
                res.json(r);
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
        if (!req.user.user_id == userid)
            next({ message: 'forbidden—you don\'t have permission to access this resource', status: 403 });
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
        const recipes = await Recipe.find({ preparationTime: { $lte: preparationTime }, isPrivate: false })
            .select('-__v');
        return res.json(recipes);
    } catch (error) {
        next(error);
    }
}
// exports.addRecipe = async (req, res, next) => {
//     try {
//         const r = new Recipe(req.body);
//         await r.save(); // מנסה לשמור במסד נתונים
//         //מעבר על רשימת הקטגוריות
//         r.categories.forEach(async c => {
//             // בדיקה על כל קטגוריה האם קיימת כבר
//             let category = await Category.findOne({ name: c })
//             // במידה ולא מוסיף קטגוריה
//             if (!category) {
//                 try {
//                     const newCategory = new Category({ name: c, recipes: [] });
//                     await newCategory.save(); // מנסה לשמור במסד נתונים
//                     category = newCategory;
//                 } catch (err) {
//                     next(err);
//                 }

//             }
//             //מוסיף את המתכון לרשימת מתכונים של הקטגוריה
//             category.recipes.push({ _id: r._id, name: r.name })
//             await category.save(); // מנסה לשמור במסד נתונים

//         });
//         return res.status(201).json(r); // כאן יהיו כל הנתונים של האוביקט שנשמר במ"נ
//     } catch (err) {
//         next(err);
//     }

// }
exports.addRecipe = async (req, res, next) => {
    try {

        const user = await User.findById(req.user.user_id);
        const recipe = new Recipe(req.body);
        recipe.user = { _id: user._id, name: user.username };
        recipe.dateAdded=new Date();
        await recipe.save();
        recipe.categorynames.forEach(async cname => {
            let category = await Category.findOne({ name: cname });
            if (!category) {
                try {
                    const newCategory = new Category({ name: cname, recipes: [] });
                    await newCategory.save();
                    category = newCategory;
                } catch (err) {
                    next(err);
                }
            }
            category.recipes.push({ _id: recipe._id, name: recipe.name })
            await category.save();
        });

        return res.status(201).json(recipe);


    } catch (error) {
        next(error);
    }
}

exports.updateRecipe = async (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        next({ message: 'id is not valid' })
    try {
        const recipe = await Recipe.findByIdAndUpdate(id,
            { $set: req.body },
            { new: true }
        )
        return res.json(recipe);
    }
    catch (error) {
        next(error);
    }

}


exports.deleteRecipe = async (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        next({ message: 'id is not valid' })
    else {
        try {
            if (!(await Recipe.findById(id)))
                return next({ message: "recipe not found!", status: 404 });
            await Recipe.findByIdAndDelete(id);
            return res.status(204).send();
        } catch (error) {
            return next(error)
        }
    }
};

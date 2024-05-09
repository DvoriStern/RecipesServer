const express = require('express');
const {authAdmin, auth}=require('../middlewares/auth');
const { getAllRecipes, getRecipeById, getRecipeByPreparationTime, addRecipe, updateRecipe, deleteRecipe, getRecipesByUserId } = require('../controllers/recipe.controller');

const router=express.Router();

router.get('/',auth,getAllRecipes);

router.get('/:id',auth,getRecipeById);

router.get('/byUserId/:userid',auth,getRecipesByUserId);

router.get('/byPrepTime/:prepTime',auth,getRecipeByPreparationTime)

router.post('/',auth,addRecipe);

router.put('/:id',auth,updateRecipe);

router.delete('/:id',auth,deleteRecipe);

module.exports = router;
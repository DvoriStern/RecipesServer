const express = require('express');
const {authAdmin, auth, authAdminOrEditorUser}=require('../middlewares/auth');
const { getAllRecipes, getRecipeById, getRecipeByPreparationTime, addRecipe, updateRecipe, deleteRecipe, getRecipesByUserId } = require('../controllers/recipe.controller');

const router=express.Router();

router.get('/',getAllRecipes);

router.get('/:id',getRecipeById);

router.get('/byUserId/:userid',auth,getRecipesByUserId);

router.get('/byPrepTime/:prepTime',getRecipeByPreparationTime)

router.post('/',auth,addRecipe);

router.put('/:id',auth,authAdminOrEditorUser,updateRecipe);

router.delete('/:id',auth,authAdminOrEditorUser,deleteRecipe);

module.exports = router;
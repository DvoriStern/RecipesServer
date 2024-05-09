const express = require('express');
const {authAdmin, auth, authAdminOrEditorUser}=require('../middlewares/auth');
const { getAllRecipes, getRecipeById, getRecipeByPreparationTime, addRecipe, updateRecipe, deleteRecipe, getRecipesByUserId } = require('../controllers/recipe.controller');

const router=express.Router();

router.get('/',getAllRecipes);

router.get('/:id',getRecipeById);

router.get('/byUserId/:userid',getRecipesByUserId);

router.get('/byPrepTime/:prepTime',getRecipeByPreparationTime)

router.post('/',auth,addRecipe);

router.put('/:id',authAdminOrEditorUser,updateRecipe);

router.delete('/:id',authAdminOrEditorUser,deleteRecipe);

module.exports = router;
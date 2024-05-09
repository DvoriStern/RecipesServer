const express = require('express');
const { getAllCategories, getAllCategoriesRecipes, getCategoryById } = require('../controllers/category.controller');

const router=express.Router();

router.get('/',getAllCategories);

router.get('/getAllCategoriesRecipes',getAllCategoriesRecipes);

router.get(':id',getCategoryById);


module.exports = router;
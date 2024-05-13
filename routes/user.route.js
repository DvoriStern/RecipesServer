const express = require('express');
const { signIn, signUp, getAllUsers } = require('../controllers/user.controller');
const {authAdmin, auth}=require('../middlewares/auth');

const router=express.Router();

router.post('/signin',signIn);

router.post('/signup',signUp);

router.get('/',auth,authAdmin,getAllUsers);

module.exports = router;
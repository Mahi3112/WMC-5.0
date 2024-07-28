const express=require('express');
const { jwtAuthMiddleware } = require('./../jwt.js');
const router = express.Router();
const {login,signup,changepassword,getprofile,logout}=require('../controllers/UserController.js')

router.get('/getprofile/:id',getprofile)
router.post('/login',login)
router.post('/signup',signup)

router.put('/changepassword/:id',jwtAuthMiddleware,changepassword)
router.post('/logout', logout); 

module.exports=router;
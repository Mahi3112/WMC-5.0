const express=require('express');
const { jwtAuthMiddleware } = require('./../jwt.js');
const router = express.Router();
const {login,signup,changepassword,getprofile}=require('../controllers/UserController.js')

router.get('/getprofile',jwtAuthMiddleware,getprofile)
router.post('/login',login)
router.post('/signup',signup)

router.put('/changepassword/:id',jwtAuthMiddleware,changepassword)
module.exports=router;
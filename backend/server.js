const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const passport = require('./auth.js');
const databaseConnection = require('./db.js');
const UserRoutes=require('./routes/UserRoutes.js')
const eventRoutes=require('./routes/EventRoute.js')

// //Connect database
databaseConnection();

dotenv.config({
    path:".env"
})

const app=express();

// // body-parser is also a middleware
app.use(bodyParser.json());

//Middleware 
const logRequest=(req,res,next)=>{
    console.log(`${new Date().toLocaleString()} Request made to :${req.originalUrl}`);
    next();
}
app.use(logRequest);

//Authentication
app.use(passport.initialize());
const localAuthMiddleware=passport.authenticate('local',{session:false})

// //Use routers
app.use('/user',UserRoutes);
app.use('/events', eventRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`Server listen at port ${process.env.PORT}`);
})

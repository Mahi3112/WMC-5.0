const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const passport = require('./auth.js');
const databaseConnection = require('./db.js');
const UserRoutes=require('./routes/UserRoutes.js')
const eventRoutes=require('./routes/EventRoute.js')
const MemberRegisterRoute=require('./routes/MemberRegisterRoute.js');
const Membership=require('./routes/AdminMembershipRoute.js');
const UserMembership=require('./routes/UserMembershipRoute.js');
const Feedback=require('./routes/StoryRoute.js');
const Donation=require('./routes/DonationRoute.js');
const cors = require('cors');
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


app.use(cors({
    origin: 'http://localhost:3000', // Allow your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow the HTTP methods you need
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow headers you need
  }));

// //Use routers
app.use('/user',UserRoutes);
app.use('/events', eventRoutes);
app.use('/registerforevent',MemberRegisterRoute);
app.use('/membership',Membership);
app.use('/usermembership',UserMembership);
app.use('/feedback',Feedback);
app.use('/donation',Donation);

app.listen(process.env.PORT,()=>{
    console.log(`Server listen at port ${process.env.PORT}`);
})

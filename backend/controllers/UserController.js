const bcrypt = require('bcrypt');
const User = require('./../models/UserModel.js');


const { generateToken } = require('./../jwt.js');

//Only one admin function
const oneadmin = async () => {
    try {
        const admin = await User.findOne({ role: 'admin' });
        if (admin) {
            return false;
        } else {
            return true;
        }
    } catch (error) {
        console.error('Error checking admin existence:', error);
        return false;
    }
};



// //Singup Route
// const signup = async (req, res) => {
//     try {
//         const isAdminAllowed = await oneadmin();
//         if (!isAdminAllowed && req.body.role === 'admin') {
//             return res.status(400).json({ message: 'Admin already exists' });
//         }

//         const { username, email, password ,role} = req.body;

//         // Check if user with the same username or email already exists
//         const existingUser = await User.findOne({
//             $or: [
//                 { username: username }, 
//                 { email: email }
//             ]
//         });

//         if (existingUser) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         // Hash the provided password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Check if any user has the same hashed password
//         const users = await User.find();
//         for (let user of users) {
//             const isMatch = await bcrypt.compare(password, user.password);
//             if (isMatch) {
//                 return res.status(400).json({ message: 'Password already taken' });
//             }
//         }

//         // Create new user document 
//         const newUser = new User({
//             ...req.body,
//             password: hashedPassword // Save the hashed password
//         });

//         // Save new user to database
//         const response = await newUser.save();
//         console.log('data saved');

//         const payload = {
//             id: response.id,
//         };

//         console.log(JSON.stringify(payload));
//         const token = generateToken(payload);
//         console.log("Token is ", token);

//         res.status(200).json({ response: response, token: token });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };
// //Login Route
// const login = async (req, res) => {
//     try {
//         const { username, password } = req.body;

//         console.log('Attempting login for username:', username);

//         // Find user by username
//         const user = await User.findOne({ username: username });

//         if (!user) {
//             console.log('User not found for username:', username);
//             return res.status(401).json({ error: 'Invalid username or password' });
//         }

//         console.log('User found:', user);

//         // console.log('Provided password:', password);
//         // console.log('Stored hashed password:', user.password);

//         // // Correctly compare provided password with stored hashed password
//         // const isMatch = await user.comparePassword(password, user.password);

//         // if (!isMatch) {
//         //     console.log('Password does not match for username:', username);
//         //     return res.status(401).json({ error: 'Invalid username or password' });
//         // }

//         // console.log('Password matches for username:', username);

//         // Generate token
//         const payload = {
//             id: user.id,
//         };
//         const token = generateToken(payload);

//         console.log('Login successful for username:', username);

//         // Return token as response
//         res.status(200).json({ token });
//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };


// Signup Route
const signup = async (req, res) => {
    try {
        const isAdminAllowed = await oneadmin();
        if (!isAdminAllowed && req.body.role === 'admin') {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const { username, email, password, role } = req.body;

        // Hash the provided password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user document 
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role // Save the role
        });

        // Save new user to database
        const response = await newUser.save();

        // Generate token with user ID and role
        const payload = {
            id: response.id,
            role: response.role // Ensure role is included
        };
        const token = generateToken(payload);

        res.status(200).json({ response, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Login Route
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        console.log('Attempting login for username:', username);

        // Find user by username
        const user = await User.findOne({ username });

        console.log('User Found:', user);

        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Compare provided password with stored hashed password
        // const isMatch = await bcrypt.compare(password, user.password);
        // console.log('Provided Password:', password);
        // console.log('Stored Hashed Password:', user.password);
        // console.log('Password Match:', isMatch);

        // if (!isMatch) {
        //     return res.status(401).json({ error: 'Invalid username or password' });
        // }

        // Generate token with user ID and role
        const payload = {
            id: user.id,
            role: user.role // Ensure role is included
        };
        const token = generateToken(payload);
        console.log('Generated Token:', token);

        // Prepare user data for response
        const userData = {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        };

        // Include virtual currency only if the user is a member
        if (user.role === 'member') {
            userData.virtualCurrency = user.virtualCurrency;
        }

        res.status(200).json({
            token,
            user: userData
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



//Profile Route
const getprofile=async(req,res)=>{
    try {
        const userData=req.user;

        const userId=userData.id;
        const user=await User.findById(userId);

        res.status(200).json({user});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal Server Error'});
    }
};

//Change password Route
const changepassword=async(req,res)=>{
    try {
        //Extract id from token
        const userId=req.user.id
        const{currentPassword,newPassword}=req.body
        //Find the user by userid
        const user=await User.findById(userId);
        //If password does not match,return error
        if(!(await user.comparePassword(password))){
            return res.status(401).json({
                error:'Invalid password'
            });
        }
        //Update password
        user.password=newPassword;
        await user.save();
        console.log('Password updated');
        res.status(200).json({message:'Password updated'});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal Server Error'});
    }
};

module.exports={login,signup,changepassword,getprofile}
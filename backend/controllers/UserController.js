const bcrypt = require('bcrypt');
const User = require('./../models/UserModel.js');


const Donation=require('./../models/DonationModel.js');
const { generateToken } = require('./../jwt.js');

const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, './../uploads')); // Adjust the directory as needed
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to filename
    }
});

const upload = multer({ storage: storage });

// Controller function for uploading profile image
const uploadProfileImage = async (req, res) => {
    try {
        const userId = req.params.id; // Assuming user ID is passed as a URL parameter
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const relativePath = `/uploads/${req.file.filename}`; // Save the relative path to the user's profileImage field
        user.profileImage = relativePath;
        await user.save();

        res.status(200).json({ message: 'Profile image uploaded successfully', profileImage: relativePath });
    } catch (error) {
        console.error('Error uploading profile image:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


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

        
        const payload = {
            id: user.id,
            role: user.role, // Ensure role is included
            username:user.username
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
const getprofile = async (req, res) => {
    try {
        const userId = req.params.id; // Correctly get userId from request parameters
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const user = await User.findById(userId).populate('registeredEvents');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch total donations
        const totalDonations = await getTotalDonationsByUserId(userId);

        // Respond with user data including total donations
        res.status(200).json({ ...user.toObject(), totalDonations });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

// Function to get total donations by user ID
const getTotalDonationsByUserId = async (userId) => {
    try {
        const donations = await Donation.find({ user: userId });
        const totalDonations = donations.reduce((total, donation) => total + donation.amount, 0);
        return totalDonations;
    } catch (error) {
        console.error("Error fetching donations:", error);
        return 0; // Return 0 if there's an error fetching donations
    }
};
const getDonationsByDate = async (req, res) => {
    try {
        const donations = await Donation.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    totalAmount: { $sum: "$amount" },
                    donations: { $push: "$$ROOT" }
                }
            },
            { $sort: { _id: 1 } } // Sort by date
        ]);

        res.status(200).json(donations);
    } catch (error) {
        console.error('Error fetching donations by date:', error);
        res.status(500).json({ error: 'Internal Server Error' });
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

const logout = (req, res) => {
    try {
      console.log("Logout function called");
  
      // Clear the token cookie
      res.clearCookie('token'); // Adjust if your token cookie name is different
      console.log("Cookie cleared");
  
      res.status(200).json({ message: 'Logout successful' });
      console.log("Response sent");
    } catch (error) {
      console.error("Error during logout:", error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  

module.exports={login,signup,changepassword,getprofile,logout,getDonationsByDate,upload, uploadProfileImage}
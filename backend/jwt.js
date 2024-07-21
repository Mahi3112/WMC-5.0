const jwt =require("jsonwebtoken");

// const jwtAuthMiddleware=(req,res,next)=>{
//     //First check request headers has authorization or not

//     const authorization=req.headers.authorization
//     if(!authorization) return res.status(401).json({error:'Token not found'});

//     //Extract jwt token from request headers

//     const token=req.headers.authorization.split(' ')[1];
    
//     if(!token) return res.status(401).json({error:'Unauthorized'});
//     try {
//         //Verify jwt token
//         const decoded=jwt.verify(token,process.env.JWT_SECRET);
//         //Attach user info to request object
//         req.user=decoded
//         next();
//     } catch (error) {
//         console.log(error);
//         res.status(401).json({error:'Invalid token'});
//     }
// }

//Function to generate token

const jwtAuthMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) return res.status(401).json({ error: 'Token not found' });

    const token = authorization.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded JWT:', decoded); // Debugging line
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Invalid token' });
    }
};



const generateToken = (userData) => {
    // Ensure that `role` is included in the token payload
    return jwt.sign({
        id: userData.id,
        role: userData.role // Ensure role is included
    }, process.env.JWT_SECRET);
};

module.exports={jwtAuthMiddleware,generateToken}

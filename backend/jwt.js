const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) return res.status(401).json({ error: 'Token not found' });

    const token = authorization.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("JWT verification error:", error);
        res.status(401).json({ error: 'Invalid token' });
    }
};




const generateToken = (userData) => {
    return jwt.sign({
        id: userData.id,
        username: userData.username, 
        role: userData.role
    }, process.env.JWT_SECRET);
};


module.exports = { jwtAuthMiddleware, generateToken };

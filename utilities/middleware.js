const jwtUtils = require('./jwtUtil');

const jwtUtil = new jwtUtils();

const authMiddleware = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.sendStatus(403); // Forbidden
    }

    try {
        const isValid = await jwtUtil.validToken(token);
        if (isValid) {
            req.name = jwtUtil.extractUserName(token); // Attach user information to the request
            next(); // Proceed to the next middleware or route handler
        } else {
            return res.sendStatus(403); // Forbidden if token is invalid
        }
    } catch (err) {
        console.error('Error validating token:', err);
        return res.sendStatus(403); // Handle any unexpected errors
    }
};

module.exports = authMiddleware;

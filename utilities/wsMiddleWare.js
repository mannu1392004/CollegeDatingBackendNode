const jwtUtils = require('./jwtUtil');

const jwtUtil = new jwtUtils();


const wsAuthMiddleware= async (ws, req)=> {
    return new Promise((resolve, reject) => {

        const token = req.headers['authorization']?.split(' ')[1];


        if (!token) {
            ws.close(1008, 'Token not provided'); // 1008 is policy violation close code
            return reject('Token not provided');
        }


        jwtUtil.validToken(token).then(isValid => {
            if (isValid) {
                req.name = jwtUtil.extractUserName(token);
                resolve(true);
            } else {
                ws.close(1008, 'Invalid token');
                reject('Invalid token');
            }
        }).catch(err => {
            ws.close(1008, 'Token validation error');
            reject(err);
        });
    });
}

module.exports = wsAuthMiddleware;
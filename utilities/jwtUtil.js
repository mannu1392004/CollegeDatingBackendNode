const jwt = require('jsonwebtoken');

class JwtUtil {

    // Use a strong secret key for signing the JWT
    #secretKey = 'EC1CCBB9B06B54604E80074BC4BF4BACB9FAC81E123';

    #extractClaims(token) {
        try {
            return jwt.verify(token, this.#secretKey, { algorithms: ['HS256'] });
        } catch (err) {
            throw new Error('Invalid token');
        }
    }

    extractUserName(token) {
        const claims = this.#extractClaims(token);
        return claims.sub;
    }

    // Private method
    #isTokenExpired(token) {
        try {
            const claims = this.#extractClaims(token);
            const now = Math.floor(Date.now() / 1000);
            return claims.exp <= now;
        } catch (err) {
            return true; // If token is invalid or expired
        }
    }

    generateAccessToken(userName) {
        const now = Date.now();


        return jwt.sign(
            { sub: userName, iat: Math.floor(now / 1000) },
            this.#secretKey,
            {
                expiresIn: '24h',
                issuer: 'a',   // Make sure this is properly set
                algorithm: 'HS256'
            }
        );
    }


    async validToken(token) {
        try {
            const claims = this.#extractClaims(token);
            const iss = claims.iss; // Correctly accessing the 'issuer'



            if (iss === 'a') {
                console.log('Valid token');
                return !this.#isTokenExpired(token);
            } else {
                return false;
            }

        } catch (err) {
            console.error(err);
            return false;
        }
    }

}


module.exports = JwtUtil;

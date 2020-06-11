const jwt = require('jsonwebtoken')
const config = require('./config/keys');


/* https://stackabuse.com/authentication-and-authorization-with-jwts-in-express-js/ */

//Maak token gelinkt aan user, token blijft voor 48h
const getToken = (user) => {
    return jwt.sign({
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        isAdmin: user.isAdmin,
    }, config.JWT_SECRET, {
        expiresIn: '48h'
    })

}

//Login wanneer een token available is, hou 7 unique digits over van het token,
//zend error wanneer token invalid is of wanneer token niet bestaat
const isAuth = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        const onlyToken = token.slice(7, token.length);
        jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({ msg: 'Invalid token' });
            }
            req.user = decode;
            next();
            return

        })
        console.log(onlyToken)
    } else {
        return res.status(401).send({ msg: 'Token does not exist.' })
    }
}



//Check of de user admin is
const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        return next();
    } else {
        return res.status(401).send({ msg: 'Admin Token is not valid.' })
    }

}

module.exports = {
    isAdmin,
    isAuth,
    getToken
}


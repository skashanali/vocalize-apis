var config = require ('../../config/env');
var  jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var bcrypt = require('bcrypt');

const db = require('../../config/db.config');
const User = db.User;

var validateJwt = expressJwt({
    secret: config.secrets.session
});

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
exports.isAuthenticated = () => {
    return compose()
        // Validate jwt
        .use(function(req, res, next) {
            // allow access_token to be passed through query parameter as well
            if(req.query && req.query.hasOwnProperty('access_token')) {
                req.headers.authorization = `Bearer ${req.query.access_token}`;
            }
            // IE11 forgets to set Authorization header sometimes. Pull from cookie instead.
            if(req.query && typeof req.headers.authorization === 'undefined') {
                req.headers.authorization = `Bearer ${req.cookies.token}`;
            }
            validateJwt(req, res, next);
        })
        // Attach user to request
        .use(function(req, res, next) {
            User.find({
                where: {
                    id: req.user.id
                }
            })
                .then(user => {
                    if(!user) {
                        return res.status(401).end();
                    }
                    req.user = user;
                    next();
                    return null;
                })
                .catch(err => next(err));
        });
}


// Checks if the user role meets the minimum requirements of the route
exports.hasRole = (roleRequired) => {
    if(!roleRequired) {
        throw new Error('Required role needs to be set');
    }
    return compose()
        .use(isAuthenticated())
        .use(function meetsRequirements(req, res, next) {
            if(config.userRoles.indexOf(req.user.role) === config.userRoles.indexOf(roleRequired)) {
                return next();
            } else {
                return res.status(403).send('Forbidden');
            }
        });
}


// Returns a jwt token signed by the app secret
exports.signToken = (id, role) => {
    return jwt.sign({ id: id, role }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
    });
}

// Authenticate user given password
exports.authenticate = (pwd, dbPwd) => {
    return bcrypt.compareSync(pwd, dbPwd);
}


const jwt = require('jsonwebtoken');

const middlewareController =
{
    //verifytoken
    verifyToken: (req, res, next) => {
        const token = req.headers['x-access-token'] || req.headers['authorization']; 
        if (token) {
            //Bearer 
            const accessToken = token.split(' ')[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) {
                    return res.status(403).json('Token is not valid');
                }
                req.user = user;
                next();
            });
        }
        else {
            return res.status(401).json('You are not authenticated')
        }
    },
    verifyTokenAndAdminAuth: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.user.id == req.body._id || req.user.role =="Admin" || req.user.role =="Sales") {
                next();
            }
            else {
                return res.status(403).json('You are not allowed to permission');
            }
        });
    }
}
module.exports = middlewareController;
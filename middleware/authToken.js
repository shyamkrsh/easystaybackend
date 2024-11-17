const jwt = require("jsonwebtoken");


async function authToken(req, res, next) {
    try {

        const token = req.cookies?.token ;
        if (!token) {
            throw new Error("User not login")
        }
        jwt.verify(token, 'mysecret', function (err, decoded) {
            if(err){
                console.log("Error auth", err);
            }
            req.userId= decoded?._id;
            
            next();
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            data: [],
            error: true,
            success: false,
        })
    }
}

module.exports = authToken;

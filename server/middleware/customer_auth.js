//here "next" is used when this function execution is done..then if we want to execute the original req then we call "next"!
const jwt = require("jsonwebtoken");
function customer_auth(req,res,next)
{
    try
    {
        const token = req.cookies.token;
        //here is token value is not present in cookie, then it means nouser is loggedin..so we end the process here..of creating cusomer!
        if(!token)
        {
            res.status(401).json({errorMessage:"A User must be logged in..."});
        }

        //validating the token...
        //this func verify that "token" is been created with given password..if not it goes to catch(err)..
        //if yes..then it returns string/object..decoded paylod from it
        const verified = jwt.verify(token,process.env.JWT_TOKEN);

        //donno why i have done this...!
        // req.user = verified.user;

        next();
    }catch(err)
    {
        //here we give 401...bad request becz!..it got some error because of middleware..
        //means while checking whether a user is logged in or not
        console.log(err);
        res.status(401).json({errorMessage:"Unauthorized"});
    }
}

module.exports = customer_auth;
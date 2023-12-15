const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register!
router.post("/",async (req,res) => {
    try
    {
        const {email,password,confirmpassword} = req.body;

        //validations!
        //status 400, sending bad requests!
        if(!email || !password || !confirmpassword)
        {
            return res.status(400).json({errormessage:"Please enter all the required fields!"});
        }

        if(password.length<6)
        {
            return res.status(400).json({errormessage:"Please enter password with length greater than 6"});
        }
        
        if(password!==confirmpassword)
        {
            return res.status(400).json({errormessage:"Passowrd and confirmPassword is not matching, please verify!.."});
        }

        //checking whether already User exisits with this email in the database!
        const userNamecheck = await User.findOne({email});
        // console.log(userNamecheck);
        if(userNamecheck)
        {
            return res.status(400).json({errormessage:"Already a User exists with this emailID, please select a newone!..."});
        }

        //hashing the password!
        const hashedPassword  = await bcrypt.hash(password,10);
        
        //adding the user in the MongoDB database!
        const user = await User.create({
            email,
            password: hashedPassword
        });
        
        //deleting the password from the cache!
        delete user.password;
        
        const token = jwt.sign({
            id:user._id,
        }, process.env.JWT_TOKEN);

        //send the token in HTTP-only cookie and user detials!
        res.cookie("token",token,{
            httpOnly:true,
        }).send(user);

        // return res.status(200).json({status:true,user});
    }catch(err)
    {
        console.error(err);
        res.status(500).send();
    }
});

// //login
// router.post("/login", async (req,res) => {
//     try
//     {
//         const {username,password} = req.body;

//         //validation bad request!
//         if(!username || !password)
//         {
//             return res.status(400).json({errormessage:"Username or Password is Empty..."});
//         }

//         //checking whether user exisits with particular username!
//         const checkusername = await User.find(username);
//         if(!checkusername)
//         {
//             return res.status(400).json({errormessage:"Username or Password is wrong..."});
//         }
        
//         const password_check = await bcrypt.compare(password,checkusername.password);

//         if(!password_check)
//         {
//             return res.status(400).json({errormessage:"Username or Password is wrong..."});
//         }

//     }catch(err)
//     {
//         console.error(err);
//         res.status(500).send();
//     }
// });

module.exports = router;
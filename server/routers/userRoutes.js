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

//login
router.post("/login", async (req,res) => {
    try
    {
        const {email,password} = req.body;
        //validation bad request!
        if(!email || !password)
        {
            return res.status(400).json({errormessage:"email or Password is Empty..."});
        }

        //checking whether user exisits with particular email!
        const checkemail = await User.findOne({email});
        if(!checkemail)
        {
            return res.status(400).json({errormessage:"Email or Password is incorrect..."});
        }
        
        const password_check = await bcrypt.compare(password,checkemail.password);
        if(!password_check)
        {
            return res.status(400).json({errormessage:"email or Password is incorrect..."});
        }
        
        //here we are creating the token with unique id along with JWT Token Password!
        const token = jwt.sign(
            {
                user:checkemail._id,
            },
            process.env.JWT_TOKEN
        );

        res.cookie("token",token,{
            httpOnly:true,
        }).send(checkemail);

    }catch(err)
    {
        console.error(err);
        res.status(500).send();
    }
});

//logout!
router.get("/logout", async (req,res) => {
    try
    {   
        //here we are clearing the cookie!
        //making the value of token empty!, also showing the expires time in the past (new Date(0) in the sense it is at 1970!)
        res.cookie("token","",{
            httpOnly:true,
            expires: new Date(0)
        }).send();
    }catch(err)
    {
        console.error(err);
        res.status(500).send();
    }
});

//here we this we are already checking whether token is present in cookie or not..so that we can understand whether user is logged in!
router.get("/loggedIn",(req,res) => {
    try
    {
        const token = req.cookies.token;
        if(!token)
        {
            return res.json(false);
        }
        jwt.verify(token,process.env.JWT_TOKEN);
        return res.json(true);
    }catch(err)
    {
        return res.json(false);
    }
});

module.exports = router;
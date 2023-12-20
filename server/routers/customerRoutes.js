const router = require("express").Router();
const customer = require("../models/customerModel");

//Here, before the postrequest..we would like to execute middleware before the request..
//because we create customer only, if the user is logggedin..so before executing this "aync(req,res)" we add a middleware "auth"
//this middleware validates the cookie and checks whether a user is loggedin or not!

//this request for creating customer...
router.post("/",async (req,res) => {
    try
    {
        //if name is empty..., then we are returing with bad request error!
        const {name,email,age} = req.body;
        if(!name)
        {
            return res.status(400).json({errormessage:"Username is Empty..."});
        }
        if(!email)
        {
            return res.status(400).json({errormessage:"Email is Empty..."});
        }
        if(!age)
        {
            return res.status(400).json({errormessage:"Age is Empty..."});
        }
        //creating new_customer user and storing it in database...
        const new_customer = await customer.create({
            name:name,
            email:email,
            age:age
        });
        
        res.status(200).send(new_customer);
    }catch(err)
    {
        console.error(err);
        res.status(500).send();
    }
});

//to get all the customers...irrespective of the user!
router.get("/",async (req,res) => {
    try
    {
        const customers = await customer.find();
        return res.status(200).json(customers);
    }catch(err)
    {
        console.error(err);
        res.status(500).send();
    }
});


//delete the row...API!
router.post("/delete", async (req,res) => {

    try
    {
        const {_id} = req.body;
        const Customer_data = await customer.findByIdAndDelete({_id});
        return res.status(200).json(Customer_data);
    }catch(err)
    {
        console.error(err);
        return res.status(500).json({errormessage:"getting error, while deleting the row..."});
    }

});

module.exports = router;
//whole playlist for this project!
//https://www.youtube.com/watch?v=scYojqjnHzI&list=PLJM1tXwlGdaf57oUx0rIqSW668Rpo_7oU&index=1 
const express  = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");


//configuring .env file
dotenv.config();

//set up server
const app = express();
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

//converting any json body of apis into obj form like to use in req.body..with below middleware!
app.use(express.json());

//connect to MongoDB!
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => {
    console.log("Connected to MongoDB...");
}).catch((err) => {
    console.log(err);
});

//setup routes!
//all the request starting with /auth + routes in userRoutes!
app.use("/auth",require("./routers/userRoutes"));

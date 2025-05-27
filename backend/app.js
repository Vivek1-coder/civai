require("dotenv").config();
const express = require("express");
const app = express();
const CORS = require("cors");
const {Connect_DB} = require("./configs/DB.js");
const UserRoute = require("./Routes/UserRoute.js")

//Essential middlewares
app.use(CORS());
app.use(express.json({limit:"50kb"}));
app.use(express.urlencoded({extended:true,limit:"50kb"}));


//DB connection
Connect_DB(process.env.DBURL)
  .then(() => {
    console.log("Connected to DB successfully");
  })
  .catch((err) => {
    console.log(`Unable to connected to Database\nError is :\n ${err}`);
  });


//Routes
app.use("/user", UserRoute);


//Ruuning server
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

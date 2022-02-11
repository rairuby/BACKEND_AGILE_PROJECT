//to start a server we require express
const express = require ('express');
const cors = require ('cors');

const mongoose = require("mongoose");

// folder name and file name
require('./dbConnection/db')

// importing routes here
const userRoute = require('./routes/userRoute.js');
const songRoute = require('./routes/songRoute.js');
const favRoute = require('./routes/favoriteRoute.js');
const playlistRoute = require('./routes/playlistRoute.js');
const followRoute = require('./routes/followRoute.js');
const albumRoute = require('./routes/albumRoute.js');


const path = require("path")
const bodyParser = require("body-parser");

//call express function
const app = express()
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'files')));
app.use(bodyParser.urlencoded({extended: false}))

// Logger
app.use("/", function(req,res,next){
    console.log(req.method, req.url)
    next()
})
app.use(cors())
app.use(userRoute);
app.use(songRoute);
app.use(favRoute);
app.use(playlistRoute);
app.use(followRoute);
app.use(albumRoute);


//configuring the servers
app.listen(90,()=>{
    console.log("Server is started at: http://localhost:90/")
})
//importing express
const express = require('express')

//bulk export of the route
const router = new express.Router()

// importing require libraries/files
const bcrypt = require("bcryptjs")
// const auth = require("../middleware/auth")
const jwt = require("jsonwebtoken")
const upload = require('../middleware/fileupload')

//importing require model
const User = require('../models/userModel')

// user register
router.post('/user/register', function(req, res) {
   
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const usertype = req.body.usertype;
    console.log(req.body);
    // const userType = req.body.usertype;

    bcrypt.hash(password, 10, function(err, hashPassword) {
        const userData = new User({username:username,email:email, password:hashPassword, userType:usertype})
        userData.save()
            .then(function(result) {
                console.log(userData)
                res.status(201).json({
                    success: true,
                    message: "Registered successfully",
                    data: userData
                })
            })
            .catch(function(error) {
                res.status(500).json({
                    success: false,
                    message: "Error occur" + error
                })
            })
    })

})

//user login
router.post('/user/login', function(req, res) {

    //first we need username and password from client
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    const usertype = req.body.usertype;
    //secondly we need to check if the user name exist or not
    //select * from user where username = rashu
    User.findOne({
            email: email
        })
        .then(function(userData) {
            //all the data of rabin is now in the userData
            if (userData === null) {
                //if the data not found. The invalid User
                return res.status(403).json({
                    message: "Invalid Login credentials"
                })
            }
            //valid user
            //now compare the stored password with the given passsword

            bcrypt.compare(password, userData.password, function(err, result) {
                
                if (result === false) {
                    //if incorrect password
                
                    return res.status(403).json({
                        success: false,
                        message: "Invalid"
                    })
                }
                //both username and password is correct
                //now we need to create a token ...
                const token = jwt.sign({
                    YourId: userData._id
                }, 'anysecretkey')

                console.log("efhaf")
            
                res.status(200).json({
                    success:true,
                    message: 'Login success',
                    token: token,
        
                    userId: userData._id
                })
            })
        })
    .catch(function(error) {
                res.status(500).json({
                    success: false,
                    message: "Error occour" + error
                })
            })
})

//fetch all User list
router.get("/user/show/:id", function (req, res) {
    console.log(req.body)
    const user_id = req.params.id;
   
    User
      .findOne({ _id: user_id })
      .then(function (userdata) {
    
        res.send({ data: userdata, success: true});
      })
      .catch(function (err) {
       
        res.status(500).json({ message: err });
      });
  });


// to update user
router.put('/user/update/:id', function(req, res) {
        const id = req.params.id
        // js object de-structuring
        // const {fullname,address,phone,profilePicture} = req.body
        const username = req.body.fullname
        const email = req.body.email


        const updatedUser = User.updateOne({
                _id: id
            }, {
                fullname: fullname,
                address: address,
                phone: phone,
                email: email
            })
            .then(function() {
                res.status(201).json({
                    success: true,
                    message: "Profile updated successfully",
                    data:updatedUser
                })
            })
            .catch(function() {
                res.status(500).json({
                    success: false,
                    message: "Error occured"
                })
            })
    })

//delete user
router.delete("/user/delete/:id", function(req, res) {
        // console.log("Delete function");
        console.log(req.body);
        const id = req.params.id;
       
        User.deleteOne({
                _id: id
            })
            .then(function() {
                res.status(200).json({
                    success: true,
                    message: "User deleted successfully",
                })
            })
            .catch(function(error) {
                res.status(500).json({
                    success: false,
                    message: "Error occured" + error
                })
            });
    })

//to upload files 
router.put('/user/profile/upload/:id', upload.single('myimage'), function(req, res) {
    console.log(req.body);
    const id = req.params.id;
    const username = req.body.username;
    const email = req.body.email;
    const profile_pic = req.file.filename;    
  
    User.updateMany({
            _id: id
        },{
            username:username,
            email:email,
            profilepic: profile_pic
        })
        .then(function() {
            res.status(201).json({
                success: true,
                message: "update successfully"
            })
        })
        .catch(function() {
            res.status(500).json({
                success: false,
                message: "Error occured"
            })

         })
})

module.exports = router
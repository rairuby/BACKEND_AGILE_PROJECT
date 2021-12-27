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
const Users = require('../models/userModel')

// user register
router.post('/user/register', function(req, res) {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(password, 10, function(err, hashPassword) {
        const userData = new Users({username:username,email:email,password:hashPassword})
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

    const email = req.body.email;
    const password = req.body.password;
    //secondly we need to check if the user name exist or not
    //select * from user where username = rashu
    Users.findOne({
            email: email
        })
        .then(function(userData) {
            //all the data of rabin is now in the userData
            if (userData === null) {
                //if the data not found. The invalid users
                return res.status(403).json({
                    message: "Invalid Login credentials"
                })
            }
            //valid user
            //now compare the stored password with the given passsword

            bcrypt.compare(password, userData.password, function(err, result) {
                if (result === false) {
                    //if incorrect password
                    console.log("What sucess")
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
          
                res.status(200).json({
            
                    success:true,
                    message: 'Login success',
                    token: token,
                    data: userData,
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

//fetch all users list
router.get("/user/get", function(req, res) {
        Users.find()
            .then(function(data) {
                res.status(201).json({
                    success: true,
                    message: "All user fetch succesfully ",
                    data: data
                })
            })
            .catch(function() {
                res.status(500).json({
                    success: false,
                    message: "Error occured"
                })

            })
    });

// get user by id
router.get('/user/profile',  function(req, res) {
        const id = req.userData._id;
        Users.findById(id)
            .then(function(data) {
                res.status(200).json({
                    success: true,
                    message: "User fetch successfully",
                    data: data
                })
            })
            .catch(function(error) {
                res.status(500).json({
                    success: false,
                    message: "Error occured" + error
                })
            });
    })

// to update user
router.put('/user/update/:id', function(req, res) {
        const id = req.params.id
        // js object de-structuring
        // const {fullname,address,phone,profilePicture} = req.body
        const fullname = req.body.fullname
        const address = req.body.address
        const phone = req.body.phone
        const email = req.body.email

        const updatedUser = Users.updateOne({
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
        const id = req.params.id;
        Users.deleteOne({
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
    const id = req.params.id;
    Users.updateOne({
            _id: id
        },{
            profile: req.imageName
        })
        .then(function() {
            res.status(201).json({
                success: true,
                message: "Profile pic upload successfully"
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
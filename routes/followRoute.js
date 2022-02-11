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
const followModel = require('../models/followModel')

router.post(
    "/artist/follow",
    async (req, res) => {
      console.log("fefa");
      const userid = req.body.userid;
      const artistid = req.body.artistid;
      console.log(userid);
      console.log(req.body);
  
      try {
        const follow = await followModel.find({ userid: userid, artistid: artistid });
        console.log(follow);
        if (follow){
          console.log("alra");
            res.json({ success: false, message: "Already followed" });
        }
        else{
          console.log("hfahufh");
            const data = new followModel({userid:userid, artistid : artistid
            });
            data.save()
        .then(function (result) {
          console.log("mhsg");    
            res.status(201).json({ success: true, message: "Artist followed" });

        })
        .catch(function (err) {
          console.log(err);
            res.status(500).json({ message: err })
        })
        }
      }
    catch{

    }
    }
  );

router.get("/user/artist/follow/showall/:id",function (req, res) {
  const userid=req.params.id;

    followModel.find({userid: userid})
     .then(function (followdata) {
       console.log(followdata)
       res.send({ data: followdata, success: true });
     })
     .catch(function (err) {
       res.status(500).json({ success: false });
     });
 });

 
router.delete("/artist/unfollow/:id",function (req, res) {
  const id=req.params.id;
    followModel.deleteOne({_id: id})
     .then(function (unfollowdata) {

       res.send({ success: true });
     })
     .catch(function (err) {
       res.status(500).json({ success: false });
     });
 });
module.exports = router
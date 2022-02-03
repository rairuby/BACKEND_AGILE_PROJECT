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
const favoriteModel = require('../models/favoriteModel')

router.post(
    "/song/favorite/:id",
    async (req, res) => {
      console.log("fefa");
      const userid = req.params.id;
      const songid = req.body.songid;
      try {
        const song = await favoriteModel.findOne({ songid: songid });
        if (song){
            res.json({ success: "false", message: "Already in favorite list" });
        }
        else{
            const data = new favoriteModel({userid:userid, songid : songid
            });
            data.save()
        .then(function (result) {
            console.log('heel')
            res.status(201).json({ success: true, message: "Added to favorite list" });

        })
        .catch(function (err) {
            res.status(500).json({ message: err })
        })
        }
      }
    catch{

    }
    }
  );


router.get('/song/favorite/show/:id',  function (req, res) {
    const userid= req.params.id
    console.log(userid);
    favoriteModel.find({userid: userid})
        .then(function (data) {
            console.log("nogjisdhgu");
            console.log(data)
            res.status(201).json({ data: data, success: true });
        })
        .catch(function (err) {
            res.status(500).json({ message: err })
        })
});

router.delete('/favorite/delete/:id', function (req, res) {
    const id = req.params.id;
    favoriteModel.deleteOne({ _id: id })
        .then(function (result) {
            res.status(201).json({ message: "Song removed!", success: true });

        })
        .catch(function (err) {
            res.status(500).json({ message: err })
        })
})



module.exports = router;
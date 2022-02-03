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
const User = require('../models/followModel')

router.post(
    "/artist/follow/:id",
    async (req, res) => {
      console.log("fefa");
      const userid = req.params.id;
      const artistid = req.body.artistid;
      try {
        const song = await favoriteModel.findOne({ artistid: artistid });
        if (song){
            res.json({ success: "false", message: "Already followed" });
        }
        else{
            const data = new followModel({userid:userid, artisid : songid
            });
            data.save()
        .then(function (result) {
          
            res.status(201).json({ success: true, message: "Artist followed" });

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
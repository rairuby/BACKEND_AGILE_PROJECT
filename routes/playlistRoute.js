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
const playlist = require('../models/playlistModel')

router.post('/create/playlist', function (req, res) {
    const playlistname = req.body.playlistname;
    const userid = req.body.userid;
    const data = new playlist({playlistname:playlistname, userid : userid
     });
    data.save()
        .then(function (result) {
            res.status(201).json({ success: true, message: "Playlist Created" });

        })
        .catch(function (err) {
            res.status(500).json({ message: err })
        })
})


module.exports = router;
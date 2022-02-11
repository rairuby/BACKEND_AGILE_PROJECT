//importing express
const express = require('express');
const router = express.Router();

const fileupload = require('../middleware/fileupload');
//importing require model
const albumModel = require('../models/albumModel');

router.post('/album/upload', fileupload.array("myfile"), function (req, res) {

  const album_name = req.body.album_name;
  const album_desc = req.body.album_desc;
  const image_file = req.files[0].filename;
  var album_files = req.files.splice(1);
  console.log(album_files);
  let album_filename = [];
  album_files.forEach(element => {
    album_filename.push(element.filename);
    console.log("bnnothgi");
  });
  
  console.log(album_filename);


  const data = new albumModel({album_name:album_name, album_desc:album_desc, album_file:album_filename, album_image : image_file
   });
  data.save()
      .then(function (result) {
          res.send({ success: true, message: "album details inserted!!!" });

      })
      .catch(function (err) {
          res.status(500).json({ message: err, success: false })
      })
})

  module.exports = router;
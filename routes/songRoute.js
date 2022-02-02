const express = require('express');
const router = express.Router();
const Song = require('../models/songModel');
//const auth = require('../middleware/auth');
const fileupload = require('../middleware/fileupload');

router.post('/song/upload',  fileupload.array("myfile"), function (req, res) {
    console.log(req.files[0]);
    const song_name = req.body.song_name;
    const song_desc = req.body.song_desc;
    const song_artist = req.body.artist_name;
    console.log(req.body);
    const image_file = req.files[0].filename;
    const song_file = req.files[1].filename;
    const data = new Song({song_name:song_name, song_artist: song_artist, song_desc:song_desc, song_file:song_file, song_image : image_file,
    
     });
    data.save()
        .then(function (result) {
            res.send({ success: true, message: "Song details inserted!!!" });

        })
        .catch(function (err) {
            res.status(500).json({ message: err })
        })
})


//code to update product
router.put('/song/update/:id', fileupload.single("image"),function (req, res) {
    console.log(req.body)
    const song_id = req.params.song_id;
    const song_name = req.body.song_name;
    const song_artist = req.body.song_artist;
    const songpic = req.file.songpic;
     

    Song.updateMany({ song_id: song_id }, {song_name: song_name , song_artist: song_artist , songpic: songpic}) 
        .then(function (result) {
            res.status(201).json({ message: "Song details Updated!!!" });

        })
        .catch(function (err) {
            res.status(500).json({ message: err })
        })
})




//delete code
router.delete('/song/delete/:id', function (req, res) {
    const song_id = req.params.song_id;
    //const id = req.params.id;

    Song.deleteOne({ _id: song_id })
        .then(function (result) {
            res.status(201).json({ message: "Song deleted!!!" });

        })
        .catch(function (err) {
            res.status(500).json({ message: err })
        })
})


//display
router.get('/song/showall',  function (req, res) {
    Song.find()
        .then(function (data) {
            console.log(data)
            res.status(201).json({ data: data, success: true });
        })
        .catch(function (err) {
            res.status(500).json({ message: err })
        })
})



//single display code
router.get('/song/show/:id', function (req, res) {
    const song_id = req.params.id;
    Song.findById(song_id)
        .then(function (data) {
            console.log(data);
            res.status(200).json({data:data, success:true})
        })
        .catch(function (err) {
            res.status(500).json({})
        })
})








module.exports = router;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
  song_image: {
    type: String,
  },
  song_name: {
    type: String,
  },
  song_desc:{
    type: String,
    default:"",
  },
  song_artist: {
    type: String,
  }, 
  song_file:{
    type: String,
  }, song_lyrics:{
    type: String
  }
})


const Song = mongoose.model('Song', songSchema )
module.exports = Song;
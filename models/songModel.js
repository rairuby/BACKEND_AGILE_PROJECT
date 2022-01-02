const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
  song_id: {
    type: String,
  },
  songpic: {
    type: String,
  },
  song_name: {
    type: String,
  },
  song_artist: {
    type: String,
  }
})


const Song = mongoose.model('Song', songSchema )
module.exports = Song;
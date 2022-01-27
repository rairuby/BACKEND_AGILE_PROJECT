const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  userid: {
    type: String,
  },
  playlistname:{
    type: String
  },
  song_id: {
    type: String,
    default: null
  }
 
});

const playlistModel = mongoose.model("playlist_table", playlistSchema);

module.exports = playlistModel;

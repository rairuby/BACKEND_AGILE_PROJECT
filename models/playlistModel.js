const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  userid: {
    type: String,
  },
  playlistname:{
    type: String
  },
  song_id: {
    type: String

  }
 
});

const playlistModel = mongoose.model("playlist_table", playlistSchema);

module.exports = playlistModel;

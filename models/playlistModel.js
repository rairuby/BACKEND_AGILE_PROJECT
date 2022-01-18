const mongoose = require("mongoose");

const favSchema = new mongoose.Schema({
  User_ID: {
    type: String,
  },
  song: [
    {
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
      },
    
    },
  ]
 
});

const favaorites = mongoose.model("favorite_table", subSchema);

module.exports = favorites;

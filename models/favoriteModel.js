const mongoose = require("mongoose");

const favSchema = new mongoose.Schema({
  userid: {
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

const favoritesModel = mongoose.model("favorite_table", favSchema);

module.exports = favoritesModel;

const mongoose = require("mongoose");

const favSchema = new mongoose.Schema({
  userid: {
    type: String,
  },
  songid:{
    type:String,
  }
 
});

const favoritesModel = mongoose.model("favorite_table", favSchema);

module.exports = favoritesModel;

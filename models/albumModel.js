const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
  album_name:{
    type: String
  },
  album_desc:{
    type: String
  },
  album_image:{
    type: String
  },
  album_file:[],
});

const albumModel = mongoose.model("album_table", albumSchema);

module.exports = albumModel;
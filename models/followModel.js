const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
  artistid: {
    type: String,
  },
  userid:{
    type:String,
  }
 
});

const followModel = mongoose.model("follow_table", followSchema);

module.exports = followModel;

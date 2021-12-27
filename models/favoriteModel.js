const mongoose = require("mongoose");

const subSchema = new mongoose.Schema({
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

const subscriptions = mongoose.model("Subscription_table", subSchema);

module.exports = subscriptions;

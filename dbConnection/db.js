const mongoose = require ('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/Dhun',{
    useNewUrlParser: true,
    useUnifiedTopology : true
})

const mongoose  = require('mongoose');
const carSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    likes: {type: Number, default: 0}
});

const Car       = mongoose.model("Car", carSchema);
module.exports  = Car;
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const car       = new Schema({
    name: String,
    price: Number,
    likes: Number
});

module.exports = mongoose.model('Car', car);
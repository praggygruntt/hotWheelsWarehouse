const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
const ObjectId  = mongoose.Schema.Types.ObjectId;

const wishList = new Schema({
    title: {type: String, default: "My Wishlist"},
    cars: [{type: ObjectId, ref: "Car"}]
});

module.exports = mongoose.model("Wishlist", wishList);
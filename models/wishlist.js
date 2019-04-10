const mongoose  = require('mongoose');
const ObjectId  = mongoose.Schema.Types.ObjectId;

const wishListSchema = mongoose.Schema({
    title: {type: String, default: "My Wishlist"},
    cars: [{type: ObjectId, ref: "Car"}]
});
const WishList = mongoose.model("Wishlist", wishListSchema);

module.exports = WishList;
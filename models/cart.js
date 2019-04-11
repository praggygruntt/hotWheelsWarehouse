const mongoose  = require('mongoose');
const ObjectId    = mongoose.Schema.Types.ObjectId;

const cartSchema = new mongoose.Schema({
    cars: [{type: ObjectId, ref: "Car"}]
});

const Cart      = mongoose.model("Cart", cartSchema);
module.exports  = Cart;
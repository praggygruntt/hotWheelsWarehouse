const mongoose  = require('mongoose');
const ObjectID  = mongoose.Schema.Types.ObjectId;

const cartSchema = new mongoose.Schema({
    cars: [{type: ObjectID, ref: "Car"}]
});

const Cart      = mongoose.model("Cart", cartSchema);
module.exports  = Cart;
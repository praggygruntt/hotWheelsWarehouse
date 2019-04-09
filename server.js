// Module Imports
const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');
const Car           = require('./models/cars');
const WishList      = require('./models/wishlist');

// Database Creation
const db = mongoose.connect('mongodb://localhost/hotWheelsWarehouse');

// Middlware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Server Start
app.listen(3000, function() {
    console.log("Hot Wheels Warehouse running on Port 3000...");
})
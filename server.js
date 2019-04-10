// Module Imports
const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');
const Car           = require('./models/cars');
const WishList      = require('./models/wishlist');

// Database Creation
const db = mongoose.connect('mongodb://localhost/hotWheelsWarehouse');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Routes ============================================
// Get Full List of Products (Index Route)
app.get('/cars', function(req, res) {
    Car.find({}, function(err, returnedCars) {
        if (err) {
            res.status(500).send("Internal Server Error")
        } else {
            res.status(200).send(returnedCars);
        };
    });
});

// Post a New Car to the Database(and return newly saved Car)  
app.post('/cars', function(req, res) {
    let newCar = new Car();
    newCar.name = req.body.name;
    newCar.price = req.body.price;
    newCar.image = req.body.image;
    newCar.save(function(err, newlySavedCar) {
        if(err) {
            res.status(500).send({error: "Could not save new car."})
        } else {
            res.status(200).send(newlySavedCar);
        }
    })
})



// Server Start
app.listen(3000, function() {
    console.log("Hot Wheels Warehouse running on Port 3000...");
})
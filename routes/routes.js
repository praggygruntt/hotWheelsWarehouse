// Module Imports
const express       = require('express');
const router        = express.Router();
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');

// Database Creation
const db = mongoose.connect('mongodb://localhost/hotWheelsWarehouse');

// Model Imports
const Car           = require('../models/cars');
const WishList      = require('../models/wishlist');

// Middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

// Routes =======================================================================================================

// LANDING PAGE
router.get('/', function(req, res) {
    res.send("Welcome to the Hot Wheels Warehouse!");
});

// GET FULL LIST OF CARS
router.get('/cars', function(req, res) {
    Car.find({}, function(err, returnedCars) {
        if (err) {
            res.status(500).send({error: "Internal Server Error"})
        } else {
            res.status(200).send(returnedCars);
        };
    });
});

// GET FULL LIST OF WISHLISTS
router.get("/wishlists", function(req, res) {
    WishList.find({}).populate('cars').exec(function(err, foundWishLists) {
        if(err) {
            res.status(500).send("Could not find Wishlists")
        } else {
            res.status(200).send(foundWishLists);
        }
    })});  

// CREATE A NEW WISHLIST
router.post('/wishlists', function(req, res) {
    let wishList = new WishList();
    wishList.title = req.body.title;

    wishList.save(function(err, newWishList) {
        if(err) {
            res.status(500).send({error: "Could not create new WishList"})
        } else {
            res.status(200).send(newWishList);
        };
    });
});

// ADD CAR TO A WISHLIST
router.put('/wishlists/car/add', function(req, res) {
    Car.findById(req.body.carID, function(err, foundCar) {
        if(err) {
            res.status(500).send({error: "Could not find a Car with that ID"});
        } else {
            WishList.findByIdAndUpdate(req.body.wishListID, {$addToSet:{cars: foundCar._id}}, function(err, wishList) {
                if(err) {
                    res.status(500).send({error: "Could not add item to WishList"})
                } else {
                    res.send(wishList);
                }
            })
        }
    });
});

// ADD NEW CAR TO DATABASE
router.post('/cars', function(req, res) {
    let newCar = new Car();
    newCar.name = req.body.name;
    newCar.price = req.body.price;
    newCar.image = req.body.image;
    newCar.save(function(err, newlySavedCar) {
        if(err) {
            res.status(500).send({error: "Could not save new car."})
        } else {
            res.status(200).send(newlySavedCar);
        };
    });
});

// Export
module.exports = router;
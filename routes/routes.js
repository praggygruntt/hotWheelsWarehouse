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
const Cart          = require('../models/cart');

// Middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

// Routes =======================================================================================================

// LANDING PAGE
router.get('/', function(req, res) {
    res.send("Welcome to the Hot Wheels Warehouse!");
});

// **** CARS *****

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

// DELETE CAR FROM DATABASE
router.delete('/cars/delete', function(req, res) {
    Car.findByIdAndDelete(req.body.carID, function(err) {
        if(err) {
            res.status(500).send("Could not delete Car at this time")
        } else {
            res.status(200).send("Car deleted.")
        };
    });
})


// ***** WISHLISTS *****

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

// DELETE WISHLIST
router.delete('/wishlists/delete', function(req, res) {
    WishList.findByIdAndDelete(req.body.wishListID, function(err) {
        if(err) {
            res.status(500).send("Could not delete Wishlist at this time")
        } else {
            res.status(200).send("Wishlist deleted.")
        };
    });
});

// ADD CAR TO A WISHLIST
router.put('/wishlists/cars/add', function(req, res) {
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

// DELETE CAR FROM WISHLIST
router.delete("/wishlists/cars/delete", function(req, res) {
    WishList.findByIdAndUpdate(req.body.wishListID, {$pull: {cars: req.body.carID}}, function(err, updatedWishlist) {
        if(err) {
            res.status(500).send("Could not remove car from Wishlist")
        } else {
            res.status(200).send(updatedWishlist);
        }
    });
});

// ***** CART *****

// GET CART
router.get('/cart', function(req, res) {
    Cart.find({}).populate('cars').exec(function(err, foundCarts) {
        if(err) {
            res.status(500).send("Could not find Cart");
        } else {
            res.status(200).send(foundCarts);
        };
    });
});

// MAKE A CART
router.post('/cart', function(req, res) {
    let cart = new Cart();
    cart.save(function(err, newCart) {
        if(err) {
            res.status(500).send("Could not create new cart");
        } else {
            res.status(200).send(newCart);
        };
    });
});

// ADD CAR TO CART
router.put('/cart/cars/add', function(req, res) {
    Car.findById(req.body.carID, function(err, foundCar) {
        if(err) {
            res.status(500).send({error: "Could not find a Car with that ID"});
        } else {
            Cart.findByIdAndUpdate(req.body.cartID, {$addToSet:{cars: foundCar._id}}, function(err, cart) {
                if(err) {
                    res.status(500).send({error: "Could not add item to Cart"})
                } else {
                    res.send(cart);
                }
            })
        }
    });
});

// DELETE CAR FROM CART
router.delete('/cart/cars/delete', function(req, res) {
    Cart.findByIdAndUpdate(req.body.cartID, {$pull: {cars: req.body.carID}}, function(err, updatedCart) {
        if(err) {
            res.status(500).send("Could not find Cart")
        } else {
            res.status(200).send(updatedCart);
        }
    });
});

// DELETE CART
router.delete('/cart/delete', function(req, res) {
    Cart.findByIdAndDelete(req.body.cartID, function(err) {
        if(err) {
            res.status(500).send("Could not delete Cart at this time")
        } else {
            res.status(200).send("Cart deleted.")
        };
    });
});


// Export
module.exports = router;
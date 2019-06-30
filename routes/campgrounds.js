var express = require("express"),
    router = express.Router(),
    Campground = require("../models/campgrounds"),
    middleware = require("../middleware"),
    moment = require("moment");


// Define escapeRegex function for search feature
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


//INDEX Route - Shows all the campgrounds
router.get("/", function (req, res) {
    if (req.query.search && req.xhr) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all campgrounds from DB
        Campground.find({ name: regex }, function (err, allCampgrounds) {
            if (err) {
                console.log(err);
            } else {
                res.status(200).json(allCampgrounds);
            }
        });
    } else {
        // Get all campgrounds from DB
        Campground.find({}, function (err, allCampgrounds) {
            if (err) {
                console.log(err);
            } else {
                if (req.xhr) {
                    res.json(allCampgrounds);
                } else {
                    res.render("campgrounds/index", { campgrounds: allCampgrounds, page: 'campgrounds' });
                }
            }
        });
    }
});

/* router.get("/", function (req, res) {
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds, currentUser: req.user });
        }
    });

}); */

//CREATE Route- for creating new campground
router.post("/", middleware.isLoggedIn, function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = { name: name, image: image, price: price, description: desc, author: author };
    Campground.create(newCampground, function (err, newlyCreatedCampground) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/campgrounds");
        }
    });
});

//NEW Route - form for creating new campground
router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
});

//SHOW Route - shows info about the campground
router.get("/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
});

//EDIT Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/edit", { campground: foundCampground });
        }
    });
});

//EDIT logic
router.put("/:id", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground) {
        if (err) {
            res.redirect("/campgrounds");
        }
        else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DELETE logic/route
router.delete("/:id", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function (err, removedCampground) {
        if (err) {
            res.redirect("/campgrounds");
        }
        else res.redirect("/campgrounds");
    });
});

module.exports = router;
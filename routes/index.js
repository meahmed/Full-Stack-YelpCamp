var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/user");

//Landing Page
router.get("/", function (req, res) {
    res.render("landing");
});

//Sign Up Page form
router.get("/register", function (req, res) {
    res.render("register");
});

//Sign up Logic
router.post("/register", function (req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            req.flash("error", err.message);
            res.redirect("/register");
        }
        else {
            passport.authenticate("local")(req, res, function () {
                req.flash("success", "Welcome to YelpCamp " + user.username);
                res.redirect("/campgrounds");
            });
        }
    });
});

//LOGIN Page 
router.get("/login", function (req, res) {
    res.render("login", { message: req.flash("error") });
});

//LOGIN Logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: '/campgrounds',
        failureRedirect: '/login'
    }), function (req, res) {
    });

//LOGOUT logic
router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "You have been logged out!");
    res.redirect("/campgrounds");
});

module.exports = router;
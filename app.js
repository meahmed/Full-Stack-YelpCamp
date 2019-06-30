var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    localStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    User = require("./models/user"),
    seedDb = require("./seed"),
    port = 5000;
urlToConnect = ""; //Need to add;

//Requiring routes
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");


mongoose.connect(urlToConnect, { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);//To remove deprecation Warning for `findOneAndUpdate()` and `findOneAndDelete()`

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
//require moment
app.locals.moment = require('moment');
// seedDb(); //Seed Data

//PASSPORT CONFIGURATION 
app.use(require("express-session")({
    secret: "Elyas Ahmed is Learning MEAN",
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(port, function () {
    console.log("YC Server started....");
});
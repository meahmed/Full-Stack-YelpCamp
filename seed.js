var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comments");

var data = [
    {
        name: "Lovely Tents",
        image: "https://res.cloudinary.com/simplotel/image/upload/x_0,y_0,w_2592,h_1458,r_0,c_crop,q_60,fl_progressive/w_960,f_auto,c_fit/youreka/Camp-Kambre_hcemsr",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dui vivamus arcu felis bibendum ut tristique et egestas. Luctus accumsan tortor posuere ac ut. Nec tincidunt praesent semper feugiat nibh. Pharetra pharetra massa massa ultricies. Adipiscing commodo elit at imperdiet dui accumsan sit amet. Ornare arcu odio ut sem nulla. Molestie a iaculis at erat pellentesque adipiscing commodo elit. Viverra suspendisse potenti nullam ac. Facilisis sed odio morbi quis commodo odio aenean. Nullam ac tortor vitae purus faucibus ornare suspendisse sed. Lobortis elementum nibh tellus molestie. Blandit turpis cursus in hac habitasse platea dictumst quisque."
    },
    {
        name: "Fireplace surrounds",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrZg5JjkyFGU3DIpwJADzkWLaKM_reMcwNsU1esgx8hy9Ei7su_A",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dui vivamus arcu felis bibendum ut tristique et egestas. Luctus accumsan tortor posuere ac ut. Nec tincidunt praesent semper feugiat nibh. Pharetra pharetra massa massa ultricies. Adipiscing commodo elit at imperdiet dui accumsan sit amet. Ornare arcu odio ut sem nulla. Molestie a iaculis at erat pellentesque adipiscing commodo elit. Viverra suspendisse potenti nullam ac. Facilisis sed odio morbi quis commodo odio aenean. Nullam ac tortor vitae purus faucibus ornare suspendisse sed. Lobortis elementum nibh tellus molestie. Blandit turpis cursus in hac habitasse platea dictumst quisque."
    },
    {
        name: "Lakeside",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSymYKQkslPGi8rdLfw7K7iQBNJ2DHSerbZ8FMPqSZ2SFL-_EqW",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dui vivamus arcu felis bibendum ut tristique et egestas. Luctus accumsan tortor posuere ac ut. Nec tincidunt praesent semper feugiat nibh. Pharetra pharetra massa massa ultricies. Adipiscing commodo elit at imperdiet dui accumsan sit amet. Ornare arcu odio ut sem nulla. Molestie a iaculis at erat pellentesque adipiscing commodo elit. Viverra suspendisse potenti nullam ac. Facilisis sed odio morbi quis commodo odio aenean. Nullam ac tortor vitae purus faucibus ornare suspendisse sed. Lobortis elementum nibh tellus molestie. Blandit turpis cursus in hac habitasse platea dictumst quisque."
    }
];

function seedDb() {
    Campground.deleteMany({}, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Removed Campgrounds");
            data.forEach(function (campground) {
                Campground.create(campground, function (err, createdCampground) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log("Created New Campground");
                        Comment.create(
                            {
                                text: "Place is Awesome, needs Internet",
                                author: "Elyas"
                            },
                            function (err, commentadded) {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    createdCampground.comments.push(commentadded);
                                    createdCampground.save();
                                    console.log("Added Comment");
                                }
                            }

                        );
                    }
                });
            });
        }
    });
};

module.exports = seedDb;

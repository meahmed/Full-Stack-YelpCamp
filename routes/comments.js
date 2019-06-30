var express = require("express"),
    router = express.Router({ mergeParams: true }),
    Campground = require("../models/campgrounds"),
    Comment = require("../models/comments"),
    middleware = require("../middleware");

//NEW Route - Form for creating new comment
router.get("/new", middleware.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("comments/new", { campground: campground });
        }
    });
});

//CREATE Route - for creatingnew comment for the specific campground
router.post("/", middleware.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        }
        else {
            Comment.create(req.body.comment, function (err, createdcomment) {
                if (err) {
                    req.flash("error", "Something went wrong");
                    console.log(err);
                }
                else {
                    //Saving comment id & username
                    createdcomment.author.id = req.user._id;
                    createdcomment.author.username = req.user.username;
                    createdcomment.save();
                    //Pushing comment to campground
                    campground.comments.push(createdcomment);
                    campground.save();
                    req.flash("success", "Added Comment Successfully.");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});
// EDIT Route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function (req, res) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("comments/edit", { campground_id: req.params.id, comment: foundComment });
        }
    });
});

//EDIT Logic
router.put("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, foundComment) {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DELETE logic/route
router.delete("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err, removedComment) {
        if (err) {
            console.log(err);
        }
        else {
            req.flash("success", "Comment deleted successfully!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;
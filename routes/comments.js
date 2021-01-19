//===========================================================================
// COMMENTS ROUTES
//===========================================================================

const express = require("express");
//merge the params from the campgrounds and the comnents so that inside the comments routes we are able  access
//the :id that we defined in the app.js for use method.
const router = express.Router({mergeParams: true});
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const middleware = require("../middleWare")


//comments new
router.get("/new", middleware.isLoggedIn, function(req, res){
    //find campground by ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground});
        }
    });
});

//comments save
router.post("/", middleware.isLoggedIn, function(req, res){
    //look up campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("campgrounds");
        }else{
            //create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Something went wrong")
                    console.log(err);
                }else{
                    //add username and ID to comment
                    //plugging id and username into comment.author
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username
                    //save comment
                    comment.save();
                    //assocaite the comment to the campground
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Successfully added comment")
                    res.redirect("/campgrounds/" + campground._id)
                }
            });
        }

    });
});

//EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit", {campground_id: req.params.id, comments: foundComment});
        }
    });
    
});

//UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findOneAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) =>{
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//COMMENTS DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) =>{
    Comment.findOneAndRemove(req.params.comment_id, (err) =>{
        if(err){
            res.redirect("back");
        }else{
            req.flash("success", "Comment deleted")
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});





module.exports = router;

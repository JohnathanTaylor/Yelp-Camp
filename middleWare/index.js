//all the middleware goes here
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const middlewareObj = {};


middlewareObj.checkCampgroundOwnership = (req, res, next) =>{
        //is user loggin? 
        if(req.isAuthenticated()){
            Campground.findById(req.params.id, function(err, foundCampground){
                if(err){
                    req.flash("error", "Campground not found")
                    res.redirect("back");
                }else{
                    //does the user own the campground post?
                    //checking if the author ID on the campgroud equals to that of the currently logged in user
                    if(foundCampground.author.id.equals(req.user._id)){              
                        next();
                    }else{
                        req.flash("error", "You dont have permission to do that!")
                        res.redirect("back");
                    } 
                }
            });
        }else{
            req.flash("error", "You need to be logged in to do that!")
            //takes them back to previous page
            res.send("back");
        }
}


middlewareObj.checkCommentOwnership = (req, res, next) => {
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id, (err, foundComment) =>{
                if(err){
                    res.redirect("back");
                }else{
                    //does the user own the comment
                    if(foundComment.author.id.equals(req.user._id)){
                        next();
                    }else{
                        req.flash("error", "You do not have permission to do that!")
                        res.redirect("back");
                    }
                }
            })
        }else{
            req.flash("error", "You need to be logged in to do that")
            res.redirect("back");
        }
}

middlewareObj.isLoggedIn = (req, res, next) =>{
        if(req.isAuthenticated()){
            return next();
        }else{
            //key value pair
            req.flash("error", "You need to be logged in to do that!");
            res.redirect("/login");
        }
}

module.exports = middlewareObj;
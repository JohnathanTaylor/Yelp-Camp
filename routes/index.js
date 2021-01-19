const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");


//LANDING PAGE
router.get("/", function(req, res){
    res.render("landing");
})


//================================================
//AUTH ROUTES
//==================================================


//shows the register page
router.get("/register", function(req, res){
    res.render("register");
});

//handle sign up logic
router.post("/register", function(req, res){
    const newUser = new User({username: req.body.username});
    //resgistering a new making a new use and if it works then we log user in
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }else{
                req.flash("success", "Welcome to YelpCamp " + user.username)
                passport.authenticate("local")(req, res, function(){
                res.redirect("/campgrounds");
            });
        }
    });
});


//SHOW LOGIN FORM
router.get("/login", function(req, res){
    res.render("login");
});

//LOGIN LOGIC
router.post("/login", passport.authenticate("local", 
//presumes the user exists already then checks and logs in
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login",
    }), function(req, res){
        console.log(req);
});

//LOGOUT ROUTE
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "logged you out");
    res.redirect("/campgrounds");
});



module.exports = router;
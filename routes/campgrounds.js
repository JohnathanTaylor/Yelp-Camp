const express = require("express");
const router = express.Router({mergeParams: true});
const Campground = require("../models/campground");
//const { route } = require("./comments");
const e = require("express");

const middleware = require("../middleWare/")

//Adding all the routes to the router no longer the app itself


//Index route- show all campgrounds
router.get("/", function(req, res){
    //get all campgrounds from DB
    //once it finds all the campgrounds it runs the call back function 
    //sending them all to the campgrounds.ejs file

    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user})
        }
    })
    //pass the data from the array into the template and then loop through it
    //moved the array out so it can have a global scope

    //the name we want to give it and the data we are passing in.
    //res.render("campgrounds", {campgrounds: campgrounds});
})

//CREATE route - add new campgrounds
//the route to create a new campground
router.post("/", middleware.isLoggedIn, function(req, res){
    //get data from form and add to campgrounds and add to campgrounds array
    const name = req.body.name;
    const image = req.body.image;
    const desc = req.body.description;
    const price = req.body.price;
    const author = {
        id: req.user.id,
        username: req.user.username
    }
    const newCampGrounds = {name: name, image: image, description: desc, author: author, price: price};
    //create a new campground and save to database
    Campground.create(newCampGrounds, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            console.log(newlyCreated);
            //redirect back to campgrounds. 
            //when redirecting the defualt is refirecting as a get request
             res.redirect("/");
        }
    });
});

//NEW route
//shows the form that will send the data to the post route
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new.ejs")
});

//SHOW ROUTE - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with the provided ID
    //finding the campground by ID then populating the comments on that campground
    //then exec executes the function. foundCampground now has IDs and comments.
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            //render the show template with that campground
            //foundcampground will store the whatever info is found with the id.
            //the show template will show info based on the ID given.
            res.render("campgrounds/show.ejs", {campgrounds: foundCampground});            
        }
    });
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
        Campground.findById(req.params.id, function(err, foundCampground){
            res.render("campgrounds/edit", {campground: foundCampground});
        });
});

//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    //find and update the correct campground
    Campground.findOneAndUpdate({_id: req.params.id}, req.body.campground, (err, updateCampground) => {
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
        
    });
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findOneAndRemove({_id: req.params.id}, (err) => {
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
    })
});






//exporting the router
module.exports = router;
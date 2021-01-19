const   express = require("express"),
        app = express(),
        bodyParser =  require("body-parser"),
        passport = require("passport"),
        LocalStrategy = require("passport-local"),
        Campground = require("./models/campground"),
        Comment = require("./models/comment"),
        User = require("./models/user"),
        methodOverride = require("method-override"),
        flash = require("connect-flash"),
        seedDB = require("./seeds");

const commentRoutes = require("./routes/comments"),
      campgroundRoutes = require("./routes/campgrounds"),
      indexRoutes = require("./routes/index");

//seedDB();

const mongoose = require('mongoose');
const e = require("express");
mongoose.connect('mongodb://localhost/yelp_camp_v12', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({extended: true}));
//enable to not put .ejs all the time
app.set("view engine", "ejs");
//serving everything in the public directory
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());


// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Batman is bruce wayne!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//whatever function we apply to this will be used on every route
//passing req.user to every template
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//requiring route files and add prefixes that are adding to the beginning of every route in that file.
app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(3000,  function(){
    console.log("Yelp camp server has started");
});
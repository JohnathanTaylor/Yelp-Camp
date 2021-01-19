const mongoose = require("mongoose");
const Campground = require("./models/campground");
const e = require("express");
const Comment = require("./models/comment")

const data = [
    {
        name: "Stary Sky", 
        image: "https://img.travelawaits.com/filter:centercrop/quill/e/7/8/b/c/8/e78bc8a403dbff2e7aecfe72727c3224adfdb2a7.jpg?w=800&h=800",
        description: "staring up in the stars"
    },
    {
        name: "Nebula", 
        image: "https://i.kinja-img.com/gawker-media/image/upload/c_scale,f_auto,fl_progressive,pg_1,q_80,w_800/199a4946umhuxjpg.jpg",
        description: "star creation"
    },
    {
        name: "Earth", 
        image: "https://i.pinimg.com/originals/1d/77/e3/1d77e350ee67a5ad9f1c411c6a006caf.jpg",
        description: "Beyond the stars looking in"
    }
]

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
    //      if(err){
    //          console.log(err);
    //      }
    //      console.log("removed campgrounds!");
    //      Comment.remove({}, function(err) {
    //          if(err){
    //              console.log(err);
    //          }
    //          console.log("removed comments!");
    //           //add a few campgrounds
    //          data.forEach(function(seed){
    //              Campground.create(seed, function(err, campground){
    //                  if(err){
    //                      console.log(err)
    //                  } else {
    //                      console.log("added a campground");
    //                      //create a comment
    //                      Comment.create(
    //                          {
    //                              text: "This place is great, but I wish there was internet",
    //                              author: "Homer"
    //                          }, function(err, comment){
    //                              if(err){
    //                                  console.log(err);
    //                              } else {
    //                                  campground.comments.push(comment);
    //                                  campground.save();
    //                                  console.log("Created new comment");
    //                              }
    //                          });
    //                  }
    //              });
    //          });
    //      });
          }); 
     //add a few comments
 }
 


//sends this function to app.js and stores it in the seedb const
module.exports = seedDB;
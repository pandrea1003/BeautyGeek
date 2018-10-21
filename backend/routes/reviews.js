// Inventory.js

const express = require('express');
const router = express.Router();
const models = require('../models');

//Get route that returns inventory by category

// Route for saving/updating an Article's associated Note
router.post("/:productID/:userID", function(req, res) {
    // Create a new note and pass the req.body to the entry
    var newReview = {title:req.body.title, body: req.body.body, userId:req.body.userId, userName: req.body.userName}
    console.log(newReview);
    models.Review.create(newReview)
      .then(function(dbReview) {
        // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
        // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        //return db.Article.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true });
        console.log("New Comment Inserted!");
        models.Inventory.findOneAndUpdate({ _id: req.params.productID }, { $push : {Review: dbReview._id }}, { new: true })
        .then(function(dbProduct){
            console.log("Inventory was updated!");
           return models.User.findOneAndUpdate({ _id: req.params.userID }, { $push : {Review: dbReview._id }}, { new: true });
        }).then(function(dbUser){
            console.log("User updated!!!");
            res.json({success: true});
          })
          .catch(function(err) {
              console.log("User didn't update... :c");
              console.log(err);
            // If an error occurred, send it to the client
            res.json(err);
          });
        
      })
      .catch(function(err) {
          console.log("Review no se creo");
          console.log(err);
        // If an error occurred, send it to the client
        res.json(err);
      });

  });

    router.get('/userPage/:userID', function(req, res) {
    console.log("We are inside get, looking for user's reviews... " + req.params.userID);
    // if (req.params.cat == "Foundation"){
    models.User.find({
        _id: req.params.userID
    }).populate("Review").then( result => {
        console.log(result);
       return res.send(result);}
    );
    });

    router.get('/productPage/:productID', function(req, res) {
        console.log("We are inside get, looking for product's reviews... " + req.params.productID);
        // if (req.params.cat == "Foundation"){
        models.Inventory.find({
            _id: req.params.productID
        }).populate("Review").then( result => {
            console.log(result);
           return res.send(result);}
        );
        });
    
        router.delete('/delete/:id', function(req, res) {
            // Create a new note and pass the req.body to the entry
            console.log("We get inside delete... ");
            models.Review.find({_id: req.params.id}).remove()
              .then(function() {
                console.log("Comment Deleted!");
                return res.json("Comment Deleted!");
              })
              .catch(function(err) {
                // If an error occurred, send it to the client
                console.log("We get an error on delete backend...");
                res.json(err);
              });
              console.log("HUE");
          });


module.exports = router;
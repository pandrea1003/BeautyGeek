// Inventory.js

const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');

//Get route that returns inventory by category
router.get('/:cat', function(req, res) {
    console.log("We are inside get, looking for category... " + req.params.cat);
    // if (req.params.cat == "Foundation"){
    Inventory.find({
        category: req.params.cat
    }).then( result => {
        console.log(result);
       return res.send(result);}
    );
    });

    router.get("/description/:id", function(req, res){
        console.log("We are inside get, looking for id... " + req.params.id);
        Inventory.find({
            _id: req.params.id
        }).then( result => {
            console.log("Esto es result... " +result);
           return res.send(result);}
        );

    });

module.exports = router;
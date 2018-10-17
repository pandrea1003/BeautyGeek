// Inventory.js

const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');


router.get('/:cat', function(req, res) {
    console.log("We are inside get, looking for... " + req.params.cat);
    // if (req.params.cat == "Foundation"){
    Inventory.find({
        category: req.params.cat
    }).then( result => {
        console.log(result);
       return res.send(result);}
    );
    

    });

// router.get('/Lipstick', function(req, res) {
 
//         Inventory.find({
//             category: "Lipstick"
//         }).then( result => {
    
//            return res.json(result);}
//         );
    
//         });

// router.get('/Eyeshadow', function(req, res) {
 
//             Inventory.find({
//                 category: "Eyeshadow"
//             }).then( result => {
        
//                return res.json(result);}
//             );
        
//             });


module.exports = router;
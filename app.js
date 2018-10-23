// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./db');
const Inventory = require("./models/Inventory");
var axios = require("axios");
var cheerio = require("cheerio");

const users = require('./routes/user'); 
const inventory = require('./routes/inventory');
const reviews = require('./routes/reviews');

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);

const app = express();
app.use(passport.initialize());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
}

//user route
app.use('/api/users', users);
//product route
app.use('/products', inventory);
//review route
app.use('/reviews', reviews);

app.get('/', function(req, res) {
    res.send('hello');
});

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "frontend/build/index.html"));
});

const PORT = process.env.PORT || 5000;

//meter aqui un conditional de solo populate inventory table if its empty

Inventory.find({}).then(function(res){
    console.log("THIS IS RES:" + res);
    if (res.length == 0){
      console.log("The table was empty!");

      //Foundation scrape
      axios.get("https://www.ulta.com/makeup-face-foundation?N=26y5").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);
    // console.log($.fn._originalRoot.children[0].next.children[2].children[1].children[11].children[3].children[5].children[11].children[1].children[1].children[1].children[1].children[1].children[5]);
    // Now, we grab every h2 within an article tag, and do the following:
    $("div.productQvContainer").each(function(i, element) {
      // Save an empty result object
       var result = {};
        result.category = "Foundation";
      // Add the text and href of every link, and save them as properties of the result object
       
        result.Title = $(this)
        .children("p").children("a").text().trim();
 
    result.picURL = $(this)
        .children("div").children("a").children("img").attr("src");
        console.log(result);

        result.productLink = "http://ulta.com" + $(this)
         .children("div").children("a").attr("href");
        
    
    
      // Create a new Article using the `result` object built from scraping
      Inventory.create(result)
        .then(function(dbInventory) {
          // View the added result in the console
          console.log(dbInventory);
        })
        .catch(function(err) {
          console.log("YOOOO Foundation");
          // If an error occurred, send it to the client
          return res.json(err);
        });
    });
  
  
});

//Lipstick scrape
axios.get("https://www.ulta.com/makeup-lips-lipstick?N=26ys").then(function(response) {
  // Then, we load that into cheerio and save it to $ for a shorthand selector
  var $ = cheerio.load(response.data);
  // console.log($.fn._originalRoot.children[0].next.children[2].children[1].children[11].children[3].children[5].children[11].children[1].children[1].children[1].children[1].children[1].children[5]);
  // Now, we grab every h2 within an article tag, and do the following:
  $("div.productQvContainer").each(function(i, element) {
    // Save an empty result object
     var result = {};
      result.category = "Lipstick";
    // Add the text and href of every link, and save them as properties of the result object
     
      result.Title = $(this)
      .children("p").children("a").text().trim();

  result.picURL = $(this)
      .children("div").children("a").children("img").attr("src");
      console.log(result);

      result.productLink = "http://ulta.com" + $(this)
       .children("div").children("a").attr("href");
      
  
  
    // Create a new Article using the `result` object built from scraping
    Inventory.create(result)
      .then(function(dbInventory) {
        // View the added result in the console
        console.log(dbInventory);
      })
      .catch(function(err) {
        console.log("YOOOO Lipstick");
        // If an error occurred, send it to the client
        return res.json(err);
      });
    });
  
  
});

  //Eyeshadow scrape
axios.get("https://www.ulta.com/makeup-eyes-eyeshadow-palettes?N=26ye").then(function(response) {
  // Then, we load that into cheerio and save it to $ for a shorthand selector
  var $ = cheerio.load(response.data);
  // console.log($.fn._originalRoot.children[0].next.children[2].children[1].children[11].children[3].children[5].children[11].children[1].children[1].children[1].children[1].children[1].children[5]);
  // Now, we grab every h2 within an article tag, and do the following:
  $("div.productQvContainer").each(function(i, element) {
    // Save an empty result object
     var result = {};
      result.category = "Eyeshadow";
    // Add the text and href of every link, and save them as properties of the result object
     
      result.Title = $(this)
      .children("p").children("a").text().trim();

  result.picURL = $(this)
      .children("div").children("a").children("img").attr("src");
      console.log(result);

      result.productLink = "http://ulta.com" + $(this)
       .children("div").children("a").attr("href");
      
  
  
    // Create a new Article using the `result` object built from scraping
    Inventory.create(result)
      .then(function(dbInventory) {
        // View the added result in the console
        console.log(dbInventory);
      })
      .catch(function(err) {
        console.log("YOOOO eyeshadow");
        // If an error occurred, send it to the client
        return res.json(err);
      });
  });


});



    }
  });

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
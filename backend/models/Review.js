var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new CommentSchema object
// This is similar to a Sequelize model
var ReviewSchema = new Schema({
  // `title` is of type String
  title: {type: String,
    required: true},
  // `body` is of type String
  body: {type: String,
    required: true},

    userID: {type: Schema.Types.ObjectId,
            ref: "User"},

    Product: {
        type: Schema.Types.ObjectId,
        ref: "Product"
      }
    

});

// This creates our model from the above schema, using mongoose's model method
var Review = mongoose.model("Review", ReviewSchema);

// Export the Comment model
module.exports = Review;
var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new CommentSchema object
// This is similar to a Sequelize model
var InventorySchema = new Schema({
  // `title` is of type String
  category: {type: String,
    required: true},
  // `body` is of type String
  Title: {type: String,
    required: true},

    Pic: {
        type: String,
        required: true
      },
      Link: {
          type: String,
        required: true
      },
      Review: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
      }]
    

});

// This creates our model from the above schema, using mongoose's model method
var Inventory = mongoose.model("Inventory", InventorySchema);

// Export the Comment model
module.exports = Inventory;
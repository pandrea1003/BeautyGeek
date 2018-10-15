var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var UserSchema = new Schema({
  // `title` is required and of type String
  username: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    notEmpty: true
},

lastName: {
    type: String,
    notEmpty: true
},

about: {
    type: String
},

email: {
    type: String,
},

password: {
    type: String,
    allowNull: false
},

last_login: {
    type: Date
},
  
  Review: [{
    type: Schema.Types.ObjectId,
    ref: "Review"
  }]
});

// This creates our model from the above schema, using mongoose's model method
var User = mongoose.model("User", UserSchema);

// Export the Article model
module.exports = User;
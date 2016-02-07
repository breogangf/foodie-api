// Load required packages
var mongoose = require('mongoose');

// Define our ingredient schema
var IngredientSchema = new mongoose.Schema({
		name: String,
		quantity: String
});

// Define our direction schema
var DirectionSchema = new mongoose.Schema({
		step: Number,
		description: String
});

// Define our recipe schema
var RecipeSchema   = new mongoose.Schema({
		name: String,
  		category: String,
		cook_time: Number,
		ingredients: [IngredientSchema],
		directions: [DirectionSchema]
});

// Export the Mongoose model
module.exports = mongoose.model('Recipe', RecipeSchema);
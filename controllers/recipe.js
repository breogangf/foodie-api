// Load required packages
var Recipe = require('../models/recipe');

//POST - Insert a new Recipe in the DB
exports.addRecipe = function(req, res) {
        //console.log('POST /recipe/');
        //console.log(req.body);

        var recipe = new Recipe({
          name: req.body.name,
          category: req.body.category,
          cook_time: req.body.cook_time,
          ingredients: req.body.ingredients,
          directions: req.body.directions
        });

        recipe.save(function (err, recipe) {
            if (err) return res.send(500, err.recipe);
            Recipe.findOne(recipe).exec(function (err, recipe) {
            //console.log(recipe);
            res.status(201).jsonp(recipe);
            });
        });
};

// Create endpoint /api/recipe/ for GET
exports.getRandomRecipe = function(req, res) {

  // Use a random seed to find a random recipe
  Recipe.count(function(err, c) {
    var random = Math.floor(Math.random() * c);

  Recipe.findOne().skip(random).exec(
    function (err, recipe) {
      if (err) res.send(err);
        res.json(recipe);
    });
  });
};

//GET - Return all recipes in the DB
exports.getAllRecipes = function(req, res) {
  Recipe.find({}, function (err, recipes) {
            if (err) res.send(500, err.recipe);
            //console.log(recipes);
            res.status(200).jsonp(recipes);
        });
};

// Create endpoint /api/recipe/:recipe_id for GET
exports.getRecipeById = function(req, res) {
  // Use the Recipe model to find a specific recipe
  Recipe.findById(req.params.recipe_id, function(err, recipe) {
    if (err) res.send(err);
    //console.log(recipe);
    res.json(recipe);
  });
};
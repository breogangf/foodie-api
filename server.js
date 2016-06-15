// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride  = require("method-override");
var recipeController = require('./controllers/recipe');
var viewController = require('./controllers/view');
var pictureController = require('./controllers/picture');

var config = require('./config');

// Connection to DB
var database = config.mongo.uri + config.mongo.db;
var port = config.port;
var ip = config.ip;
var options = config.dbUser;

mongoose.connect(database, options, function(err, res) {
    if(err) throw err;
    console.log('Connected to Database: ' + database);
});

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// Middlewares
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(__dirname + '/public'));

// permit cross-origin resource sharing
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Create our Express api router
var api_router = express.Router();

// Create endpoint handlers for /recipe
api_router.route('/recipe')
  .post(recipeController.addRecipe)
  .get(recipeController.getAllRecipes)

api_router.route('/recipe/:recipe_id')
.get(recipeController.getRecipeById)

api_router.route('/recipe/random')
  .get(recipeController.getRandomRecipe);

api_router.route('/upload')
  .post(pictureController.uploadPicture)

app.use('/api', api_router);



// Create our Express view router
var view_router = express.Router();

//TODO return list.jade
//TODO return detail.jade

view_router.route('/upload_pic')
  .get(viewController.getUploadForm)

app.use('/recipe', view_router);


// Start server
app.listen(port, ip, function() {
    console.log("Node server running on " + config.url);
});
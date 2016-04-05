var request = require('supertest');
var mongoose = require('mongoose');
var assert = require('assert');
var should = require('should');
var config = require('../config');
require('../server.js');

describe('Recipe Test', function() {
    describe('#recipe model()', function() {
        
        var first_recipe_id;
        var second_recipe_id;

        before(function(done) {
            // In our tests we use the test db
            mongoose.connect(config.mongo.uri + config.mongo.db, function() {
                mongoose.connection.db.dropCollection('recipes', function() {
                    done();
                });
            });
        });

        after(function(done) {
            mongoose.connection.db.dropCollection('recipes', function() {   
                mongoose.disconnect();
                    done();
            });
        });

        it('POST /recipe - should create the recipe Pancakes', function(done) {
            request(config.url)
                .post('/api/recipe')
                .send({
                    "name" : "Pancakes",
                    "category" : "Snack",
                    "cook_time" : 20,
                    "image": "example.jpg" ,
                    "ingredients" : [{"name" : "eggs", "quantity" : "six"},
                                    {"name" : "banana", "quantity" : "Medium size banana"}],
                    "directions" : [{"step" : 1, "description" : "Beat egg until fluffy."},
                                    {"step" : 2, "description" : "Add milk and melted margarine."}]
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) return done(err);
                    first_recipe_id = res.body._id;
                    done();
                });
        });

        it('POST /recipe - should create the recipe Fajitas', function(done) {
            request(config.url)
                .post('/api/recipe')
                .send({
                    "name" : "Fajitas",
                    "category" : "Meal",
                    "cook_time" : 15,
                    "image": null,
                    "ingredients" : [{"name" : "tortillas", "quantity" : "4"},
                                    {"name" : "chicken", "quantity" : "400gr"},
                                    {"name" : "red peper", "quantity" : "small piece"},
                                    {"name" : "green peper", "quantity" : "small piece"},
                                    {"name" : "olive oil", "quantity" : "two small spoons"},
                                    {"name" : "salad", "quantity" : "four portions"},
                                    {"name" : "black_peper", "quantity" : "just a few"}],
                    "directions" : [{"step" : 1, "description" : "Cut the all chicken in small pieces."},
                                    {"step" : 2, "description" : "Cut the red peper and the green peper in small slides."},
                                    {"step" : 3, "description" : "Put some olive oil in a pan, and put your peper slides on it when the oil gets hot."},
                                    {"step" : 4, "description" : "When the peper slides are done, add the kitchen pieces, and add a little bit more oil."},
                                    {"step" : 5, "description" : "Add you desired quantity of black peper and remove until the chicken is done."},
                                    {"step" : 6, "description" : "Place your tortillas in a dish and roll them with your chicken and some salad."}]
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) return done(err);
                    second_recipe_id = res.body._id;
                    done();
                });
        });


        it('GET /recipe - should return all the recipes', function(done) {
            request(config.url)
                .get('/api/recipe')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) return done(err);

                    res.body.should.be.instanceof(Array);
                    res.body.should.have.length(2);

                    res.body[0].should.have.property('name', 'Pancakes');
                    res.body[0].should.have.property('category', 'Snack');
                    res.body[0].should.have.property('cook_time', 20);
                    res.body[0].should.have.property('image', 'example.jpg');

                    res.body[0].should.have.property('ingredients').with.lengthOf(2);
                    res.body[0].ingredients[0].should.have.property('name', "eggs");
                    res.body[0].ingredients[0].should.have.property('quantity', "six");
                    res.body[0].ingredients[1].should.have.property('name', "banana");
                    res.body[0].ingredients[1].should.have.property('quantity', "Medium size banana");

                    res.body[0].should.have.property('directions').with.lengthOf(2);
                    res.body[0].directions[0].should.have.property('step', 1);
                    res.body[0].directions[0].should.have.property('description', "Beat egg until fluffy.");
                    res.body[0].directions[1].should.have.property('step', 2);
                    res.body[0].directions[1].should.have.property('description', "Add milk and melted margarine.");

                    res.body[1].should.have.property('name', 'Fajitas');
                    res.body[1].should.have.property('category', 'Meal');
                    res.body[1].should.have.property('cook_time', 15);
                    res.body[1].should.have.property('image', null);

                    res.body[1].should.have.property('ingredients').with.lengthOf(7);
                    res.body[1].ingredients[0].should.have.property('name', "tortillas");
                    res.body[1].ingredients[0].should.have.property('quantity', "4");
                    res.body[1].ingredients[1].should.have.property('name', "chicken");
                    res.body[1].ingredients[1].should.have.property('quantity', "400gr");
                    res.body[1].ingredients[2].should.have.property('name', "red peper");
                    res.body[1].ingredients[2].should.have.property('quantity', "small piece");
                    res.body[1].ingredients[3].should.have.property('name', "green peper");
                    res.body[1].ingredients[3].should.have.property('quantity', "small piece");
                    res.body[1].ingredients[4].should.have.property('name', "olive oil");
                    res.body[1].ingredients[4].should.have.property('quantity', "two small spoons");
                    res.body[1].ingredients[5].should.have.property('name', "salad");
                    res.body[1].ingredients[5].should.have.property('quantity', "four portions");
                    res.body[1].ingredients[6].should.have.property('name', "black_peper");
                    res.body[1].ingredients[6].should.have.property('quantity', "just a few");

                    res.body[1].should.have.property('directions').with.lengthOf(6);
                    res.body[1].directions[0].should.have.property('step', 1);
                    res.body[1].directions[0].should.have.property('description', "Cut the all chicken in small pieces.");
                    res.body[1].directions[1].should.have.property('step', 2);
                    res.body[1].directions[1].should.have.property('description', "Cut the red peper and the green peper in small slides.");
                    res.body[1].directions[2].should.have.property('step', 3);
                    res.body[1].directions[2].should.have.property('description', "Put some olive oil in a pan, and put your peper slides on it when the oil gets hot.");
                    res.body[1].directions[3].should.have.property('step', 4);
                    res.body[1].directions[3].should.have.property('description', "When the peper slides are done, add the kitchen pieces, and add a little bit more oil.");
                    res.body[1].directions[4].should.have.property('step', 5);
                    res.body[1].directions[4].should.have.property('description', "Add you desired quantity of black peper and remove until the chicken is done.");
                    res.body[1].directions[5].should.have.property('step', 6);
                    res.body[1].directions[5].should.have.property('description', "Place your tortillas in a dish and roll them with your chicken and some salad.");

                   
                    done();
                });
        });

        it('GET /recipe/pancake_recipe_id - should return Pancakes recipe', function(done) {
            request(config.url)
                .get('/api/recipe/' + first_recipe_id)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) return done(err);
                   
                    res.body.should.have.property('name', 'Pancakes');
                    res.body.should.have.property('category', 'Snack');
                    res.body.should.have.property('cook_time', 20);
                    res.body.should.have.property('image', 'example.jpg');


                    res.body.should.have.property('ingredients').with.lengthOf(2);
                    res.body.ingredients[0].should.have.property('name', "eggs");
                    res.body.ingredients[0].should.have.property('quantity', "six");
                    res.body.ingredients[1].should.have.property('name', "banana");
                    res.body.ingredients[1].should.have.property('quantity', "Medium size banana");

                    res.body.should.have.property('directions').with.lengthOf(2);
                    res.body.directions[0].should.have.property('step', 1);
                    res.body.directions[0].should.have.property('description', "Beat egg until fluffy.");
                    res.body.directions[1].should.have.property('step', 2);
                    res.body.directions[1].should.have.property('description', "Add milk and melted margarine.");

                    done();
                });
        });

        it('GET /recipe/fajitas_recipe_id - should return Fajitas recipe', function(done) {
            request(config.url)
                .get('/api/recipe/' + second_recipe_id)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) return done(err);
                   
                    res.body.should.have.property('name', 'Fajitas');
                    res.body.should.have.property('category', 'Meal');
                    res.body.should.have.property('cook_time', 15);
                    res.body.should.have.property('image', null);

                    res.body.should.have.property('ingredients').with.lengthOf(7);
                    res.body.ingredients[0].should.have.property('name', "tortillas");
                    res.body.ingredients[0].should.have.property('quantity', "4");
                    res.body.ingredients[1].should.have.property('name', "chicken");
                    res.body.ingredients[1].should.have.property('quantity', "400gr");
                    res.body.ingredients[2].should.have.property('name', "red peper");
                    res.body.ingredients[2].should.have.property('quantity', "small piece");
                    res.body.ingredients[3].should.have.property('name', "green peper");
                    res.body.ingredients[3].should.have.property('quantity', "small piece");
                    res.body.ingredients[4].should.have.property('name', "olive oil");
                    res.body.ingredients[4].should.have.property('quantity', "two small spoons");
                    res.body.ingredients[5].should.have.property('name', "salad");
                    res.body.ingredients[5].should.have.property('quantity', "four portions");
                    res.body.ingredients[6].should.have.property('name', "black_peper");
                    res.body.ingredients[6].should.have.property('quantity', "just a few");

                    res.body.should.have.property('directions').with.lengthOf(6);
                    res.body.directions[0].should.have.property('step', 1);
                    res.body.directions[0].should.have.property('description', "Cut the all chicken in small pieces.");
                    res.body.directions[1].should.have.property('step', 2);
                    res.body.directions[1].should.have.property('description', "Cut the red peper and the green peper in small slides.");
                    res.body.directions[2].should.have.property('step', 3);
                    res.body.directions[2].should.have.property('description', "Put some olive oil in a pan, and put your peper slides on it when the oil gets hot.");
                    res.body.directions[3].should.have.property('step', 4);
                    res.body.directions[3].should.have.property('description', "When the peper slides are done, add the kitchen pieces, and add a little bit more oil.");
                    res.body.directions[4].should.have.property('step', 5);
                    res.body.directions[4].should.have.property('description', "Add you desired quantity of black peper and remove until the chicken is done.");
                    res.body.directions[5].should.have.property('step', 6);
                    res.body.directions[5].should.have.property('description', "Place your tortillas in a dish and roll them with your chicken and some salad.");

                    done();
                });
        });

    });
});
var request = require('supertest');
var mongoose = require('mongoose');
var assert = require('assert');
var should = require('should');
var config = require('../config');
require('../server.js');

describe('Recipe Test', function() {
    describe('#recipe model()', function() {

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

        it('POST /recipe - should create the recipe pancakes', function(done) {
            request(config.url)
                .post('/api/recipe')
                .send({
                    "name" : "Pancakes",
                    "category" : "Snack",
                    "cook_time" : 20,
                    "ingredients" : [{"name" : "eggs", "quantity" : "six"},
                                    {"name" : "banana", "quantity" : "Medium size banana"}],
                    "directions" : [{"step" : 1, "description" : "Beat egg until fluffy."},
                                    {"step" : 2, "description" : "Add milk and melted margarine."}]
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });


        it('GET /recipe - should return the recipe pancakes', function(done) {
            request(config.url)
                .get('/api/recipe/random')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) return done(err);
                    res.body.should.have.property('name', 'Pancakes');
                    res.body.should.have.property('category', 'Snack');
                    res.body.should.have.property('cook_time', 20);

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

    });
});
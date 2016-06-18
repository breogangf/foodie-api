var request = require('supertest');
var mongoose = require('mongoose');
var assert = require('assert');
var should = require('should');
var config = require('../config');
require('../server.js');

describe('Image Test', function() {
    describe('#image', function() {
        

it('GET /images/example.jpg - should return image file', function(done) {
            request(config.url)
                .get('/images/recipes/example.jpg')
                .expect(200)
                .expect('Content-Type', 'image/jpeg')
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });

    });
});
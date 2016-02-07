# README #

This README show you the steps are necessary to get the application up and running.

### What is this project? ###

* Enjoy eating clean. Simple &amp; delicious with this easy REST API.

### How do I get set up? ###

* Summary of set up
    * Clone git
    * npm install

* How to run tests
    * mongod
    * npm test

* Local deployment instructions
    * mongod
    * npm start

* Openshift deployment instructions
    * Create new MEAN gear at openshift using this repo.
    * rhc port-forward foodie to connect to mongoDB.
    * Create your dbuser on foodie db giving readWrite permission.

* Logs
    * rhc tail -a foodie

* Backups
    * mongodump --host MONGODB_IP --port MONGODB_PORT --username YOUR_USERNAME --password YOUR_PASSWORD
    * mongorestore --host MONGODB_IP --port MONGODB_PORT --username YOUR_USERNAME --password YOUR_PASSWORD dump/

### Who do I talk to? ###
    * Breogán González Fernández (@breogangf)
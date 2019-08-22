"use strict";
var fs = require("fs");
var path = require("path");

var cls = require('continuation-local-storage'),
    namespace = cls.createNamespace('transaction-namespace');

var Sequelize = require("sequelize");
Sequelize.useCLS(namespace);

/*
*Project configuration parameters
* */
var env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];

/*
* Sequlize configuration
* */
if (process.env.DATABASE_URL) {
    var sequelize = new Sequelize(process.env.DATABASE_URL, config);
} else {
    var sequelize = new Sequelize(config.database, config.username, config.password, config);
}
var db = {};

fs
    .readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function (file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });




Object.keys(db).forEach(function (modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);

    }
});

db.sequelize = sequelize;

/*
* Models associations
* */
//
// db.merchant.hasMany(db.merchant_user);
// db.merchant_user.belongsTo(db.merchant);





module.exports = db;

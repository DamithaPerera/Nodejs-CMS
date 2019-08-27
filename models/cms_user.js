"use strict";
var _ = require('lodash');
var validator = require('validator');
var path = require("path");

var env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];

module.exports = function (sequelize, DataTypes) {
    var cms_user = sequelize.define("cms_user", {
        email: { type: DataTypes.STRING,
            allowNull: false,
            unique: {
               msg: 'Your email address is already registered.'
            },
            validate: {
                notEmpty: {
                    msg: "Email cannot be empty"
                },
                isEmail: {
                    msg: "Please enter a valid email address"
                }
            },
        },
        firstName: {
            type:DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "First name cannot be empty"
                }
            }
        },
        lastName: {
            type:DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: {
                    msg: "Last name cannot be empty"
                }
            }
        },
        password: { type:DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Password cannot be empty"
                }
            }
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
    }, {
        timestamps: true,
        paranoid: true
    });

    return cms_user;
};

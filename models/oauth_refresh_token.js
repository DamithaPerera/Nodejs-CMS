'use strict';
module.exports = (sequelize, DataTypes) => {
    const oauth_refresh_token = sequelize.define('oauth_refresh_token', {
        refreshToken: DataTypes.STRING,
        expires: DataTypes.DATE,
        scope: DataTypes.STRING,
        clientId: DataTypes.STRING,
        userId: DataTypes.STRING
    }, {});
    oauth_refresh_token.associate = function (models) {
        // associations can be defined here
    };
    return oauth_refresh_token;
};
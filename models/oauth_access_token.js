'use strict';
module.exports = (sequelize, DataTypes) => {
    const oauth_access_token = sequelize.define('oauth_access_token', {
        accessToken: DataTypes.STRING,
        expires: DataTypes.DATE,
        scope: DataTypes.STRING,
        clientId: DataTypes.STRING,
        userId: DataTypes.STRING
    }, {});
    oauth_access_token.associate = function (models) {
        // associations can be defined here
    };

    return oauth_access_token;

};

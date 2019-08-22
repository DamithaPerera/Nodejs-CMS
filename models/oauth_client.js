'use strict';
module.exports = (sequelize, DataTypes) => {
    const oauth_client = sequelize.define('oauth_client', {
        name: DataTypes.STRING,
        clientId: DataTypes.STRING,
        clientSecret: DataTypes.STRING,
        redirectUri: DataTypes.STRING,
        grantTypes: DataTypes.STRING,
        scope: DataTypes.STRING,
        userId: DataTypes.STRING
    }, {});
    oauth_client.associate = function(models) {
        // associations can be defined here
    };
    return oauth_client;
};

'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('oauth_clients', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: Sequelize.STRING,
            clientId: Sequelize.STRING,
            clientSecret: Sequelize.STRING,
            redirectUri: Sequelize.STRING,
            grantTypes: Sequelize.STRING,
            scope: Sequelize.STRING,
            userId: Sequelize.STRING,
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('oauth_clients');
    }
};
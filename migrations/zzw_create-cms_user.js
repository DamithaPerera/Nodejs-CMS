"use strict";

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface
            .createTable('cms_users', {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false
                },
                email: {type: Sequelize.STRING, unique: true, allowNull: false},
                password: {type: Sequelize.STRING, allowNull: false},
                firstName: {type: Sequelize.STRING, allowNull: false},
                lastName: {type: Sequelize.STRING, allowNull: true},
                status: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false,
                    allowNull: false
                },
                createdAt: {
                    type: Sequelize.DATE,
                    allowNull: false
                },
                updatedAt: Sequelize.DATE,
                deletedAt: Sequelize.DATE
            });
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface
            .dropTable('cms_users');
    }
};
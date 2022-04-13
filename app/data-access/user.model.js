import { DbContext } from './db-connector.js';
import { Sequelize } from 'sequelize';

export const UserModel = DbContext.define('User', {
    _id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
}, {
    tableName: 'users',
    schema: 'public',
    timestamps: false
});

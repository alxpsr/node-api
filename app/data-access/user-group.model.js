import { DbContext } from './db-connector.js';
import { Sequelize } from 'sequelize';

export const UserGroupModel = DbContext.define('UserGroup', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
            model: 'users',
            key: '_id'
        },
        onDelete: 'CASCADE',
        hooks: true
    },
    groupId: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
            model: 'groups',
            key: '_id'
        },
        onDelete: 'CASCADE',
        hooks: true
    }
}, {
    tableName: 'user_group',
    schema: 'public',
    timestamps: false
});


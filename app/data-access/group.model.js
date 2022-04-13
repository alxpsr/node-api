import { DbContext } from './db-connector.js';
import { Sequelize } from 'sequelize';

export const GroupModel = DbContext.define('Group', {
    _id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    permissions: {
        type: Sequelize.ARRAY(
            Sequelize.ENUM(
                'READ',
                'WRITE',
                'DELETE',
                'SHARE',
                'UPLOAD_FILES'
            )
        )
    }
}, {
    tableName: 'groups',
    schema: 'public',
    timestamps: false
});

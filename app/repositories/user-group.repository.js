import { DbContext } from '../data-access/db-connector.js';
import { UserGroupModel } from '../data-access/user-group.model.js';

export class UserGroupRepository {
    constructor() {
        
    }
    
    async addUsers(groupId, userIds) {
        const transaction = await DbContext.transaction();

        try {
            const preparedData = userIds.map(id => {
                return {
                    groupId,
                    userId: id
                };
            });

            const createdGroups = await UserGroupModel.bulkCreate(preparedData, {
                returning: true
            });
            await transaction.commit();

            return Promise.resolve(createdGroups);
        } catch (err) {
            return Promise.reject({
                error: err
            });
        }
    }
}

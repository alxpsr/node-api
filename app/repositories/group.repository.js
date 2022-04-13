import { GroupModel } from '../data-access/group.model.js';

export class GroupRepository {
    create(id, name, permissions) {
        return GroupModel.create({
            _id: id,
            name,
            permissions
        });
    }
    
    getAll() {
        return GroupModel.findAll({
            raw: true
        });
    }

    getById(id) {
        return GroupModel.findOne({
            where: {
                _id: id
            }
        });
    }

    async update(id, payload) {
        const group = await GroupModel.findOne({
            where: {
                _id: id
            }
        });

        if (!group) {
            return Promise.resolve(null);
        }
        
        return GroupModel.update(payload, {
            where: {
                _id: id
            },
            returning: true
        });
    }

    deleteById(id) {
        return GroupModel.destroy({
            where: {
                _id: id
            }
        });
    }
}


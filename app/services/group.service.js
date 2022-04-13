import { GroupRepository } from '../repositories/group.repository.js';
import { UserGroupRepository } from '../repositories/user-group.repository.js';

export class GroupService {
    constructor() {
        this.groupRepository = new GroupRepository();
        this.userGroupRepository = new UserGroupRepository();
    }
    
    getAll() {
        return this.groupRepository.getAll();
    }

    create(id, name, permissions) {
        return this.groupRepository.create(id, name, permissions);
    }

    getById(id) {
        return this.groupRepository.getById(id);
    }

    deleteById(id) {
        return this.groupRepository.deleteById(id);
    }

    updateById(id, payload) {
        return this.groupRepository.update(id, payload);
    }

    addUsersToGroup(groupId, userIds) {
        return this.userGroupRepository.addUsers(groupId, userIds);
    }
}

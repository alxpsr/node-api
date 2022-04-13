import { UserRepository } from '../repositories/user.repository.js';

export class UserService {
    constructor() {
        this.repository = new UserRepository();
    }
    
    filter(query, limit) {
        return this.repository.filter(query, limit);
    }

    getAll() {
        return this.repository.getAll();
    }

    createUser(id, login, password, age) {
        return this.repository.create(id, login, password, age);
    }

    getUserById(id) {
        return this.repository.getById(id);
    }

    deleteUserById(id) {
        return this.repository.delete(id);
    }

    updateUserById(id, payload) {
        return this.repository.update(id, payload);
    }

    getUserByLoginAndPassword(login, pwd) {
        return this.repository.getByLoginAndPassword(login, pwd);
    }
}

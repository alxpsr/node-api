import { v4 as uuidv4 } from 'uuid';
import { UserService } from '../services/user.service.js';
import { Logger } from '../middlewares/error-handler.middleware.js';
import { XhrErrorModel } from '../models/xhr-error.model.js';
import { Inject } from 'injection-js';

export class UserController {
    static get parameters() {
        return [new Inject(UserService)];
    }

    constructor(userService) {
        this._userService = userService;
    }

    async searchUser(req, res) {
        const query = req.query.q;
        const limit = req.query.limit;

        try {
            const result = await this._userService.filter(query, limit);

            if (!result.length) {
                res.status(404).send('User not found');

                return;
            }

            res.status(200).send(result);
        } catch (error) {
            const message = 'Unexpected error during searching user';
            Logger.error(new XhrErrorModel(req.method, message, { query, limit }));
            res.status(500).send(message);
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await this._userService.getAll();
            if (users) {
                res.status(200).json(users);
            }
        } catch (error) {
            const message = 'Unexpected error during getting all users';
            Logger.error(new XhrErrorModel(req.method, message));
            res.status(500).send(message);
        }
    }

    async createUser(req, res) {
        try {
            const newUser = req.body;
            newUser._id = uuidv4();
            newUser.isDeleted = false;
            const result = await this._userService.createUser(newUser._id, newUser.login, newUser.password, newUser.age);

            res.status(200).json(result);
        } catch (error) {
            const message = 'Unexpected error during creating user';
            Logger.error(new XhrErrorModel(req.method, message, {
                user: req.body
            }));
            res.status(500).send(message);
        }
    }

    async getUserById(req, res) {
        try {
            const user = await this._userService.getUserById(req.params.id);

            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).send('User not found');
            }
        } catch (error) {
            const message = 'Unexpected error during getting user by id';
            Logger.error(new XhrErrorModel(req.method, message, {
                userId: req.params.id
            }));
            res.status(500).send(message);
        }
    }

    async deleteUserById(req, res) {
        try {
            const status = await this._userService.deleteUserById(req.params.id);
            res.status(200).send(`User with id ${req.params.id} has been deleted`);
        } catch (error) {
            const message = 'Unexpected error during deleting user';
            Logger.error(new XhrErrorModel(req.method, message, {
                userId: req.params.id
            }));
            res.status(500).send(message);
        }
    }

    async updateUserById(req, res) {
        try {
            const result = await this._userService.updateUserById(req.params.id, req.body);
            res.status(200).send(result);
        } catch (error) {
            const message = 'Unexpected error during updating user';
            Logger.error(new XhrErrorModel(req.method, message, {
                userId: req.params.id,
                payload: req.body
            }));
            res.status(500).send(message);
        }
    }
}

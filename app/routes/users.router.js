import express from 'express';
import { validatorMiddleware } from '../middlewares/validator-middleware.js';
import { userSchema } from '../validation/user.schema.js';
import { UserController } from '../controllers/user.controller.js';
import { Inject } from 'injection-js';
import { checkAccessTokenMiddleware } from '../middlewares/check-access-token.middleware.js';

export class UserRouter {
    static get parameters() {
        return [new Inject(UserController)];
    }
    
    constructor(userController) {
        this._router = express.Router();
        this._userController = userController;
        this.setup();
    }

    setup() {
        this._router.use(checkAccessTokenMiddleware);
        this._router.get('/search', this._userController.searchUser.bind(this._userController));
        this._router.get('/', this._userController.getAllUsers.bind(this._userController));
        this._router.get('/:id', this._userController.getUserById.bind(this._userController));
        this._router.delete('/:id', this._userController.deleteUserById.bind(this._userController));
        this._router.patch('/:id', this._userController.updateUserById.bind(this._userController));
        this._router.post('/', validatorMiddleware(userSchema), this._userController.createUser.bind(this._userController));
    }

    getInstance() {
        return this._router;
    }
}

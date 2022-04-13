import express from 'express';
import { GroupController } from '../controllers/group.controller.js';
import { validatorMiddleware } from '../middlewares/validator-middleware.js';
import { groupSchema, userGroupSchema, updateGroupSchema } from '../validation/group.schema.js';
import { checkAccessTokenMiddleware } from '../middlewares/check-access-token.middleware.js';

export class GroupRouter {
    constructor() {
        this._router = express.Router();
        this._groupController = new GroupController();
        this.setup();
    }

    setup() {
        this._router.use(checkAccessTokenMiddleware);
        this._router.get('/', this._groupController.getAllGroups.bind(this._groupController));
        this._router.post('/', validatorMiddleware(groupSchema), this._groupController.create.bind(this._groupController));
        this._router.get('/:id', this._groupController.getById.bind(this._groupController));
        this._router.patch('/:id', validatorMiddleware(updateGroupSchema), this._groupController.update.bind(this._groupController));
        this._router.delete('/:id', this._groupController.deleteById.bind(this._groupController));
        this._router.post('/add-user', validatorMiddleware(userGroupSchema), this._groupController.addUsersToGroup.bind(this._groupController));
    }

    getInstance() {
        return this._router;
    }
}

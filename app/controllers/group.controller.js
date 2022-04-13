import { GroupService } from '../services/group.service.js';
import { v4 as uuidv4 } from 'uuid';
import { Inject } from 'injection-js';
import { Logger } from '../middlewares/error-handler.middleware.js';
import { XhrErrorModel } from '../models/xhr-error.model.js';

export class GroupController {
    static get parameters() {
        return [new Inject(GroupService)];
    }
    
    constructor(groupService) {
        this._groupService = groupService;
    }

    async getAllGroups(req, res) {
        try {
            const groups = await this._groupService.getAll();
            res.status(200).send(groups);
        } catch (error) {
            const message = 'Unexpected error during getting groups';
            Logger.error(new XhrErrorModel(req.method, message));
            res.status(500).send(message);
        }
    }

    async getById(req, res) {
        try {
            const group = await this._groupService.getById(req.params.id);

            if (group) {
                res.status(200).json(group);
            } else {
                res.status(404).send('Group not found');
            }
        } catch (error) {
            const message = 'Unexpected error during getting group by id';
            Logger.error(new XhrErrorModel(req.method, message, { 
                groupId: req.params.id
            }));
            res.status(500).send(message);
        }
    }
    
    async create(req, res) {
        try {
            const newGroup = req.body;
            newGroup._id = uuidv4();
            const result = await this._groupService.create(newGroup._id, newGroup.name, newGroup.permissions);

            res.status(200).json(result);
        } catch (error) {
            const message = 'Unexpected error during creating group';
            Logger.error(new XhrErrorModel(req.method, message, {
                payload: req.body
            }));
            res.status(500).send(message);
        }
    }
    
    async update(req, res) {
        try {
            const result = await this._groupService.updateById(req.params.id, req.body);

            if (result) {
                res.status(200).send(result);
            } else {
                res.status(404).send('Group with given id not found. Cant update');
            }
        } catch (error) {
            const message = 'Unexpected error during updating group';
            Logger.error(new XhrErrorModel(req.method, message, {
                groupId: req.params.id,
                payload: req.body
            }));
            res.status(500).send(message);
        }
    }

    async deleteById(req, res) {
        try {
            const status = await this._groupService.deleteById(req.params.id);
            res.status(200).send(`Group with id ${req.params.id} has been deleted`);
        } catch (error) {
            const message = 'Unexpected error during deleting group';
            Logger.error(new XhrErrorModel(req.method, message, {
                groupId: req.params.id
            }));
            res.status(500).send(message);
        }
    }

    async addUsersToGroup(req, res) {
        try {
            const metadata = req.body;
            const group = await this._groupService.addUsersToGroup(metadata.groupId, metadata.userIds);
            res.status(200).send(group);
        } catch (error) {
            const message = 'Unexpected error during add user to group';
            Logger.error(new XhrErrorModel(req.method, message, {
                groupId: req.body.groupId,
                userIds: req.body.userIds
            }));
            res.status(500).send(message);
        }
    }
}

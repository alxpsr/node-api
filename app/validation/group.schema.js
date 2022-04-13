import Joi from 'joi';

export const groupSchema = Joi.object({
    name: Joi.string().required(),
    permissions: Joi.array().items(Joi.string().valid(
        'READ',
        'WRITE',
        'DELETE',
        'SHARE',
        'UPLOAD_FILES',
    ))
});

export const userGroupSchema = Joi.object({
    groupId: Joi.string().required(),
    userIds: Joi.array().items(Joi.string()).required()
});

export const updateGroupSchema = Joi.object({
    name: Joi.string(),
    permissions: Joi.array().items(Joi.string().valid(
        'READ',
        'WRITE',
        'DELETE',
        'SHARE',
        'UPLOAD_FILES',
    ))
}).or('name', 'permissions');

import express from 'express';
const router = express.Router();
import { v4 as uuidv4 } from 'uuid';
import * as db from '../db.js';
import { userSchema } from '../validation/user.schema.js';
import { validatorMiddleware } from '../middlewares/validator-middleware.js';


/* UserTypeSchema = {
    id: 'string',
    login: 'string',
    password: 'string',
    age: 'number',
    isDeleted: 'boolean',
}; */

router.get('/search', (req, res) => {
    try {
        const loginSubstring = req.query.q;
        const limit = req.query.limit;
        const result = getAutoSuggestUsers(loginSubstring, limit);

        if (!result.length) {
            res.sendStatus(404);
        }
        res.send(result);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

router.get('/list', (req, res) => {
    res.send(db.state.users);
});

router.get('/:id', (req, res) => {
    try {
        const result = db.state.users.find(user => user.id === req.params.id);
        console.log(req.params);
        if (!result) {
            res.sendStatus(404);
        }

        res.send(result);
    } catch (error) {
        res.sendStatus(500);
    }
});

router.patch('/:id', validatorMiddleware(userSchema), (req, res) => {
    const target = db.state.users.find(user => user.id === req.params.id);

    for (const key in req.body) {
        if (req.body.hasOwnProperty(key)) {
            target[key] = req.body[key];
        }
    }

    res.sendStatus(200);
})

router.post('/', validatorMiddleware(userSchema), (req, res) => {
    const newUser = req.body;
    newUser.id = uuidv4();
    newUser.isDeleted = false;
    db.state.users.push(newUser);

    res.json(newUser.id);
})

router.delete('/:id', (req, res) => {
    try {
        const target = db.state.users.find(user => user.id === req.params.id);

        if (!target) {
            res.sendStatus(404);
        }

        target.isDeleted = true;
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
    }
});

function getAutoSuggestUsers(loginSubstring, limit) {
    const filteredUsers = db.state.users.sort((a, b) => {
        if (a.login < b.login) {
            return -1;
        }

        if (a.login > b.login) {
            return 1;
        }

        return 0;
    }).filter(user => user.login.toLowerCase().indexOf(loginSubstring) > -1);

    if (filteredUsers.length > 1) {
        return filteredUsers.slice(0, limit);
    }

    return [];
}

export default router;

import { Inject } from 'injection-js';
import { UserService } from '../services/user.service.js';
import jwt  from 'jsonwebtoken';

export class AuthController {
    static get parameters() {
        return [new Inject(UserService)];
    }

    constructor(userService) {
        this._userService = userService;
    }

    async login(req, res) {
        const user = await this._userService.getUserByLoginAndPassword(req.body.username, req.body.password);

        if (!user) {
            res.status(404).send(`User with name ${req.body.username} not found`);
        } else {
            res.json({
                accessToken: jwt.sign({
                    id: user._id
                }, process.env.JWT_SECRET)
            });
        }
    }
}

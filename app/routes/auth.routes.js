import express from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { Inject } from 'injection-js';

export class AuthRouter {
    static get parameters() {
        return [new Inject(AuthController)];
    }
    
    constructor(authController) {
        this._router = express.Router();
        this._authController = authController;
        this.setup();
    }

    setup() {
        this._router.post('/login', this._authController.login.bind(this._authController));
    }

    getInstance() {
        return this._router;
    }
}

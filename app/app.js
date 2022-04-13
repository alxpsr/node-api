import express from 'express';
import { UserRouter } from './routes/users.router.js';
import { GroupRouter } from './routes/group.router.js';
import { AuthRouter } from './routes/auth.routes.js';
import { ReflectiveInjector } from 'injection-js';
import { UserService } from './services/user.service.js';
import { GroupService } from './services/group.service.js';
import { UserController } from './controllers/user.controller.js';
import { AuthController } from './controllers/auth.controller.js';
import { commonErrorHandler } from './middlewares/error-handler.middleware.js';
import cors from 'cors';

export class App {
    constructor() {
        const deps = [
            UserService,
            GroupService,
            UserController,
            AuthController,
            UserRouter,
            GroupRouter,
            AuthRouter
        ];
        this.setupDI(deps);
        this.setup();
    }

    setup() {
        this._server = express();
        this.setupBaseRoutes();
        this.setupMiddlewares();
    }

    run(port) {
        this._server.listen(port, () => {
            console.log(`Server listening at http://localhost:${port}`);
        });
    }

    setupMiddlewares() {
        this._userRouter = this._injector.get(UserRouter);
        this._groupRouter = this._injector.get(GroupRouter);
        this._authRouter = this._injector.get(AuthRouter);
        this._server.use(express.json());
        this._server.use(cors());
        this._server.use('/users', this._userRouter.getInstance());
        this._server.use('/groups', this._groupRouter.getInstance());
        this._server.use('/auth', this._authRouter.getInstance());
        this.setDebugRoutes();
        this.setErrorHandlers();
    }

    setupBaseRoutes() {
        this._server.get('/', (req, res) => {
            res.send('ಠ__ಠ');
        });
    }

    setupDI(deps) {
        this._injector = ReflectiveInjector.resolveAndCreate(deps);
    }

    setErrorHandlers() {
        this._server.use(commonErrorHandler);

        process
            .on('unhandledRejection', (reason, p) => {
                console.error(reason, 'Unhandled Rejection at Promise', p);
                process.exit(1);
            })
            .on('uncaughtException', err => {
                console.error(err, 'Uncaught Exception thrown');
                process.exit(1);
            });
    }

    setDebugRoutes() {
        this._server.get('/debug/exception', () => {
            nonExistingFunc();
        });

        this._server.get('/debug/rejection', () => {
            Promise.resolve({ id: 1024 }).then((res) => {
                return JSON.pasre(res); // Note the typo (`pasre`)
            });
        });

        this._server.get('/debug/500', () => {
            throw new Error('Common 500 error');
        });
    }
}


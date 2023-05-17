import express, { NextFunction, Request, Response } from 'express';
import config from 'config';
import morgan from 'morgan';
import cors from 'cors';
import logger from './utils/logger';
import { IRouter } from './interfaces/routes.interface';

class App {


    public app: express.Application;
    public port: number;

    constructor(routers: IRouter[], port: number) {
        this.app = express();
        this.port = port;

        this.InitializeMiddlewares();
        this.InitializeRoutes(routers);
    }

    private InitializeMiddlewares() {

        this.app.use(express.json({ limit: '10kb' }));

        if (process.env.NODE_ENV === 'development') this.app.use(morgan('dev'));

        this.app.use(
            cors({
                origin: config.get<string>('origin'),
                credentials: true,
            })
        );
    }

    private InitializeRoutes(routers: IRouter[]) {
        this.app.get('/api/healthChecker', async (_, res: Response) => {
            res.status(200).json({
                status: 'success',
                message: 'Welcome, we are happy to see you',
            });
        });

        routers.forEach((router: IRouter) => {
            this.app.use("/api" + router.path, router.router);
        });
    }

    public InitializeServer() {
        try {
            this.app.listen(this.port);
            logger.info(`Server started  on http://localhost:${this.port}`);
        }
        catch (err) {
            logger.info(`catch!  Server unable to start`, err);
        }
    }

}


export default App


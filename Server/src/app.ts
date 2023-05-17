require('dotenv').config();

import express, { NextFunction, Request, Response } from 'express';
import config from 'config';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import logger from './utils/logger';
import validateEnv from './utils/validate-env';

validateEnv()

const app = express();
const port = config.get<string>('port')


async function InitMiddelwares() {

    app.use(express.json({ limit: '10kb' }));

    if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

    app.use(cookieParser());

    app.use(
        cors({
            origin: config.get<string>('origin'),
            credentials: true,
        })
    );
}

async function InitRoutes() {
    app.get('/api/healthChecker', async (_, res: Response) => {
        res.status(200).json({
            status: 'success',
            message: 'Welcome, we are happy to see you',
        });
    });
}


async function InitServer() {
    try {
        app.listen(port);
        logger.info(`Server started  on http://localhost:${port}`);
    }
    catch (err) {
        logger.info(`catch!  Server unable to start`, err);
    }
}

async function main() {
    InitMiddelwares()
    InitRoutes()
    InitServer()
}

main().catch((error) => {
    logger.error(error instanceof Error ? error.message : error)
    throw error;
});



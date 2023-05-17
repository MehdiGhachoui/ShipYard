import 'dotenv/config';
import config from 'config';
import App from './app'
import validateEnv from './utils/validate-env';
import { getRoutes } from './app.routes';

validateEnv();

(async () => {
    const app = new App(
        getRoutes(),
        config.get<number>('port')
    );
    app.InitializeServer();
})();
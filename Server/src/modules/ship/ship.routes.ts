import { Router } from 'express';
import ShipController from './ship.controller';
import { IRouter } from '../../interfaces/routes.interface';

class ShipRoutes implements IRouter {
    public path: string;
    public router: Router = Router();

    constructor(path: string) {
        this.path = path;
        this.initializeRoutes(new ShipController());
    }

    private initializeRoutes(controller: ShipController) {
        this.router.get('/', controller.getShips);
    }

}

export default ShipRoutes;
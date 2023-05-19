import { Router } from 'express';
import ShipController from './ship.controller';
import { processRequestBody } from "zod-express-middleware";
import { IRouter } from '../../interfaces/routes.interface';
import { CreateShipSchema, UpdateShipSchema } from './ship.schema';

class ShipRoutes implements IRouter {
    public path: string;
    public router: Router = Router();

    constructor(path: string) {
        this.path = path;
        this.initializeRoutes(new ShipController());
    }

    private initializeRoutes(controller: ShipController) {
        this.router.get('/', controller.getShips);
        this.router.post('/', processRequestBody(CreateShipSchema.body), controller.addShip);
        this.router.put('/:id', processRequestBody(UpdateShipSchema.body), controller.editShip);
        this.router.delete('/:id', controller.deleteShip);
    }

}

export default ShipRoutes;
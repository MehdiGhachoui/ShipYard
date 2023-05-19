import { Request, Response, NextFunction } from 'express';
import ShipService from './ship.service';
import { CreateShipBody, UpdateShipBody } from './ship.schema';
import { StatusCodes } from 'http-status-codes';

class ShipController {
    private service: ShipService;

    constructor() {
        this.service = new ShipService();
    }

    public getShips = async (req: Request, res: Response, next: NextFunction) => {

        const rslt = await this.service.getShips()

        res.status(StatusCodes.OK).json({
            ships: rslt
        });
    }

    public addShip = async (req: Request<{}, {}, CreateShipBody>, res: Response, next: NextFunction) => {

        const rslt = await this.service.addShip(req.body)
        if (rslt)
            res.status(StatusCodes.CREATED).json({
                status: "Success",
                message: "Ship  info added with success"
            });

    }

    public editShip = async (req: Request<{ id: string }, {}, UpdateShipBody>, res: Response, next: NextFunction) => {

        const reslt = await this.service.editShip({ id: req.params.id, body: req.body })

        console.log(reslt)
        if (reslt) {
            res.status(StatusCodes.OK).json({
                status: "Success",
                message: "Ship  info  updated with success"
            });
        }

        else res.status(StatusCodes.NOT_FOUND).json({
            status: "Error",
            message: "Ship Not Found"
        });
    }

    public deleteShip = async (req: Request<{ id: string }, {}, {}>, res: Response, next: NextFunction) => {

        const rslt = await this.service.deleteShip(req.params.id)

        if (rslt)
            res.status(StatusCodes.OK).json({
                status: "Success",
                message: "Ship  info  deleted with success"
            });

        else res.status(StatusCodes.NOT_FOUND).json({
            status: "Error",
            message: "Ship Not Found"
        });
    }

}


export default ShipController;
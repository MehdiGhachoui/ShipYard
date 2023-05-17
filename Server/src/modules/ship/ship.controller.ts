import { Request, Response, NextFunction } from 'express';
import ShipService from './ship.service';

class ShipController {
    private service: ShipService;

    constructor() {
        this.service = new ShipService();
    }

    public getShips = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = this.service.getShips()
            res.status(201).json({
                ships: data
            });
        } catch (error) {
            res.status(500).json({
                error: error
            });
        }

    }
}

export default ShipController;
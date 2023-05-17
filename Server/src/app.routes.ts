import { IRouter } from "./interfaces/routes.interface"
import ShipRoutes from "./modules/ship/ship.routes";


export const getRoutes = () => {
    const routers: IRouter[] = [
        new ShipRoutes('/ship')
    ];

    return routers;
} 
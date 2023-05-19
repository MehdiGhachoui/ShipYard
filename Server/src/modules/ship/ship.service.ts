import fs from "fs"
import { nanoid } from 'nanoid'
import { CreateShipBody, UpdateShipBody } from "./ship.schema";


class ShipService {
    private filePath: string;

    constructor() {
        this.filePath = __dirname + '\\data.json'
    }

    public getShips = async (): Promise<[IShip]> => {
        const data = await this.readDataFromFile()
        return data;
    }

    public addShip = async (payload: CreateShipBody) => {

        const data = await this.readDataFromFile();
        const newItem = { Id: nanoid(), ...payload };
        data.push(newItem);
        await this.saveDataToFile(data);

        return payload
    };

    public editShip = async (payload: { id: string, body: UpdateShipBody }) => {

        const data = await this.readDataFromFile();
        const index = data.findIndex((item) => item.Id === payload.id);

        if (index !== -1) {
            data[index] = { Id: payload.id, ...payload.body };
            await this.saveDataToFile(data);

            return true
        }

        return false
    };

    public deleteShip = async (id: string) => {

        const data = await this.readDataFromFile();
        const index = data.findIndex((item) => item.Id === id);
        if (index !== -1) {
            data.splice(index, 1);
            await this.saveDataToFile(data);

            return true
        }

        return false
    };


    private readDataFromFile = async (): Promise<[IShip]> => {
        const data = await fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data);
    }

    private saveDataToFile = async (data: any) => {
        await fs.writeFileSync(this.filePath, JSON.stringify(data), 'utf8');
    }


}

export default ShipService;
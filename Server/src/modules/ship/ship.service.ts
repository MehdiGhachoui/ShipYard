import { Console } from "console";
import fs from "fs"

class ShipService {
    private filePath: string;

    constructor() {
        this.filePath = __dirname + '\\data.json'
    }

    public getShips = () => {

        const data = this.readDataFromFile()

        return data;
    }


    private readDataFromFile = () => {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }


}

export default ShipService;
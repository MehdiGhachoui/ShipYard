
import * as fs from "fs"; // or const fs = require("fs");
import ShipService from "./ship.service";
import { json } from "envalid";

jest.mock('fs');


describe('Ship Service', () => {

    let shipService: ShipService;

    beforeEach(async (): Promise<void> => {
        shipService = new ShipService();

        jest.spyOn(fs, "writeFileSync").mockClear()

        jest.spyOn(fs, "readFileSync").mockReturnValue((JSON.stringify([{ Id: "XXX", name: 'shipOne', length: 11, width: 11, code: "XXXX" }])));
    });

    test("Get All Ships Test", async () => {
        const retVal = await shipService.getShips();
        expect(retVal).toEqual([{ Id: "XXX", name: 'shipOne', length: 11, width: 11, code: "XXXX" }]);
    });

    test("Add New Ship Test", async () => {
        const retVal = await shipService.addShip({ name: 'shipOne', length: 11, width: 11, code: "XXXX" });
        expect(retVal).toEqual({ name: 'shipOne', length: 11, width: 11, code: "XXXX" });
    });

    test("Edit Ship Test", async () => {
        const val = await shipService.editShip({ id: "XXX", body: { name: "ShipTwo", length: 12, width: 12, code: "YYYY" } });
        expect(val).toBe(true)
    });

    test("Delete Ship Test", async () => {
        const retVal = await shipService.deleteShip("XXX");
        expect(retVal).toEqual(true);
    });
})
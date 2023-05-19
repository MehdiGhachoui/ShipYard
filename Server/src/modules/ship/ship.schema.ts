import { number, object, string, TypeOf } from "zod";

export const CreateShipSchema = {
    body: object({
        name: string({
            required_error: "name is required",
        }),
        length: number({
            required_error: "length is required",
        }),
        width: number({
            required_error: "width is required",
        }),
        code: string(
            { required_error: "code is required", }
        ).regex(new RegExp('^[A-Z]{4}\-[0-9]{4}\-[A-Z][0-9]$'), "Invalid  ship code")
    })
};

export const UpdateShipSchema = {
    body: object({
        name: string({
            required_error: "name is required",
        }),
        length: number({
            required_error: "length is required",
        }),
        width: number({
            required_error: "width is required",
        }),
        code: string(
            { required_error: "code is required", }
        ).regex(new RegExp('^[A-Z]{4}\-[0-9]{4}\-[A-Z][0-9]$'), "Invalid  ship code")
    })
};


export type CreateShipBody = TypeOf<typeof CreateShipSchema.body>;

export type UpdateShipBody = TypeOf<typeof UpdateShipSchema.body>;

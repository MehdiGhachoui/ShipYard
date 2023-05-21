import { IShip } from "../Interfaces/IShip";

export const searchShips = async (url: string): Promise<IShip[]> => {
    const res = await fetch(`${import.meta.env.VITE_ORIGIN}${url}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    return res.json();
};


type PostData = Omit<IShip, "Id">

export const newShip = async ({ url, data }: { url: string, data: PostData }): Promise<IShip[]> => {

    console.log(JSON.stringify(data))
    const res = await fetch(`${import.meta.env.VITE_ORIGIN}${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    return res.json();
};
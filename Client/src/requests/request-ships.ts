import { IShip } from "../Interfaces/IShip";

export const searchShips = async (url: string): Promise<IShip[]> => {
    const res = await fetch(`${import.meta.env.VITE_ORIGIN}${url}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    return res.json();
};


type PostData = Omit<IShip, "Id">

export const newShip = async ({ url, data }: { url: string, data: PostData }) => {

    await fetch(`${import.meta.env.VITE_ORIGIN}/${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
};

export const updateShip = async ({ url, id, data }: { url: string, id: string, data: PostData }) => {

    await fetch(`${import.meta.env.VITE_ORIGIN}/${url}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

};


export const deleteShip = async ({ url, id }: { url: string, id: string }) => {

    await fetch(`${import.meta.env.VITE_ORIGIN}/${url}/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });
};
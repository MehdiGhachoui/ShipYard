import Navbar from "../components/Navbar"
import ShipSearch from "../components/ships/ShipSearch"
import { deleteShip, newShip, searchShips, updateShip } from "../requests/request-ships"
import { IShip } from "../Interfaces/IShip"
import { toast } from "react-toastify"


type ActionData = {
    name: string,
    length: number,
    width: number,
    code: string,
    _action: string,
    shipId: string
}


export async function dashboardLoader() {
    const data = await searchShips("/ship")

    return data
}

export async function dashboardAction({ request }: { request: Request }) {
    const rslt = await request.formData()

    const { _action, ...values } = Object.fromEntries(rslt)

    const data = values as unknown as ActionData

    const ship: Omit<IShip, "Id"> = {
        name: data.name,
        length: +data.length,
        width: +data.width,
        code: data.code,
    }


    if (_action == "addShip") {
        await newShip({ url: "ship", data: ship })
        return toast.success("Ship Info has been added with success")
    }

    if (_action == "updateShip") {
        await updateShip({ url: "ship", id: data.shipId, data: ship })
        return toast.success("Ship Info has been updated with success")
    }

    if (_action == "deleteShip") {
        await deleteShip({ url: "ship", id: data.shipId, })
        return toast.success("Ship Info has been deleted with success")
    }
}

const Dashboard = () => {

    return (
        <div>
            <Navbar />

            <div className='rounded-div my-12 py-8'>
                <ShipSearch />
            </div>

        </div>
    )
}

export default Dashboard
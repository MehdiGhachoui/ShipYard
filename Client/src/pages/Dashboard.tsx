import Navbar from "../components/Navbar"
import ShipSearch from "../components/ships/ShipSearch"
import { newShip, searchShips } from "../requests/request-ships"
import { IShip } from "../Interfaces/IShip"
import { toast } from "react-toastify"

export async function dashboardLoader() {
    const data = await searchShips("/ship")

    return data
}

export async function dashboardAction({ request }: { request: Request }) {
    const rslt = await request.formData()

    const { _action, ...values } = Object.fromEntries(rslt)


    console.log(_action, values)
    // const data = values as unknown as IShip

    // const ship: Omit<IShip, "Id"> = {
    //     name: data.name,
    //     length: +data.length,
    //     width: +data.width,
    //     code: data.code,
    // }
    // try {
    //     newShip({ url: "/ship", data: ship })
    //     return toast.success("Ship Info has been added with success")
    // } catch (err) {
    //     return toast.error("Something went wrong")
    // }

    return true
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
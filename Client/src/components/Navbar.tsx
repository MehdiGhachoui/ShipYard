import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <header className="border rounded-2xl shadow-xl px-2 max-w-[1140px] w-full mx-auto py-6  ">
            <div className="container mx-auto">
                <Link to={"/"}>
                    <h1 className="text-2xl">ShipYard</h1>
                </Link>
            </div>
        </header>
    )
}

export default Navbar
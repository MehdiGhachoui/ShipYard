import { ColumnDef } from '@tanstack/react-table';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { useMemo, useState } from "react";
import { Table } from "../Table"
import { IShip } from '../../Interfaces/IShip';
import ShipAdd from './ShipAdd';
import { useLoaderData } from 'react-router-dom';
import ShipEdit from './ShipEdit';
import ShipDelete from './ShipDelete';

type FetchedData = {
    ships: IShip[]
}

const ShipSearch = () => {

    const { ships } = useLoaderData() as FetchedData

    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const [ship, setShip] = useState<IShip>()

    const cols = useMemo<ColumnDef<IShip>[]>(() => [
        {
            header: () => <div className="px-4">Name</div>,
            cell: (props) => props.renderValue(),
            accessorKey: 'name',
        },
        {
            header: () => <div className="px-4">Length</div>,
            cell: (props) => props.renderValue(),
            accessorKey: 'length',
        },
        {
            header: () => <div className="px-4">Width</div>,
            cell: (props) => props.renderValue(),
            accessorKey: 'width',
        },
        {
            header: () => <div className="px-4">Code</div>,
            cell: (props) => props.renderValue(),
            accessorKey: 'code',
        },

        {
            header: '',
            cell: (props) => (<div className='flex justify-evenly '>
                <button onClick={() => { setShowEditModal(true), setShip(ships.find(x => x.Id == props.row.original.Id)) }} className='flex items-center justify-center text-green-600 rounded-2xl border-2 border-green-600 p-2  hover:cursor-pointer shadow-xl'>
                    <BsPencil />
                </button>

                <button onClick={() => { setShowDeleteModal(true), setShip(ships.find(x => x.Id == props.row.original.Id)) }} className='flex items-center justify-center text-red-600 rounded-2xl border-2 border-red-600 p-2  hover:cursor-pointer shadow-xl'>
                    <BsTrash />
                </button>
            </div>
            ),
            accessorKey: 'id',
        },


    ], [])

    return (
        <>

            <div className='border rounded-2xl shadow-xl px-2 max-w-[1140px] w-full mx-auto my-4'>
                <div className='flex flex-col md:flex-row justify-between pt-4 pb-6 text-center md:text-right'>
                    <form>
                        <input
                            // onChange={(e) => setSearchText(e.target.value)}
                            className='w-full border-2 px-4 py-2 rounded-2xl shadow-xl'
                            type='text'
                            placeholder='Search a ship'
                        />
                    </form>

                    <div>
                        <button onClick={() => setShowAddModal(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl shadow-xl">
                            New Ship
                        </button>
                    </div>
                </div>

                <Table data={ships} columns={cols} />
            </div>


            <ShipAdd showModal={showAddModal} setShowModal={setShowAddModal} />
            <ShipEdit ship={ship} showModal={showEditModal} setShowModal={setShowEditModal} />
            <ShipDelete ship={ship} showModal={showDeleteModal} setShowModal={setShowDeleteModal} />
        </>
    )
}

export default ShipSearch
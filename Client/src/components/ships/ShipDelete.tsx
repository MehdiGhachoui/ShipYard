import { useSubmit } from "react-router-dom"
import Modal from "../Modal"
import { useFormik } from "formik";

type Props = {
    shipId: string,
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}



const ShipDelete = ({ shipId, showModal, setShowModal }: Props) => {

    const submit = useSubmit();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {},
        onSubmit: async (values, { resetForm }) => {

            submit({ ...values, _action: "deleteShip", shipId: shipId }, { method: "delete" });
            resetForm()
            setShowModal(false)
        },
    });

    return (
        <Modal showModal={showModal} header={"Delete Ship"}>
            <form method="post" onSubmit={formik.handleSubmit}>
                <div className="relative p-6 flex-auto w-full">

                    Are you sure want to delete this information ?
                </div>

                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                    >
                        Close
                    </button>
                    <button
                        className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default ShipDelete
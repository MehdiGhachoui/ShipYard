import { useLoaderData, useSubmit } from "react-router-dom"
import Modal from "../Modal"
import { useFormik } from "formik";
import { shipValidationSchema } from "../../schemas/ship.schema";
import { useEffect } from "react";
import { IShip } from "../../Interfaces/IShip";

type Props = {
    shipId: string,
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

type NewShipData = {
    name: string;
    length: string;
    width: string;
    code: string;
};

type FetchedData = {
    ships: IShip[]
}

const ShipEdit = ({ shipId, showModal, setShowModal }: Props) => {

    const { ships } = useLoaderData() as FetchedData

    const submit = useSubmit();

    const formik = useFormik<NewShipData>({
        enableReinitialize: true,
        initialValues: {
            name: "",
            length: "",
            width: "",
            code: "",
        },
        validationSchema: shipValidationSchema,
        onSubmit: async (values, { resetForm }) => {
            submit({ ...values, _action: "updateShip", shipId: shipId }, { method: "put" });
            resetForm()
            setShowModal(false)
        },
    });

    useEffect(() => {
        let ship = ships.find(x => x.Id == shipId)
        formik.setFieldValue("name", ship?.name)
        formik.setFieldValue("code", ship?.code)
        formik.setFieldValue("length", ship?.length)
        formik.setFieldValue("width", ship?.width)

    }, [shipId])

    return (
        <Modal showModal={showModal} header={"Edit Ship"}>
            <form method="post" onSubmit={formik.handleSubmit}>
                <div className="relative p-6 flex-auto w-full">

                    <div className="mb-6 w-full">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900"> Name <span className="text-red-500">*</span></label>
                        <input type="text" value={formik.values.name} onChange={formik.handleChange} name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="eg, Titanic" formNoValidate />
                        {formik.touched.name && formik.errors.name && <span className="mt-2 text-sm text-red-500 "> {formik.errors.name}</span>}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="length" className="block mb-2 text-sm font-medium text-gray-900">Length <span className="text-red-500">*</span></label>
                        <input type="number" value={formik.values.length} onChange={formik.handleChange} min={0} step="any" id="length" name="length" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="eg, 150 (meters)" formNoValidate />
                        {formik.touched.length && formik.errors.length && <span className="mt-2 text-sm text-red-500 " > {formik.errors.length}</span>}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="width" className="block mb-2 text-sm font-medium text-gray-900">Width <span className="text-red-500">*</span></label>
                        <input type="number" value={formik.values.width} onChange={formik.handleChange} min={0} step="any" id="width" name="width" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="eg, 150 (meters)" formNoValidate />
                        {formik.touched.width && formik.errors.width && <span className="mt-2 text-sm text-red-500 " > {formik.errors.width}</span>}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900">Code <span className="text-red-500">*</span></label>
                        <input type="text" value={formik.values.code} onChange={formik.handleChange} id="code" name="code" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="eg, AAAA-1111-A1" formNoValidate />
                        {formik.touched.code && formik.errors.code && <span className="mt-2 text-sm text-red-500 "> {formik.errors.code}</span>}
                    </div>
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

export default ShipEdit
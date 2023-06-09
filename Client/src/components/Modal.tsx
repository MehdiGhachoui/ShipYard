type Props = {
    showModal: boolean,
    header: string,
    children: JSX.Element
}

const Modal = ({ showModal, header, children }: Props) => {
    if (!showModal) return null;

    return (

        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative  my-6 mx-auto w-[600px]  ">

                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-2xl font-semibold">
                                {header}
                            </h3>

                        </div>
                        {children}
                    </div>
                </div>
            </div >
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>

    );
};

export default Modal;
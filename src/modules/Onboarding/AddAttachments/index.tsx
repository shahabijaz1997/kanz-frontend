import { useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import { useNavigate } from "react-router-dom";
import Header from "../../../shared/components/Header";
import CrossIcon from "../../../ts-icons/crossIcon.svg";
import FileUpload from "../../../shared/components/FileUpload";
import React, { useState } from "react";
import Modal from "../../../shared/components/Modal";
import Drawer from "../../../shared/components/Drawer";
import HoverModal from "../../../shared/components/HoverModal";
import SampleImage from "../../../assets/example_id.png";
import SampleImage_2 from "../../../assets/example_id_2.png";
import { FileType } from "../../../enums/types.enum";

const AddAttachments = (props: any) => {
    const navigate = useNavigate();
    const language: any = useSelector((state: RootState) => state.language.value);
    const [uploading, setUploading] = useState([
        { title: language?.common?.idProof, sub: language?.common?.uploadPic, id: "id" }, { title: language?.common?.uploadSelfie, sub: language?.common?.uploadSelfie, id: "self" }, { title: language?.common?.resProof, sub: language?.common?.resProof, id: "res" }
    ]);
    const [selectedId, setSelectedId]: any = useState(null);
    const [modalOpen, setModalOpen]: any = useState(null);
    const [isOpen, setOpen] = useState(false);
    const [fileType, setFileType]: any = useState(null);
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    return (
        <main className="h-full max-h-full background-auth overflow-y-auto">
            <section>
                <Header custom={true} data={{ leftMenu: language.header.attachment, button: <button className=""><CrossIcon stroke="#171717" className="w-6 h-6" /></button> }} />
            </section>

            <aside className="w-[420px] h-full screen500:max-w-[300px] mx-auto py-12">
                <section className="flex items-start justify-center flex-col">
                    <h3 className="text-colorBlack1 font-bold text-2xl">{language.buttons.addAttachment}</h3>
                    <p className="text-neutral-700 font-medium text-base">
                        <span>{language.philosophyGoals.uploadNecessary}</span>&nbsp;
                        <span className="color-blue cursor-pointer" onClick={() => setOpen(true)}>{language.philosophyGoals.whyToDo}</span>
                    </p>
                </section>

                <section className="flex items-start justify-center flex-col mt-8">
                    <form className="pt-12 mb-4 w-full">
                        {React.Children.toArray(
                            uploading.map(item => {
                                return (
                                    <div className="mb-4 w-full">
                                        <div className="block text-neutral-700 text-base font-medium">
                                            <div>{item.title}</div>
                                            <small className="text-neutral-700 font-normal">{item.sub}</small>
                                            <small className="relative font-normal color-blue cursor-pointer" onMouseEnter={() => setSelectedId(item.id)} onMouseLeave={() => setSelectedId(null)}>
                                                &nbsp;<span>{language?.common?.example}</span>
                                                {selectedId === item.id && (
                                                    <HoverModal>
                                                        <section className="inline-flex flex-row items-center justify-evenly h-full">
                                                            <img src={SampleImage_2} alt={item.title} className="max-h-[90px]" />
                                                            <img src={SampleImage} alt={item.title} className="max-h-[140px]" />
                                                        </section>
                                                    </HoverModal>
                                                )}
                                            </small>
                                            <FileUpload id={item.id} setModalOpen={(e: any) => {
                                                setModalOpen(e.open ? e.url : null);
                                                e.type && setFileType(e.type);
                                            }} />
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </form>
                </section>

                <section className="w-full inline-flex items-center gap-2 rounded-md border border-grey w-[420px] p-4 check-background cursor-pointer" onClick={() => setAgreeToTerms(!agreeToTerms)}>
                    <input type="checkbox" className="accent-cyan-800 h-3 w-3" checked={agreeToTerms} />
                    <p className="text-neutral-500 text-sm font-normal">{language?.common?.agree}&nbsp;<span className="color-blue font-medium">{language?.common?.termsConditions}</span></p>
                </section>

                <section className="w-full inline-flex items-center justify-between py-16">
                    <button className="text-neutral-900 font-semibold rounded-md border border-grey font-semibold rounded-md focus:outline-none focus:shadow-outline h-[38px] w-[140px]" type="button" onClick={() => navigate("/")}>
                        {language?.buttons?.back}
                    </button>
                    <button className="text-white font-semibold rounded-md focus:outline-none focus:shadow-outline primary-bg h-[38px] w-[140px]" type="button" onClick={() => setModalOpen(true)}>
                        {language?.buttons?.submit}
                    </button>
                </section>
            </aside>
            <Drawer isOpen={isOpen} setIsOpen={(val: boolean) => setOpen(val)}>
                <header className="font-bold text-xl">{language.philosophyGoals.whyToDo}</header>
                <p className="text-neutral-700 font-normal text-sm text-justify">
                    Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus,
                    ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl.
                </p>
            </Drawer>
            <Modal show={modalOpen ? true : false}>
                {(typeof modalOpen === "string") ? (
                    <React.Fragment>
                        <div className="rounded-md h-8 w-8 inline-grid place-items-center cursor-pointer absolute right-2 top-2" style={{ backgroundColor: "rgba(0, 0, 0, 0.078" }}>
                            <CrossIcon stroke="#fff" className="w-6 h-6" onClick={() => {
                                setModalOpen(null);
                            }} />
                        </div>
                        {fileType === FileType.IMAGE ? <img src={modalOpen} alt="Img" className="max-h-[100%]" /> : <embed src={modalOpen} type="application/pdf" className="w-[80%] h-[90%]" />}
                    </React.Fragment>
                ) : (
                    <div className="p-12 rounded-md shadow-cs-1 flex flex-col items-center w-full bg-white outline-none focus:outline-none screen800:px-3">
                        <h3 className="text-xl font-bold text-center">{language.modal.thankyou} {language.modal.sub_1}</h3>

                        <div className="w-[80%] screen800:w-full">
                            <p className="mt-8 text-sm font-normal text-neutral-500 text-center leading-relaxed">{language.modal.sub_2}</p>
                            <p className="mt-4 text-sm font-normal text-neutral-500 text-center leading-relaxed">{language.modal.sub_3}</p>
                            <p className="text-sm font-normal text-neutral-500 text-center leading-relaxed">{language.modal.sub_4} <span className="color-blue">012-345678</span></p>
                        </div>

                        <button className="mt-8 bg-cyan-800 text-white w-[120px] h-9 inline-flex items-center justify-center rounded-md" type="button" onClick={() => {
                            setModalOpen(false);
                        }}>
                            {language.buttons.continue}
                        </button>
                    </div>
                )}
            </Modal>
        </main>
    )
};
export default AddAttachments;
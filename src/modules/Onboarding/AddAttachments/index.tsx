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

const AddAttachments = (props: any) => {
    const navigate = useNavigate();
    const language: any = useSelector((state: RootState) => state.language.value);
    const [uploading, setUploading] = useState([
        { title: language?.common?.idProof, sub: language?.common?.uploadPic, id: "id" }, { title: language?.common?.uploadSelfie, sub: language?.common?.uploadSelfie, id: "self" }, { title: language?.common?.resProof, sub: language?.common?.resProof, id: "res" }
    ]);
    const [selectedId, setSelectedId]: any = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [imgPreview, setImgPreview]: any = useState();
    const [isOpen, setOpen] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    return (
        <main className="h-full max-h-full background-auth">
            <section className="h-[67px]">
                <Header custom={true} data={{ leftMenu: language.header.attachment, button: <button className=""><CrossIcon stroke="#171717" /></button> }} />
            </section>

            <aside className="w-[420px] screen500:max-w-[300px] mx-auto pb-6" style={{ height: "calc(100% - 67px)" }}>
                <section className="flex items-start justify-center flex-col mt-12">
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
                                    <div className="mb-4 w-full relative">
                                        <div className="block text-neutral-700 text-base font-medium">
                                            <div>{item.title}</div>
                                            <small className="text-neutral-700 font-normal">{item.sub}</small> <small className="font-normal color-blue cursor-pointer" onMouseEnter={() => setSelectedId(item.id)} onMouseLeave={() => setSelectedId(null)}>{language?.common?.example}</small>
                                            <FileUpload id={item.id} setModalOpen={(e: any) => {
                                                setModalOpen(e.open);
                                                setImgPreview(e.url);
                                            }} />
                                        </div>
                                        {selectedId === item.id && (
                                            <HoverModal>
                                                a
                                            </HoverModal>
                                        )}
                                    </div>
                                )
                            })
                        )}
                    </form>
                </section>

                <section className="w-full inline-flex items-start gap-2 rounded-md border border-grey w-[420px] p-4 check-background cursor-pointer" onClick={() => setAgreeToTerms(!agreeToTerms)}>
                    <input type="checkbox" className="accent-cyan-800 h-3 w-3" checked={agreeToTerms} />
                    <p className="text-neutral-500 text-sm font-normal">{language?.common?.agree}&nbsp;<span className="color-blue font-medium">{language?.common?.termsConditions}</span></p>
                </section>

                <section className="w-full inline-flex items-center justify-between mt-16">
                    <button className="text-neutral-900 font-semibold rounded-md border border-grey font-semibold rounded-md focus:outline-none focus:shadow-outline h-[38px] w-[140px]" type="button" onClick={() => navigate("/")}>
                        {language?.buttons?.back}
                    </button>
                    <button className="text-white font-semibold rounded-md focus:outline-none focus:shadow-outline submit-bg h-[38px] w-[140px]" type="button" onClick={() => navigate("/")}>
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
            <Modal show={modalOpen}>
                <div className="rounded-md h-8 w-8 inline-grid place-items-center cursor-pointer absolute right-2 top-2" style={{ backgroundColor: "rgba(0, 0, 0, 0.078" }}>
                    <CrossIcon stroke="#fff" onClick={() => {
                        setModalOpen(false);
                        setImgPreview(null);
                    }} />
                </div>
                <img src={imgPreview} alt="Img" />
            </Modal>
        </main>
    )
};
export default AddAttachments;
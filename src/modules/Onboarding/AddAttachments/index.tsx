import { useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import Header from "../../../shared/components/Header";
import CrossIcon from "../../../ts-icons/crossIcon.svg";
import FileUpload from "../../../shared/components/FileUpload";
import { useState } from "react";
import Modal from "../../../shared/components/Modal";

const AddAttachments = (props: any) => {
    const language: any = useSelector((state: RootState) => state.language.value);
    const [modalOpen, setModalOpen] = useState(false);
    const [imgPreview, setImgPreview]: any = useState();

    return (
        <main className="h-full max-h-full background-auth">
            <section className="h-[67px]">
                <Header custom={true}
                    data={{
                        leftMenu: language.header.attachment,
                        button: <button className=""><CrossIcon stroke="#171717" /></button>
                    }} />
            </section>

            <aside className="w-full flex items-center justify-center flex-col pt-12 pb-5">
                <section className="flex items-start justify-center flex-col mt-12 w-[420px] screen500:max-w-[300px]">
                    <h3 className="text-colorBlack1 font-bold text-2xl">{language.buttons.addAttachment}</h3>
                    <p className="text-neutral-700 font-medium text-base">
                        <span>{language.philosophyGoals.uploadNecessary}</span>&nbsp;
                        <span className="color-blue cursor-pointe">{language.philosophyGoals.whyToDo}</span>
                    </p>
                </section>

                <section className="flex items-start justify-center flex-col mt-8 w-[420px] screen500:max-w-[300px]">
                    <form className="pt-12 pb-8 mb-4 w-full">
                        <div className="mb-7 w-full">
                            <label className="block text-neutral-700 text-base font-medium" htmlFor="id-proof">
                                <div>{language?.common?.idProof}</div>
                                <small className="text-neutral-700 font-normal">{language?.common?.uploadPic}</small> <small className="font-normal color-blue">{language?.common?.example}</small>

                                <FileUpload setModalOpen={(e: any) => {
                                    setModalOpen(e.open);
                                    setImgPreview(e.url);
                                }} />
                            </label>
                        </div>
                       
                        <div className="mb-7 w-full">
                            <label className="block text-neutral-700 text-base font-medium" htmlFor="id-proof">
                                <div>{language?.common?.selfProof}</div>
                                <small className="text-neutral-700 font-normal">{language?.common?.uploadSelfie}</small> <small className="font-normal color-blue">{language?.common?.example}</small>

                                <FileUpload setModalOpen={(e: any) => {
                                    setModalOpen(e.open);
                                    setImgPreview(e.url);
                                }} />
                            </label>
                        </div>
                      
                        <div className="mb-4 w-full">
                            <label className="block text-neutral-700 text-base font-medium" htmlFor="id-proof">
                                <div>{language?.common?.resProof}</div>
                                <small className="text-neutral-700 font-normal">{language?.common?.uploadProperty}</small> <small className="font-normal color-blue">{language?.common?.example}</small>

                                <FileUpload setModalOpen={(e: any) => {
                                    setModalOpen(e.open);
                                    setImgPreview(e.url);
                                }} />
                            </label>
                        </div>
                    </form>
                </section>
            </aside>

            <Modal show={modalOpen}>
                <div className="rounded-md h-8 w-8 inline-grid place-items-center cursor-pointer absolute right-2 top-2" style={{backgroundColor: "rgba(0, 0, 0, 0.078"}}>
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
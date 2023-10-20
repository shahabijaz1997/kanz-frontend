import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import FileSVG from "../../../assets/svg/file.svg";
import PreviewIcon from "../../../ts-icons/previewIcon.svg";
import Modal from "../../../shared/components/Modal";
import CrossIcon from "../../../ts-icons/crossIcon.svg";
import { FileType } from "../../../enums/types.enum";

const DocumentDetails = ({ dealDocs }: any) => {
    const language: any = useSelector((state: RootState) => state.language.value);
    const [modalOpen, setModalOpen]: any = useState(null);

    return (
        <aside>
            {React.Children.toArray(
                dealDocs?.map((doc: any) => {
                    return (
                        <section className="rounded-md bg-cbc-grey-sec px-1 py-2 m-5 inline-flex items-center justify-between w-[40%] border-[1px] border-neutral-200">
                            <span className="inline-flex items-center">
                                <div className="rounded-[7px] bg-white shadow shadow-cs-3 w-14 h-14 inline-grid place-items-center">
                                    <img src={FileSVG} alt="File" />
                                </div>
                                <span className="inline-flex flex-col items-start ml-3">
                                    <h2 className="text-sm font-medium text-neutral-900 max-w-[150px] truncate" title={doc?.name}>{doc?.name}</h2>
                                </span>
                            </span>

                            <div className="rounded-lg w-20 h-6 inline-flex items-center flex-row justify-center gap-2 bg-white cursor-pointer" onClick={() => setModalOpen({ url: doc.url, open: true, type: doc?.attachment_kind })}>
                                <PreviewIcon stroke="#404040" />
                                <small className="text-neutral-700 text-sm font-medium">{language.buttons.preview}</small>
                            </div>
                        </section>
                    )
                })
            )}

            <Modal show={modalOpen ? true : false} className="w-full">
                <div className="rounded-md h-8 w-8 inline-grid place-items-center cursor-pointer absolute right-2 top-2" style={{ backgroundColor: "rgba(0, 0, 0, 0.078" }}>
                    <CrossIcon stroke="#fff" className="w-6 h-6" onClick={() => setModalOpen(null)} />
                </div>
                {modalOpen?.attachment_kind === FileType.IMAGE ? (
                    <img src={modalOpen?.url} alt="Img" className="max-h-[100%]" />
                ) : (
                    <embed src={modalOpen?.url} type="application/pdf" className="w-[100%] h-[90%]" />
                )}
            </Modal>
        </aside>
    )
};
export default DocumentDetails;
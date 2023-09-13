import { useSelector } from "react-redux";
import { RootState } from "../../../../redux-toolkit/store/store";
import FileSVG from "../../../../assets/svg/file.svg";
import PreviewIcon from "../../../../ts-icons/previewIcon.svg";
import { useState } from "react";

const DocumentDetails = ({ setModalOpen }: any) => {
    const language: any = useSelector((state: RootState) => state.language.value);
    const [selectedFile, setSelectedFile]: any = useState<File | null>(null);

    return (
        <aside>
            <section className="rounded-md bg-cbc-grey-sec px-1 py-2 inline-flex items-center justify-between w-[40%] border-[1px] border-neutral-200">
                <span className="inline-flex items-center">
                    <div className="rounded-[7px] bg-white shadow shadow-cs-3 w-14 h-14 inline-grid place-items-center">
                        <img src={FileSVG} alt="File" />
                    </div>
                    <span className="inline-flex flex-col items-start ml-3">
                        <h2 className="text-lg font-medium text-neutral-900">Pitch Deck</h2>
                        <small className="text-xs text-neutral-700 font-normal">23 KBs</small>
                    </span>
                </span>

                <div className="rounded-lg w-20 h-6 inline-flex items-center flex-row justify-center gap-2 bg-white cursor-pointer" onClick={() => setModalOpen({ url: selectedFile.url, open: true, type: selectedFile.type })}>
                    <PreviewIcon stroke="#404040" />
                    <small className="text-neutral-700 text-sm font-medium">{language.buttons.preview}</small>
                </div>
            </section>
        </aside>
    )
};
export default DocumentDetails;
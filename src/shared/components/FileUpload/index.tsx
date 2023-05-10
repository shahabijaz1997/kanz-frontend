import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import AddImage from "../../../ts-icons/addImageIcon.svg";
import BinIcon from "../../../ts-icons/binIcon.svg";
import PreviewIcon from "../../../ts-icons/previewIcon.svg";
import FIleUploadAlert from "../FIleUploadAlert";
import { FileType, PromptMessage } from "../../../enums/types.enum";
import { fileSize, formatFileSize, validTypes } from "../../../utils/size-check.utils";

const FileUpload = ({ id, setModalOpen }: any) => {
    const language: any = useSelector((state: RootState) => state.language.value);
    const [dragOver, setDragOver] = useState(false);
    const [selectedFile, setSelectedFile]: any = useState<File | null>();
    const [fileInfo, setFileInfo]: any = useState<File | null>();
    const [alertTye, setAlertType]: any = useState({});

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = () => {
        setDragOver(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];

        if (validTypes.includes(file.type)) setFileInformation(file);
        else setAlertType({ type: PromptMessage.ERROR, message: language.promptMessages.invalidFormat });
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: any = e.target.files?.[0];
        setFileInformation(file);
        e.target.value = "";
    };

    const setFileInformation = (file: File) => {
        let size = fileSize(file.size, "mb");
        if (size > 10) {
            let message = `${language.promptMessages.bigFile} (${size}MB) ${language.promptMessages.maxSize} 10MB`
            return setAlertType({ type: PromptMessage.ERROR, message });
        }
        const url = URL.createObjectURL(file);
        let type;
        console.log("file.type", file.type);
        
        if (file.type.includes("image")) {
            type = FileType.IMAGE;
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const img: any = new Image();
                img.src = reader.result;
                img.onload = () => {
                    const { size }: any = file;
                    const { naturalWidth: width, naturalHeight: height } = img;
                    setFileInfo({
                        size: formatFileSize(size),
                        dimensions: `${width} x ${height} px`,
                    });
                };
            };
        } else {
            type = FileType.PDF;
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                const { size }: any = file;
                setFileInfo({size: formatFileSize(size)});
            };
        }
        setSelectedFile({ file, url, type, id });
        setAlertType({ type: PromptMessage.SUCCESS, message: language.promptMessages.fileUpload });
    };

    return (
        <React.Fragment>
            {alertTye.type && <FIleUploadAlert type={alertTye.type} message={alertTye.message} removeMessage={() => setAlertType({})} />}

            <div className={`border-2 border-dashed rounded-md h-[140px] mt-4 ${dragOver ? "border-cyan-800" : "border-neutral-300"}`}
                onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                <label htmlFor={id}>
                    {selectedFile && selectedFile?.id === id ? (
                        <div className="flex items-center relative check-background h-full px-2">
                            <div className="h-8 w-8 p-2 absolute right-2 top-2 rounded-full cursor-pointer bg-white" onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setSelectedFile(null);
                                setAlertType({});
                            }}>
                                <BinIcon stroke="#171717" className="w-full h-full" />
                            </div>
                            <section className="h-[120px] w-[120px] bg-white inline-grid place-items-center shadow-cs-3 rounded-md overflow-hidden">
                                {selectedFile.type === FileType.IMAGE ? <img src={selectedFile?.url} alt={selectedFile?.file?.name} className="w-[80%] h-[90%]" /> : <embed src={selectedFile?.url} type="application/pdf" className="w-[80%] h-[90%]" />}
                            </section>

                            <section className="pl-3 h-[120px] inline-flex flex-col justify-between py-2">
                                <div>
                                    <h2 className="text-neutral-900 font-medium text-base truncate mb-3 max-w-[120px]">{selectedFile?.file?.name}</h2>
                                    <h4 className="text-neutral-700 font-medium text-sm truncate max-w-[200px]">{fileInfo?.size}&nbsp;{fileInfo?.dimensions}</h4>
                                </div>
                                <div className="rounded-lg w-20 h-6 inline-flex items-center flex-row justify-center gap-2 bg-white cursor-pointer" onClick={() => setModalOpen({ url: selectedFile.url, open: true, type: selectedFile.type })}>
                                    <PreviewIcon stroke="#404040" />
                                    <small className="text-neutral-700 text-sm font-medium">{language.buttons.preview}</small>
                                </div>
                            </section>
                        </div>
                    ) : (
                        <div className="inline-flex items-center flex-col align-center justify-center w-full h-full">
                            <AddImage stroke="#A3A3A3" />
                            <p className="font-medium my-1">
                                <small className="text-sm color-blue">{language.buttons.uploadFile}</small>&nbsp;
                                <small className="text-sm text-neutral-500">{language.buttons.orDragDrop}</small>
                            </p>
                            <div className="text-neutral-500 text-sm font-normal">PNG, JPG, PDF up to 10MB</div>
                            <input id={id} accept=".jpg,.png,.pdf" type="file" className="hidden" onChange={handleFileInput} />
                        </div>
                    )}
                </label>
            </div>
        </React.Fragment>
    );
};

export default FileUpload;
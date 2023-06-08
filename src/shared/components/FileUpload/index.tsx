import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import { saveToken } from "../../../redux-toolkit/slicer/auth.slicer";
import { useNavigate } from "react-router";
import AddImage from "../../../ts-icons/addImageIcon.svg";
import BinIcon from "../../../ts-icons/binIcon.svg";
import PreviewIcon from "../../../ts-icons/previewIcon.svg";
import FIleUploadAlert from "../FIleUploadAlert";
import { FileType, PromptMessage } from "../../../enums/types.enum";
import { fileSize, formatFileSize, validTypes } from "../../../utils/size-check.utils";
import { handleFileRead } from "../../../utils/files.util";
import { uploadAttachments } from "../../../apis/attachment.api";
import Spinner from "../Spinner";

const FileUpload = ({ id, file, setModalOpen, setFile, removeFile }: any) => {
    const language: any = useSelector((state: RootState) => state.language.value);
    const authToken: any = useSelector((state: RootState) => state.auth.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [dragOver, setDragOver] = useState(false);
    const [selectedFile, setSelectedFile]: any = useState<File | null>(file);
    const [fileInfo, setFileInfo]: any = useState({ size: file?.file?.size, dimensions: file?.file?.dimensions });
    const [alertTye, setAlertType]: any = useState({});
    const [loading, setLoading]: any = useState(false);
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(true);
    };

    useEffect(() => {
        if (file) {
            setSelectedFile(file);
            setFileInfo({ size: file?.file?.size, dimensions: file?.file?.dimensions });
        }
    }, [file])
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

    const setFileInformation = async (file: File) => {
        let size = fileSize(file.size, "mb");
        if (size > 10) {
            let message = `${language.promptMessages.bigFile} (${size}MB) ${language.promptMessages.maxSize} 10MB`
            return setAlertType({ type: PromptMessage.ERROR, message });
        }
        // const url = URL.createObjectURL(file);
        let type;

        try {
            setLoading(true);
            let FileInfo: any;

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
                        FileInfo = {
                            size: formatFileSize(size),
                            dimensions: `${width} x ${height} px`,
                        };
                    };
                };
            } else {
                type = FileType.PDF;
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    const { size }: any = file;
                    FileInfo = { size: formatFileSize(size) };
                };
            }

            const fileData: any = await handleFileRead(file);
            let fd = new FormData();
            fd.append("attachment[name]", file?.name);
            fd.append("attachment[attachment_kind]", "files");
            fd.append(`attachment[file]`, file, fileData.name);

            const { status, data } = await uploadAttachments(fd, authToken);
            if (status === 200) {
                setFileInfo({
                    size: FileInfo?.size,
                    dimensions: FileInfo?.dimensions,
                });
                setAlertType({ type: PromptMessage.SUCCESS, message: language.promptMessages.fileUpload });
                setFile(file, id, data?.status?.data?.url, data?.status?.data?.attachment_id, FileInfo?.size, FileInfo?.dimensions, type);
                setSelectedFile({ file, url: data?.status?.data?.url, type, id, attachment_id: data?.status?.data?.attachment_id });
            }
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                dispatch(saveToken(""));
                navigate("/login", { state: 'add-attachments' });
            }
            const message = error?.response?.data?.status?.message || language.promptMessages.errorFileUpload;
            return setAlertType({ type: PromptMessage.ERROR, message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <React.Fragment>
            {alertTye.type && <FIleUploadAlert type={alertTye.type} message={alertTye.message} removeMessage={() => setAlertType({})} />}

            <div className={`border-2 border-dashed rounded-md h-[140px] ${dragOver ? "border-cyan-800" : "border-neutral-300"}`}
                onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                <label htmlFor={id}>
                    {selectedFile && selectedFile?.id === id ? (
                        <div className="flex items-center relative check-background h-full px-2">
                            <div className="h-8 w-8 p-2 absolute right-2 top-2 rounded-full cursor-pointer bg-white" onClick={(e) => {
                                removeFile(selectedFile?.attachment_id, setLoading);
                                e.preventDefault();
                                e.stopPropagation();
                                setSelectedFile(null);
                                setAlertType({});
                            }}>
                                <BinIcon stroke="#171717" className="w-full h-full" />
                            </div>
                            <section className="h-[120px] w-[120px] bg-white inline-grid place-items-center shadow-cs-3 rounded-md overflow-hidden">
                                {(selectedFile?.type === FileType.IMAGE) ? <img src={selectedFile?.url} alt={selectedFile?.file?.name} className="w-[80%] h-[90%]" /> : <embed src={selectedFile?.url} type="application/pdf" className="w-[100%] h-[90%]" />}
                            </section>

                            <section className="pl-3 h-[120px] inline-flex flex-col justify-between py-2">
                                <div>
                                    <h2 className="text-neutral-900 font-medium text-base truncate mb-3 max-w-[200px]">{selectedFile?.file?.name}</h2>
                                    <h4 className="text-neutral-700 font-medium text-sm truncate max-w-[200px]">{fileInfo?.size}&nbsp;{fileInfo?.dimensions}</h4>
                                </div>
                                <div className="rounded-lg w-20 h-6 inline-flex items-center flex-row justify-center gap-2 bg-white cursor-pointer" onClick={() => setModalOpen({ url: selectedFile.url, open: true, type: selectedFile.type })}>
                                    <PreviewIcon stroke="#404040" />
                                    <small className="text-neutral-700 text-sm font-medium">{language.buttons.preview}</small>
                                </div>
                            </section>
                        </div>
                    ) : (
                        loading ? (
                            <div className="inline-flex items-center align-center justify-center w-full h-full">
                                <Spinner />
                            </div>
                        ) : (
                            <div className="inline-flex items-center flex-col align-center justify-center w-full h-full cursor-pointer">
                                <AddImage stroke="#A3A3A3" />
                                <p className="font-medium my-1">
                                    <small className="text-sm color-blue">{language.buttons.uploadFile}</small>&nbsp;
                                    <small className="text-sm text-neutral-500">{language.buttons.orDragDrop}</small>
                                </p>
                                <div className="text-neutral-500 text-sm font-normal">PNG, JPG, PDF up to 10MB</div>
                                <input id={id} accept=".jpg,.png,.pdf" type="file" className="hidden" onChange={handleFileInput} />
                            </div>
                        )
                    )}
                </label>
            </div>
        </React.Fragment>
    );
};

export default FileUpload;
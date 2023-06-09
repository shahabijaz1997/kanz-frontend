import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FileUpload from "../FileUpload";
import HoverModal from "../HoverModal";
import Image1 from "../../../assets/example_id.png";
import Image2 from "../../../assets/example_id_2.png";
import { toastUtil } from "../../../utils/toast.utils";
import { RootState } from "../../../redux-toolkit/store/store";
import { removeAttachment } from "../../../apis/attachment.api";
import { saveToken } from "../../../redux-toolkit/slicer/auth.slicer";
import { saveAttachments } from "../../../redux-toolkit/slicer/attachments.slicer";

const UploadComp = (props: any) => {
  const {
    id,
    title,
    file,
    subTitle,
    language,
    setFile,
    setModalOpen,
    setFileType,
    setFiles,
    files,
  } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedId, setSelectedId]: any = useState(null);
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const attachments: any = useSelector((state: RootState) => state.attachments.attachments.value);

  const removeFile = async (id: string, setLoading: Function) => {
    try {
      setLoading(true);
      console.log(attachments);
      let { status } = await removeAttachment(id, authToken);
      if (status === 200) {
        let _files = files.slice().filter((file: any) => file.attachment_id !== id);
        setFiles(_files);
        setLoading(false);
        dispatch(saveAttachments(_files))
        // let allFiles = attachments.filter((at: any) => at?.attachment_id !==);
      }
    } catch (error: any) {
      setLoading(false);
      if (error.response && error.response.status === 401) {
        dispatch(saveToken(""));
        navigate("/login", { state: "add-attachments" });
      }
      const message =
        error?.response?.data?.status?.message ||
        error?.response?.data ||
        language.promptMessages.errorGeneral;
      toast.error(message, toastUtil);
    } finally {
    }
  };

  return (
    <div className="mb-4 w-full select-none">
      <div className="block text-neutral-700 text-base font-medium">
        <div>{title}</div>
        <small className="text-neutral-700 font-normal">{subTitle}</small>
        <small
          className="relative font-normal color-blue cursor-pointer"
          onMouseEnter={() => setSelectedId(id)}
          onMouseLeave={() => setSelectedId(null)}
        >
          &nbsp;<span>{language?.common?.example}</span>
          {selectedId === id && (
            <HoverModal>
              <section className="inline-flex flex-row items-center justify-evenly h-full">
                <img src={Image2} alt={title} className="max-h-[90px]" />
                <img src={Image1} alt={title} className="max-h-[140px]" />
              </section>
            </HoverModal>
          )}
        </small>
        <FileUpload
          id={id}
          file={file}
          setFile={setFile}
          removeFile={removeFile}
          setModalOpen={(e: any) => {
            setModalOpen(e.open ? e.url : null);
            e.type && setFileType(e.type);
          }}
        />
      </div>
    </div>
  );
};

export default UploadComp;

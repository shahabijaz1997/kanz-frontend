import { useState } from "react";

import FileUpload from "../FileUpload";
import HoverModal from "../HoverModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import { removeAttachment } from "../../../apis/attachment.api";
import { saveToken } from "../../../redux-toolkit/slicer/auth.slicer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastUtil } from "../../../utils/toast.utils";

const UploadComp = (props: any) => {
  const {
    item,
    language,
    SampleImage_2,
    SampleImage,
    setFile,
    setModalOpen,
    setFileType,
    setFiles,
    setLoading,
    files,
  } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedId, setSelectedId]: any = useState(null);
  const authToken: any = useSelector((state: RootState) => state.auth.value);

  const removeFile = async (id: string) => {
    try {
      setLoading(true);
      let { status } = await removeAttachment(id, authToken);
      if (status === 200) {
        let _files = files
          .slice()
          .filter((file: any) => file.attachment_id !== id);
        setFiles(_files);
      }
    } catch (error: any) {
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
      setLoading(false);
    }
  };

  return (
    <div className="mb-4 w-full">
      <div className="block text-neutral-700 text-base font-medium">
        <div>{item.title}</div>
        <small className="text-neutral-700 font-normal">{item.sub}</small>
        <small
          className="relative font-normal color-blue cursor-pointer"
          onMouseEnter={() => setSelectedId(item.id)}
          onMouseLeave={() => setSelectedId(null)}
        >
          &nbsp;<span>{language?.common?.example}</span>
          {selectedId === item.id && (
            <HoverModal>
              <section className="inline-flex flex-row items-center justify-evenly h-full">
                <img
                  src={SampleImage_2}
                  alt={item.title}
                  className="max-h-[90px]"
                />
                <img
                  src={SampleImage}
                  alt={item.title}
                  className="max-h-[140px]"
                />
              </section>
            </HoverModal>
          )}
        </small>
        <FileUpload
          id={item.id}
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

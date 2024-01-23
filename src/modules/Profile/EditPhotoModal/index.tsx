import { useSelector } from "react-redux";
import Button from "../../../shared/components/Button";
import { RootState } from "../../../redux-toolkit/store/store";
import CrossIcon from "../../../ts-icons/crossIcon.svg";
import UploadIcon from "../../../ts-icons/uploadIcon.svg";
import React, { useEffect, useState } from "react";
import { fileSize, jsonToFormData } from "../../../utils/files.utils";
import { updateProfile } from "../../../apis/investor.api";
import { toastUtil } from "../../../utils/toast.utils";
import { toast } from "react-toastify";

const EditPhotoModal = ({
  setPhotoUploadModal,
  authToken,
  imageUrl,
  getDetail,
  setLoading,
}: any) => {
  const [files, setFiles] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<any>(null);
  function handleChange(e: any) {}
  const handleFileUpload = (e: any) => {
    const file: any = e.target.files?.[0];
    if (file) {
      const fileSizeInMB = fileSize(file.size, "mb");
      const allowedFileTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
      ];
      if (!allowedFileTypes.includes(file.type)) {
        toast.error(language?.v3?.fundraiser?.typeError, toastUtil);
        return;
      }
      if (fileSizeInMB > 10) {
        toast.error(language?.v3?.fundraiser?.file_size_err, toastUtil);
        navigator.vibrate(1000);
        return;
      }
      setFiles(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
      e.target.value = "";
    }
  };

  const updateInfo = async () => {
    try {
      let sentPayload = {
        profile: {
          fund_raiser_attributes: {
            profile_picture: files,
          },
        },
      };
      let { status, data } = await updateProfile(
        authToken,
        jsonToFormData(sentPayload)
      );
      if (status === 200) {
        toast.success("Profile Updated", toastUtil);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      getDetail();
      setPhotoUploadModal(false);
    }
  };

  const language: any = useSelector((state: RootState) => state.language.value);
  const [disableUpload, setdisableUpload]: any = useState(false);
  return (
    <div
      className="rounded-md overflow-hidden inline-grid place-items-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.078" }}
    >
      <aside className="bg-white w-[400px] rounded-md h-full">
        <header className="bg-cbc-grey-sec h-16 py-2 px-3 inline-flex w-full justify-between items-center">
          <h3 className="text-xl font-medium text-neutral-700">
            {"Upload Photo"}
          </h3>
          <div
            className="bg-white h-8 w-8 border-[1px] border-black rounded-md shadow  p-1 cursor-pointer"
            onClick={() => {
              setPhotoUploadModal(false);
              setFiles(null);
            }}
          >
            <CrossIcon stroke="#000" />
          </div>
        </header>

        <section className="py-3 px-4">
          <div className="mb-3 w-full">
            <span className="w-full">
              <button
                className="bg-neutral-100 rounded-lg inline-flex justify-center gap-2 px-4 py-5 w-full border-dotted border-[1px] border-neutral-400"
                onClick={() => {
                  let elem: any = document.getElementById("doc_deal_uploader");
                  elem.click();
                }}
              >
                <UploadIcon />
                <small className="text-cyan-800 text-sm font-medium">
                  {"Upload JPG/JPEG/PNG upto 10MB"}
                </small>
              </button>
              <input
                type="file"
                className="hidden"
                id="doc_deal_uploader"
                onClick={(e) => e.stopPropagation()}
                onChange={handleFileUpload}
              />
            </span>
          </div>
          <div className="my-3 w-full flex items-center justify-center">
            <img
              className="object-contain aspect-square rounded-full shadow-lg w-20 h-20 "
              src={
                imagePreview ??
                imageUrl ??
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
            />
          </div>
        </section>

        <footer className="w-full inline-flex justify-between gap-3 py-2 px-3 ">
          <Button
            disabled={disableUpload}
            className="w-full !py-1"
            divStyle="flex items-center justify-center w-full"
            onClick={() => {
              setdisableUpload(true);
              updateInfo();
            }}
          >
            {"Set as new profile picture"}
          </Button>
        </footer>
      </aside>
    </div>
  );
};

export default EditPhotoModal;

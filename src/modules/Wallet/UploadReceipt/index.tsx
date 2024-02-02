import React, { useState } from "react"; // Added useState import
import AddImage from "../../../ts-icons/addImageIcon.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import Button from "../../../shared/components/Button";
import CrossIcon from "../../../ts-icons/crossIcon.svg";
import Modal from "../../../shared/components/Modal";
import { fileSize } from "../../../utils/files.utils";
import { toast } from "react-toastify";
import { toastUtil } from "../../../utils/toast.utils";

const UploadReceipt = ({ setStep, setImage, submitForm }: any) => {
  const language: any = useSelector((state: RootState) => state.language.value);
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview]: any = useState();
  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const fileSizeInMB = fileSize(file.size, "mb");
      const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedFileTypes.includes(file.type)) {
        toast.error(language?.v3?.fundraiser?.typeError, toastUtil);
        return;
      }
      if (fileSizeInMB > 10) {
        toast.error(language?.v3?.fundraiser?.file_size_err, toastUtil);
        navigator.vibrate(1000);
        return;
      }
      setImage(event.target.files[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <aside className="px-2 py-10 flex items-center justify-center w-full">
      <section className="w-[50%] p-1 mt-10">
        <span className="text-lg font-semibold">Add Receipt</span>
        <div
          className={`border-2 border-dashed rounded-md  h-[150px] select-none border-neutral-300 mt-5`}
        >
          <label htmlFor="file">
            <div className="inline-flex items-center flex-col align-center justify-center w-full h-full cursor-pointer">
              <AddImage stroke="#A3A3A3" />
              <p className="font-medium my-1">
                <small className="text-sm text-cc-blue">
                  {language.buttons.uploadFile}
                </small>
              </p>
              {
                <div className="text-neutral-500 text-sm font-normal">
                  {language?.v2?.common?.imageSpecs} 10MB
                </div>
              }
              <input
                required
                onChange={handleFileUpload}
                id={"file"}
                type="file"
                className="hidden"
              />
            </div>
          </label>
        </div>
        <div className="flex items-center justify-center mt-10">
          <img
            className="border-1 border-neutral-300 shadow-lg"
            src={imagePreview}
            alt=""
          />
        </div>
        <span className="flex w-full justify-between items-center gap-56 mt-10">
          <span className="w-full">
            <Button
              onClick={() => {
                setImagePreview(undefined);
                setStep(2);
              }}
              className="w-full"
              type="outlined"
            >
              Back
            </Button>
          </span>
          <span className="w-full">
            <Button
              disabled={!imagePreview}
              onClick={() => {
                submitForm();
              }}
              className="w-full"
            >
              Continue
            </Button>
          </span>
        </span>
      </section>
    </aside>
  );
};

export default UploadReceipt;

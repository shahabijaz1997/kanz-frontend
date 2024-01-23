import { useSelector } from "react-redux";
import Button from "../../../shared/components/Button";
import { RootState } from "../../../redux-toolkit/store/store";
import CrossIcon from "../../../ts-icons/crossIcon.svg";
import UploadIcon from "../../../ts-icons/uploadIcon.svg";
import React, { useState } from "react";

const EditPhotoModal = ({setPhotoUploadModal, handleFileUpload, files, setFiles}:any) => {

    function handleChange(e:any) {
        setFiles(URL.createObjectURL(e.target.files[0]));
    }
 
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
                      let elem: any =
                        document.getElementById("doc_deal_uploader");
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
                    multiple={true}
                    onChange={handleChange}
                  />
                </span>
              </div>
              <div className="my-3 w-full ">
                <img className="object-contain aspect-square rounded-full shadow-lg  " src={files} />
              </div>
            </section>

            <footer className="w-full inline-flex justify-between gap-3 py-2 px-3 ">
              <Button
                disabled={disableUpload}
                className="w-full !py-1"
                divStyle="flex items-center justify-center w-full"
                onClick={() => {
                  setdisableUpload(true);
                  setPhotoUploadModal(false);
                }}
              >
                {"Set as new profile picture"}
              </Button>
            </footer>
          </aside>
      </div>
    )
}

export default EditPhotoModal
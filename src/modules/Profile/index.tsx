import React, { useEffect, useRef, useState } from "react";
import Header from "../../shared/components/Header";
import { useSelector } from "react-redux";
import { RootState } from "../../redux-toolkit/store/store";
import Sidebar from "../../shared/components/Sidebar";
import { KanzRoles } from "../../enums/roles.enum";
import InvestorProfile from "./InvestorProfile";
import SyndicateProfile from "./SyndicateProfile";
import FundraiserProfile from "./FundraiserProfile";
import Modal from "../../shared/components/Modal";
import EditPhotoModal from "./EditPhotoModal";
import { fileSize } from "../../utils/files.utils";
import { toast } from "react-toastify";
import { toastUtil } from "../../utils/toast.utils";
import { FileType } from "../../enums/types.enum";
import Button from "../../shared/components/Button";

const Profile = () => {
  const language: any = useSelector((state: RootState) => state.language.value);
  const metadata: any = useSelector((state: RootState) => state.metadata.value);
  const [photoUploadModal, setPhotoUploadModal] = useState(false);
  const [files, setFiles]: any = useState();
  const prevFiles = useRef<any>(files);
  useEffect(() => {
    prevFiles.current = files;
    console.log("Filess", prevFiles.current)
  }, [files]);
  const shouldRenderUpdateButton = () => {
    return files !== prevFiles.current;
  };
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files?.[0];
    if (file) {
      const fileSizeInMB = fileSize(file.size, "mb");

      if (fileSizeInMB > 10) {
        toast.error(language?.v3?.fundraiser?.file_size_err, toastUtil);
        navigator.vibrate(1000);
        return;
      }

      const allowedFileTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/pdf",
      ];
      if (!allowedFileTypes.includes(file.type)) {
        toast.error(language?.v3?.fundraiser?.file_type_err, toastUtil);
        return;
      }
      setFileInformation(file);
      e.target.value = "";
    }
  };
  const setFileInformation = async (file: File) => {
    let size = fileSize(file.size, "mb");
    let type;
    if (file.type.includes("video")) type = FileType.VIDEO;
    else if (file.type.includes("image")) {
      type = FileType.IMAGE;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img: any = new Image();
        img.src = reader.result;
      };
    } else {
      type = FileType.PDF;
      const reader = new FileReader();
      reader.readAsDataURL(file);
    }
    /* const fileData: any = await handleFileRead(file); */
    doUploadUtil(file, size, type);
  };

  const doUploadUtil = (file: any, size: any, type: string) => {
    setFiles((prev: any) => {
      return [...prev, { file, size, type, id: prev.length + 1 }];
    });

    let timer = setTimeout(() => {
      clearTimeout(timer);
    }, 1000);
  };
  const showProfileDetails = () => {
    return metadata?.type === KanzRoles.INVESTOR ? (
      <InvestorProfile file={files} setPhotoUploadModal={setPhotoUploadModal} />
    ) : metadata?.type === KanzRoles.SYNDICATE ? (
      <SyndicateProfile
        file={files}
        setPhotoUploadModal={setPhotoUploadModal}
      />
    ) : metadata?.type === KanzRoles.FUNDRAISER ? (
      <FundraiserProfile
        file={files}
        setPhotoUploadModal={setPhotoUploadModal}
      />
    ) : (
      <React.Fragment></React.Fragment>
    );
  };

  useEffect(() => {
    console.log("MODAL VALUE", photoUploadModal);
  }, [photoUploadModal]);

  return (
    <main className="max-h-full">
      <Header />
      <aside className="w-full h-full flex items-start justify-start">
        <Sidebar type={KanzRoles.SYNDICATE} />
        <section
          style={{ width: "calc(100% - 250px)" }}
          className="bg-cbc-auth  p-[3rem] min-h-[100vh] relative w-full"
        >
          <div className="">
            <section className="inline-flex justify-between  items-start w-full">
              <div className="w-full">
                <h1 className="text-black font-medium text-xl mb-2">
                  {"Profile Management"}
                </h1>
              </div>
            </section>
            <p className="mt-3">
              <span className="font-medium text-lg">
                Hello {metadata?.name}!
              </span>
            </p>
            <aside className="w-full justify-center flex items-center">
              <div className="justify-center w-[80%] flex flex-col p-[2rem] border-[1px] rounded-lg shadow-lg mt-10">
                <span className="pb-5 text-lg font-medium flex justify-between w-full">
                  <span>Edit Profile</span>
                  <span>{shouldRenderUpdateButton() && (<Button className="!p-2 !text-xs !font-medium" type="outlined">Update</Button>)}</span>
                </span>
                {showProfileDetails()}
              </div>
            </aside>
          </div>
        </section>
      </aside>
      <Modal show={photoUploadModal ? true : false} className="w-full">
        <EditPhotoModal
          setPhotoUploadModal={setPhotoUploadModal}
          handleFileUpload={handleFileUpload}
          files={files}
          setFiles={setFiles}
        />
      </Modal>
    </main>
  );
};

export default Profile;

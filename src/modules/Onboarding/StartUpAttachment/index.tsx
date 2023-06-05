import { toast } from "react-toastify";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FileType } from "../../../enums/types.enum";
import Modal from "../../../shared/components/Modal";
import { toastUtil } from "../../../utils/toast.utils";
import Header from "../../../shared/components/Header";
import Button from "../../../shared/components/Button";
import Drawer from "../../../shared/components/Drawer";
import CrossIcon from "../../../ts-icons/crossIcon.svg";
import UploadComp from "../../../shared/components/Upload";
import { RootState } from "../../../redux-toolkit/store/store";

const StartUpAttachment = (props: any) => {
  const navigate = useNavigate();

  const language: any = useSelector((state: RootState) => state.language.value);

  const [uploading] = useState([
    {
      title: language?.common?.presentationDec,
      sub: language?.common?.uploadPic,
      id: "id",
    },
    {
      title: language?.common?.passportCopy,
      sub: language?.common?.uploadSelfie,
      id: "self",
    },
    {
      title: language?.common?.resProof,
      sub: language?.common?.resProof,
      id: "res",
    },
    {
      title: language?.common?.tradeLic,
      sub: language?.common?.resProof,
      id: "res",
    },
    {
      title: language?.common?.articleOfAssociatioon,
      sub: language?.common?.resProof,
      id: "res",
    },
    {
      title: language?.common?.kycReport,
      sub: language?.common?.resProof,
      id: "res",
    },
  ]);

  const [modalOpen, setModalOpen]: any = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [fileType, setFileType]: any = useState(null);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [files, setFiles]: any = useState([]);

  const setFile = (file: File, id: string, attachment_id: string) => {
    setFiles((prev: any) => {
      return [...prev, { file, id, attachment_id }];
    });
  };

  return (
    <main className="h-full max-h-full background-auth overflow-y-auto">
      <section>
        <Header
          custom={true}
          data={{
            leftMenu: language.header.attachment,
            button: (
              <button onClick={() => navigate(-1)}>
                <CrossIcon stroke="#171717" className="w-6 h-6" />
              </button>
            ),
          }}
        />
      </section>

      <aside className="w-[420px] h-full screen500:max-w-[300px] mx-auto py-12">
        <section className="flex items-start justify-center flex-col">
          <h3 className="text-cc-black font-bold text-2xl">
            {language.buttons.addAttachment}
          </h3>
          <p className="text-neutral-700 font-medium text-base">
            <span>{language.philosophyGoals.uploadNecessary}</span>&nbsp;
            <span
              className="color-blue cursor-pointer"
              onClick={() => setOpen(true)}
            >
              {language.philosophyGoals.whyToDo}
            </span>
          </p>
        </section>
        <section className="flex items-start justify-center flex-col mt-8">
          <form className="pt-12 mb-4 w-full">
            {React.Children.toArray(
              uploading.map((item) => {
                return (
                  <UploadComp
                    id={item.id}
                    files={files}
                    setFile={setFile}
                    title={item.title}
                    subTitle={item.sub}
                    language={language}
                    setFiles={setFiles}
                    setFileType={setFileType}
                    setModalOpen={setModalOpen}
                  />
                );
              })
            )}
          </form>
        </section>
        <section className="w-full inline-flex items-center gap-2 rounded-md border border-grey w-[420px] p-4 check-background">
          <input
            type="checkbox"
            className="accent-cyan-800 h-3 w-3 cursor-pointer"
            checked={agreeToTerms}
            onChange={() => setAgreeToTerms(!agreeToTerms)}
          />
          <p className="text-neutral-500 text-sm font-normal">
            {language?.common?.agree}&nbsp;
            <span
              className="color-blue font-medium cursor-pointer"
              onClick={() => setOpen(true)}
            >
              {language?.common?.termsConditions}
            </span>
          </p>
        </section>
        <section className="w-full inline-flex items-center justify-between py-10">
          <Button
            className="h-[38px] w-[140px]"
            htmlType="submit"
            type="outlined"
            onClick={() => navigate(-1)}
          >
            {language?.buttons?.back}
          </Button>
          <Button
            disabled={files.length === 6 && agreeToTerms ? false : true}
            className="h-[38px] w-[140px]"
            htmlType="submit"
            onClick={() => {
              let errors: string[] = [];
              if (files.length < 6)
                errors.push(language.promptMessages.pleaseUploadAttachments);
              if (!agreeToTerms)
                errors.push(language.promptMessages.pleaseAcceptPP);
              if (errors.length === 0) return setModalOpen(true);
              toast.dismiss();
              errors.forEach((e) => toast.warning(e, toastUtil));
              errors = [];
            }}
          >
            {language?.buttons?.submit}
          </Button>
        </section>
      </aside>
      <Drawer isOpen={isOpen} setIsOpen={(val: boolean) => setOpen(val)}>
        <header className="font-bold text-xl">
          {language.philosophyGoals.whyToDo}
        </header>
        <p className="text-neutral-700 font-normal text-sm text-justify">
          Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
          elit sed risus. Maecenas eget condimentum velit, sit amet feugiat
          lectus. Class aptent taciti sociosqu ad litora torquent per conubia
          nostra, per inceptos himenaeos. Praesent auctor purus luctus enim
          egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
          Suspendisse ac rhoncus nisl.
        </p>
      </Drawer>
      <Modal show={modalOpen ? true : false}>
        {typeof modalOpen === "string" ? (
          <React.Fragment>
            <div
              className="rounded-md h-8 w-8 inline-grid place-items-center cursor-pointer absolute right-2 top-2"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.078" }}
            >
              <CrossIcon
                stroke="#fff"
                className="w-6 h-6"
                onClick={() => {
                  setModalOpen(null);
                }}
              />
            </div>
            {fileType === FileType.IMAGE ? (
              <img src={modalOpen} alt="Img" className="max-h-[100%]" />
            ) : (
              <embed
                src={modalOpen}
                type="application/pdf"
                className="w-[100%] h-[90%]"
              />
            )}
          </React.Fragment>
        ) : (
          <div className="p-12 rounded-md shadow-cs-1 flex flex-col items-center w-full bg-white outline-none focus:outline-none screen800:px-3">
            <h3 className="text-xl font-bold text-center">
              {language.modal.thankyou} {language.modal.sub_1}
            </h3>

            <div className="w-[80%] screen800:w-full">
              <p className="mt-8 text-sm font-normal text-neutral-500 text-center leading-relaxed">
                {language.modal.sub_2}
              </p>
              <p className="mt-4 text-sm font-normal text-neutral-500 text-center leading-relaxed">
                {language.modal.sub_3}
              </p>
              <p className="text-sm font-normal text-neutral-500 text-center leading-relaxed">
                {language.modal.sub_4}{" "}
                <span className="color-blue">012-345678</span>
              </p>
            </div>
            <Button
              className="mt-8 w-[120px] h-9"
              htmlType="button"
              onClick={() => {
                setModalOpen(false);
                localStorage.removeItem("investor-type");
                localStorage.removeItem("accert");
                navigate("/welcome");
              }}
            >
              {language.buttons.continue}
            </Button>
          </div>
        )}
      </Modal>
    </main>
  );
};
export default StartUpAttachment;

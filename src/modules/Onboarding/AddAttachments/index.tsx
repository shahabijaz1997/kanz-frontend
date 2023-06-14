import React, { useState, useLayoutEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
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
import { getRoleBasedAttachments } from "../../../apis/attachment.api";
import { saveToken } from "../../../redux-toolkit/slicer/auth.slicer";
import Loader from "../../../shared/views/Loader";
import { saveAttachments } from "../../../redux-toolkit/slicer/attachments.slicer";

const AddAttachments = (props: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language: any = useSelector((state: RootState) => state.language.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const attachments: any = useSelector((state: RootState) => state.attachments.attachments.value);
  const [modalOpen, setModalOpen]: any = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileType, setFileType]: any = useState(null);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [files, setFiles]: any = useState([]);
  const [attachmentData, setAttachmentData]: any = useState([]);

  useLayoutEffect(() => {
    onGetRoleBasedAttachmentDetails();
  }, []);

  const setFile = (file: File, id: string, url: string, attachment_id: string, size: string, dimensions: string, type: string) => {
    let _file: any = {
      name: file?.name,
      size,
      dimensions
    }
    let _attachments: any = [...files, { file: _file, id, url, attachment_id, type: type }];
    dispatch(saveAttachments(_attachments));
    setFiles(_attachments);
  };

  const onGetRoleBasedAttachmentDetails = async () => {
    try {
      setLoading(true);
      if (attachments && attachments?.length) {
        setFiles(attachments)
      }
      let { status, data } = await getRoleBasedAttachments(authToken);
      if (status === 200) {
        let uploadPayload = data?.status?.data.map((item: any, idx: number) => {
          item.id = `at-${idx}`;
          return item;
        })
        setAttachmentData(uploadPayload);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        dispatch(saveToken(""));
        navigate("/login", { state: 'investor-type' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-full max-h-full background-auth overflow-y-auto overflow-x-hidden">
      {
        loading ? (<Loader />) : (
          <React.Fragment>
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
              <section className="flex items-start justify-center flex-col select-none">
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
                <form className="pt-8 mb-4 w-full">
                  {React.Children.toArray(
                    attachmentData.map((item: any) => {
                      return (
                        <UploadComp
                          id={item.id}
                          files={files}
                          file={files?.length && files.find((f: any) => f.id === item.id)}
                          setFile={setFile}
                          title={item?.name}
                          subTitle={item?.label}
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
                  disabled={files.length === 3 && agreeToTerms ? false : true}
                  className="h-[38px] w-[140px]"
                  htmlType="submit"
                  onClick={() => {
                    let errors: string[] = [];
                    if (files.length !== 3)
                      errors.push(language.promptMessages.pleaseUploadAttachments);
                    if (!agreeToTerms)
                      errors.push(language.promptMessages.pleaseAcceptPP);
                    if (errors.length === 0) {
                      setOpen(false);
                      dispatch(saveAttachments(""))
                      return setModalOpen(true);
                    }
                    toast.dismiss();
                    errors.forEach((e) => toast.warning(e, toastUtil));
                    errors = [];
                  }}
                >
                  {language?.buttons?.submit}
                </Button>
              </section>
            </aside>
          </React.Fragment>
        )
      }
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
export default AddAttachments;

import { useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { RootState } from "../../../redux-toolkit/store/store";
import Header from "../../../shared/components/Header";
import Modal from "../../../shared/components/Modal";
import { FileType } from "../../../enums/types.enum";
import { saveToken } from "../../../redux-toolkit/slicer/auth.slicer";
import { toast } from "react-toastify";
import { toastUtil } from "../../../utils/toast.utils";
import CrossIcon from "../../../ts-icons/crossIcon.svg";
import Button from "../../../shared/components/Button";
import { isValidEmail, isValidUrl } from "../../../utils/regex.utils";
import StartupStepper from "./StartupStepper";
import { postCompanyInformation } from "../../../apis/company.api";
import { saveLogo } from "../../../redux-toolkit/slicer/attachments.slicer";

const StartupFlow = ({ }: any) => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language: any = useSelector((state: RootState) => state.language.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const logo: any = useSelector((state: RootState) => state.attachments.logo.value);

  const [payload, setPayload]: any = useState({
    company: "",
    legal: "",
    country: "",
    market: [],
    web: "",
    address: "",
    business: "",
    name: "",
    email: "",
    raised: "",
    target: "",
    logo: null,
    currency: { label: "AED", value: "AED" }
  });
  const [options] = useState([
    { id: 1, title: language?.buttons?.yes },
    { id: 2, title: language?.buttons?.no },
  ]);
  const [step, setStep]: any = useState();
  const [modalOpen, setModalOpen]: any = useState();
  const [fileType, setFileType] = useState(null);
  const [file, setFile]: any = useState(null);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    let _payload: any = localStorage.getItem("startup");
    if (_payload) setPayload(JSON.parse(_payload));
    if (logo) {
      onSetPayload(logo?.file, "logo");
      setFile(logo)
    };
  }, []);

  useLayoutEffect(() => {
    setStep(Number(params?.id) || 1);
  }, [params]);

  const onSetFile = (file: File, id: string, url: string, size: string, dimensions: string, type: string) => {
    let _file: any = {
      name: file?.name,
      size,
      dimensions
    }
    let _attachment: any = { file: _file, id, url, type: type };
    setFile(_attachment);
    dispatch(saveLogo(_attachment));
    onSetPayload(file, "logo");
  };

  const removeFile = async (id: string) => {
    dispatch(saveLogo(""));
    setFile(null);
    onSetPayload(null, "logo")
  };

  const ontoNextStep = () => {
    if (step === 1) {
      let errors = [];
      if (!payload.company || !payload.legal || !payload.market || !payload.web || !payload.address || !payload.country)
        errors.push(language.promptMessages.pleaseSelectAllData)
      if (!isValidUrl(payload.web)) errors.push(language.promptMessages.validComp);
      toast.dismiss();
      if (errors.length) return errors.forEach(e => toast.warning(e, toastUtil));
      setStep(2);
      navigate(`/startup-type/${step + 1}`);
    } else {
      let errors = []
      if (!payload.company || !payload.legal || !payload.country || !payload.market || !payload.address || !payload.web || !payload.name || !payload.email || !payload.logo || !payload.business || !payload.raised || !payload.target) {
        errors.push(language.promptMessages.pleaseSelectAllData);
      }
      if (!isValidEmail(payload.email)) errors.push(language.promptMessages.invalidEmailCeo)
      toast.dismiss();
      if (errors.length) return errors.forEach(e => toast.warning(e, toastUtil));
      onPostCompanyData();
    }
  };

  const onSetPayload = (data: any, type: string) => {
    setPayload((prev: any) => {
      return { ...prev, [type]: data };
    });
  };

  const onPostCompanyData = async () => {
    try {
      setLoading(true);
      const form: any = new FormData();
      form.append("startup[company_name]", payload.company);
      form.append("startup[legal_name]", payload.legal);
      form.append("startup[country_id]", payload.country?.id);
      payload.market.forEach((val: any) => {
        form.append("startup[industry_market][]", val);
      });
      form.append("startup[website]", payload.web);
      form.append("startup[address]", payload.address);
      form.append("startup[logo]", payload.logo);
      form.append("startup[description]", payload.business);
      form.append("startup[ceo_name]", payload.name);
      form.append("startup[ceo_email]", payload.email);
      form.append("startup[total_capital_raised]", payload.raised);
      form.append("startup[current_round_capital_target]", payload.target);
      form.append("startup[currency]", payload?.currency?.value);
      let { status } = await postCompanyInformation(form, authToken);

      if (status === 200) {
        navigate("/add-attachments");
        localStorage.setItem("startup", JSON.stringify(payload));
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        dispatch(saveToken(""));
        navigate("/login", { state: "add-attachments" });
      }
      const message = error?.response?.data?.status?.message || error?.response?.data || language.promptMessages.errorGeneral;
      toast.error(message, toastUtil);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-full max-h-full background-auth overflow-y-auto">
      <section>
        <Header custom={true} data={{
          leftMenu: language.header.companyDetails, button: (<button onClick={() => navigate("/welcome")} className="text-neutral-900 bg-white font-bold text-sm w-[150px] h-9 cursor-pointer border border-black shadow-sm screen800:w-[120px]">{language.buttons.gotoDashboard}</button>),
        }}
        />
      </section>

      <aside className="w-[420px] h-full screen500:max-w-[300px] mx-auto py-12">
        <section className="flex items-start justify-center flex-col">
          <h3 className="text-cc-black font-bold text-2xl">
            {language.syndicate.step} {step} of 2
          </h3>
          <hr className="h-px w-full mt-4 bg-gray-200 border-0 bg-cbc-grey" />
        </section>

        <StartupStepper
          language={language}
          payload={payload}
          onSetPayload={onSetPayload}
          options={options}
          step={step}
          file={file}
          setFileType={(e: any) => setFileType(e)}
          removeFile={removeFile}
          setFile={onSetFile}
          setModalOpen={(e: any) => setModalOpen(e)}
          authToken={authToken}
        />

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
            className="h-[38px] w-[140px]"
            disabled={loading}
            htmlType="submit"
            loading={loading}
            onClick={ontoNextStep}
          >
            {language?.buttons?.continue}
          </Button>
        </section>
      </aside>

      <Modal show={modalOpen ? true : false}>
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
      </Modal>
    </main>
  );
};
export default StartupFlow;
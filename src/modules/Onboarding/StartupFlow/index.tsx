import { useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { RootState } from "../../../redux-toolkit/store/store";
import Header from "../../../shared/components/Header";
import Modal from "../../../shared/components/Modal";
import { FileType } from "../../../enums/types.enum";
import { removeAttachment } from "../../../apis/attachment.api";
import { saveToken } from "../../../redux-toolkit/slicer/auth.slicer";
import { toast } from "react-toastify";
import { toastUtil } from "../../../utils/toast.utils";
import CrossIcon from "../../../ts-icons/crossIcon.svg";
import Button from "../../../shared/components/Button";
import { isValidUrl } from "../../../utils/regex.utils";
import StartupStepper from "./StartupStepper";
import { postCompanyInformation } from "../../../apis/company.api";

const StartupFlow = ({ }: any) => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language: any = useSelector((state: RootState) => state.language.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);

  const [payload, setPayload]: any = useState({
    company: "",
    legal: "",
    country: "",
    market: "",
    web: "",
    business: "",
    name: "",
    email: "",
    raised: "",
    target: "",
    logo: null,
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
  }, []);

  useLayoutEffect(() => {
    setStep(Number(params?.id) || 1);
  }, [params]);

  const onSetFile = (file: File, id: string, attachment_id: string) => {
    setFile({ file, id, attachment_id });
    onSetPayload(id, "logo");
  };



  const removeFile = async (id: string) => {
    try {
      setLoading(true);
      let { status } = await removeAttachment(id, authToken);
      if (status === 200) setFile(null);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        dispatch(saveToken(""));
        navigate("/login", { state: "add-startup-attachments" });
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

  const ontoNextStep = () => {
    if (step === 1) {
      let errors = [];
      if (!payload.company || !payload.legal || !payload.company || !payload.market || !payload.web)
        errors.push(language.promptMessages.pleaseSelectAllData)
      if (!isValidUrl(payload.web)) errors.push(language.promptMessages.validComp);
      toast.dismiss();
      if (errors.length) return errors.forEach(e => toast.warning(e, toastUtil));
      setStep(2);
      navigate(`/startup-type/${step + 1}`);
    } else {
      if (!payload.company || !payload.legal || !payload.company || !payload.market || !payload.web || !payload.name || !payload.email || !payload.logo || !payload.business || !payload.raised || !payload.target){
        toast.dismiss();
        return toast.warning(language.promptMessages.pleaseSelectAllData, toastUtil);
      }
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
      let dataPayload: any = {
        startup: {
          company_name: payload.company,
          legal_name: payload.legal,
          country_id: payload.country?.id,
          industry_market: payload.market,
          website: payload.web,
          address: payload.address,
          logo: payload.logo,
          description: payload.business,
          ceo_name: payload.name,
          ceo_email: payload.email,
          total_capital_raised: payload.raised,
          current_round_capital_target: payload.target,
        }
      };
      let { status } = await postCompanyInformation(dataPayload, authToken);

      if (status === 200) {
        navigate("/add-startup-attachments");
        localStorage.setItem("startup", JSON.stringify(payload));
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        dispatch(saveToken(""));
        navigate("/login", { state: "add-startup-attachments" });
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
          leftMenu: language.header.companyDetails, button: (
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
          setFileType={(e: any) => setFileType(e)}
          removeFile={removeFile}
          setFile={onSetFile}
          setModalOpen={(e: any) => setModalOpen(e)}
          authToken={authToken}
        />

        <section className="w-full inline-flex items-center justify-between py-16">
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
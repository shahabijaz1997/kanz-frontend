import { useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { RootState } from "../../../redux-toolkit/store/store";
import Header from "../../../shared/components/Header";
import SyndicateStepper from "./SyndicateStepper";
import Modal from "../../../shared/components/Modal";
import { FileType } from "../../../enums/types.enum";
import { removeAttachment } from "../../../apis/attachment.api";
import { saveToken } from "../../../redux-toolkit/slicer/auth.slicer";
import { toast } from "react-toastify";
import { toastUtil } from "../../../utils/toast.utils";
import CrossIcon from "../../../ts-icons/crossIcon.svg";
import Spinner from "../../../shared/components/Spinner";
import { postSyndicateInformation } from "../../../apis/syndicate.api";
import { isValidUrl } from "../../../utils/regex.utils";

const SyndicateFlow = ({ }: any) => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const language: any = useSelector((state: RootState) => state.language.value);
    const authToken: any = useSelector((state: RootState) => state.auth.value);

    const [payload, setPayload]: any = useState({ raised: false, amountRaised: '', timesRaised: '', industry: [], region: '', profileLink: '', deadflow: '', name: '', tagline: '', logo: null });
    const [options] = useState([{ id: 1, title: language?.buttons?.yes }, { id: 2, title: language?.buttons?.no }]);
    const [step, setStep]: any = useState();
    const [modalOpen, setModalOpen]: any = useState();
    const [fileType, setFileType] = useState(null);
    const [file, setFile]: any = useState(null);
    const [loading, setLoading] = useState(false);

    useLayoutEffect(() => {
        let _payload: any = localStorage.getItem("syndicate");
        if (_payload) setPayload(JSON.parse(_payload));
    }, []);

    useLayoutEffect(() => {
        setStep(Number(params?.id) || 1);
    }, [params]);

    const onSetFile = (file: File, id: string, attachment_id: string) => {
        setFile({ file, id, attachment_id });
        onSetPayload(id, "logo")
    };

    const removeFile = async (id: string) => {
        try {
            setLoading(true);
            let { status } = await removeAttachment(id, authToken);
            if (status === 200)
                setFile(null);
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                dispatch(saveToken(""));
                navigate("/login", { state: 'add-attachments' });
            }
            const message = error?.response?.data?.status?.message || error?.response?.data || language.promptMessages.errorGeneral;
            toast.error(message, toastUtil);
        } finally {
            setLoading(false);
        }
    };

    const ontoNextStep = () => {
        if (step === 1) {
            let errors = [];
            if (!payload.amountRaised || !payload.timesRaised || !payload.industry.length || !payload.region || !payload.profileLink || !payload.deadflow) errors.push(language.promptMessages.pleaseSelectAllData);
            if (!isValidUrl(payload.profileLink)) errors.push(language.promptMessages.pleaseEnterUrl);
            if (errors.length) return errors.forEach(e => toast.warning(e, toastUtil));
            setStep(2);
            navigate(`/syndicate-lead/${step + 1}`);
        } else {
            if (!payload.amountRaised || !payload.timesRaised || !payload.industry.length || !payload.region || !payload.profileLink || !payload.deadflow || !payload.name || !payload.tagline || !payload.logo) return toast.warning(language.promptMessages.pleaseSelectAllData, toastUtil)
            onPostSyndicateData();
        }
    };

    const onSetPayload = (data: any, type: string) => {
        setPayload((prev: any) => {
            return { ...prev, [type]: data };
        });
    };

    const onPostSyndicateData = async () => {
        try {
            setLoading(true);
            let dataPayload: any = {
                syndicate_profile: {
                    have_you_raised: payload.raised,
                    raised_amount: payload.amountRaised,
                    no_times_raised: payload.timesRaised,
                    industry_market: payload.industry,
                    region: payload.region,
                    profile_link: payload.profileLink,
                    dealflow: payload.deadflow,
                    name: payload.name,
                    tagline: payload.tagline,
                    logo: payload.logo
                }
            };
            let { status, data } = await postSyndicateInformation(dataPayload, authToken);

            if (status === 200) {
                navigate('/add-attachments');
                localStorage.setItem("syndicate", JSON.stringify(payload))
            }
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                dispatch(saveToken(""));
                navigate("/login", { state: 'add-attachments' });
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
                <Header custom={true} data={{ leftMenu: language.header.syndicateLead, button: <button onClick={() => navigate(-1)}><CrossIcon stroke="#171717" className="w-6 h-6" /></button> }} />
            </section>

            <aside className="w-[420px] h-full screen500:max-w-[300px] mx-auto py-12">
                <section className="flex items-start justify-center flex-col">
                    <h3 className="text-cc-black font-bold text-2xl">{language.syndicate.step} {step} of 2</h3>
                    <hr className="h-px w-full mt-4 bg-gray-200 border-0 bg-cbc-grey" />
                </section>

                <SyndicateStepper language={language} payload={payload} onSetPayload={onSetPayload} options={options} step={step} setFileType={(e: any) => setFileType(e)} removeFile={removeFile} setFile={onSetFile} setModalOpen={(e: any) => setModalOpen(e)} />

                <section className="w-full inline-flex items-center justify-between py-16">
                    <button className="text-neutral-900 font-bold bg-white tracking-[0.03em] rounded-md border border-grey rounded-md focus:outline-none focus:shadow-outline h-[38px] w-[140px]" type="button" onClick={() => navigate(-1)}>
                        {language?.buttons?.back}
                    </button>
                    {loading ? (
                        <button className="text-white font-bold bg-cyan-800 tracking-[0.03em] rounded-md focus:outline-none focus:shadow-outline h-[38px] w-[140px]">
                            <Spinner />
                        </button>
                    ) : (
                        <button className="text-white font-bold bg-cyan-800 tracking-[0.03em] rounded-md focus:outline-none focus:shadow-outline h-[38px] w-[140px]" type="button" onClick={ontoNextStep}>
                            {language?.buttons?.continue}
                        </button>
                    )}
                </section>
            </aside>

            <Modal show={modalOpen ? true : false}>
                <div className="rounded-md h-8 w-8 inline-grid place-items-center cursor-pointer absolute right-2 top-2" style={{ backgroundColor: "rgba(0, 0, 0, 0.078" }}>
                    <CrossIcon stroke="#fff" className="w-6 h-6" onClick={() => {
                        setModalOpen(null);
                    }} />
                </div>
                {fileType === FileType.IMAGE ? <img src={modalOpen} alt="Img" className="max-h-[100%]" /> : <embed src={modalOpen} type="application/pdf" className="w-[100%] h-[90%]" />}
            </Modal>
        </main>
    );
};
export default SyndicateFlow;
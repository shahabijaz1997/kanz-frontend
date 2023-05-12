import { useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../../shared/components/Header";
import UserIcon from "../../../ts-icons/userIcon.svg";
import EditIcon from "../../../ts-icons/editIcon.svg";
import MoneyIcon from "../../../ts-icons/moneyIcon.svg";
import GoalStepper from "./GoalStepper";
import { getInvestor } from "../../../apis/auth.api";
import { toast } from "react-toastify";
import { toastUtil } from "../../../utils/toast.utils";
import Spinner from "../../../shared/components/Spinner";
import { saveToken } from "../../../redux-toolkit/slicer/auth.slicer";

const CompleteGoals = (props: any) => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const language: any = useSelector((state: RootState) => state.language.value);
    const authToken: any = useSelector((state: RootState) => state.auth.value);
    const [loading, setLoading] = useState(false);
    const [apiResp, setApiResp]:any = useState();

    useLayoutEffect(() => {
        getInvestorDetails();
    }, []);

    const getInvestorDetails = async () => {
        try {
            setLoading(true);
            let { status, data } = await getInvestor(authToken);
            if (status === 200)
                setApiResp(data);
        } catch (error: any) {
            const message = error?.response?.data?.status?.message || error?.response?.data || language.promptMessages.errorGeneral;
            console.info("Error in getting details :: ", error);
            toast.error(message, toastUtil);
            if(error.response && error.response.status === 401) {
                dispatch(saveToken(""));
                navigate("/login");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="h-full max-h-full background-auth overflow-y-auto">
            <section>
                <Header />
            </section>
            {loading && <div className="absolute left-0 top-0 w-full h-full grid place-items-center" style={{backgroundColor: "rgba(0, 0, 0, 0.078)"}}><Spinner /></div>}
            <div className="w-full bg-cyan-800 h-12 inline-flex items-center justify-center screen800:flex-col screen800:h-20 screen800:gap-2">
                <small className="text-white text-base font-semibold mr-4 screen800:text-xs screen800:text-center">{language?.common?.attachmentPending}</small>
                <button className="bg-white rounded-md py-2 px-3 text-neutral-900 font-medium text-xs" onClick={() => navigate("/add-attachments")}>{language?.buttons?.addAttachment}</button>
            </div>
            <aside className="w-full flex items-center justify-center flex-col pt-[75px]">
                <section className="flex items-start justify-center flex-col w-[800px] screen991:w-[90%]">
                    <aside className="cursor-pointer rounded-xl p-6 mb-12 shadow-cs-1 w-full">
                        <section className="w-full flex items-start">
                            <div className="rounded-full check-background w-9 h-9 inline-grid place-items-center p-2">
                                <UserIcon stroke="#171717" />
                            </div>
                            <div className="center w-[80%] ml-5">
                                <h3 className="text-neutral-900 text-lg font-semibold">{apiResp?.status?.data?.role}</h3>
                                <p className="text-neutral-700 text-sm font-normal mt-1">Emirati nationality, 4556 Brendan Ferry Los Angeles, CA 90210</p>
                            </div>
                            <button className="bg-cyan-800 text-white w-[100px] h-9 inline-flex items-center justify-center rounded-md gap-1" onClick={()=>navigate(-1)}>
                                <EditIcon stroke="#fff" />
                                <small className="font-normal text-base">{language.buttons.edit}</small>
                            </button>
                        </section>
                        <section className="border border-cyan-800 w-[320px] h-[100px] rounded-md p-6 inline-flex items-center gap-4 mt-5 ml-11 screen800:ml-0 screen800:w-[220px] screen800:h-[80px] screen800:p-4">
                            <div className="rounded-md bg-cyan-800 inline-grid place-items-center w-12 h-12 screen800:w-8 screen800:h-8">
                                <MoneyIcon stroke="#fff" />
                            </div>
                            <div>
                                <small className="text-neutral-500 text-sm font-medium">{language.common.accredited}</small>
                                <div>
                                    <small className="text-neutral-900 text-2xl font-semibold screen800:text-sm">{language.common.aed}&nbsp;{state?.selected?.low_limit} {state?.selected?.low_limit !== state?.selected?.upper_limit && " - "+state?.selected?.upper_limit}</small>&nbsp;
                                    {state?.selected?.currency && <small className="text-green-600 text-sm font-semibold">{state?.selected?.currency}</small>}
                                </div>
                            </div>
                        </section>
                    </aside>

                    <GoalStepper language={language} navigate={() => navigate("/philosophy-goals/1")} />
                </section>
            </aside>
        </main>
    );
};
export default CompleteGoals;
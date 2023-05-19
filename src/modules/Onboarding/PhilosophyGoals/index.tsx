import { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../../shared/components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../redux-toolkit/store/store";
import Questionare from "./Questionare";
import { toast } from "react-toastify";
import { toastUtil } from "../../../utils/toast.utils";

const PhilosophyGoals = (props: any) => {
    const params = useParams();
    const navigate = useNavigate();
    const language: any = useSelector((state: RootState) => state.language.value);
    const [step, setStep] = useState(Number(params?.id) || 1);

    useLayoutEffect(() => {
        setStep(Number(params?.id) || 1)
    }, [params]);

    return (
        <main className="h-full max-h-full background-auth overflow-y-auto">
            <section className="h-[67px]">
                <Header custom={true} data={{ leftMenu: language.individual.philosophyGoals, button: <button className="text-neutral-900 bg-white font-bold text-sm w-[150px] h-9 border border-black shadow-sm screen800:w-[120px]">{language.buttons.gotoDashboard}</button> }} />
            </section>

            <Questionare step={step} returnSuccessRedirection={(data: any) => {
                toast.success(data?.status?.message, toastUtil);
                localStorage.removeItem("philosophy");
                navigate(`/add-attachments`);
            }} />
        </main>
    )
};
export default PhilosophyGoals;
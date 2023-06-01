import { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../../shared/components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../redux-toolkit/store/store";
import Questionare from "./Questionare";
import { ApplicationStatus } from "../../../enums/types.enum";

const PhilosophyGoals = (props: any) => {
    const params = useParams();
    const navigate = useNavigate();
    const language: any = useSelector((state: RootState) => state.language.value);
    const user: any = useSelector((state: RootState) => state.user.value);
    const metadata: any = useSelector((state: RootState) => state.user.value);
    const [step, setStep]: any = useState(1);

    useLayoutEffect(() => {
        if (user.status !== ApplicationStatus.OPENED) navigate("/welcome")

        setStep(Number(params?.id) || 1);
    }, [params]);

    return (
        <main className="h-full max-h-full background-auth overflow-y-auto">
            <section className="h-[67px]">
                <Header custom={true} data={{ leftMenu: language.individual.philosophyGoals, button: <button onClick={() => navigate("/complete-goals")} className="text-neutral-900 bg-white font-bold text-sm w-[150px] h-9 cursor-pointer border border-black shadow-sm screen800:w-[120px]">{language.buttons.gotoDashboard}</button> }} />
            </section>

            <Questionare step={step} returnSuccessRedirection={(data: any) => {
                navigate(`/add-attachments`);
            }} />
        </main>
    )
};
export default PhilosophyGoals;
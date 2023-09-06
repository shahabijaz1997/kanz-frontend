import { useSelector } from "react-redux";
import Stepper from "../../../shared/components/Stepper";
import { RootState } from "../../../redux-toolkit/store/store";
import { useState } from "react";
import Header from "../../../shared/components/Header";
import { useNavigate } from "react-router-dom";
import CrossIcon from "../../../ts-icons/crossIcon.svg";

const CreateDeal = ({ }: any) => {
    const navigate = useNavigate();
    const language: any = useSelector((state: RootState) => state.language.value);
    const [totalSteps] = useState([{ id: 1, text: language?.v3?.startup?.create_deal?.stage }, { id: 2, text: language?.v3?.startup?.create_deal?.instrument }, { id: 3, text: language?.v3?.startup?.create_deal?.round_size }, { id: 4, text: language?.v3?.startup?.create_deal?.attachments },
    { id: 5, text: language?.v3?.startup?.create_deal?.terms }, { id: 6, text: language?.v3?.startup?.create_deal?.additional_detail }, { id: 7, text: language?.v3?.startup?.create_deal?.review }])

    return (
        <main className="h-full max-h-full overflow-y-auto overflow-x-hidden">
            <section> <Header custom={true} data={{ leftMenu: language?.v3?.startup?.create_deal?.title, button: (<button onClick={() => navigate(-1)}> <CrossIcon stroke="#171717" className="w-6 h-6" /></button>) }} /></section>

            <aside className="w-full flex items-start pt-14 px-12">
                <section>
                    <Stepper totalSteps={totalSteps} currentStep={0} direction="col" />
                </section>
                <section></section>
            </aside>
        </main>
    )
};
export default CreateDeal;
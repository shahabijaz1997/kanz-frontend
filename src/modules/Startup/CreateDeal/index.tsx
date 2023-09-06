import { useSelector } from "react-redux";
import Stepper from "../../../shared/components/Stepper";
import { RootState } from "../../../redux-toolkit/store/store";
import { useState } from "react";

const CreateDeal = ({ }: any) => {
    const language: any = useSelector((state: RootState) => state.language.value);
    const [totalSteps] = useState([{ id: 1, text: language?.v3?.startup?.create_deal?.stage }, { id: 2, text: language?.v3?.startup?.create_deal?.instrument }, { id: 3, text: language?.v3?.startup?.create_deal?.round_size }, { id: 4, text: language?.v3?.startup?.create_deal?.attachments },
    { id: 5, text: language?.v3?.startup?.create_deal?.terms }, { id: 6, text: language?.v3?.startup?.create_deal?.additional_detail }, { id: 7, text: language?.v3?.startup?.create_deal?.review }])

    return (
        <main>
            <Stepper totalSteps={totalSteps} currentStep={0} direction="col" />
        </main>
    )
};
export default CreateDeal;
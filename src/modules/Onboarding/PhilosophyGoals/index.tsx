import { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../../shared/components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../redux-toolkit/store/store";
import Objective from "./Objective";
import Requirement from "./Requirement";
import Modal from "../../../shared/components/Modal";
import InvestmentCriteria from "./InvestmentCriteria";
import InvestmentHorizon from "./InvestmentHorizon";
import Loss from "./Loss";

const PhilosophyGoals = (props: any) => {
    const params = useParams();
    const navigate = useNavigate();
    const language: any = useSelector((state: RootState) => state.language.value);
    const [selection, setSelection] = useState(Number(params?.id) || 1);
    const [modalOpen, setModalOpen] = useState(false);

    useLayoutEffect(() => {
        setSelection(Number(params?.id) || 1)
    }, [params]);

    return (
        <main className="h-full max-h-full background-auth overflow-y-auto">
            <section className="h-[67px]">
                <Header custom={true} data={{ leftMenu: language.individual.philosophyGoals, button: <button className="text-neutral-900 bg-white font-bold text-sm w-[150px] h-9 border border-black shadow-sm">{language.buttons.gotoDashboard}</button> }} />
            </section>

            {selection === 1 && <Objective />}
            {selection === 2 && <Requirement />}
            {selection === 3 && <InvestmentCriteria />}
            {selection === 4 && <InvestmentHorizon />}
            {selection === 5 && <Loss nextStep={() => setModalOpen(true)} />}

            <Modal show={modalOpen}>
                <div className="p-12 rounded-md shadow-cs-1 flex flex-col items-center w-full bg-white outline-none focus:outline-none">
                    <h3 className="text-xl font-bold">{language.modal.thankyou}</h3>

                    <div className="w-[80%]">
                        <p className="mt-8 text-sm font-normal text-neutral-500 text-center leading-relaxed">{language.modal.sub_1} {language.modal.sub_2}</p>
                        <p className="mt-4 text-sm font-normal text-neutral-500 text-center leading-relaxed">{language.modal.sub_3}</p>
                        <p className="text-sm font-normal text-neutral-500 text-center leading-relaxed">{language.modal.sub_4} <span className="color-blue">012-345678</span></p>
                    </div>

                    <button className="mt-8 bg-cyan-800 text-white w-[120px] h-9 inline-flex items-center justify-center rounded-md" type="button" onClick={() => {
                        setModalOpen(false);
                        navigate("/add-attachments")
                    }}>
                        {language.buttons.continue}
                    </button>
                </div>
            </Modal>
        </main>
    )
};
export default PhilosophyGoals;
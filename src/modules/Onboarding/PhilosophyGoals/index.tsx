import { useSelector } from "react-redux";
import Header from "../../../shared/components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../redux-toolkit/store/store";
import { useLayoutEffect, useState } from "react";
import Objective from "./Objective";
import Requirement from "./Requirement";
import Drawer from "../../../shared/components/Drawer";
import Modal from "../../../shared/components/Modal";

const PhilosophyGoals = (props: any) => {
    const params = useParams();
    const navigate = useNavigate();
    const language: any = useSelector((state: RootState) => state.language.value);
    const [selection, setSelection] = useState(Number(params?.id) || 1);
    const [isOpen, setOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useLayoutEffect(() => {
        setSelection(Number(params?.id) || 1)
    }, [params]);

    return (
        <main className="h-full max-h-full background-auth">
            <section className="h-[67px]">
                <Header custom={true} data={{ leftMenu: language.individual.philosophyGoals, button: <button className="text-neutral-900 font-bold text-sm w-[150px] h-9 border border-black shadow-sm">{language.buttons.gotoDashboard}</button> }} />
            </section>
            <Drawer isOpen={isOpen} setIsOpen={(val: boolean) => setOpen(val)}>
                <header className="font-bold text-xl">{language.philosophyGoals.objective}</header>
                <p className="text-neutral-700 font-normal text-sm text-justify">
                    Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus,
                    ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl.
                </p>
            </Drawer>
            {selection === 1 && <Objective learnMore={() => setOpen(true)} />}
            {selection === 2 && <Requirement learnMore={() => setOpen(true)} nextStep={() => setShowModal(true)} />}
            <Modal show={showModal}>
                <div className="p-12 rounded-md shadow-cs-1 flex flex-col items-center w-full bg-white outline-none focus:outline-none">
                    <h3 className="text-xl font-bold">{language.modal.thankyou}</h3>

                    <div className="w-[80%]">
                        <p className="mt-8 text-sm font-normal text-neutral-500 text-center leading-relaxed">{language.modal.sub_1}</p>
                        <p className="mt-4 text-sm font-normal text-neutral-500 text-center leading-relaxed">{language.modal.sub_2}</p>
                        <p className="text-sm font-normal text-neutral-500 text-center leading-relaxed">{language.modal.sub_3} <span className="color-blue">012-345678</span></p>
                    </div>

                    <button className="mt-8 bg-cyan-800 text-white w-[120px] h-9 inline-flex items-center justify-center rounded-md" type="button" onClick={() => {
                        setShowModal(false);
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
import { useSelector } from "react-redux";
import Header from "../../../shared/components/Header";
import { useParams } from "react-router-dom";
import { RootState } from "../../../redux-toolkit/store/store";
import { useLayoutEffect, useState } from "react";
import Objective from "./Objective";
import Requirement from "./Requirement";
import Drawer from "../../../shared/components/Drawer";

const PhilosophyGoals = (props: any) => {
    const params = useParams();
    const language: any = useSelector((state: RootState) => state.language.value);
    const [selection, setSelection] = useState(Number(params?.id) || 1);
    const [isOpen, setOpen] = useState(false);

    useLayoutEffect(() => {
        setSelection(Number(params?.id) || 1)
    }, [params]);

    return (
        <main className="h-full max-h-full background-auth">
            <section className="h-[67px]">
                <Header custom={true} data={{ leftMenu: language.individual.philosophyGoals, button: language.buttons.gotoDashboard }} />
            </section>
            <Drawer isOpen={isOpen} setIsOpen={(val: boolean) => setOpen(val)}>
                <header className="font-bold text-xl">{language.philosophyGoals.objective}</header>
                <p className="text-neutral-700 font-normal text-sm text-justify">
                    Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus,
                    ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl.
                </p>
            </Drawer>
            {selection === 1 && <Objective learnMore={() => setOpen(true)} />}
            {selection === 2 && <Requirement learnMore={() => setOpen(true)} previousStep={() => setSelection(selection - 1)} />}
        </main>
    )
};
export default PhilosophyGoals;
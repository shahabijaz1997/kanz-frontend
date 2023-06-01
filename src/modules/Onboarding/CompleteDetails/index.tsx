import { useState, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../../shared/components/Header";
import Individual from "../components/Individual";
import Firm from "../components/Firm";
import Drawer from "../../../shared/components/Drawer";
import { ApplicationStatus, InvestorType } from "../../../enums/types.enum";

const CompleteDetails = (props: any) => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const user: any = useSelector((state: RootState) => state.user.value);
    const language: any = useSelector((state: RootState) => state.language.value);
    const [isOpen, setOpen] = useState(false);

    useLayoutEffect(() => {
        if (user.status !== ApplicationStatus.OPENED && user.status !== ApplicationStatus.IN_PROGRESS) navigate("/welcome")
    }, []);
    return (
        <main className="h-full max-h-full background-auth overflow-y-auto">
            <section className="h-[67px]">
                <Header />
            </section>
            <aside className="w-full flex items-center justify-center flex-col pt-12">
                <section className="flex items-start justify-center flex-col max-w-[420px] screen500:max-w-[300px]">
                    <h2 className="text-[24px] font-bold text-left text-neutral-900 mb-4 screen500:text-[20px]">{state === InvestorType.INDIVIDUAL ? language?.individual?.individual : language?.firm?.firm}</h2>
                    <h3 className="text-[16px] text-left text-neutral-700 mb-12 screen500:text-[12px]">
                        <span className="font-normal">{state === InvestorType.INDIVIDUAL ? language?.individual?.sub : language?.firm?.sub}</span> &nbsp;
                        <span className="color-blue font-medium cursor-pointer" onClick={() => setOpen(true)}>{language?.common?.learn}</span>
                    </h3>
                    {state === InvestorType.INDIVIDUAL && <Individual language={language} />}
                    {state === InvestorType.FIRM && <Firm language={language} />}
                </section>
            </aside>

            <Drawer isOpen={isOpen} setIsOpen={(val: boolean) => setOpen(val)}>
                <header className="font-bold text-xl">{language.philosophyGoals.whyToDo}</header>
                <p className="text-neutral-700 font-normal text-sm text-justify">
                    Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus,
                    ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl.
                </p>
            </Drawer>
        </main>
    );
};
export default CompleteDetails;
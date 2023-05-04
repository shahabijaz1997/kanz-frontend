import { useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import { useLocation } from "react-router-dom";
import Header from "../../../shared/components/Header";
import Individual from "../components/Individual";
import Firm from "../components/Firm";
import { InvestorType } from "../../../enums/types.enum";

const CompleteDetails = (props: any) => {
    const { state } = useLocation();
    const language: any = useSelector((state: RootState) => state.language.value);

    return (
        <main className="h-full max-h-full background-auth">
            <section className="h-[67px]">
                <Header />
            </section>
            <aside className="w-full flex items-center justify-center flex-col pt-12">
                <section className="flex items-start justify-center flex-col max-w-[420px] screen500:max-w-[300px]">
                    <h2 className="text-[24px] font-bold text-left text-neutral-900 mb-4 screen500:text-[20px]">{state === InvestorType.INDIVIDUAL ? language?.individual?.individual : language?.firm?.firm}</h2>
                    <h3 className="text-[16px] text-left text-neutral-700 mb-12 screen500:text-[12px]">
                        <span className="font-normal">{state === InvestorType.INDIVIDUAL ? language?.individual?.sub : language?.firm?.sub}</span> &nbsp;
                        <span className="color-blue-2 font-medium">{language?.common?.learn}</span>
                    </h3>
                    {state === InvestorType.INDIVIDUAL && <Individual language={language} />}
                    {state === InvestorType.FIRM && <Firm language={language} />}
                </section>
            </aside>
        </main>
    );
};
export default CompleteDetails;
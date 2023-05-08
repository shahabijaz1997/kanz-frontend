import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux-toolkit/store/store";
import Header from "../../../shared/components/Header";

const Welcome = (props: any) => {
    const { guard } = props;
    const navigate = useNavigate();
    const language: any = useSelector((state: RootState) => state.language.value);

    const selectInvestorType = () => {
        navigate("/investor-type")
    };

    return (
        <main className="h-full max-h-full background-auth overflow-y-auto">
            <section>
                <Header />
            </section>
            <aside className="w-full flex items-center justify-center py-14">
                <section className="bg-white inline-flex flex-col items-center py-14 w-1/2 screen991:w-3/4 screen991:w-[90%]" style={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.04)" }}>
                    <h2 className="text-[24px] font-bold text-left text-neutral-900 mb-4 screen500:text-[20px]">{language?.onboarding?.welcomeDashboard}</h2>
                    <h3 className="text-[16px] font-normal text-left text-neutral-700 screen500:text-[12px]">{language?.onboarding?.starterMessage}</h3>
                    <button className="text-white text-sm tracking-[0.03em] font-bold rounded-md bg-cyan-800 focus:outline-none focus:shadow-outline px-8 mt-14 h-[38px]" type="button" onClick={selectInvestorType}>
                        {language?.buttons?.start}
                    </button>
                </section>
            </aside>
        </main>
    )
};
export default Welcome
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../../redux-toolkit/store/store";
import Header from "../../../shared/components/Header";
import React from "react";
import { Roles } from "../../../enums/roles.enum";
import AddAttachmentBanner from "../../../shared/components/AddAttachmentBanner";

const Welcome = (props: any) => {
    const { guard } = props;
    const { state } = useLocation();
    const navigate = useNavigate();
    const language: any = useSelector((state: RootState) => state.language.value);

    const renderRoleWiseScreen = () => {
        if (state?.role === Roles.INVESTOR) {
            return (
                <React.Fragment>
                    <h2 className="text-2xl font-bold text-neutral-900 mb-4 screen500:text-[20px]">{language?.onboarding?.welcomeDashboard}</h2>
                    <h3 className="text-base font-normal text-neutral-700 screen500:text-[12px]">{language?.onboarding?.starterMessage}</h3>
                    <button className="text-white text-sm tracking-[0.03em] font-bold rounded-md bg-cyan-800 focus:outline-none focus:shadow-outline px-8 mt-14 h-[38px]" type="button" onClick={()=> navigate("/investor-type")}>
                        {language?.buttons?.start}
                    </button>
                </React.Fragment>
            )
        } else if (state?.role === Roles.SYNDICATE) {
            return (
                <React.Fragment>
                    <h2 className="text-2xl font-bold text-neutral-900 mb-4 screen500:text-[20px]">{language?.onboarding?.syndicateLead}</h2>
                    <h3 className="text-base font-normal text-neutral-700 screen500:text-[12px]">{language?.onboarding?.syndicateLeadSub}</h3>
                    <button className="text-white text-sm tracking-[0.03em] font-bold rounded-md bg-cyan-800 focus:outline-none focus:shadow-outline px-8 mt-14 h-[38px]" type="button" onClick={()=> navigate("/syndicate-lead")}>
                        {language?.buttons?.start}
                    </button>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <h2 className="text-2xl font-bold text-neutral-900 mb-4 screen500:text-[20px]">{language?.onboarding?.syndicateLead}</h2>
                    <h3 className="text-base font-normal text-neutral-700 screen500:text-[12px]">{language?.onboarding?.syndicateLeadSub}</h3>
                    <button className="text-white text-sm tracking-[0.03em] font-bold rounded-md bg-cyan-800 focus:outline-none focus:shadow-outline px-8 mt-14 h-[38px]" type="button" onClick={()=>navigate("/syndicate-lead")}>
                        {language?.buttons?.start}
                    </button>
                </React.Fragment>
            )
        }
    };

    return (
        <main className="h-full max-h-full background-auth overflow-y-auto">
            <section>
                <Header />
            </section>
            {state?.role !== Roles.INVESTOR && <AddAttachmentBanner language={language} navigate={navigate} />}

            <aside className="w-full flex items-center justify-center pt-[75px]">
                <section className="bg-white inline-flex flex-col items-center py-14 w-1/2 screen991:w-3/4 screen991:w-[90%]" style={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.04)" }}>
                    {renderRoleWiseScreen()}
                </section>
            </aside>
        </main>
    )
};
export default Welcome
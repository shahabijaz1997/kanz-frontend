import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux-toolkit/store/store";
import ClippedBanner from "./components/ClippedBanner";
import Signup from "./components/Signup";
import EmailVerification from "./components/EmailVerification";
import LanguageDrodownWrapper from "../../shared/views/LanguageDrodownWrapper";

const Onboarding = (props: any) => {
    const [payload, setPayload] = useState(null);
    const orientation: any = useSelector((state: RootState) => state.orientation.value);

    return (
        <main className="h-full max-h-full cbc-auth overflow-y-auto overflow-x-hidden">
            <ClippedBanner />
            <section className="h-full w-[55%] inline-block align-top screen991:w-full overflow-y-auto">
                <aside className="inline-flex flex-col items-center justify-center w-full">
                    {!payload && <section className={`relative w-full top-[26px] ${orientation === "rtl" ? "text-left" : "text-right"}`}>
                       <LanguageDrodownWrapper />
                    </section>}
                    {!payload ? <Signup onSetStepper={(data: any) => { setPayload(data) }} /> : <EmailVerification payload={payload} onReSignup={()=>setPayload(null)} />}
                </aside>
            </section>
        </main>
    )
};
export default Onboarding;
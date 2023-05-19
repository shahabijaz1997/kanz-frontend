import { useState } from "react";
import ClippedBanner from "./components/ClippedBanner";
import Dropdown from "../../shared/components/Dropdown";
import Signup from "./components/Signup";
import EmailVerification from "./components/EmailVerification";
import { languageDropdownItems } from "../../utils/dropdown-items.utils";

const Onboarding = (props: any) => {
    const [payload, setPayload] = useState(null);

    return (
        <main className="h-full max-h-full background-auth overflow-y-auto">
            <ClippedBanner />
            <section className="h-full w-[55%] inline-block align-top screen991:w-full">
                <aside className="inline-flex flex-col items-center justify-center w-full h-full">
                    <section className="absolute top-[26px] right-[5%] w-full text-right">
                        <Dropdown dropdownItems={languageDropdownItems} />
                    </section>
                    {!payload ? <Signup onSetStepper={(data: any) => { setPayload(data) }} /> : <EmailVerification payload={payload} />}
                </aside>
            </section>
        </main>
    )
};
export default Onboarding;
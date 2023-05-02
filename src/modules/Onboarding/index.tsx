import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveToken } from "../../redux-toolkit/slicer/auth.slicer";
import { RootState } from "../../redux-toolkit/store/store";
import ClippedBanner from "./components/ClippedBanner";
import Dropdown from "../../shared/components/Dropdown";
import Signup from "./components/Signup";
import EmailVerification from "./components/EmailVerification";
import UKFlag from "../../assets/icons/gb.png";

const Onboarding = (props: any) => {
    const dispatch = useDispatch();
    const dropdownItems = [{ id: 1, title: "English", icon: UKFlag }]
    const authToken: any = useSelector((state: RootState) => state.auth.value);
    const [stepper, setStepper] = useState(1);

    return (
        <main className="h-full max-h-full background-auth">
            <ClippedBanner />
            <section className="h-full w-[55%] inline-block align-top">
                <aside className="inline-flex flex-col items-center justify-center w-full h-full">
                    <Dropdown style={"absolute top-[20px] right-[50px]"} dropdownItems={dropdownItems} />
                    {stepper === 0 && <Signup onSetStepper={() => setStepper(1)} />}
                    {stepper === 1 && <EmailVerification />}
                </aside>
            </section>
        </main>
    )
};
export default Onboarding;
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveToken } from "../../redux-toolkit/slicer/auth.slicer";
import { RootState } from "../../redux-toolkit/store/store";
import ClippedBanner from "./components/ClippedBanner";
import CheckIcon from "../../assets/icons/check.png";
import GoogleIcon from "../../assets/icons/google_logo.png";
import LinkedinIcon from "../../assets/icons/linedin_logo.png";
import UKFlag from "../../assets/icons/gb.png";
import Dropdown from "../../shared/components/Dropdown";

const Onboarding = (props: any) => {
    const dispatch = useDispatch();
    const dropdownItems = [{ id: 1, title: "English", icon: UKFlag }]
    const authToken: any = useSelector((state: RootState) => state.auth.value);
    useLayoutEffect(() => {
        doi()
    }, []);
    const doi = () => {
        console.log(588);

        // dispatch(saveToken("Ahmad h"));

        setTimeout(() => {
            console.log("authToken", authToken);

        }, 2000)
    }
    return (
        <main className="h-full max-h-full background-auth">
            <ClippedBanner />
            <section className="h-full w-[55%] inline-block align-top">
                <aside className="inline-flex flex-col items-center justify-center w-full h-full">
                    <Dropdown style={"absolute top-[20px] right-[50px]"} dropdownItems={dropdownItems} />

                    <section className="max-w-md">
                        <h2 className="text-[24px] font-bold text-left">Create an account with Kanz</h2>
                        <form className="pt-12 pb-8 mb-4">
                            <div className="mb-4">
                                <label className="block text-neutral-700 text-[14px] font-semibold mb-2" htmlFor="full-name">Full name</label>
                                <input className="h-[42px] shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="full-name" type="text" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-neutral-700 text-[14px] font-semibold mb-2" htmlFor="email">Email address</label>
                                <input className="h-[42px] shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" />
                            </div>
                            <div className="mb-0">
                                <label className="block text-neutral-700 text-[14px] font-semibold mb-2" htmlFor="password">Password</label>
                                <input className="h-[42px] shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" />
                            </div>
                            <div className="inline-flex flex-row items-center justify-between w-full gap-4 mb-6">
                                <section className="inline-flex items-center">
                                    <div className="check-background rounded-full w-4 h-4 inline-grid place-items-center mr-1">
                                        <img src={CheckIcon} alt="Check" />
                                    </div>
                                    <small className="text-neutral-500 text-[14px] font-normal">Upper case letter</small>
                                </section>
                                <section className="inline-flex items-center">
                                    <div className="check-background rounded-full w-4 h-4 inline-grid place-items-center mr-1">
                                        <img src={CheckIcon} alt="Check" />
                                    </div>
                                    <small className="text-neutral-500 text-[14px] font-normal">Lower case letter</small>
                                </section>
                                <section className="inline-flex items-center">
                                    <div className="check-background rounded-full w-4 h-4 inline-grid place-items-center mr-1 ">
                                        <img src={CheckIcon} alt="Check" />
                                    </div>
                                    <small className="text-neutral-500 text-[14px] font-normal">Min 8 characters</small>
                                </section>
                            </div>
                            <button className="text-white font-semibold rounded-md focus:outline-none focus:shadow-outline w-full primary-bg h-[38px]" type="submit">
                                Create Account
                            </button>
                            <div className="flex items-center justify-center my-[38px]">
                                <div className="border-t border-neutral-300 flex-grow"></div>
                                <div className="px-4 text-neutral-500 font-normal">Or Sign in with</div>
                                <div className="border-t border-neutral-300 flex-grow"></div>
                            </div>

                            <aside className="inline-flex items-center justify-between w-full gap-4">
                                <button className="border border-neutral-300 rounded-md py-2.5 px-4 w-2/4 h-[38px] inline-grid place-items-center"><img src={GoogleIcon} alt="Google Login" /></button>
                                <button className="border border-neutral-300 rounded-md py-2.5 px-4 w-2/4 h-[38px] inline-grid place-items-center"><img src={LinkedinIcon} alt="LinkedIn Login" /></button>
                            </aside>
                        </form>
                    </section>
                </aside>
            </section>
        </main>
    )
};
export default Onboarding;
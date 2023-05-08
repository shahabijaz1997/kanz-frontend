import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux-toolkit/store/store";
import { hasLowerCase, hasUpperCase, isValidEmail } from "../../../../utils/regex.utils";
import CheckIcon from "../../../../ts-icons/CheckIcon.svg";
import EyeIcon from "../../../../ts-icons/EyeIcon.svg";
import EyeSlash from "../../../../ts-icons/EyeSlashIcon.svg";
import InformationIcon from "../../../../ts-icons/InformationIcon.svg";
import GoogleIcon from "../../../../assets/icons/google_logo.png";
import LinkedinIcon from "../../../../assets/icons/linedin_logo.png";

const Signup = (props: any) => {
    const { onSetStepper } = props;
    const language: any = useSelector((state: RootState) => state.language.value);
    const [viewPassword, setViewPassword] = useState(false);
    const [data, setData] = useState({ fullName: "", email: "", password: "", })

    const onSetData = (value: string, type: string) => {
        setData((prev) => {
            return { ...prev, [type]: value }
        })
    };

    const renderViewPassword = () => {
        return (
            <div className="cursor-pointer absolute top-[38px] right-[15px]" onClick={() => setViewPassword(!viewPassword)}>
                {!viewPassword ? <EyeIcon stroke="rgb(64 64 64)" /> : <EyeSlash stroke="rgb(64 64 64)" />}
            </div>
        )
    };

    const renderEmailValidation = () => {
        return (
            <React.Fragment>
                <div className="absolute top-[38px] right-[15px]">
                    <InformationIcon stroke="rgb(239 68 68)" />
                </div>
                <span className="font-normal tracking-wide text-red-500 text-[14px]">
                    {language?.promptMessages?.invalidEmail}
                </span>
            </React.Fragment>
        )
    };

    const renderPasswordStrengthUI = () => {
        return (
            <div className="inline-flex flex-row items-center justify-between w-full gap-4 mb-6 screen500:flex-col screen500:items-start">
                <section className="inline-flex items-center">
                    <div className={`${hasUpperCase(data.password) ? "checked-background" : "check-background"} rounded-full w-4 h-4 inline-grid place-items-center mr-1`}>
                        <CheckIcon fill={`${hasUpperCase(data.password) ? "#fff" : "rgba(0, 0, 0, 0.3)"}`} />
                    </div>
                    <small className="text-neutral-500 text-[14px] font-normal">{language?.onboarding?.upperCase}</small>
                </section>
                <section className="inline-flex items-center">
                    <div className={`${hasLowerCase(data.password) ? "checked-background" : "check-background"} check-background rounded-full w-4 h-4 inline-grid place-items-center mr-1`}>
                        <CheckIcon fill={`${hasLowerCase(data.password) ? "#fff" : "rgba(0, 0, 0, 0.3)"}`} />
                    </div>
                    <small className="text-neutral-500 text-[14px] font-normal">{language?.onboarding?.lowerCase}</small>
                </section>
                <section className="inline-flex items-center">
                    <div className={`${data.password.length >= 8 ? "checked-background" : "check-background"} check-background rounded-full w-4 h-4 inline-grid place-items-center mr-1`}>
                        <CheckIcon fill={`${data.password.length >= 8 ? "#fff" : "rgba(0, 0, 0, 0.3)"}`} />
                    </div>
                    <small className="text-neutral-500 text-[14px] font-normal">{language?.onboarding?.min8}</small>
                </section>
            </div>
        )
    };
    return (
        <section className="w-[428px] max-w-md pt-[130px] screen500:max-w-[300px]">
            <h2 className="text-[24px] font-bold text-left text-neutral-900 screen500:text-[20px]">{language?.onboarding?.createAccount}</h2>
            <form className="pt-12 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-neutral-700 text-[14px] font-semibold mb-2" htmlFor="full-name">{language?.common?.fullName}</label>
                    <input className="h-[42px] shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline" id="full-name" type="text" placeholder="Alex Parker" />
                </div>
                <div className="mb-4 relative">
                    <label className="block text-neutral-700 text-[14px] font-semibold mb-2" htmlFor="email">{language?.common?.email}</label>
                    <input
                        className={`${data.email.length > 0 && !isValidEmail(data.email) && "mb-3"} h-[42px] shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline`}
                        id="email" type="email"
                        onChange={(e) => onSetData(e.target.value, "email")}
                        value={data.email}
                        placeholder="you@example.com"
                    />
                    {data.email.length > 0 && !isValidEmail(data.email) && renderEmailValidation()}
                </div>
                <div className="mb-1 relative">
                    <label className="block text-neutral-700 text-[14px] font-semibold mb-2" htmlFor="password">{language?.common?.password}</label>
                    <input
                        className="h-[42px] shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 pl-3 pr-12 text-gray-500 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e) => onSetData(e.target.value, "password")}
                        value={data.password}
                        id="password"
                        type={viewPassword ? "text" : "password"}
                        placeholder="**********"
                    />
                    {renderViewPassword()}

                </div>
                {renderPasswordStrengthUI()}
                <button className="text-white text-sm font-semibold bg-cyan-800 tracking-[0.03em] rounded-md focus:outline-none focus:shadow-outline w-full h-[38px]" type="submit" onClick={onSetStepper}>
                    {language?.buttons?.createAccount}
                </button>
                <div className="flex items-center justify-center my-[38px]">
                    <div className="border-t border-neutral-300 flex-grow"></div>
                    <div className="px-4 text-neutral-500 font-normal">{language?.onboarding?.orSignIn}</div>
                    <div className="border-t border-neutral-300 flex-grow"></div>
                </div>

                <aside className="inline-flex items-center justify-between w-full gap-4">
                    <button className="border border-neutral-300 rounded-md py-2.5 px-4 w-2/4 h-[38px] inline-grid place-items-center"><img src={GoogleIcon} alt={language?.onboarding?.googleLogin} /></button>
                    <button className="border border-neutral-300 rounded-md py-2.5 px-4 w-2/4 h-[38px] inline-grid place-items-center"><img src={LinkedinIcon} alt={language?.onboarding?.linkedinLogin} /></button>
                </aside>
            </form>
        </section>
    )
};
export default Signup;
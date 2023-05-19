import React, { useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux-toolkit/store/store";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastUtil } from "../../utils/toast.utils";
import Dropdown from "../../shared/components/Dropdown";
import { languageDropdownItems } from "../../utils/dropdown-items.utils";
import ClippedBanner from "../Onboarding/components/ClippedBanner";
import { isValidEmail } from "../../utils/regex.utils";
import InformationIcon from "../../ts-icons/InformationIcon.svg";
import EyeIcon from "../../ts-icons/EyeIcon.svg";
import EyeSlash from "../../ts-icons/EyeSlashIcon.svg";
import Spinner from "../../shared/components/Spinner";
import { saveToken } from "../../redux-toolkit/slicer/auth.slicer";
import { signin } from "../../apis/auth.api";
import { Roles } from "../../enums/roles.enum";

const Login = ({ }: any) => {
    const { state } = useLocation();
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authToken: any = useSelector((state: RootState) => state.auth.value);
    const language: any = useSelector((state: RootState) => state.language.value);
    const [payload, setPayload] = useState({ email: "", password: "" });
    const [viewPassword, setViewPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    
    useLayoutEffect(() => {
        if (authToken) navigate("/welcome");
    }, [])

    const onSetPayload = (value: string, type: string) => {
        setPayload((prev) => {
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

    const onSignin = async (e: any) => {
        e.preventDefault();
        try {
            if (!payload.email || !payload.password) return;
            setLoading(true);

            const response: any = await signin({ user: payload });
            if (response.status === 200 && response.headers["authorization"]) {
                const token = response.headers["authorization"].split(" ")[1]
                dispatch(saveToken(token));
                toast.success(response.status.message, toastUtil);
                localStorage.setItem("role", Roles.INVESTOR)
                if (state) navigate(`/${state}`);
                else navigate("/welcome");
            }
            else toast.error(language.promptMessages.errorGeneral, toastUtil);

        } catch (error: any) {
            const message = error?.response?.data || language.promptMessages.errorGeneral;
            toast.error(message, toastUtil);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="h-full max-h-full background-auth overflow-y-auto">
            <ClippedBanner />
            <section className="h-full w-[55%] inline-block align-top screen991:w-full">
                <aside className="inline-flex flex-col items-center justify-center w-full h-full">
                    <section className="absolute top-[26px] right-[5%] w-full text-right">
                        <Dropdown dropdownItems={languageDropdownItems} />
                    </section>
                    <section className="w-[428px] max-w-md pt-[130px] screen500:max-w-[300px]">
                        <h2 className="text-[24px] font-bold text-left text-neutral-900 screen500:text-[20px]">{language?.onboarding?.loginKanz}</h2>
                        <form className="pt-12 pb-8 mb-4" onSubmit={onSignin}>
                            <div className="mb-4 relative">
                                <label className="block text-neutral-700 text-sm font-semibold mb-2" htmlFor="email">{language?.common?.email}</label>
                                <input
                                    className={`${payload.email.length > 0 && !isValidEmail(payload.email) && "mb-3"} h-[42px] shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline`}
                                    id="email" type="email"
                                    onChange={(e) => onSetPayload(e.target.value, "email")}
                                    value={payload.email}
                                    placeholder="you@example.com"
                                />
                                {payload.email.length > 0 && !isValidEmail(payload.email) && renderEmailValidation()}
                            </div>
                            <div className="mb-1 relative">
                                <label className="block text-neutral-700 text-sm font-semibold mb-2" htmlFor="password">{language?.common?.password}</label>
                                <input
                                    className="h-[42px] shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 pl-3 pr-12 text-gray-500 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    onChange={(e) => onSetPayload(e.target.value, "password")}
                                    value={payload.password}
                                    id="password"
                                    type={viewPassword ? "text" : "password"}
                                    placeholder="**********"
                                />
                                {renderViewPassword()}

                            </div>
                            {loading ? (
                                <button className="text-white text-sm font-semibold bg-cyan-800 tracking-[0.03em] rounded-md focus:outline-none focus:shadow-outline w-full h-[38px]">
                                    <Spinner />
                                </button>
                            ) : (
                                <button className={`${(!payload.email || !payload.password) && "opacity-70"} text-white text-sm font-semibold bg-cyan-800 tracking-[0.03em] rounded-md focus:outline-none focus:shadow-outline w-full h-[38px]`} type="submit">
                                    {language?.buttons?.signin}
                                </button>
                            )}
                            <div className="flex justify-end my-[15px]">
                                <p className="text-neutral-500 text-left">{language.buttons.notRegistered} </p>&nbsp;
                                <button className="text-cyan-800 font-bold cursor-pointer" onClick={() => navigate("/signup")}>{language.buttons.signup}</button>
                            </div>
                        </form>
                    </section>
                </aside>
            </section>
        </main>
    );
};
export default Login;
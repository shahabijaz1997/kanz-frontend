import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux-toolkit/store/store";
import { confirmToken, signup } from "../../../../apis/auth.api";
import Spinner from "../../../../shared/components/Spinner";
import { toast } from "react-toastify";
import { toastUtil } from "../../../../utils/toast.utils";
import { saveToken } from "../../../../redux-toolkit/slicer/auth.slicer";
import { Roles } from "../../../../enums/roles.enum";

const EmailVerification = ({ payload }: any) => {
    const dispatch = useDispatch();
    const language: any = useSelector((state: RootState) => state.language.value);
    const [isEdit, setEdit] = useState(false);
    const [email, setEmail] = useState(payload?.email);
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false);

    const onReVerify = async (e: any) => {
        try {
            e.preventDefault();
            if (!email) return;
            setLoading(true);
            const { status, data } = await signup({ user: { email, password: payload.password, name: payload.name } });

            if (status === 200){
                setEdit(false);
            }
            
        } catch (error: any) {
            const message = error?.response?.data?.status?.message || language.promptMessages.errorGeneral;
            toast.error(message, toastUtil);
        } finally {
            setLoading(false);
            setToken("");
        }
    };

    const verifyToken = async (e: any) => {
        try {
            e.preventDefault();
            if (!token) return;
            setLoading(true);
            const response: any = await confirmToken({ confirmation_token: token });
            if(response.status === 200) {
                console.log("response.headers: ", response.headers);
                
                const token = response.headers["authorization"].split(" ")[1]
                dispatch(saveToken(token));
                toast.success(response.status.message, toastUtil);
                localStorage.setItem("role", Roles.INVESTOR)
                toast.success(response?.data?.message, toastUtil);
            }

        } catch (error: any) {
            const message = error?.response?.data?.status?.message || language.promptMessages.errorGeneral;
            toast.error(message, toastUtil);
        } finally {
            setLoading(false);
            setToken("");
        }
    };

    return (
        <section className="w-[428px] max-w-md pt-[130px] screen500:max-w-[300px]">
            <h2 className="text-2xl font-bold text-left text-neutral-900 mb-4">{language?.onboarding?.verificationCode}</h2>
            <h3 className="text-base font-normal text-left text-neutral-700 screen500:text-[12px]">{language?.onboarding?.verificationText}</h3>
            {!isEdit ? (
                <form className="pt-8 pb-8 mb-4" onSubmit={verifyToken}>
                    <div className="mb-4">
                        <label className="block text-neutral-700 text-sm font-semibold mb-2 screen500:text-[12px]" htmlFor="code">{language?.onboarding?.codeText}</label>
                        <input className="h-[42px] shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline" id="code" type="text" value={token} onChange={(e) => setToken(e.target.value)} />
                    </div>
                    <div className="text-right text-neutral-500 font-normal text-[14px] screen500:text-[12px]">{language?.onboarding?.sentCode} ({email}) <span className="color-blue cursor-pointer"
                        onClick={() => setEdit(true)}>{language?.buttons?.edit} </span></div>

                    {loading ? (
                        <button className="text-white text-sm tracking-[0.03em] bg-cyan-800 rounded-md focus:outline-none focus:shadow-outline w-full h-[38px] mt-10" type="submit">
                            <Spinner />
                        </button>
                    ) : (
                        <button className="text-white text-sm tracking-[0.03em] bg-cyan-800 rounded-md focus:outline-none focus:shadow-outline w-full h-[38px] mt-10" type="submit">
                            {language?.buttons?.verify}
                        </button>
                    )}

                </form>
            ) : (
                <form className="pt-8 pb-8 mb-4" onSubmit={onReVerify}>
                    <div className="mb-4">
                        <label className="block text-neutral-700 text-sm font-semibold mb-2 screen500:text-[12px]" htmlFor="email">{language?.common?.email}</label>
                        <input
                            className="h-[42px] shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                            id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    {loading ? (
                        <button className={`${!email && "opacity-70"} text-white text-sm tracking-[0.03em] bg-cyan-800 rounded-md focus:outline-none focus:shadow-outline w-full h-[38px] mt-10`}>
                            <Spinner />
                        </button>
                    ) : (
                        <button className={`${!email && "opacity-70"} text-white text-sm tracking-[0.03em] bg-cyan-800 rounded-md focus:outline-none focus:shadow-outline w-full h-[38px] mt-10`} type="submit">
                            {language?.buttons?.continue}
                        </button>
                    )}
                </form>
            )}
        </section>
    )
};

export default EmailVerification
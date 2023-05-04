import { useSelector } from "react-redux";
import { RootState } from "../../../../redux-toolkit/store/store";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
    const navigate = useNavigate();
    const language: any = useSelector((state: RootState) => state.language.value);

    return (
        <section className="w-[428px] max-w-md pt-[130px] screen500:max-w-[300px]">
            <h2 className="text-[24px] font-bold text-left text-neutral-900 mb-4">{language?.onboarding?.verificationCode}</h2>
            <h3 className="text-[16px] font-normal text-left text-neutral-700 screen500:text-[12px]">{language?.onboarding?.verificationText}</h3>
            <form className="pt-8 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-neutral-700 text-[14px] font-semibold mb-2 screen500:text-[12px]" htmlFor="code">{language?.onboarding?.codeText}</label>
                    <input className="h-[42px] shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline" id="code" type="text" />
                </div>
                <div className="text-right text-neutral-500 font-normal text-[14px] screen500:text-[12px]">{language?.onboarding?.sentCode} (you@example.com) <span className="color-blue">{language?.buttons?.sentCode} </span></div>
                <button className="text-white font-semibold rounded-md focus:outline-none focus:shadow-outline w-full primary-bg h-[38px] mt-10" onClick={()=>navigate("/investor-type")}>
                    {language?.buttons?.verify}
                </button>
            </form>
        </section>
    )
};

export default EmailVerification
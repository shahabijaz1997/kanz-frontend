import { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux-toolkit/store/store";
import LoginBg from "../../../../assets/login_bg.png";
import QuotesSvg from "../../../../assets/svg/quotes.svg";

const ClippedBanner = () => {
    const language: any = useSelector((state: RootState) => state.language.value);
    const orientation: any = useSelector((state: RootState) => state.orientation.value);
    let [clipPath, setClipPath] = useState("polygon(0px 0px, 100% 0px, 84% 100%, 0% 100%)");

    useLayoutEffect(() => {
        if (orientation === "rtl") setClipPath("polygon(0px 0%, 100% 0px, 100% 100%, 10% 100%)")
        else setClipPath("polygon(0px 0px, 100% 0px, 84% 100%, 0% 100%)")
    }, [orientation]);

    return (
        <section style={{ clipPath }} className="h-full w-[45%] inline-block align-top relative screen991:hidden">
            <img src={LoginBg} alt={language?.onboarding?.loginBgAlt} className="w-full h-full absolute object-cover" />
            <aside className="bg-white rounded-[20px] w-[65%] h-[250px] absolute left-1/2 translate-x-[-50%] py-[20px] px-[22px] top-[20vh]">
                <img src={QuotesSvg} alt={language?.onboarding?.quotes} />
                <div className="relative top-[-20px] px-[20px]">
                    <h2 className="m-0 p-0 text-[36px] font-bold leading-none screen1200:text-[30px]">{language?.onboarding?.welcome}</h2>
                    <p className="font-normal pt-[30px] text-[16px] leading-7 tracking-[3%] text-neutral-500 screen1200:text-[13px] screen1200:leading-2">{language?.onboarding?.syndicateLeadSub}</p>
                </div>
            </aside>
        </section>
    )
};
export default ClippedBanner;
import LoginBg from "../../../../assets/login_bg.png";
import QuotesSvg from "../../../../assets/svg/quotes.svg";

const ClippedBanner = () => {
    return (
        <section style={{ clipPath: "polygon(0px 0px, 100% 0px, 84% 100%, 0% 100%)" }} className="h-full w-[45%] inline-block align-top relative screen991:hidden">
            <img src={LoginBg} alt="Login Background" className="w-full h-full absolute object-cover" />
            <aside className="bg-white rounded-[20px] w-[65%] h-[250px] absolute left-1/2 translate-x-[-50%] py-[20px] px-[22px] top-[20vh]">
                <img src={QuotesSvg} alt="Quotes" />
                <div className="relative top-[-28px] px-[20px]">
                    <h2 className="m-0 p-0 text-[36px] font-bold leading-none screen1200:text-[30px]">Welcome to Kanz</h2>
                    <p className="font-normal pt-[30px] text-[16px] leading-7 tracking-[3%] text-neutral-500 screen1200:text-[13px] screen1200:leading-2">Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, <br />dictum est a, mattis tellus</p>
                </div>
            </aside>
        </section>
    )
};
export default ClippedBanner;
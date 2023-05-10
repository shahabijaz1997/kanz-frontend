import { useSelector } from "react-redux";
import { RootState } from "../../redux-toolkit/store/store";
import Header from "../../shared/components/Header";
import PatternSvg from "../../assets/svg/pattern.svg";
import PatternSvg_1 from "../../assets/svg/pattern_2.svg";
import PatternColor from "../../assets/svg/pattern_color.svg";
import PortalSS from "../../assets/portal_ss.png";
import Investors from "../../assets/investors.png";
import QuotesIcon from "../../ts-icons/quotesIcon.svg";

const Home = ({ }: any) => {
    const language: any = useSelector((state: RootState) => state.language.value);

    return (
        <main className="h-full max-h-full background-auth overflow-y-auto">
            <section>
                <Header showMenu={true} />
            </section>
            <div className="relative">
                <img src={PatternColor} alt="SVG" className="absolute right-0" />
                <img src={PatternSvg} alt="SVG" className="absolute right-0" />
            </div>
            <aside className="w-full pt-[75px] relative">
                <section className="max-w-[700px] px-[120px]">
                    <h3 className="text-cyan-800 text-xl tracking-[0.03em] font-bold">{language.landing.unlock}</h3>
                    <h1 className="text-neutral-900 text-2xl tracking-[0.03em] font-bold my-5">{language.landing.discoverStart}</h1>
                </section>
                <section className="max-w-[900px] px-[120px]">
                    <p className="text-neutral-500 tracking-[0.03em] text-base font-normal">{language.landing.discoverSub}</p>
                    <div className="inline-flex gap-3 mt-5">
                        <button className="bg-cyan-800 font-medium text-lg text-white px-[41px] py-[14px] rounded-md">{language.buttons.getStart}</button>
                        <button className="font-medium text-lg text-cyan-800 px-[41px] py-[14px] rounded-md shadow-cs-4">{language.buttons.readDocs}</button>
                    </div>
                </section>
                <section className="max-w-[80%] mt-16 relative px-[120px]">
                    <div className="rounded-md bg-cyan-800 p-8 text-white font-semibold text-base tracking-[0.03em] absolute right-[-100px] max-w-[425px] top-[-50px]">{language.landing.kanzNetwork}</div>
                    <img src={PortalSS} alt="Kanz" className="w-full" />
                </section>

                <section className="mt-[6%] relative h-[750px] overflow-hidden">
                    <img src={PatternSvg_1} alt="SVG" className="absolute w-full" />
                    <img src={PatternSvg} alt="SVG" className="absolute right-0" />

                    <aside className="flex flex-row justify-between items-center h-full px-[120px]">
                        <div className="relative inline-flex flex-col items-start w-1/2 pr-[80px]">
                            <h3 className="text-cyan-800 text-xl tracking-[0.03em] font-bold">{language.landing.invest}</h3>
                            <h1 className="text-neutral-900 text-2xl tracking-[0.03em] font-bold my-2">{language.landing.investSecSub}</h1>
                            <p className="text-neutral-500 tracking-[0.03em] text-base font-normal pt-1">{language.landing.investPara1}</p>
                            <p className="text-neutral-500 tracking-[0.03em] text-base font-normal pt-6">{language.landing.investPara2}</p>
                            <button className="bg-cyan-800 font-medium text-lg text-white px-[41px] py-[14px] rounded-md mt-6">{language.buttons.getStart}</button>
                        </div>
                        <div className="relative bg-white rounded-[20px] shadow-cs-5 p-6 w-[600px] h-[390px] w-1/2">
                            <img src={Investors} alt="Kanz" />
                        </div>
                    </aside>
                </section>

                <section className="h-[750px] overflow-hidden px-[120px] flex items-center justify-center flex-col">
                    <QuotesIcon />
                    <p className="text-black text-2x text-center max-w-[500px] font-medium my-7">Lorem ipsum dolor sit amet consectetur. Adipiscing ut nisi leo nibh eros in. Sed nulla quis scelerisque vitae. Fringilla massa facilisis non mattis mauris nisl. </p>
                    <p className="text-2xl font-medium">
                        <small className="text-black">Francis Towne</small>
                        <small style={{ color: "#808080" }}>-  Future Response Technician</small>
                    </p>
                </section>
            </aside>
        </main>
    )
}

export default Home;
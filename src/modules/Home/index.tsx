import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux-toolkit/store/store";
import Header from "../../shared/components/Header";
import PatternSvg from "../../assets/svg/pattern.svg";
import PatternColor from "../../assets/svg/pattern_color.svg";
import LeftQuote from "../../assets/left_quote.png";
import PortalSS from "../../assets/portal_ss.png";
import Investors from "../../assets/investors.png";
import QuotesIcon from "../../ts-icons/quotesIcon.svg";
import { KanzRoles } from "../../enums/roles.enum";
import Button from "../../shared/components/Button";

const Home = ({}: any) => {
  const navigate = useNavigate();
  const language: any = useSelector((state: RootState) => state.language.value);

  const longSecContent = () => {
    return (
      <React.Fragment>
        <aside>
          <h3 className="text-cyan-800 text-xl tracking-[0.03em] font-bold">
            {language.landing.startup}
          </h3>
          <h1 className="text-neutral-900 text-2xl tracking-[0.03em] font-bold my-2">
            3017 {language.landing.switchedToKanz}
          </h1>
          <p className="text-neutral-500 tracking-[0.03em] text-base font-normal pt-1 max-w-[70%] screen991:max-w-full">
            {language.landing.investPara1}
          </p>
          <p className="text-neutral-500 tracking-[0.03em] text-base font-normal pt-6 max-w-[70%] screen991:max-w-full">
            {language.landing.investPara2}
          </p>
          <div className="float-left">
            <Button
              style={{ fontSize: "1.125rem", fontWeight: 500 }}
              className="bg-cyan-800 h-[56px] w-[173px] font-medium text-lg mt-6"
              htmlType="submit"
              onClick={() => navigate(`/signup`, { state: KanzRoles.STARTUP })}
            >
              {language.buttons.getStart}
            </Button>
          </div>
          <div className="mt-[5rem]">
            <img src={LeftQuote} alt="Kanz" className="mb-2" />
            <div className="rounded-md bg-cyan-800 p-8 text-white font-semibold text-base tracking-[0.03em] max-w-[70%] screen991:max-w-full">
              {language.landing.kanzNetworkBank}
            </div>
          </div>
        </aside>

        <aside className="mt-[10rem]">
          <h3 className="text-cyan-800 text-xl tracking-[0.03em] font-bold">
            {language.landing.syndicate}
          </h3>
          <h1 className="text-neutral-900 text-2xl tracking-[0.03em] font-bold my-2">
            3017 {language.landing.switchedToKanz}
          </h1>
          <p className="text-neutral-500 tracking-[0.03em] text-base font-normal pt-1 max-w-[70%] screen991:max-w-full">
            {language.landing.investPara1}
          </p>
          <p className="text-neutral-500 tracking-[0.03em] text-base font-normal pt-6 max-w-[70%] screen991:max-w-full">
            {language.landing.investPara2}
          </p>
          <div className="float-left">
            <Button
              style={{ fontSize: "1.125rem", fontWeight: 500 }}
              className="bg-cyan-800 h-[56px] w-[173px] font-medium text-lg mt-6"
              htmlType="submit"
              onClick={() =>
                navigate(`/signup`, { state: KanzRoles.SYNDICATE })
              }
            >
              {language.buttons.getStart}
            </Button>
          </div>
          <div className="mt-[5rem]">
            <img src={LeftQuote} alt="Kanz" className="mb-2" />
            <div className="rounded-md bg-cyan-800 p-8 text-white font-semibold text-base tracking-[0.03em] max-w-[70%] screen991:max-w-full">
              {language.landing.kanzNetworkBank}
            </div>
          </div>
        </aside>

        <aside className="mt-[15rem]">
          <h3 className="text-cyan-800 text-xl tracking-[0.03em] font-bold">
            {language.landing.realtor}
          </h3>
          <h1 className="text-neutral-900 text-2xl tracking-[0.03em] font-bold my-2">
            3017 {language.landing.switchedToKanz}
          </h1>
          <p className="text-neutral-500 tracking-[0.03em] text-base font-normal pt-1 max-w-[70%] screen991:max-w-full">
            {language.landing.investPara1}
          </p>
          <p className="text-neutral-500 tracking-[0.03em] text-base font-normal pt-6 max-w-[70%] screen991:max-w-full">
            {language.landing.investPara2}
          </p>
          <div className="float-left">
            <Button
              style={{ fontSize: "1.125rem", fontWeight: 500 }}
              className="bg-cyan-800 h-[56px] w-[173px] font-medium text-lg mt-6"
              htmlType="submit"
              onClick={() => navigate(`/signup`, { state: KanzRoles.REALTOR })}
            >
              {language.buttons.getStart}
            </Button>
          </div>

          <div className="mt-[5rem]">
            <img src={LeftQuote} alt="Kanz" className="mb-2" />
            <div className="rounded-md bg-cyan-800 p-8 text-white font-semibold text-base tracking-[0.03em] max-w-[70%] screen991:max-w-full">
              {language.landing.kanzNetworkBank}
            </div>
          </div>
        </aside>
      </React.Fragment>
    );
  };
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
        {/* Section 1 */}
        <section className="max-w-[700px] px-[120px] screen1024:px-[50px]">
          <h3 className="text-cyan-800 text-xl tracking-[0.03em] font-bold">
            {language.landing.unlock}
          </h3>
          <h1 className="text-neutral-900 text-2xl tracking-[0.03em] font-bold my-5">
            {language.landing.discoverStart}
          </h1>
        </section>
        <section className="max-w-[900px] px-[120px] screen1024:px-[50px]">
          <p className="text-neutral-500 tracking-[0.03em] text-base font-normal">
            {language.landing.discoverSub}
          </p>
          <div className="inline-flex gap-3 mt-5">
            <Button
              style={{ fontSize: "1.125rem", fontWeight: 500 }}
              className="bg-cyan-800 h-[56px] w-[173px] font-medium "
              htmlType="submit"
              onClick={() => {}}
            >
              {language.buttons.getStart}
            </Button>
            <button className="font-medium text-lg text-cyan-800 px-[41px] py-[14px] rounded-md shadow-cs-4">
              {language.buttons.readDocs}
            </button>
          </div>
        </section>

        {/* Section 2 */}
        <section className="max-w-[80%] screen800:max-w-full mt-16 relative px-[120px] screen1024:px-[50px]">
          <div className="rounded-md bg-cyan-800 p-8 text-white font-semibold text-base tracking-[0.03em] absolute right-[-100px] max-w-[425px] top-[-50px] screen800:text-sm screen800:p-4 screen800:relative screen800:right-0 screen800:top-0">
            {language.landing.kanzNetwork}
          </div>
          <img src={PortalSS} alt="Kanz" className="w-full" />
        </section>

        <section className="mt-[6%] relative h-[750px] screen1024:h-[500px] overflow-hidden">
          <div
            style={{
              backgroundImage:
                "linear-gradient(to left, #ccdcf4, #d4e2f6, #dce8f7, #e4edf8, #edf3fa)",
            }}
            className="absolute h-full w-full"
          ></div>
          <img src={PatternSvg} alt="SVG" className="absolute right-0" />

          <aside className="flex flex-row screen991:flex-col justify-between items-center h-full px-[120px] screen1024:px-[50px] relative">
            <div className="inline-flex flex-col items-start w-1/2 screen991:justify-center screen991:h-full screen991:w-full pr-[80px]">
              <h3 className="text-cyan-800 text-xl tracking-[0.03em] font-bold">
                {language.landing.invest}
              </h3>
              <h1 className="text-neutral-900 text-2xl tracking-[0.03em] font-bold my-2">
                {language.landing.investSecSub}
              </h1>
              <p className="text-neutral-500 tracking-[0.03em] text-base font-normal pt-1">
                {language.landing.investPara1}
              </p>
              <p className="text-neutral-500 tracking-[0.03em] text-base font-normal pt-6">
                {language.landing.investPara2}
              </p>
              <Button
                style={{ fontSize: "1.125rem", fontWeight: 500 }}
                className="bg-cyan-800 h-[56px] w-[173px] font-medium mt-6"
                htmlType="submit"
                onClick={() => {
                  navigate(`/signup`, { state: KanzRoles.INVESTOR });
                }}
              >
                {language.buttons.getStart}
              </Button>
            </div>
            <div className="bg-white rounded-[20px] shadow-cs-5 p-6 h-[390px] w-1/2 screen991:hidden">
              <img src={Investors} alt="Kanz" />
            </div>
          </aside>
        </section>

        <section className="h-[750px] screen1024:h-[500px] overflow-hidden px-[120px] screen1024:px-[50px] flex items-center justify-center flex-col">
          <QuotesIcon className="w-[141px] h-[125px]" />
          <p className="text-black text-2x text-center max-w-[500px] font-medium my-7">
            Lorem ipsum dolor sit amet consectetur. Adipiscing ut nisi leo nibh
            eros in. Sed nulla quis scelerisque vitae. Fringilla massa facilisis
            non mattis mauris nisl.{" "}
          </p>
          <p className="text-2xl font-medium">
            <small className="text-black">Francis Towne&nbsp;</small>
            <small style={{ color: "#808080" }}>
              - Future Response Technician
            </small>
          </p>
        </section>

        <section className="flex items-start justify-center">
          <div className="pl-[120px] screen1024:px-[50px] inline-flex items-center justify-center flex-col h-full">
            {longSecContent()}
          </div>
          <div
            className="w-full full screen991:hidden"
            style={{
              backgroundImage:
                "linear-gradient(to right, #ccdcf4, #d4e2f6, #dce8f7, #e4edf8, #edf3fa)",
            }}
          >
            <div style={{ visibility: "hidden" }}>{longSecContent()}</div>
          </div>
        </section>
      </aside>

      <footer className="h-[750px] screen1024:h-[500px] w-full bg-cyan-800 mt-[20rem]"></footer>
    </main>
  );
};

export default Home;

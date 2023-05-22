import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "../../../redux-toolkit/store/store";
import Header from "../../../shared/components/Header";
import CrossIcon from "../../../ts-icons/crossIcon.svg";
import Chevrond from "../../../ts-icons/chevrond.svg";

const SyndicateFlow = ({ }: any) => {
    const navigate = useNavigate();
    const language: any = useSelector((state: RootState) => state.language.value);
    const [options] = useState([{ id: 1, title: language?.buttons?.yes }, { id: 2, title: language?.buttons?.no }]);
    const [selected, setSelected]: any = useState(null);
    const [payload, setPayload]: any = useState({ region: "", industry: "", profile: "", deadflow: "" });

    const onSetPayload = (data: any, type: string) => {
        setPayload((prev: any) => {
            return { ...prev, [type]: data };
        });
    };

    return (
        <main className="h-full max-h-full background-auth overflow-y-auto">
            <section>
                <Header custom={true} data={{ leftMenu: language.header.syndicateLead, button: <button onClick={()=>navigate(-1)}><CrossIcon stroke="#171717" className="w-6 h-6" /></button> }} />
            </section>

            <aside className="w-[420px] h-full screen500:max-w-[300px] mx-auto py-12">
                <section className="flex items-start justify-center flex-col">
                    <h3 className="text-cc-black font-bold text-2xl">{language.syndicate.step} 1 of 2</h3>
                    <hr className="h-px w-full mt-4 bg-gray-200 border-0 bg-cbc-grey" />
                </section>

                <section className="flex items-start justify-center flex-col">
                    <form className="pt-12 mb-4 w-full">
                        <div className="mb-8 relative">
                            <h3 className="text-neutral-700 text-sm font-medium">{language?.syndicate?.raisedBefore}</h3>
                            <section className="w-full inline-flex items-center justify-between mt-2 gap-5">
                                {React.Children.toArray(
                                    options.map(opt => {
                                        return (
                                            <li className={`h-[50px] rounded-md w-[420px] p-4 grey-neutral-200 text-sm font-medium cursor-pointer border border-grey inline-flex items-center justify-start screen500:w-full ${selected?.id === opt.id ? "check-background" : "bg-white"}`} onClick={() => setSelected(opt)}>
                                                <input className="accent-cyan-800 relative float-left mr-2 h-3 w-3 rounded-full border-2 border-solid border-cyan-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04]"
                                                    type="radio" checked={selected?.id === opt.id ? true : false} />
                                                <small>{opt.title}</small>
                                            </li>
                                        )
                                    })
                                )}
                            </section>
                        </div>

                        <div className="mb-8 relative">
                            <h3 className="block text-neutral-700 text-sm font-medium">{language?.syndicate?.addDetail}</h3>
                            <small className="font-normal text-sm text-neutral-500">{language?.syndicate?.subDetail}</small>
                            <section className="w-full mt-2 p-[18px] rounded-lg check-background border border-grey">
                                <div className="mb-5">
                                    <label htmlFor="raised" className="text-neutral-700 text-sm font-medium">{language?.syndicate?.raisedQ}</label>
                                    <input id="raised" placeholder="101-500" className=" h-[42px] shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline" type="text" />
                                </div>
                                <div>
                                    <label htmlFor="times" className="text-neutral-700 text-sm font-medium">{language?.syndicate?.timesQ}</label>
                                    <input id="times" placeholder="12" className=" h-[42px] shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline" type="text" />
                                </div>
                            </section>
                        </div>

                        <div className="mb-8">
                            <label className="block text-neutral-700 text-sm font-medium" htmlFor="industry">{language?.syndicate?.industry}</label>
                            <small className="font-normal text-sm text-neutral-500">{language?.syndicate?.industrySub}</small>
                            <span className="relative">
                                <input id="industry" className=" h-[42px] shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline" type="text" />
                                <span className={`absolute top-[0px] right-0 flex items-center pr-2 pointer-events-none}`} style={{ zIndex: 99 }}>
                                    <Chevrond stroke="#737373" />
                                </span>
                            </span>
                        </div>

                        <div className="mb-8 relative">
                            <label className="block text-neutral-700 text-sm font-medium" htmlFor="region">{language?.syndicate?.region}</label>
                            <span className="relative">
                                <input id="region" className=" h-[42px] shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline" type="text" />
                                <span className={`absolute top-[0px] right-0 flex items-center pr-2 pointer-events-none}`} style={{ zIndex: 99 }}>
                                    <Chevrond stroke="#737373" />
                                </span>
                            </span>
                        </div>

                        <div className="mb-8 relative">
                            <label className="block text-neutral-700 text-sm font-medium" htmlFor="link">{language?.syndicate?.profile}</label>
                            <div className="relative inline-flex w-full">
                                <input type="disabled" value={"https://"} className="text-neutral-500 text-base font-normal check-background border-l border-t border-b border-neutral-300 pl-2 rounded-bl-md rounded-tl-md h-[42px] w-[70px]" />
                                <input id="link" placeholder="www.example.com" className=" h-[42px] shadow-sm appearance-none border border-neutral-300 rounded-br-md rounded-tr-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline" type="text" />
                            </div>
                        </div>

                        <div className="mb-4 relative">
                            <label className="block text-neutral-700 text-sm font-medium" htmlFor="deadflow">{language?.syndicate?.deadflow}</label>
                            <input id="deadflow" placeholder="Add text" className=" h-[42px] shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline" type="text" />
                        </div>
                    </form>
                </section>

                <section className="w-full inline-flex items-center justify-between py-16">
                    <button className="text-neutral-900 font-bold bg-white tracking-[0.03em] rounded-md border border-grey rounded-md focus:outline-none focus:shadow-outline h-[38px] w-[140px]" type="button" >
                        {language?.buttons?.back}
                    </button>
                    <button className="text-white font-bold bg-cyan-800 tracking-[0.03em] rounded-md focus:outline-none focus:shadow-outline h-[38px] w-[140px]" type="button">
                        {language?.buttons?.continue}
                    </button>
                </section>
            </aside>
        </main>
    );
};
export default SyndicateFlow;
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux-toolkit/store/store";
import Header from "../../../shared/components/Header";
import CountrySelector from "../../../shared/components/CountrySelector";

const Individual = (props: any) => {
    const navigate = useNavigate();
    const language: any = useSelector((state: RootState) => state.language.value);
    const [assertQuestions] = useState([{ id: 1, title: language?.individual?.option1 }, { id: 2, title: language?.individual?.option2 }, { id: 3, title: language?.individual?.option3 }, { id: 4, title: language?.individual?.option4 }])
    const [selectedAssert, setSelectedAssert]: any = useState(null);
    const [national, setNational] = useState();
    const [residence, setResidence] = useState();
    const [riskChecked, setRiskChecked] = useState(false);

    return (
        <main className="h-full max-h-full background-auth">
            <section className="h-[67px]">
                <Header />
            </section>
            <aside className="w-full flex items-center justify-center flex-col pt-12">
                <section className="flex items-start justify-center flex-col max-w-[420px] screen500:max-w-[300px]">
                    <h2 className="text-[24px] font-bold text-left text-neutral-900 mb-4 screen500:text-[20px]">{language?.individual?.individual}</h2>
                    <h3 className="text-[16px] text-left text-neutral-700 mb-12 screen500:text-[12px]">
                        <span className="font-normal">{language?.individual?.sub}</span> &nbsp;
                        <span className="color-blue-2 font-medium">{language?.common?.learn}</span>
                    </h3>
                    <form className="pt-12 pb-8 mb-4 w-full">
                        <section className="mb-8 w-full">
                            <label className="block text-neutral-700 text-sm font-semibold" htmlFor="full-name">{language?.common?.national}</label>
                            <CountrySelector onChange={(v: any) => setNational(v)} selectedValue={national} />
                        </section>
                        <section className="mb-8 w-full relative" style={{ zIndex: 90 }}>
                            <label className="block text-neutral-700 text-sm font-semibold" htmlFor="full-name">{language?.common?.residence}</label>
                            <CountrySelector onChange={(v: any) => setResidence(v)} selectedValue={residence} />
                        </section>

                        <section className="mb-8 w-full relative">
                            <label className="block text-neutral-700 text-sm font-semibold" htmlFor="full-name">{language?.individual?.accerQuestion}</label>
                            <ul>
                                {React.Children.toArray(
                                    assertQuestions.map(as => {
                                        return (
                                            <li className={`h-[50px] w-[420px] p-4 grey-neutral-200 text-sm font-medium cursor-pointer border border-grey inline-flex items-center justify-start first:rounded-t-md last:rounded-b-md ${selectedAssert?.id === as.id ? "check-background" : "bg-white"}`} onClick={() => setSelectedAssert(as)}>
                                                <input className="accent-cyan-800 relative float-left mr-2 h-3 w-3 rounded-full border-2 border-solid border-cyan-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04]"
                                                    type="radio" checked={selectedAssert?.id === as.id ? true : false} />
                                                <small>{as.title}</small>
                                            </li>
                                        )
                                    })
                                )}
                            </ul>
                        </section>

                        <section className="relative z-10 w-full inline-flex items-start gap-2 border-md border border-grey w-[420px] p-4 check-background cursor-pointer" onClick={() => setRiskChecked(!riskChecked)}>
                            <input type="checkbox" className="accent-cyan-800 h-3 w-3" checked={riskChecked} />
                            <div>
                                <h3 className="text-neutral-700 font-medium text-[14px] leading-none">{language?.individual?.risk}</h3>
                                <p className="text-neutral-500 text-sm font-normal">{language?.individual?.understanding}&nbsp;<span className="color-blue font-medium">{language?.common?.learn}</span></p>
                            </div>
                        </section>

                        <section className="w-full inline-flex items-center justify-between mt-16">
                            <button className="text-neutral-900 font-semibold rounded-md border border-grey font-semibold rounded-md focus:outline-none focus:shadow-outline h-[38px] w-[140px]" type="submit">
                                {language?.buttons?.back}
                            </button>
                            <button disabled={!selectedAssert?.id ? true : false} className="text-white font-semibold rounded-md focus:outline-none focus:shadow-outline primary-bg h-[38px] w-[140px]" type="button" onClick={() => navigate(`/`)}>
                                {language?.buttons?.continue}
                            </button>
                        </section>
                    </form>
                </section>
            </aside >
        </main >
    );
};
export default Individual;
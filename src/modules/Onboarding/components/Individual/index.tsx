import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CountrySelector from "../../../../shared/components/CountrySelector";
import { InvestorType } from "../../../../enums/types.enum";

const Individual = ({ language }: any) => {
    const navigate = useNavigate();
    const [assertQuestions] = useState([{ id: 1, title: language?.individual?.option1, amount: "18.36", currency: language.common.million }, { id: 2, title: language?.individual?.option2, amount: "8-18.36", currency: language.common.million }, { id: 3, title: language?.individual?.option3, amount: "3.67-8", currency: language.common.million }, { id: 4, title: language?.individual?.option4, amount: "735,000" }])
    const [selectedAssert, setSelectedAssert]: any = useState(null);
    const [national, setNational] = useState();
    const [residence, setResidence] = useState();
    const [riskChecked, setRiskChecked] = useState(false);

    return (
        <form className="pb-8 mb-4 w-full">
            <section className="mb-8 w-full">
                <label className="block text-neutral-700 text-sm font-medium" htmlFor="full-name">{language?.common?.national}</label>
                <CountrySelector onChange={(v: any) => setNational(v)} selectedValue={national} />
            </section>
            <section className="mb-8 w-full relative" style={{ zIndex: 90 }}>
                <label className="block text-neutral-700 text-sm font-medium" htmlFor="full-name">{language?.common?.residence}</label>
                <CountrySelector onChange={(v: any) => setResidence(v)} selectedValue={residence} />
            </section>

            <section className="mb-8 w-full relative">
                <label className="block text-neutral-700 text-sm font-medium mb-2" htmlFor="full-name">{language?.common?.accerQuestion}</label>
                <ul>
                    {React.Children.toArray(
                        assertQuestions.map(as => {
                            return (
                                <li className={`h-[50px] w-[420px] p-4 grey-neutral-200 text-sm font-medium cursor-pointer border border-grey inline-flex items-center justify-start first:rounded-t-md last:rounded-b-md screen500:w-full ${selectedAssert?.id === as.id ? "check-background" : "bg-white"}`} onClick={() => setSelectedAssert(as)}>
                                    <input className="accent-cyan-800 relative float-left mr-2 h-3 w-3 rounded-full border-2 border-solid border-cyan-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04]"
                                        type="radio" checked={selectedAssert?.id === as.id ? true : false} />
                                    <small>{as.title}</small>
                                </li>
                            )
                        })
                    )}
                </ul>
            </section>

            <section className="relative z-10 w-full inline-flex items-start gap-2 rounded-md border border-grey w-[420px] p-4 check-background cursor-pointer" onClick={() => setRiskChecked(!riskChecked)}>
                <input type="checkbox" className="accent-cyan-800 h-3 w-3" checked={riskChecked} />
                <div>
                    <h3 className="text-neutral-700 font-medium text-[14px] leading-none">{language?.common?.risk}</h3>
                    <p className="text-neutral-500 text-sm font-normal mt-1">{language?.individual?.understanding}&nbsp;<span className="color-blue font-medium">{language?.common?.learn}</span></p>
                </div>
            </section>

            <section className="w-full inline-flex items-center justify-between mt-16">
                <button className="text-neutral-900 bg-white font-bold tracking-[0.03em] rounded-md border border-grey font-bold rounded-md focus:outline-none focus:shadow-outline h-[38px] w-[140px]" type="button" onClick={() => navigate("/investor-type")}>
                    {language?.buttons?.back}
                </button>
                <button disabled={!selectedAssert?.id ? true : false} className={`${!selectedAssert?.id && "opacity-70"} text-white bg-cyan-800 tracking-[0.03em] font-bold rounded-md focus:outline-none focus:shadow-outline h-[38px] w-[140px]`} type="button" onClick={() => navigate("/complete-goals", { state: { type: InvestorType.INDIVIDUAL, selected: selectedAssert } })}>
                    {language?.buttons?.continue}
                </button>
            </section>
        </form>
    )
};
export default Individual;
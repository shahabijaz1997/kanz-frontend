import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CountrySelector from "../../../../shared/components/CountrySelector";
import { InvestorType } from "../../../../enums/types.enum";

const Firm = ({ language }: any) => {
    const navigate = useNavigate();
    const [assertQuestions] = useState([{ id: 1, title: language?.firm?.option1, amount: "100", currency: language.common.million }, { id: 2, title: language?.firm?.option2, amount: "50-100", currency: language.common.million }, { id: 3, title: language?.firm?.option3, amount: "10-50", currency: language.common.million }, { id: 4, title: language?.firm?.option4, amount: "1-10", currency: language.common.million }])
    const [selectedAssert, setSelectedAssert]: any = useState(null);
    const [residence, setResidence] = useState();
    const [riskChecked, setRiskChecked] = useState(false);

    return (
        <form className="pt-12 pb-8 mb-4 w-full">
            <section className="mb-8 w-full">
                <label className="block text-neutral-700 text-sm font-semibold" htmlFor="full-name">{language?.common?.legalName}</label>
                <input className="h-[42px] shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline" id="full-name" type="text" />
            </section>
            <section className="mb-8 w-full relative" style={{ zIndex: 90 }}>
                <label className="block text-neutral-700 text-sm font-semibold" htmlFor="full-name">{language?.common?.location}</label>
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

            <section className="relative z-10 w-full inline-flex items-start gap-2 rounded-md border border-grey w-[420px] p-4 check-background cursor-pointer" onClick={() => setRiskChecked(!riskChecked)}>
                <input type="checkbox" className="accent-cyan-800 h-3 w-3" checked={riskChecked} />
                <div>
                    <h3 className="text-neutral-700 font-medium text-[14px] leading-none">{language?.common?.risk}</h3>
                    <p className="text-neutral-500 text-sm font-normal">{language?.individual?.understanding}&nbsp;<span className="color-blue font-medium">{language?.common?.learn}</span></p>
                </div>
            </section>

            <section className="w-full inline-flex items-center justify-between mt-16">
                <button className="text-neutral-900 font-semibold rounded-md border border-grey font-semibold rounded-md focus:outline-none focus:shadow-outline h-[38px] w-[140px]" type="button" onClick={() => navigate("/investor-type")}>
                    {language?.buttons?.back}
                </button>
                <button disabled={!selectedAssert?.id ? true : false} className="text-white font-semibold rounded-md focus:outline-none focus:shadow-outline primary-bg h-[38px] w-[140px]" type="button" onClick={() => navigate("/complete-goals", { state: { type: InvestorType.FIRM, selected: selectedAssert } })}>
                    {language?.buttons?.continue}
                </button>
            </section>
        </form>
    )
};
export default Firm;
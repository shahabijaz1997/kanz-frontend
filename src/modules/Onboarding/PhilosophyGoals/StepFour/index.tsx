import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux-toolkit/store/store";
import Stepper from "../../../../shared/components/Stepper";
import HorionGraph from "../../../../assets/investment_horizon_graph.png";
import Drawer from "../../../../shared/components/Drawer";

const StepFour = ({ learnMore }: any) => {
    const navigate = useNavigate();
    const [isOpen, setOpen] = useState(false);

    const language: any = useSelector((state: RootState) => state.language.value);
    const [investmentHorizon] = useState([{ id: 1, title: language?.investmentHorizon?.inv_opt_1 }, { id: 2, title: language?.investmentHorizon?.inv_opt_1 }, { id: 3, title: language?.investmentHorizon?.inv_opt_3 }, { id: 4, title: language?.investmentHorizon?.inv_opt_4 }, { id: 5, title: language?.investmentHorizon?.inv_opt_5 }]);
    const [expectReturn] = useState([{ id: 1, title: language?.investmentHorizon?.return_opt_1 }, { id: 2, title: language?.investmentHorizon?.return_opt_2 }, { id: 3, title: language?.investmentHorizon?.return_opt_3 }, { id: 4, title: language?.investmentHorizon?.return_opt_4 }, { id: 5, title: language?.investmentHorizon?.return_opt_5 }]);
    const [selectedInvestmentHorizon, setSelectedInvestmentHorizon]: any = useState(null);
    const [selectedExpectedReturn, setSelectedExpectReturn]: any = useState(null);

    return (
        <aside className="w-full flex items-center justify-center flex-col pt-12 pb-5">
            <Stepper currentStep={3} />

            <section className="flex items-start justify-center flex-col mt-12 max-w-[420px] screen500:max-w-[300px]">
                <h3 className="text-cc-black font-bold text-2xl pb-6">{language.investmentHorizon.horizon}</h3>
                <p className="text-neutral-700 font-medium text-sm">
                    <span>{language.investmentHorizon.investComfortable}</span>&nbsp;
                    <span className="color-blue cursor-pointer" onClick={() => setOpen(true)}>{language.common.clickDetails}</span>
                </p>

                <section className="w-full inline-flex items-center justify-between mt-4 gap-5">
                    <ul>
                        {React.Children.toArray(
                            investmentHorizon.map(as => {
                                return (
                                    <li className={`h-[50px] w-[420px] p-4 grey-neutral-200 text-sm font-medium cursor-pointer border border-grey inline-flex items-center justify-start first:rounded-t-md last:rounded-b-md screen500:w-full ${selectedInvestmentHorizon?.id === as.id ? "check-background" : "bg-white"}`} onClick={() => setSelectedInvestmentHorizon(as)}>
                                        <input className="accent-cyan-800 relative float-left mr-2 h-3 w-3 rounded-full border-2 border-solid border-cyan-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04]"
                                            type="radio" checked={selectedInvestmentHorizon?.id === as.id ? true : false} />
                                        <small>{as.title}</small>
                                    </li>
                                )
                            })
                        )}
                    </ul>
                </section>
            </section>

            <section className="flex items-start justify-center flex-col mt-12 max-w-[420px] screen500:max-w-[300px]">
                <h3 className="text-cc-black font-bold text-2xl pb-6">{language.investmentHorizon.expectReturn}</h3>
                <p className="text-neutral-700 font-medium text-sm">
                    <span>{language.investmentHorizon.expectingReturn}</span>&nbsp;
                    <span className="color-blue cursor-pointer" onClick={() => setOpen(true)}>{language.common.clickDetails}</span>
                </p>

                <section className="w-full inline-flex items-center justify-between mt-4 gap-5">
                    <ul>
                        {React.Children.toArray(
                            expectReturn.map(as => {
                                return (
                                    <li className={`h-[50px] w-[420px] p-4 grey-neutral-200 text-sm font-medium cursor-pointer border border-grey inline-flex items-center justify-start first:rounded-t-md last:rounded-b-md screen500:w-full ${selectedExpectedReturn?.id === as.id ? "check-background" : "bg-white"}`} onClick={() => setSelectedExpectReturn(as)}>
                                        <input className="accent-cyan-800 relative float-left mr-2 h-3 w-3 rounded-full border-2 border-solid border-cyan-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04]"
                                            type="radio" checked={selectedExpectedReturn?.id === as.id ? true : false} />
                                        <small>{as.title}</small>
                                    </li>
                                )
                            })
                        )}
                    </ul>
                </section>
            </section>

            <section className="w-full inline-flex items-center justify-between mt-16 max-w-[420px] screen500:max-w-[300px]">
                <button className="text-neutral-900 tracking-[0.03em] bg-white font-bold rounded-md border border-grey rounded-md focus:outline-none focus:shadow-outline h-[38px] w-[140px]" type="button" onClick={() => navigate("/philosophy-goals/3")}>
                    {language?.buttons?.back}
                </button>
                <button disabled={!selectedInvestmentHorizon?.id ? true : false} className={`${!selectedInvestmentHorizon?.id && "opacity-70"} text-white font-bold rounded-md bg-cyan-800 focus:outline-none focus:shadow-outline h-[38px] w-[140px]`} type="button" onClick={() => navigate("/philosophy-goals/5")}>
                    {language?.buttons?.continue}
                </button>
            </section>
            <Drawer isOpen={isOpen} setIsOpen={(val: boolean) => setOpen(val)}>
                <p className="text-neutral-700 font-normal text-sm text-justify">{language.modal.horizon_para_1}</p>
                <p className="text-neutral-700 font-normal text-sm text-justify">{language.modal.horizon_para_2}</p>
                <img src={HorionGraph} alt={language.investmentHorizon.horizon} />
            </Drawer>
        </aside>
    );
};
export default StepFour;
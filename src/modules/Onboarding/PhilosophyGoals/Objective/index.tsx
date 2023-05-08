import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux-toolkit/store/store";
import Stepper from "../../../../shared/components/Stepper";

const Objective = ({ learnMore, nextStep }: any) => {
    const navigate = useNavigate();

    const language: any = useSelector((state: RootState) => state.language.value);
    const [investQuestions] = useState([{ id: 1, title: language?.philosophyGoals?.option1 }, { id: 2, title: language?.philosophyGoals?.option2 }, { id: 3, title: language?.philosophyGoals?.option3 }]);
    const [incomeQuestions] = useState([{ id: 1, title: language?.philosophyGoals?.reqOpt1 }, { id: 2, title: language?.philosophyGoals?.reqOpt2 }]);
    const [selectedInvest, setSelectedInvest]: any = useState(null);
    const [selectedIncome, setSelectedIncome]: any = useState(null);

    return (
        <aside className="w-full flex items-center justify-center flex-col pt-12 pb-5">
            <Stepper currentStep={0} />
            <section className="flex items-start justify-center flex-col mt-12 max-w-[420px] screen500:max-w-[300px]">
                <h3 className="text-neutral-700 font-medium text-base">{language.philosophyGoals.objective}</h3>
                <p className="text-neutral-500 font-normal text-sm">
                    <span>{language.philosophyGoals.objQuestion}</span>
                    <span className="color-blue">{language.common.learn}</span>
                </p>
                <section className="mb-8 w-full relative mt-3">
                    <ul>
                        {React.Children.toArray(
                            investQuestions.map(as => {
                                return (
                                    <li className={`h-[50px] w-[420px] p-4 grey-neutral-200 text-sm font-medium cursor-pointer border border-grey inline-flex items-center justify-start first:rounded-t-md last:rounded-b-md screen500:w-full ${selectedInvest?.id === as.id ? "check-background" : "bg-white"}`} onClick={() => setSelectedInvest(as)}>
                                        <input className="accent-cyan-800 relative float-left mr-2 h-3 w-3 rounded-full border-2 border-solid border-cyan-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04]"
                                            type="radio" checked={selectedInvest?.id === as.id ? true : false} />
                                        <small>{as.title}</small>
                                    </li>
                                )
                            })
                        )}
                    </ul>
                </section>
            </section>

            <section className="flex items-start justify-center flex-col mt-12 max-w-[420px] screen500:max-w-[300px]">
                <h3 className="text-neutral-700 font-medium text-base">{language.philosophyGoals.req}</h3>
                <p className="text-neutral-500 font-normal text-sm">
                    <span>{language.philosophyGoals.reqQes}</span>
                    <span className="color-blue">{language.common.learn}</span>
                </p>
                <section className="mb-8 w-full relative mt-3">
                    <ul>
                        {React.Children.toArray(
                            incomeQuestions.map(as => {
                                return (
                                    <li className={`h-[50px] w-[420px] p-4 grey-neutral-200 text-sm font-medium cursor-pointer border border-grey inline-flex items-center justify-start first:rounded-t-md last:rounded-b-md screen500:w-full ${selectedIncome?.id === as.id ? "check-background" : "bg-white"}`} onClick={() => setSelectedIncome(as)}>
                                        <input className="accent-cyan-800 relative float-left mr-2 h-3 w-3 rounded-full border-2 border-solid border-cyan-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04]"
                                            type="radio" checked={selectedIncome?.id === as.id ? true : false} />
                                        <small>{as.title}</small>
                                    </li>
                                )
                            })
                        )}
                    </ul>
                </section>
                <section className="w-full inline-flex items-center justify-between mt-16">
                    <button className="text-neutral-900 tracking-[0.03em] bg-white font-bold rounded-md border border-grey rounded-md focus:outline-none focus:shadow-outline h-[38px] w-[140px]" type="button" onClick={() => navigate("/complete-goals")}>
                        {language?.buttons?.back}
                    </button>
                    <button disabled={!selectedInvest?.id ? true : false} className="text-white tracking-[0.03em] bg-cyan-800 font-bold rounded-md focus:outline-none focus:shadow-outline h-[38px] w-[140px]" type="button" onClick={()=>navigate("/philosophy-goals/2")}>
                        {language?.buttons?.continue}
                    </button>
                </section>
            </section>

        </aside>
    )
};
export default Objective;
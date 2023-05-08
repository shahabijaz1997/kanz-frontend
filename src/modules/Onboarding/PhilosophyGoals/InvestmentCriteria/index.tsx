import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import { RootState } from "../../../../redux-toolkit/store/store";
import Stepper from "../../../../shared/components/Stepper";
import Drawer from "../../../../shared/components/Drawer";

const InvestmentCriteria = () => {
    const navigate = useNavigate();
    const [isOpen, setOpen] = useState(false);

    const language: any = useSelector((state: RootState) => state.language.value);
    const [startupQuestions] = useState([{ id: 1, title: language?.investmentExperience?.pref_opt_1 }, { id: 2, title: language?.investmentExperience?.pref_opt_2 }, { id: 3, title: language?.investmentExperience?.pref_opt_3 }]);
    const [selectedStartup, setSelectedStartup]: any = useState(null);

    return (
        <aside className="w-full flex items-center justify-center flex-col pt-12 pb-5">
            <Stepper currentStep={2} />

            <section className="flex items-start justify-center flex-col mt-12 max-w-[420px] screen500:max-w-[300px]">
                <p className="text-neutral-700 font-medium text-sm">
                    <span>{language.investmentExperience.preference}</span>&nbsp;
                    <span className="color-blue cursor-pointer" onClick={() => setOpen(true)}>{language.common.clickDetails}</span>
                </p>

                <section className="w-full inline-flex items-center justify-between mt-4 gap-5">
                    <ul>
                        {React.Children.toArray(
                            startupQuestions.map(as => {
                                return (
                                    <li className={`h-[50px] w-[420px] p-4 grey-neutral-200 text-sm font-medium cursor-pointer border border-grey inline-flex items-center justify-start first:rounded-t-md last:rounded-b-md screen500:w-full ${selectedStartup?.id === as.id ? "check-background" : "bg-white"}`} onClick={() => setSelectedStartup(as)}>
                                        <input className="accent-cyan-800 relative float-left mr-2 h-3 w-3 rounded-full border-2 border-solid border-cyan-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04]"
                                            type="radio" checked={selectedStartup?.id === as.id ? true : false} />
                                        <small>{as.title}</small>
                                    </li>
                                )
                            })
                        )}
                    </ul>
                </section>
            </section>
           
            <section className="flex items-start justify-center flex-col mt-12 max-w-[420px] screen500:max-w-[300px]">
                <p className="text-neutral-700 font-medium text-sm">
                    <span>{language.investmentExperience.investmentCriteriaQues}</span>&nbsp;
                    <span className="color-blue cursor-pointer" onClick={() => setOpen(true)}>{language.common.clickDetails}</span>
                </p>

                <section className="w-full inline-flex items-center justify-between mt-4 gap-5">
                    <textarea placeholder="Add text" className="resize-none h-[100px] shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                </section>
            </section>
            <section className="w-full inline-flex items-center justify-between mt-16 max-w-[420px] screen500:max-w-[300px]">
                <button className="text-neutral-900 tracking-[0.03em] bg-white font-bold rounded-md border border-grey rounded-md focus:outline-none focus:shadow-outline h-[38px] w-[140px]" type="button" onClick={() => navigate("/philosophy-goals/2")}>
                    {language?.buttons?.back}
                </button>
                <button disabled={!selectedStartup?.id ? true : false} className={`${!selectedStartup?.id && "opacity-70"} text-white font-bold rounded-md bg-cyan-800 focus:outline-none focus:shadow-outline h-[38px] w-[140px]`} type="button" onClick={() => navigate("/philosophy-goals/4")}>
                    {language?.buttons?.continue}
                </button>
            </section>

            <Drawer isOpen={isOpen} setIsOpen={(val: boolean) => setOpen(val)}>
                <header className="font-bold text-xl">{language.philosophyGoals.objective}</header>
                <p className="text-neutral-700 font-normal text-sm text-justify">
                    Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus,
                    ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl.
                </p>
            </Drawer>
        </aside>
    );
};
export default InvestmentCriteria;
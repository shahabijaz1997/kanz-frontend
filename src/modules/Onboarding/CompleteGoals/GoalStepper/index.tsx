import { useState } from "react";
import Stepper from "../../../../shared/components/Stepper";

const GoalStepper = ({ language }: any) => {
    const [step, setStep] = useState(0);

    return (
        <aside className="cursor-pointer rounded-xl p-6 mb-5 shadow-cs-1 w-full = inline-flex justify-center">
            <section className="w-full inline-flex items-center flex-col max-w-[370px]">
                <h3 className="text-neutral-900 text-2xl font-bold">{language.individual.philosophyGoals}</h3>
                <p className="text-neutral-700 text-base font-normal my-5 text-center">{language.individual.philosophysub}</p>

                {/* {step === 1 &&} */}
                {step === 0 ? (
                    <button className="bg-cyan-800 text-white w-[120px] h-9 inline-flex items-center justify-center rounded-md" onClick={() => setStep(1)}>
                        <small>{language.buttons.start}</small>
                    </button>
                ) : (
                    <button className="bg-cyan-800 text-white w-[120px] h-9 inline-flex items-center justify-center rounded-md">
                        <small>{language.buttons.continue}</small>
                    </button>
                )}
            </section>
        </aside>
    )
};
export default GoalStepper;
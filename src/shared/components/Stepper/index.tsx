import React from "react";
import CheckIcon from "../../../ts-icons/CheckIcon.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";

const Stepper = ({ currentStep = 1, totalSteps = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }], direction = "row" }: any) => {
    const orientation: any = useSelector((state: RootState) => state.orientation.value);
    const renderCircle = (step: any) => {
        let circle;
        if (step?.id <= currentStep) circle = <div className="h-8 w-8 rounded-full flex items-center justify-center bg-cyan-800"><CheckIcon stroke="#fff" /></div>
        else if ((step?.id - currentStep) === 1) circle = <div className="h-8 w-8 rounded-full flex items-center justify-center border-2 border-cyan-800"><div className="h-2 w-2 bg-cyan-800 rounded-full"></div></div>
        else circle = <div className="h-8 w-8 rounded-full flex items-center justify-center border-2 border-neutral-200"></div>

        return (
            <span className="relative">
                {circle}
                {step?.text && <p className={`absolute uppercase text-sm font-bold ${currentStep > step?.id && "text-neutral-900"} ${currentStep === step?.id && "text-cyan-800"} ${currentStep < step?.id && "text-neutral-500"} ${direction === "row" ? "" : "top-1/2 translate-y-[-50%] left-[160%] w-[200px]"}`}>{step.text}</p>}
            </span>
        )
    };

    return (
        <div className={`flex items-center justify-center mb-7 ${direction !== "row" && "flex-col"}`}>
            {React.Children.toArray(totalSteps?.map((step: any) => (
                <div className={`relative flex items-center ${currentStep === step?.id ? "text-green-500" : "text-gray-400"} 
                    ${step?.id > 1 && orientation !== "rtl" && (direction === "row" ? "ml-20 screen500:ml-7" : "mt-16 screen500:mt-7")}
                    ${step?.id > 1 && orientation === "rtl" && (direction === "row" ? "mr-20 screen500:ml-7" : "screen500:ml-7")}
                    `}>
                    {renderCircle(step)}
                    {step?.id < totalSteps?.at(-1)?.id && (
                        direction === "row" ? (
                            <div className={`h-0.5  ${currentStep >= step?.id ? "bg-cyan-800" : "bg-neutral-200"} w-20 absolute top-3.5 ${orientation !== "rtl" ? "left-4.5 left-[100%]" : "right-4.5 right-[100%]"} screen500:w-7`} />) : (
                            <div className={`h-16 w-0.5 absolute left-3.5 ${currentStep >= step?.id ? "bg-cyan-800" : "bg-neutral-200"} ${orientation !== "rtl" ? "top-[100%]" : "right-4.5 right-[100%]"} screen500:w-7`} />
                        )
                    )}
                </div>
            ))
            )}
        </div>
    );
}
export default Stepper;
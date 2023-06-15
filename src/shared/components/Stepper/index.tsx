import React from 'react';
import CheckIcon from '../../../ts-icons/CheckIcon.svg';

const Stepper = ({ currentStep = 1, totalSteps = 5 }: any) => {
    const steps: number[] = [];
    for (let i = 1; i <= totalSteps; i++) steps.push(i);

    const renderCircle = (step: number) => {
        if (step <= currentStep) {
            return (
                <div className="h-8 w-8 rounded-full flex items-center justify-center bg-cyan-800">
                    <CheckIcon stroke="#fff" />
                </div>
            )
        }
        else if ((step - currentStep) === 1) {
            return (
                <div className="h-8 w-8 rounded-full flex items-center justify-center border-2 border-cyan-800">
                    <div className="h-2 w-2 bg-cyan-800 rounded-full"></div>
                </div>
            )
        }
        else {
            return (
                <div className="h-8 w-8 rounded-full flex items-center justify-center border-2 border-neutral-200">
                </div>
            )
        }

    };

    return (
        <div className="flex items-center justify-center mb-7" style={{ direction: "ltr" }}>
            {React.Children.toArray(
                steps.map(step => (
                    <div className={`relative flex items-center ${currentStep === step ? 'text-green-500' : 'text-gray-400'} ${step > 1 && "ml-20 screen500:ml-7"}`} >
                        {renderCircle(step)}
                        {step < totalSteps && <div className={`h-0.5 ${currentStep >= step ? 'bg-cyan-800' : 'bg-neutral-200'} w-20 absolute top-3.5 left-4.5 left-[100%] screen500:w-7`} />}
                    </div>
                ))
            )}
        </div>
    );
}
export default Stepper;
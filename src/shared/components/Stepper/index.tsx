import { useState } from 'react';
import CheckIcon from '../../../ts-icons/CheckIcon.svg';

const Stepper = () => {
    const [activeStep, setActiveStep] = useState(1);

    const steps = [
        { label: 'Step 1', isComplete: activeStep >= 1 },
        { label: 'Step 2', isComplete: activeStep >= 2 },
        { label: 'Step 3', isComplete: activeStep >= 3 },
        { label: 'Step 4', isComplete: activeStep >= 4 },
        { label: 'Step 5', isComplete: activeStep >= 5 },
    ];

    return (
        <div className="flex items-center justify-center">
            {steps.map((step, index) => (
                <div
                    key={index}
                    className={`relative flex items-center ${index !== 0 && 'ml-4'
                        } ${step.isComplete ? 'text-green-500' : 'text-gray-400'}`}
                >
                    <div
                        className={`h-8 w-8 ${step.isComplete ? 'bg-green-500' : 'bg-gray-200'
                            } rounded-full flex items-center justify-center`}
                    >
                        {step.isComplete && (
                          <CheckIcon stroke="#fff" />
                        )}
                    </div>
                    {index !== steps.length - 1 && (
                        <div
                            className={`h-0.5 ${step.isComplete ? 'bg-green-500' : 'bg-gray-200'
                                } w-8 absolute top-3.5 left-4.5`}
                        />
                    )}
                    <span className="text-sm ml-1">{step.label}</span>
                </div>
            ))}
        </div>
    );
}
export default Stepper;
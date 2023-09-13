import React, { useState } from "react";
import {  useSelector } from "react-redux";
import Stepper from "../../../shared/components/Stepper";
import { RootState } from "../../../redux-toolkit/store/store";
import Spinner from "../../../shared/components/Spinner";
import Button from "../../../shared/components/Button";
import Selector from "../../../shared/components/Selector";
import DetailUI from "./DetailUI";
import AttachmentUI from "./AttachmentUI";
import SellingPriceUI from "./SellingPriceUI";
import TermsUI from "./TermsUI";
import ReviewUI from "./ReviewUI";
import ExpectedReturnUI from "./ExpectedReturnUI";
const CURRENCIES = ["USD", "AED"];

const RealtorDeal = ({ step }: any) => {
    const [loading, setLoading] = useState(false);
    const [currency, setCurrency] = useState(0);
    const [questions, setQuestions]: any = useState(false);
    const language: any = useSelector((state: RootState) => state.language.value);
    const orientation: any = useSelector((state: RootState) => state.orientation.value);
    const dealData: any = useSelector((state: RootState) => state.questionnaire.value);

    const [totalSteps] = useState([{ id: 1, text: language?.v3?.realtor?.create_deal?.details }, { id: 2, text: language?.v3?.realtor?.create_deal?.attachments }, { id: 3, text: language?.v3?.realtor?.create_deal?.selling_price }, { id: 4, text: language?.v3?.realtor?.create_deal?.expected_return }, { id: 5, text: language?.v3?.realtor?.create_deal?.terms },
    { id: 6, text: language?.v3?.realtor?.create_deal?.review }])

   
    const onSetNext = () => { };
    const onSetPrev = () => { };
    const checkValidation = () => {
        return false;
    }

    return (
        <React.Fragment>
            <section className="w-10 inline-block align-start">
                <Stepper totalSteps={totalSteps} currentStep={0} direction="col" />
            </section>
            <section className="w-[calc(100%-3rem)] inline-block align-start">
                <div className="w-full inline-flex items-center justify-cneter flex-col">
                    {loading ? (
                        <div className="absolute left-0 top-0 w-full h-full grid place-items-center" style={{ backgroundColor: "rgba(255, 255, 255, 1)", zIndex: 50 }} >
                            <Spinner />
                        </div>
                    ) : (
                        <React.Fragment>
                            <section className="flex items-start flex-col mt-10 max-w-[420px] screen500:max-w-[300px]">
                                {questions?.questions && (
                                    <h3 className="text-neutral-700 font-bold text-2xl w-[420px]">
                                        {questions?.questions[0]?.title}
                                    </h3>
                                )}

                            </section>
                            {step === 1 && <DetailUI language={language} />}
                            {step === 2 && <AttachmentUI language={language} orientation={orientation} />}
                            {step === 3 && <SellingPriceUI language={language} />}
                            {step === 4 && <ExpectedReturnUI language={language} />}
                            {step === 5 && <TermsUI language={language} />}
                            {step === 6 && <ReviewUI language={language} />}

                            <section className="flex items-start justify-center w-full flex-col mt-6 max-w-[420px] screen500:max-w-[300px]">
                                <div className="w-full inline-flex items-center justify-between mt-16">
                                    <Button className="h-[38px] w-[140px]" htmlType="button" type="outlined" onClick={onSetPrev} >
                                        {language?.buttons?.back}
                                    </Button>
                                    <Button className="h-[38px] w-[140px]" disabled={!checkValidation()} htmlType="submit" loading={loading} onClick={onSetNext}>
                                        {step < 5 ? language?.buttons?.continue : language?.buttons?.proceed}
                                    </Button>
                                </div>
                            </section>
                        </React.Fragment>
                    )}
                </div>
            </section>
        </React.Fragment>
    )
};
export default RealtorDeal;
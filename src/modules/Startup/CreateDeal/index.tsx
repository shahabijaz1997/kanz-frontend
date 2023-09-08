import { useSelector } from "react-redux";
import Stepper from "../../../shared/components/Stepper";
import { RootState } from "../../../redux-toolkit/store/store";
import React, { useState } from "react";
import Header from "../../../shared/components/Header";
import { useNavigate } from "react-router-dom";
import CrossIcon from "../../../ts-icons/crossIcon.svg";
import Spinner from "../../../shared/components/Spinner";
import Button from "../../../shared/components/Button";

const CreateDeal = ({ step }: any) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions]: any = useState(false);
    const language: any = useSelector((state: RootState) => state.language.value);
    const dealData: any = useSelector((state: RootState) => state.questionnaire.value);

    const [totalSteps] = useState([{ id: 1, text: language?.v3?.startup?.create_deal?.stage }, { id: 2, text: language?.v3?.startup?.create_deal?.instrument }, { id: 3, text: language?.v3?.startup?.create_deal?.round_size }, { id: 4, text: language?.v3?.startup?.create_deal?.attachments },
    { id: 5, text: language?.v3?.startup?.create_deal?.terms }, { id: 6, text: language?.v3?.startup?.create_deal?.additional_detail }, { id: 7, text: language?.v3?.startup?.create_deal?.review }])


    const onSetNext = () => { };
    const onSetPrev = () => { };
    const checkValidation = () => {
        return false;
    }

    return (
        <main className="h-full max-h-full overflow-y-auto overflow-x-hidden">
            <section> <Header custom={true} data={{ leftMenu: language?.v3?.startup?.create_deal?.title, button: (<button onClick={() => navigate(-1)}> <CrossIcon stroke="#171717" className="w-6 h-6" /></button>) }} /></section>

            <aside className="w-full flex items-start pt-14 px-12">
                <section>
                    <Stepper totalSteps={totalSteps} currentStep={0} direction="col" />
                </section>
                <section>
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
                </section>
            </aside>
        </main>
    )
};
export default CreateDeal;
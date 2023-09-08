import { useDispatch, useSelector } from "react-redux";
import Stepper from "../../../shared/components/Stepper";
import { RootState } from "../../../redux-toolkit/store/store";
import React, { useState } from "react";
import Header from "../../../shared/components/Header";
import { useNavigate } from "react-router-dom";
import CrossIcon from "../../../ts-icons/crossIcon.svg";
import Spinner from "../../../shared/components/Spinner";
import Button from "../../../shared/components/Button";
import { saveAnswer } from "../../../redux-toolkit/slicer/philosophy.slicer";

const CreateDeal = ({ step }: any) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions]: any = useState(false);
    const [open, setOpen]: any = useState(false);
    const language: any = useSelector((state: RootState) => state.language.value);
    const event: any = useSelector((state: RootState) => state.event.value);
    const dealData: any = useSelector((state: RootState) => state.questionnaire.value);

    const [totalSteps] = useState([{ id: 1, text: language?.v3?.startup?.create_deal?.stage }, { id: 2, text: language?.v3?.startup?.create_deal?.instrument }, { id: 3, text: language?.v3?.startup?.create_deal?.round_size }, { id: 4, text: language?.v3?.startup?.create_deal?.attachments },
    { id: 5, text: language?.v3?.startup?.create_deal?.terms }, { id: 6, text: language?.v3?.startup?.create_deal?.additional_detail }, { id: 7, text: language?.v3?.startup?.create_deal?.review }])


    const onSetNext = () => { };
    const onSetPrev = () => { };
    const checkValidation = () => {
        return false;
    }

    const renderCheckboxQuestionnaire = (ques: any) => {
        return (
          <section className="flex items-start justify-center flex-col mt-10 max-w-[420px] screen500:max-w-[300px]">
            <h3 className="text-neutral-700 font-medium text-base w-[420px]">
              {ques[event]?.title}
            </h3>
            <p className="text-neutral-500 font-normal text-lg">
              <span>{ques[event]?.statement}</span>&nbsp;
              <span className="text-cc-blue font-medium cursor-pointer" onClick={() => setOpen(true)} >
                {language.common.learn}
              </span>
            </p>
            <section className="mb-8 w-full relative mt-3">
              <ul>
                {ques[event]?.options &&
                  React.Children.toArray(
                    ques[event]?.options.map((as: any) => {
                      return (
                        <li className={`h-[50px] w-[420px] p-4 grey-neutral-200 text-sm font-medium cursor-pointer border border-grey inline-flex items-center justify-start first:rounded-t-md last:rounded-b-md screen500:w-full ${as.selected ? "check-background" : "bg-white"}`}
                          onClick={() => {
                            dispatch(saveAnswer({ option: as, question: ques, questions: dealData, lang: event })
                            );
                          }}
                        >
                          <input onChange={() => { }}
                            className="accent-cyan-800 relative float-left mx-2 h-3 w-3 rounded-full border-2 border-solid border-cyan-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04]"
                            type="checkbox" checked={as.selected ? true : false} />
                          <small>{as?.statement}</small>
                        </li>
                      );
                    })
                  )}
              </ul>
            </section>
          </section>
        );
      };

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

                            {dealData?.questions?.length && dealData?.questions[0]?.question_type === "checkbox" && (
                                React.Children.toArray(dealData?.questions.map((ques: any) => renderCheckboxQuestionnaire(ques)))
                            )}

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
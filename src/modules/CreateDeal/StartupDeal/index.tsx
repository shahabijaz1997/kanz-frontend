import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Stepper from "../../../shared/components/Stepper";
import { RootState } from "../../../redux-toolkit/store/store";
import Spinner from "../../../shared/components/Spinner";
import Button from "../../../shared/components/Button";
import { saveAnswer } from "../../../redux-toolkit/slicer/philosophy.slicer";
import { Constants } from "../../../enums/constants.enum";
import Selector from "../../../shared/components/Selector";
import FileUpload from "../../../shared/components/FileUpload";
const CURRENCIES = ["USD", "AED"];

const StartupDeal = ({ step }: any) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [currency, setCurrency] = useState(0);
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

    const checkboxQuestion = (ques: any) => {
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

    const optionQuestion = (ques: any) => {
        return (
            <section className="flex items-start justify-center flex-col mt-10 max-w-[420px] screen500:max-w-[300px]">
                <h3 className="text-neutral-700 font-medium text-base w-[420px]">
                    Deal Target
                </h3>

                <section className="mb-8 w-full relative mt-3">
                    <div className="relative rounded-md w-full h-10 border-[1px] border-neutral-300 overflow-hidden inline-flex items-center px-3">
                        <input placeholder={`${currency === 0 ? "$" : "د.إ"} 0.00`} type="text" className="outline-none w-full h-full placeholder-neutral-500" />
                        <span className="cursor-pointer inline-flex items-center" onClick={() => setCurrency(prev => { return prev === 0 ? 1 : 0 })}>
                            <button className="font-normal text-lg text-neutral-500">{CURRENCIES[currency]}</button>
                        </span>
                    </div>

                    <ul className="inline-flex items-center gap-3 mt-3">
                        <li className="cursor-pointer py-2 px-3 h-9 w-24 bg-cbc-grey-sec rounded-md text-center text-sm font-normal text-neutral-900">{currency === 0 ? "$" : "د.إ"} 34</li>
                    </ul>
                </section>
            </section>
        );
    };

    const mixOptionQuestion = (ques: any) => {
        return (
            <React.Fragment>
                <section className="flex items-start justify-center flex-col mt-10 max-w-[420px] screen500:max-w-[300px]">
                    <h3 className="text-neutral-700 font-medium text-base w-[420px]">Valuation</h3>

                    <div className="w-full relative mt-3 relative rounded-md h-10 border-[1px] border-neutral-300 overflow-hidden inline-flex items-center px-3">
                        <input placeholder={`${currency === 0 ? "$" : "د.إ"} 0.00`} type="text" className="outline-none w-full h-full placeholder-neutral-500" />
                        <button className="cursor-pointer  font-normal text-lg text-neutral-500" onClick={() => setCurrency(prev => { return prev === 0 ? 1 : 0 })}>{CURRENCIES[currency]}</button>
                    </div>
                </section>

                <section className="flex items-start justify-center flex-col mt-10 max-w-[420px] screen500:max-w-[300px]">
                    <h3 className="text-neutral-700 font-medium text-base w-[420px]">Type</h3>

                    <div className="w-full relative mt-3" style={{ zIndex: 101 }}>
                        <Selector disabled={false} placeholder="Pre Money" value={"Pre Money"} options={[]} onChange={(v: any) => { }} defaultValue={"Pre Money"} />
                    </div>
                </section>
            </React.Fragment>
        );
    };

    const radioOptions = (ques: any) => {
        return (
            <section className="flex items-start justify-center flex-col mt-10 max-w-[420px] min-w-[400px] screen500:max-w-[300px]">
                <div className="mb-6 inline-flex w-full items-center justify-between">
                    <small className="text-neutral-700 text-lg font-medium">Minimum Check Size</small>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" checked={true} />
                        <div className="w-11 h-6 bg-cyan-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-800"></div>
                    </label>
                </div>

                <div className="mb-6 relative rounded-md w-full h-10 border-[1px] border-neutral-300 overflow-hidden inline-flex items-center px-3">
                    <input placeholder={`${currency === 0 ? "$" : "د.إ"} 0.00`} type="text" className="outline-none w-full h-full placeholder-neutral-500" />
                </div>

                <div className="mb-6 inline-flex w-full items-center justify-between">
                    <small className="text-neutral-700 text-lg font-medium">Pro Rata</small>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" checked={true} />
                        <div className="w-11 h-6 bg-cyan-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-800"></div>
                    </label>
                </div>

                <div className="mb-3 inline-flex w-full items-center justify-between">
                    <small className="text-neutral-700 text-lg font-medium">Additional Rate</small>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" checked={false} />
                        <div className="w-11 h-6 bg-cyan-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-800"></div>
                    </label>
                </div>
            </section>
        );
    };

    const attachmentsOptions = (ques: any) => {
        return (
            <section className="flex items-start justify-center flex-col mt-10 max-w-[420px] min-w-[400px] screen500:max-w-[300px]">
                <h3 className="text-neutral-700 font-medium text-base w-[420px]">
                    <span>Upload the necessary documents.</span>&nbsp;<span className="text-cc-blue font-medium cursor-pointer" onClick={() => setOpen(true)} >
                        {language.philosophyGoals.whyToDo}
                    </span>
                </h3>
                <h3 className="text-neutral-700 font-medium text-base w-[420px] mt-3">
                    Pitch Deck
                </h3>
                <p className="text-neutral-500 font-normal text-sm">
                    <span>Upload a PDF of your Pitch Deck</span>&nbsp;
                    <span className="text-cc-blue font-medium cursor-pointer" onClick={() => setOpen(true)} >
                        {language.common.example}
                    </span>
                </p>

                <FileUpload id={1} fid={1} file={{}} setModalOpen={() => { }} setFile={() => { }} removeFile={() => { }} title={"Document"} className="w-full" />
            </section>

        );
    };

    const reviewUI = () => {
        return (
            <section className="flex items-start justify-center flex-col mt-10 max-w-[420px] min-w-[400px] screen500:max-w-[300px]">
                <div className="py-4 border-b-[1px] border-b-neutral-200 w-full">
                    <h3 className="text-neutral-900 font-medium text-sm">Investment Round</h3>
                    <p className="text-neutral-500 font-normal text-sm">Angel Round</p>
                </div>
                <div className="py-4 border-b-[1px] border-b-neutral-200 w-full">
                    <h3 className="text-neutral-900 font-medium text-sm">Investment Type</h3>
                    <p className="text-neutral-500 font-normal text-sm">Equity</p>
                </div>
                <div className="py-4 border-b-[1px] border-b-neutral-200 w-full">
                    <h3 className="text-neutral-900 font-medium text-sm">Share Class</h3>
                    <p className="text-neutral-500 font-normal text-sm">Common</p>
                </div>
                <div className="py-4 border-b-[1px] border-b-neutral-200 w-full">
                    <h3 className="text-neutral-900 font-medium text-sm">Deal Target</h3>
                    <p className="text-neutral-500 font-normal text-sm">$0.00</p>
                </div>
                <div className="py-4 border-b-[1px] border-b-neutral-200 w-full">
                    <h3 className="text-neutral-900 font-medium text-sm">Valuation</h3>
                    <p className="text-neutral-500 font-normal text-sm">$10,000,000 (Pre-money)</p>
                </div>
                <div className="py-4 border-b-[1px] border-b-neutral-200 w-full">
                    <h3 className="text-neutral-900 font-medium text-sm">Attachments</h3>
                    <p className="text-neutral-500 font-normal text-sm">PDF 2MB</p>
                </div>
            </section>
        )
    };

    return (
        <React.Fragment>
            <section className="w-10 inline-block align-middle">
                <Stepper totalSteps={totalSteps} currentStep={0} direction="col" />
            </section>
            <section className="w-[calc(100%-3rem)] inline-block align-middle">
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
                            {dealData?.questions?.length && dealData?.questions[0]?.question_type === Constants.CHECK_BOX && (
                                React.Children.toArray(dealData?.questions.map((ques: any) => checkboxQuestion(ques)))
                            )}

                            {dealData?.questions?.length && dealData?.questions[0]?.question_type === Constants.OPTIONS && (
                                React.Children.toArray(dealData?.questions.map((ques: any) => optionQuestion(ques)))
                            )}

                            {dealData?.questions?.length && dealData?.questions[0]?.question_type === Constants.MIX_OPTIONS && (
                                React.Children.toArray(dealData?.questions.map((ques: any) => mixOptionQuestion(ques)))
                            )}

                            {dealData?.questions?.length && dealData?.questions[0]?.question_type === Constants.MIX_OPTIONS && (
                                React.Children.toArray(dealData?.questions.map((ques: any) => radioOptions(ques)))
                            )}

                            {dealData?.questions?.length && dealData?.questions[0]?.question_type === Constants.ATTACHMENTS && (
                                React.Children.toArray(dealData?.questions.map((ques: any) => attachmentsOptions(ques)))
                            )}
                            {attachmentsOptions("")}

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
export default StartupDeal;
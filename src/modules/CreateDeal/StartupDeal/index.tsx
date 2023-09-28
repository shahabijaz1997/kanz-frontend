import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Stepper from "../../../shared/components/Stepper";
import { RootState } from "../../../redux-toolkit/store/store";
import Spinner from "../../../shared/components/Spinner";
import Button from "../../../shared/components/Button";
import { saveDealSelection, saveQuestionnaire } from "../../../redux-toolkit/slicer/philosophy.slicer";
import { Constants } from "../../../enums/constants.enum";
import Selector from "../../../shared/components/Selector";
import FileUpload from "../../../shared/components/FileUpload";
import { getDealQuestion, postDealStep } from "../../../apis/deal.api";
import { DealType } from "../../../enums/types.enum";
import { saveToken } from "../../../redux-toolkit/slicer/auth.slicer";
import { RoutesEnums } from "../../../enums/routes.enum";
import { numberFormatter } from "../../../utils/object.utils";
import Input from "../../../shared/components/Input";
import { saveDataHolder } from "../../../redux-toolkit/slicer/dataHolder.slicer";
import { toast } from "react-toastify";
import { toastUtil } from "../../../utils/toast.utils";

const CURRENCIES = ["USD", "AED"];

const StartupDeal = ({ step }: any) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const language: any = useSelector((state: RootState) => state.language.value);
    const authToken: any = useSelector((state: RootState) => state.auth.value);
    const event: any = useSelector((state: RootState) => state.event.value);
    const dealData: any = useSelector((state: RootState) => state.questionnaire.value);
    const dataHolder: any = useSelector((state: RootState) => state.dataHolder.value);

    const [loading, setLoading] = useState(false);
    const [currency, setCurrency] = useState(0);
    const [questions, setQuestions]: any = useState(null);
    const [dependencies, setDependencies]: any = useState(null);
    const [open, setOpen]: any = useState(false);
    const [restrictions, setRestrictions]: any = useState([]);
    const [totalSteps, setTotalSteps]: any = useState({})


    useLayoutEffect(() => {
        getDealStepDetails();
    }, [step]);

    const getDealStepDetails = async () => {
        try {
            setLoading(true);
            let { status, data } = await getDealQuestion({ type: DealType.STARTUP }, authToken);
            if (status === 200 && !questions) {
                console.log("Startup Deal: ", data?.status?.data?.steps[step - 1]);
                data?.status?.data?.steps?.forEach((step: any) => {
                    if (step?.dependencies?.length > 0) setDependencies(step.dependencies);
                });

                setQuestions(data?.status?.data?.steps);
                dispatch(saveQuestionnaire(data?.status?.data?.steps));
                let all_steps = [];
                for (let i = 0; i < data?.status?.data?.step_titles[event]?.length; i++) {
                    const step = data?.status?.data?.step_titles[event][i];
                    all_steps.push({ id: i + 1, text: step });
                }
                setTotalSteps({ all: all_steps, copy: all_steps });
            }

        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                dispatch(saveToken(""));
                navigate(RoutesEnums.LOGIN, { state: `create-deal/${step}` });
            }
        } finally {
            setLoading(false);
        }
    };

    const onSetNext = async () => {
        try {
            let all_fields: any[] = [];
            dealData[step - 1][event]?.sections?.forEach((section: any) => {
                all_fields = all_fields.concat(section?.fields);
            });

            let fields: any[] = all_fields?.map((field: any) => {
                let selected;
                if (field?.field_type === Constants.MULTIPLE_CHOICE || field?.field_type === Constants.DROPDOWN) {
                    selected = field?.options?.find((opt: any) => opt.selected)?.id

                }
                if (field?.field_type === Constants.NUMBER_INPUT) {
                    selected = field.answer
                }
                if (field.field_type === Constants.SWITCH) {
                    selected = field?.is_required
                }
                return {
                    id: field.id,
                    value: selected
                }
            });

            let payload: any = {
                deal: {
                    deal_type: "startup",
                    step: questions[step - 1]?.id,
                    fields
                }
            }
            if (dataHolder) payload.deal.id = dataHolder;
            let { status, data } = await postDealStep(payload, authToken);
            if (status === 200) {
                dispatch(saveDataHolder(data?.status?.data?.id));
                if (step <= totalSteps?.all.length) navigate(`/create-deal/${step + 1}`);
            }
        } catch (error:any) {
            const message = error?.response?.data?.status?.message || language.promptMessages.errorGeneral;
            toast.error(message, toastUtil);
        }
    };
    const onSetPrev = () => {
        if (step > 1) navigate(`/create-deal/${step - 1}`)
    };

    const multipleChoice = (ques: any, secIndex: number) => {
        return (
            <section className="flex items-start justify-center flex-col mt-3 max-w-[400px] screen500:max-w-[300px]">
                <h3 className="text-neutral-700 font-medium text-base w-[420px]">
                    {ques?.title}
                </h3>
                <p className="text-neutral-500 font-normal text-sm">
                    <span>{ques?.statement}</span>&nbsp;
                    <span className="text-cc-blue font-medium cursor-pointer" onClick={() => setOpen(true)} >
                        {language.common.learn}
                    </span>
                </p>
                <section className="mb-8 w-full relative mt-2">
                    <ul>
                        {ques?.options &&
                            React.Children.toArray(ques?.options.map((as: any) => {
                                return (
                                    <li className={`h-[50px] w-[420px] p-4 grey-neutral-200 text-sm font-medium cursor-pointer border border-grey inline-flex items-center justify-start first:rounded-t-md last:rounded-b-md screen500:w-full ${as.selected ? "check-background" : "bg-white"}`}
                                        onClick={() => {
                                            dispatch(saveDealSelection({ option: as, question: ques, fields: dealData, lang: event, secIndex, step }))
                                            let option: any[] = [];
                                            dependencies?.find((dep: any) => {
                                                if (String(dep.value) === String(as?.id)) option.push(dep);
                                                questions?.forEach((q: any) => {
                                                    option.forEach((rest: any) => {
                                                        if (q?.id === rest?.dependent_id && rest?.dependent_type?.toLowerCase() === "stepper" && rest?.operation === "hide") {

                                                            let step = totalSteps?.copy?.find((ts: any) => ts?.text === q[event]?.title);
                                                            let steps = totalSteps?.copy.filter((stp: any) => stp?.text !== step?.text);
                                                            setTotalSteps((prev: any) => {
                                                                return { copy: [...prev?.copy], all: steps }
                                                            })
                                                        } else if (q?.id === rest?.dependent_id && rest?.dependent_type?.toLowerCase() === "stepper" && rest?.operation === "show") {
                                                            setTotalSteps((prev: any) => {
                                                                return { copy: prev?.copy, all: prev?.copy }
                                                            })
                                                        }
                                                    });
                                                });

                                            })
                                            if (option.length) setRestrictions(option)
                                        }}>
                                        <input onChange={(e) => { }} className="accent-cyan-800 relative float-left mx-2 h-3 w-3 rounded-full border-2 border-solid border-cyan-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04]"
                                            type="radio" checked={as.selected ? true : false} />
                                        <div className="text-sm font-medium text-cyan-900">{as?.statement}</div>
                                    </li>
                                );
                            })
                            )}
                    </ul>
                </section>
            </section>
        );
    };

    const numberInput = (ques: any, secIndex: number) => {
        return (
            <section className="flex items-start justify-center flex-col mt-3 max-w-[400px] screen500:max-w-[300px]">
                <h3 className="text-neutral-700 font-medium text-base w-[420px]">
                    {ques?.statement}
                </h3>

                <section className="mb-8 w-full relative mt-2">
                    <div className="relative rounded-md w-full h-10 border-[1px] border-neutral-300 overflow-hidden inline-flex items-center px-3">
                        <input onInput={(e: any) => dispatch(saveDealSelection({ option: e.target.value, question: ques, fields: dealData, lang: event, secIndex, step }))} id={`num-${ques.id}`} placeholder={`${currency === 0 ? "$" : "د.إ"} 0.00`} type="text" className="outline-none w-full h-full placeholder-neutral-500" />
                        <span className="cursor-pointer inline-flex items-center" onClick={() => setCurrency(prev => { return prev === 0 ? 1 : 0 })}>
                            <button className="font-normal text-lg text-neutral-500">{CURRENCIES[currency]}</button>
                        </span>
                    </div>
                    <ul className="inline-flex items-center gap-1.5 mt-3">
                        {React.Children.toArray(
                            ques?.suggestions.map((suggestion: any) => (
                                <li onClick={() => {
                                    let elem: HTMLInputElement | any = document.getElementById(`num-${ques.id}`);
                                    elem.value = suggestion;
                                    dispatch(saveDealSelection({ option: suggestion, question: ques, fields: dealData, lang: event, secIndex, step }));
                                }} className="cursor-pointer py-2 px-3 h-9 w-24 bg-cbc-grey-sec rounded-md text-center text-sm font-normal text-neutral-900">{currency === 0 ? "$" : "د.إ"} {numberFormatter(Number(suggestion))}</li>
                            ))
                        )}
                    </ul>
                </section>
            </section>
        );
    };

    const attachments = (ques: any, secIndex: number, section: any) => {
        return (
            <section className="flex items-start justify-center flex-col mt-3 mb-6 max-w-[400px] min-w-[400px] screen500:max-w-[300px]">
                {ques?.index < 1 && (
                    <h3 className="text-neutral-700 font-medium text-base w-[420px]">
                        <span>{section?.description}</span>&nbsp;<span className="text-cc-blue font-medium cursor-pointer" onClick={() => setOpen(true)} >
                            {language.philosophyGoals.whyToDo}
                        </span>
                    </h3>
                )}
                <h3 className="text-neutral-700 font-medium text-base w-[420px] mt-3">
                    {ques?.statement}
                </h3>
                <p className="text-neutral-500 font-normal text-sm">
                    <span>{language?.buttons?.upload} {React.Children.toArray(ques?.permitted_types?.map((type: any) => <span className="uppercase">{type}</span>))} {language?.drawer?.of} {ques?.statement}</span>&nbsp;
                    <span className="text-cc-blue font-medium cursor-pointer" onClick={() => setOpen(true)} >
                        {language.common.example}
                    </span>
                </p>

                <FileUpload onlyPDF={`${ques?.size_constraints?.limit}${ques?.size_constraints?.unit}`} id={ques?.id} fid={ques?.id} file={{}} setModalOpen={() => { }} setFile={() => { }} removeFile={() => { }} title={ques?.statement} className="w-full" />
            </section>
        );
    };

    const dropdowns = (ques: any, secIndex: number) => {
        let options = ques?.options?.map((opt: any) => {
            return { label: opt?.statement, value: opt?.statement }
        });
        let currentValue = ques?.options?.find((op: any) => op.selected)?.statement || options[0]?.statement || "";

        return (
            <section className="flex items-start justify-center flex-col mt-2 max-w-[400px] screen500:max-w-[300px]">
                <h3 className="text-neutral-700 font-medium text-base w-[400px]">
                    {ques?.statement}
                </h3>
                <section className="mb-8 w-full relative mt-3">
                    <div className="relative w-full" style={{ zIndex: 101 }}>
                        <Selector disabled={false} value={currentValue} defaultValue={currentValue} options={options}
                            onChange={(v: any) => {
                                let opt = ques?.options?.find((op: any) => op.statement === v.value);
                                dispatch(saveDealSelection({ option: opt, question: ques, fields: dealData, lang: event, secIndex, step }))
                            }}
                        />
                    </div>
                </section>
            </section>
        );
    }

    const switchInput = (ques: any, secIndex: number) => {
        return (
            <section className="flex items-start justify-center flex-col mt-3 max-w-[400px] min-w-[400px] screen500:max-w-[300px]">
                <div className="mb-6 inline-flex w-full items-center justify-between">
                    <small className="text-neutral-700 text-lg font-medium">{ques?.statement}</small>
                    <label className="relative inline-flex items-center cursor-pointer" onChange={(e) => dispatch(saveDealSelection({ option: !ques?.is_required, question: ques, fields: dealData, lang: event, secIndex, step }))}>
                        <input type="checkbox" value="" className="sr-only peer" checked={ques?.is_required} />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-800"></div>
                    </label>
                </div>
            </section>
        );
    };

    const textAreaInput = (ques: any, secIndex: number) => {
        return (
            <section className="flex items-start justify-center flex-col mt-3 max-w-[400px] min-w-[400px] screen500:max-w-[300px]">
                <div className="mb-6 inline-flex flex-col w-full items-start justify-between">
                    <label htmlFor={ques?.id} className="text-neutral-700 text-lg font-medium">{ques?.statement}</label>
                    <textarea placeholder={ques?.statement} className="h-[100px] mt-2 resize-none shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id={ques?.id} onInput={(e: any) => dispatch(saveDealSelection({ option: e.target.value, question: ques, fields: dealData, lang: event, secIndex, step }))}></textarea>
                </div>
            </section>
        );
    };

    const textFieldInput = (ques: any, secIndex: number) => {
        return (
            <section className="flex items-start justify-center flex-col mb-8 mt-3 max-w-[400px] min-w-[400px] screen500:max-w-[300px]">
                <Input title={ques?.statement} className="bg-white w-full" placeholder={ques?.statement} id={ques?.id} onInput={(e: any) => dispatch(saveDealSelection({ option: e.target.value, question: ques, fields: dealData, lang: event, secIndex, step }))} />
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

    const renderQuestionType = (ques: any, secIndex: number, section: any) => {
        if (restrictions?.some((res: any) => res.dependent_id === ques?.id && res?.operation !== "show") && restrictions.length > 0) return "";
        else {
            if (ques?.field_type === Constants.MULTIPLE_CHOICE) return multipleChoice(ques, secIndex);
            else if (ques?.field_type === Constants.NUMBER_INPUT) return numberInput(ques, secIndex);
            else if (ques?.field_type === Constants.FILE) return attachments(ques, secIndex, section)
            else if (ques?.field_type === Constants.DROPDOWN) return dropdowns(ques, secIndex)
            else if (ques?.field_type === Constants.SWITCH) return switchInput(ques, secIndex)
            else if (ques?.field_type === Constants.TEXT_BOX) return textAreaInput(ques, secIndex)
            else if (ques?.field_type === Constants.TEXT_FIELD) return textFieldInput(ques, secIndex)
        }
    };

    const checkValidation = () => {
        if (!dealData || !dealData[step - 1] || !dealData[step - 1][event]?.sections.length) return false;
        let flags: any[] = []

        dealData[step - 1][event]?.sections.forEach((sec: any, index: number) => {
            flags.push({ section: sec.id, validations: [] });
            let fields = sec.fields;
            fields.forEach((ques: any) => {
                if (ques?.field_type === Constants.MULTIPLE_CHOICE || ques?.field_type === Constants.DROPDOWN) {
                    let flag = ques.options?.some((opt: any) => opt.selected);
                    flags[index].validations.push(flag);
                }
                if (ques?.field_type === Constants.NUMBER_INPUT) {
                    let flag = ques.answer ? true : false;
                    flags[index].validations.push(flag);
                }
                if (ques.field_type === Constants.SWITCH) {
                    flags[index].validations.push(ques.is_required);
                }
            });
        });
        let isValid = false;

        if (dealData[step - 1]?.dependencies?.length > 0) {
            let dependantChecks = flags.map((flag) => {
                let validation = flag.validations.filter((val: any) => val);
                return validation;
            });
            isValid = dependantChecks[0].length > 1 ? true : false;
        }

        else {
            isValid = flags.every((flag) => {
                let validation = flag.validations.every((val: any) => val);
                return validation
            });
        }

        return isValid;
    }
    return (
        <React.Fragment>
            <section className="w-10 inline-block align-top">
                <Stepper totalSteps={totalSteps?.all} currentStep={step - 1} direction="col" />
            </section>
            <section className="w-[calc(100%-3rem)] inline-block align-top">
                <div className="w-full inline-flex items-center justify-cneter flex-col">
                    {loading ? (
                        <div className="absolute left-0 top-0 w-full h-full grid place-items-center" style={{ backgroundColor: "rgba(255, 255, 255, 1)", zIndex: 50 }} >
                            <Spinner />
                        </div>
                    ) : (
                        <React.Fragment>
                            {!dealData || !dealData[step - 1] || !dealData[step - 1][event]?.sections.length ? (
                                <p>{language?.v3?.common?.noData}</p>
                            ) : (
                                React.Children.toArray(
                                    dealData[step - 1][event]?.sections.map((section: any, index: number) => {
                                        return (
                                            <section className="flex items-start flex-col max-w-[400px] screen500:max-w-[300px]">
                                                <h3 className="text-neutral-700 font-bold text-2xl w-[420px]">
                                                    {section?.title}
                                                </h3>
                                                {section?.fields?.length ? (React.Children.toArray(section?.fields?.map((ques: any) => renderQuestionType(ques, index, section)))) : (reviewUI())}
                                           
                                                {(section?.add_more_label && index === dealData[step - 1][event]?.sections?.length - 1) && (
                                                    <Button onClick={() => {
                                                        // dealData[step - 1][event]?.sec
                                                    }}
                                                    className="w-[400px] screen500:w-[300px] bg-transparent border-2 border-cyan-800 !text-cyan-800 hover:!text-white">{section?.add_more_label}</Button>
                                                )}
                                            </section>
                                        )
                                    })
                                )
                            )}
                            <section className="flex items-start justify-center w-full flex-col mt-6 max-w-[420px] screen500:max-w-[300px]">
                                <div className="w-full inline-flex items-center justify-between mt-16">
                                    <Button className="h-[38px] w-[140px]" htmlType="button" type="outlined" onClick={onSetPrev} >
                                        {language?.buttons?.back}
                                    </Button>
                                    <Button className="h-[38px] w-[140px]" disabled={!checkValidation()} htmlType="submit" loading={loading} onClick={onSetNext}>
                                        {step < totalSteps?.all?.length ? language?.buttons?.continue : language?.buttons?.proceed}
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
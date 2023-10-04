import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Stepper from "../../../shared/components/Stepper";
import { RootState } from "../../../redux-toolkit/store/store";
import Spinner from "../../../shared/components/Spinner";
import Button from "../../../shared/components/Button";
import { getDealQuestion, postDealStep } from "../../../apis/deal.api";
import { DealType } from "../../../enums/types.enum";
import { onResetFields, saveDealSelection, saveQuestionnaire } from "../../../redux-toolkit/slicer/philosophy.slicer";
import { saveToken } from "../../../redux-toolkit/slicer/auth.slicer";
import { RoutesEnums } from "../../../enums/routes.enum";
import { Constants } from "../../../enums/constants.enum";
import { saveDataHolder } from "../../../redux-toolkit/slicer/dataHolder.slicer";
import { toastUtil } from "../../../utils/toast.utils";
import { toast } from "react-toastify";
import Selector from "../../../shared/components/Selector";
import { numberFormatter } from "../../../utils/object.utils";
import FileUpload from "../../../shared/components/FileUpload";
import HoverModal from "../../../shared/components/HoverModal";
import ExampleRealtor from "../../../assets/example_realtor.png";
import BinIcon from "../../../ts-icons/binIcon.svg";
import Modal from "../../../shared/components/Modal";
import CrossIcon from "../../../ts-icons/crossIcon.svg";
import { removeAttachment } from "../../../apis/attachment.api";
import EditIcon from "../../../ts-icons/editIcon.svg";

const CURRENCIES = ["USD", "AED"];

const RealtorDeal = ({ step }: any) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const language: any = useSelector((state: RootState) => state.language.value);
    const event: any = useSelector((state: RootState) => state.event.value);
    const authToken: any = useSelector((state: RootState) => state.auth.value);
    const orientation: any = useSelector((state: RootState) => state.orientation.value);
    const dataHolder: any = useSelector((state: RootState) => state.dataHolder.value);
    const dealData: any = useSelector((state: RootState) => state.questionnaire.value);

    const [multipleFieldsPayload, setMultipleFieldsPayload]: any = useState([]);
    const [restrictions, setRestrictions]: any = useState([]);
    const [currency, setCurrency] = useState(0);
    const [showHoverModal, setShowHoverModal] = useState(null);
    const [questions, setQuestions]: any = useState(null);
    const [dependencies, setDependencies]: any = useState(null);
    const [totalSteps, setTotalSteps]: any = useState(null);
    const [showCustomBox, setShowCustomBox]: any = useState(true);
    const [open, setOpen]: any = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen]: any = useState(false);


    useEffect(() => {
        getDealStepDetails();
    }, [step]);

    const getDealStepDetails = async () => {
        try {
            setLoading(true);
            const queryParams: any = { type: DealType.REALTOR };
            if (dataHolder) queryParams.id = dataHolder;
            let { status, data } = await getDealQuestion(queryParams, authToken);
            if (status === 200 && !questions) {
                // console.log("Realtor Deal: ", data?.status?.data?.steps[step - 1]);
                data?.status?.data?.steps?.forEach((step: any) => {
                    if (step?.dependencies?.length > 0) setDependencies(step.dependencies);
                });
                data?.status?.data?.steps[step - 1][event]?.sections.forEach((sec: any) => {
                    sec?.fields?.sort((a: any, b: any) => a.index - b.index);
                });
                console.log(data?.status?.data?.steps[step - 1][event]?.sections);
                
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
                    selected = field.value
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
        } catch (error: any) {
            const message = error?.response?.data?.status?.message || language.promptMessages.errorGeneral;
            toast.error(message, toastUtil);
        }
    };
    const onSetPrev = () => {
        if (step > 1) navigate(`/create-deal/${step - 1}`)
    };
    const multipleChoice = (ques: any, secIndex: number) => {
        return (
            <section className="flex items-start justify-center flex-col mt-3 w-full">
                <h3 className="capitalize text-neutral-700 font-medium text-base w-[420px]">
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
                                                            setTotalSteps((prev: any) => { return { copy: [...prev?.copy], all: steps } })
                                                        } else if (q?.id === rest?.dependent_id && rest?.dependent_type?.toLowerCase() === "stepper" && rest?.operation === "show") {
                                                            setTotalSteps((prev: any) => { return { copy: prev?.copy, all: prev?.copy } })
                                                        }
                                                    });
                                                });

                                            })
                                            if (option.length) setRestrictions(option)
                                        }}>
                                        <input onChange={(e) => { }} className="accent-cyan-800 relative float-left mx-2 h-3 w-3 rounded-full border-2 border-solid border-cyan-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04]"
                                            type={ques?.field_type === Constants.MULTIPLE_CHOICE ? "radio" : "checkbox"} checked={as.selected ? true : false} />
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
            <section className="flex items-start justify-center flex-col mt-3 w-full">
                <h3 className="capitalize text-neutral-700 font-medium text-base w-[420px]">
                    {ques?.statement}
                </h3>
                <section className="mb-8 w-full relative mt-2">
                    <div className="relative bg-white rounded-md w-full h-10 border-[1px] border-neutral-300 overflow-hidden inline-flex items-center px-3">
                        <input value={ques?.value} onInput={(e: any) => dispatch(saveDealSelection({ option: e.target.value, question: ques, fields: dealData, lang: event, secIndex, step }))} id={`num-${ques.id}`} placeholder={`${currency === 0 ? "$" : "د.إ"} 0.00`} type="text" className="outline-none w-full h-full placeholder-neutral-500" />
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
            ques?.value?.id ? (
                <div className="mb-4 w-full select-none content-center bg-cbc-grey-sec p-4 rounded-md">
                    <div className="block text-neutral-700 text-base font-medium">
                        <span className="inline-flex w-full items-center justify-between">
                            <span className="inline-flex flex-col">
                                <div>{ques?.statement}</div>

                            </span>
                            <EditIcon stroke="#fff" className="w-7 h-7 float-right cursor-pointer rounded-md p-1"
                                style={{ backgroundColor: "rgba(0, 0, 0, 0.078)" }} onClick={() => removeFile(ques?.value?.id)} />
                        </span>
                        <div className="content-center text-center mt-2  main-embed  h-[200px] overflow-hidden relative">
                            <embed src={ques?.value?.url} className="block w-[110%] h-[110%] overflow-hidden" />
                        </div>
                    </div>
                </div>
            ) : (

                <section className="flex items-start justify-center flex-col mt-3 mb-6 max-w-[400px] min-w-[400px] screen500:max-w-[300px]">
                    {ques?.index < 1 && (
                        <h3 className="text-neutral-700 font-medium text-base w-[420px]">
                            <span>{section?.description}</span>&nbsp;<span className="text-cc-blue font-medium cursor-pointer" onClick={() => setOpen(true)} >
                                {language.philosophyGoals.whyToDo}
                            </span>
                        </h3>
                    )
                    }
                    <h3 className="text-neutral-700 font-medium text-base w-[420px] mt-3">
                        {ques?.statement}
                    </h3>
                    <p className="text-neutral-500 font-normal text-sm">
                        <span>{language?.buttons?.upload} {React.Children.toArray(ques?.permitted_types?.map((type: any) => <span className="uppercase">{type}</span>))} {language?.drawer?.of} {ques?.statement}</span>&nbsp;
                        <span className="relative text-cc-blue font-medium cursor-pointer" onMouseEnter={() => setShowHoverModal(ques.id)} onMouseLeave={() => setShowHoverModal(null)} >
                        {language.common.example}
                        {showHoverModal === ques.id && (
                            <HoverModal width="w-[150px]" height="h-[150px]">
                                <section className="inline-flex flex-row items-center justify-evenly h-full">
                                    <img src={ExampleRealtor} alt={language.syndicate.logo} className="max-h-[90px]" />
                                </section>
                            </HoverModal>
                        )}
                    </span>
                    </p>

                    <FileUpload parentId={dataHolder} onlyPDF={`${ques?.size_constraints?.limit}${ques?.size_constraints?.unit}`} id={ques?.id} fid={ques?.id} file={ques?.value} setModalOpen={() => { }} setFile={(file: File, id: string, url: string, aid: string, size: string, dimensions: string, type: string, prodURL: string) => {
                        dispatch(saveDealSelection({ option: { url: prodURL, id }, question: ques, fields: dealData, lang: event, secIndex, step }))
                    }} title={ques?.statement} removeFile={() => removeFile(ques?.value?.id)} className="w-full" />
                </section >
            )
        );
    };


    const removeFile = async (file: any) => {
        try {
            setLoading(true);
            let { status } = await removeAttachment(file.id || file, authToken);
            if (status === 200) {

            }
        } catch (error: any) {
            setLoading(false);
            if (error.response && error.response.status === 401) {
                dispatch(saveToken(""));
                navigate(RoutesEnums.LOGIN, { state: "add-attachments" });
            }
            const message = error?.response?.data?.status?.message || error?.response?.data || language.promptMessages.errorGeneral;
            toast.error(message, toastUtil);
        } finally {
            setLoading(false);
        }
    };

    const dropdowns = (ques: any, secIndex: number) => {
        let options = ques?.options?.map((opt: any) => {
            return { label: opt?.statement, value: opt?.statement }
        });
        let currentValue = ques?.options?.find((op: any) => op.selected)?.statement || options[0]?.statement || "";

        return (
            <section className="flex items-start justify-center flex-col mt-2 w-full">
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
            <section className="flex items-start justify-center flex-col mt-3 w-full">
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
            <section className="flex items-start justify-center flex-col mt-3 w-full">
                <div className="mb-6 inline-flex flex-col w-full items-start justify-between">
                    <label htmlFor={ques?.id} className="text-neutral-700 text-lg font-medium">{ques?.statement}</label>
                    <textarea placeholder={ques?.statement} className="h-[100px] resize-none shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id={ques?.id} onInput={(e: any) => dispatch(saveDealSelection({ option: e.target.value, question: ques, fields: dealData, lang: event, secIndex, step }))}></textarea>
                </div>
            </section>
        );
    };

    const textFieldInput = (ques: any, secIndex: number) => {
        return (
            <section className="flex items-start justify-center flex-col mb-8 mt-3 w-full">
                <label htmlFor={ques?.id} className="text-neutral-700 text-lg font-medium">{ques?.statement}</label>
                <input title={ques?.statement} className="h-[42px] pr-10 shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-500 leading-tight transition-all bg-white w-full focus:outline-none" placeholder={ques?.statement} id={ques?.id} onChange={(e: any) => dispatch(saveDealSelection({ option: e.target.value, question: ques, fields: dealData, lang: event, secIndex, step }))} />
            </section>
        );
    };

    const URLInput = (ques: any, secIndex: number) => {
        return (
            <section className="flex items-start justify-center flex-col mb-8 mt-3 w-full">
                <div className="relative inline-flex w-full mb-3">
                    <input type="disabled" value={"https://"}
                        className={`text-neutral-500 text-base font-normal border-t border-b border-neutral-300 h-[42px] w-[70px] ${orientation === "rtl"
                            ? "border-r rounded-br-md rounded-tr-md pr-2"
                            : "border-l rounded-bl-md rounded-tl-md pl-2"
                            }`}
                    />
                    <input placeholder="www.example.com"
                        className={`h-[42px] shadow-sm appearance-none border border-neutral-300 w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline ${orientation === "rtl"
                            ? " rounded-bl-md rounded-tl-md"
                            : " rounded-br-md rounded-tr-md"
                            }`} type="text" id={ques?.id} onChange={(e: any) => dispatch(saveDealSelection({ option: e.target.value, question: ques, fields: dealData, lang: event, secIndex, step }))}
                    />
                </div>
            </section>
        );
    };

    const reviewUI = () => {
        return (
            <section className="flex items-start justify-center flex-col mt-10 w-full">
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
            if (ques?.field_type === Constants.MULTIPLE_CHOICE || ques?.field_type === Constants.CHECK_BOX) return multipleChoice(ques, secIndex);
            else if (ques?.field_type === Constants.NUMBER_INPUT) return numberInput(ques, secIndex);
            else if (ques?.field_type === Constants.FILE) return attachments(ques, secIndex, section)
            else if (ques?.field_type === Constants.DROPDOWN) return dropdowns(ques, secIndex)
            else if (ques?.field_type === Constants.SWITCH) return switchInput(ques, secIndex)
            else if (ques?.field_type === Constants.TEXT_BOX) return textAreaInput(ques, secIndex)
            else if (ques?.field_type === Constants.TEXT_FIELD) return textFieldInput(ques, secIndex)
            else if (ques?.field_type === Constants.URL) return URLInput(ques, secIndex)
        }
    };

    const checkValidation = () => {
        if (!dealData || !dealData[step - 1] || !dealData[step - 1][event]?.sections.length) return false;
        let flags: any[] = []

        dealData[step - 1][event]?.sections.forEach((sec: any, index: number) => {
            flags.push({ section: sec.id, validations: [] });
            let fields = sec.fields;
            fields.forEach((ques: any, quesIdx: number) => {
                if (ques?.field_type === Constants.SWITCH) {
                    flags[index].validations.push(true);
                }
                else if (ques?.field_type === Constants.MULTIPLE_CHOICE || ques?.field_type === Constants.DROPDOWN) {
                    let flag = ques.options?.some((opt: any) => opt.selected);
                    flags[index].validations.push(flag);
                }
                else if (ques?.field_type === Constants.FILE) {
                    let flag = (ques.value?.url || ques.value?.id) ? true: false;
                    flags[index].validations.push(flag);
                }
                else if (ques?.field_type === Constants.NUMBER_INPUT || ques.field_type === Constants.TEXT_BOX || ques.field_type === Constants.TEXT_FIELD || ques.field_type === Constants.URL) {
                    let dependantQuesion = sec?.fields?.find((field: any) => field.id === ques?.dependent_id);
                    let flag = false;
                    if ((!dependantQuesion && ques.value) || (dependantQuesion && dependantQuesion?.is_required && ques.value) || (dependantQuesion && !dependantQuesion.is_required)) {
                        flag = true;
                    }
                    else flag = false;
                    flags[index].validations.push(flag);
                }
                else if (ques.field_type === Constants.SWITCH) {
                    flags[index].validations.push(ques.is_required);
                }
            });

            console.log("flags", flags);
            
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

    const checkMultipleButtonDisabled = (section: any) => {
        const flags = section?.fields?.every((field: any) => field?.value);
        return !showCustomBox ? false : !flags;
    };

    const checkCurrentBoxStatus = (fields: any) => {
        const flags = fields?.every((field: any) => field?.value);
        return !showCustomBox ? false : !flags;
    };

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
                                            section.is_multiple ? (
                                                <React.Fragment>
                                                    <h3 className="w-[400px] screen500:w-[300px] text-neutral-700 font-bold text-2xl mb-10">
                                                        {section?.title}
                                                    </h3>

                                                    {multipleFieldsPayload?.length > 0 && (
                                                        React.Children.toArray(
                                                            multipleFieldsPayload?.map((sec: any) => {
                                                                return (
                                                                    <section className="bg-white border-[1px] border-neutral-300 rounded-md px-5 py-3 w-[400px] mb-6">
                                                                        <div className="w-full inline-flex justify-end cursor-pointer" onClick={() => {
                                                                            setMultipleFieldsPayload((prev: any) => {
                                                                                const secs = prev.filter((pv: any) => pv.id !== sec.id);
                                                                                return secs
                                                                            })
                                                                        }}><BinIcon stroke="#171717" /></div>
                                                                        <div className="font-bold text-neutral-900 text-sm text-center mb-2">{sec.fields[0]}</div>
                                                                        <small className="text-neutral-700 font-normal text-sm text-center block w-full">{sec.fields[1]}</small>
                                                                    </section>
                                                                )
                                                            })
                                                        )
                                                    )}
                                                    {showCustomBox && (
                                                        <section className={`flex items-start flex-col mb-8 w-[400px] screen500:w-[300px] ${(index % 2 != 0 || section?.is_multiple) && "bg-cbc-check p-4 rounded-md"}`}>
                                                            {section?.fields?.length ? (React.Children.toArray(section?.fields?.map((ques: any) => renderQuestionType(ques, index, section)))) : (reviewUI())}


                                                            {!section?.display_cards && (
                                                                <div className="w-full inline-flex justify-center items-center gap-2">
                                                                    <Button className="w-[100px] border-2 border-cyan-800" onClick={() => setShowCustomBox(false)}>{language?.v3?.button?.cancel}</Button>
                                                                    <Button disabled={checkCurrentBoxStatus(section?.fields)}
                                                                        className="w-[100px] bg-transparent border-2 border-cyan-800 !text-cyan-800 hover:!text-white"
                                                                        onClick={() => {
                                                                            setShowCustomBox(false);
                                                                            setMultipleFieldsPayload((prev: any) => {
                                                                                if (prev.length === 0) return [{ id: 1, fields: [section?.fields[0].value, section?.fields[1].value] }]
                                                                                else return [...prev, { id: prev?.at(-1).id + 1, fields: [section?.fields[0].value, section?.fields[1].value] }]
                                                                            });
                                                                            dispatch(onResetFields({ secIndex: section?.index, lang: event, step }))
                                                                        }}>{language?.v3?.button?.add}</Button>
                                                                </div>
                                                            )}
                                                        </section>
                                                    )}
                                                    {(section?.add_more_label && index === dealData[step - 1][event]?.sections?.length - 1) && (
                                                        <section className="w-[400px]">
                                                            <Button disabled={checkMultipleButtonDisabled(section)} onClick={() => {
                                                                // showCustomBox && dispatch(saveMoreFields({ secIndex: index, lang: event, step, duplicate: 2 }))
                                                                setShowCustomBox(true);
                                                            }}
                                                                className="w-full bg-transparent border-2 border-cyan-800 !text-cyan-800 hover:!text-white">{section?.add_more_label}</Button>
                                                        </section>
                                                    )}
                                                </React.Fragment>
                                            ) : (
                                                <section className={`flex items-start flex-col mb-8 w-[400px] screen500:w-[300px] ${(index % 2 != 0 || section?.is_multiple) && "bg-cbc-check p-4 rounded-md"}`}>
                                                    <h3 className="text-neutral-700 font-bold text-2xl w-full">
                                                        {section?.title}
                                                    </h3>
                                                    {section?.fields?.length ? (React.Children.toArray(section?.fields?.map((ques: any) => renderQuestionType(ques, index, section)))) : (reviewUI())}
                                                </section>

                                            )
                                        )
                                    })
                                )
                            )}
                            <section className="flex items-start justify-center w-full flex-col mt-6 max-w-[400px] screen500:w-[300px]">
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

            <Modal show={modalOpen}>
                <div className="relative p-12 rounded-md shadow-cs-1 flex flex-col items-center w-full bg-white outline-none focus:outline-none screen800:px-3">
                    <div className="rounded-md h-8 w-8 inline-grid place-items-center cursor-pointer absolute right-2 top-2">
                        <CrossIcon stroke="#171717" className="w-6 h-6" onClick={() => setModalOpen(false)} />
                    </div>

                    <aside>
                        <h2 className="font-bold text-xl text-center text-neutral-900">{language?.v3?.deal?.submitted_deal}</h2>
                        <p className="text-sm font-normal text-center text-neutral-500 mt-8 mb-12">{language?.v3?.deal?.deal_status}: <strong>{language?.common?.submitted}</strong></p>
                    </aside>
                </div>
            </Modal>
        </React.Fragment>
    )
};
export default RealtorDeal;
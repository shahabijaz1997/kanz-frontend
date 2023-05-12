import React, { useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux-toolkit/store/store";
import Stepper from "../../../../shared/components/Stepper";
import Spinner from "../../../../shared/components/Spinner";
import { getInvestmentPhilisophyQuestions, postInvestmentPhilisophyData } from "../../../../apis/philosophy.api";
import { toast } from "react-toastify";
import { toastUtil } from "../../../../utils/toast.utils";
import { saveToken } from "../../../../redux-toolkit/slicer/auth.slicer";

const Questionare = ({ step }: any) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const language: any = useSelector((state: RootState) => state.language.value);
    const authToken: any = useSelector((state: RootState) => state.auth.value);

    const [questions, setQuestions]: any = useState([]);
    const [page, setPage] = useState(1);
    const [selected, setSelected]: any = useState({});
    const [loading, setLoading]: any = useState(false);


    useLayoutEffect(() => {
        getQuestionares(step);
    }, [step]);

    const getQuestionares = async (pg: number) => {
        setLoading(true);
        try {
            const { status, data }: any = await getInvestmentPhilisophyQuestions(pg, authToken);
            if (status === 200) {
                let philisophyData:any = localStorage.getItem("philosophy");
                
                setSelected(JSON.parse(philisophyData) || {});
                setQuestions(data?.status?.data);
                setPage(pg);

            }
        } catch (error: any) {
            const message = error?.response?.data?.status?.message || error?.response?.data || language.promptMessages.errorGeneral;
            console.info("Error :: ", error);
            toast.error(message, toastUtil);
            if (error.response && error.response.status === 401) {
                dispatch(saveToken(""));
                navigate("/login");
            }
        } finally {
            setLoading(false);
        }
    };

    const submitData = async (philData: any) => {
        try {
            setLoading(true);
            console.log(philData);

            // let payload = { investment_philosophy: {} }
            // for (const key in philisophyData?.selected) {
            //     console.log(key);
            //     payload.investment_philosophy = {
            //         step: 1,
            //         questions: [{
            //             question_id: philisophyData?.selectedQues[key],
            //             answer: philisophyData?.selected[key]?.statement,
            //             answer_meta: philisophyData?.selected[key]
            //         }, {
            //             question_id: philisophyData?.selectedQues['12'],
            //             answer: philisophyData?.selected[key]?.statement,
            //             answer_meta: philisophyData?.selected[key]
            //         }]
            //     }
            // }
            // console.log("payload", payload);

            // let { status, data } = await postInvestmentPhilisophyData(payload, authToken);
            // console.log(data);

        } catch (error: any) {
            const message = error?.response?.data?.status?.message || error?.response?.data || language.promptMessages.errorGeneral;
            console.info("Error :: ", error);
            toast.error(message, toastUtil);
            if (error.response && error.response.status === 401) {
                dispatch(saveToken(""));
                navigate("/login");
            }
        } finally {
            setLoading(false);
        }
    };

    const checkExist = (elem: any, as: any) => {
        let found: any = elem?.questions.some((q: any) => q?.answer_meta?.index === as.index && q?.answer_meta.statement === as.statement);
        return found;
    };

    const toggleAnswerSelection = (q: any, a: any) => {
        let _selected = { ...selected };
        let found: any = _selected[q.step]?.questions.find((qa: any) => qa.question_id === q.id);

        if (found) {
            let filtered = _selected[q.step]?.questions.filter((qa: any) => qa.question_id !== q.id);
            filtered.push({ question_id: q.id, answer: a?.statement, answer_meta: a });
            _selected[q.step].questions = filtered;
            setSelected(_selected);
        }
        else {
            if (_selected[q.step]?.questions?.length)
                _selected[q.step]?.questions.push({ question_id: q.id, answer: a?.statement, answer_meta: a })
            else
                _selected[q.step] = { step, questions: [{ question_id: q.id, answer: a?.statement, answer_meta: a }] };
            setSelected(_selected);
        }
    };

    const renderMultipleChoiceQuestionaire = (ques: any) => {
        if (selected && ques.step === 2 && ques.index === 2 && (!selected[`2`] || selected[`2`]?.questions.find((q:any)=> q.answer === "No"))) return <React.Fragment></React.Fragment>;
        return (
            <section className="flex items-start justify-center flex-col mt-12 max-w-[420px] screen500:max-w-[300px]">
                <h3 className="text-neutral-700 font-medium text-base w-[420px]">{ques?.title}</h3>
                <p className="text-neutral-500 font-normal text-sm">
                    <span>{ques?.statement}</span>&nbsp;
                    <span className="color-blue font-medium">{language.common.learn}</span>
                </p>
                <section className="mb-8 w-full relative mt-3">
                    <ul>
                        {ques?.options?.schema &&
                            React.Children.toArray(
                                ques?.options?.schema.map((as: any) => {
                                    return (
                                        <li className={`h-[50px] w-[420px] p-4 grey-neutral-200 text-sm font-medium cursor-pointer border border-grey inline-flex items-center justify-start first:rounded-t-md last:rounded-b-md screen500:w-full ${checkExist(selected[ques.step], as) ? "check-background" : "bg-white"}`} onClick={() => toggleAnswerSelection(ques, as)}>
                                            <input onChange={() => { }} className="accent-cyan-800 relative float-left mr-2 h-3 w-3 rounded-full border-2 border-solid border-cyan-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04]"
                                                type="radio" checked={checkExist(selected[ques.step], as) ? true : false} />
                                            <small>{as?.statement}</small>
                                        </li>
                                    )
                                })
                            )}
                    </ul>
                </section>
            </section>
        )
    }

    const renderBooleanQuestionaire = (ques: any) => {
        return (
            <section className="flex items-start justify-center flex-col mt-12 max-w-[420px] screen500:max-w-[300px]">
                <h3 className="text-neutral-700 font-medium text-base w-[420px]">{ques?.title}</h3>
                <p className="text-neutral-500 font-normal text-sm">
                    <span>{ques?.statement}</span>&nbsp;
                    <span className="color-blue font-medium">{language.common.learn}</span>
                </p>
                <section className="w-full inline-flex items-center justify-between mt-4 gap-5">
                    {ques?.options?.schema &&
                        React.Children.toArray(
                            ques?.options?.schema.map((as: any) => {
                                return (
                                    <li className={`rounded-md h-[50px] w-[420px] p-4 grey-neutral-200 text-sm font-medium cursor-pointer border border-grey inline-flex items-center justify-start screen500:w-full${checkExist(selected[ques.step], as) ? "check-background" : "bg-white"}`} onClick={() => toggleAnswerSelection(ques, as)}>
                                        <input onChange={() => { }} className="accent-cyan-800 relative float-left mr-2 h-3 w-3 rounded-full border-2 border-solid border-cyan-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04]"
                                            type="radio" checked={checkExist(selected[ques.step], as) ? true : false} />
                                        <small>{as?.statement}</small>
                                    </li>
                                )
                            })
                        )}
                </section>
            </section >
        )
    }

    const onSetPrev = () => {
        if (page === 1) return;
        checkValidation();
        let philisophyData: any = localStorage.getItem("philosophy");
        let philData: any = { ...JSON.parse(philisophyData), ...selected };
        localStorage.setItem("philosophy", JSON.stringify(philData));
        navigate(`/philosophy-goals/${page - 1}`);
    };
    const onSetNext = () => {
        checkValidation();
        let philisophyData: any = localStorage.getItem("philosophy");
        let philData: any = { ...JSON.parse(philisophyData), ...selected };
        localStorage.setItem("philosophy", JSON.stringify(philData));

        if (step === 5)
            submitData(philData)
        else
            navigate(`/philosophy-goals/${page + 1}`);
    };
    const checkValidation = () => {
        let ques = questions?.questions?.every((q: any) => selected && selected[`${q?.step}${q?.index}`]);
        return !ques;
    };

    return (
        <aside className="w-full flex items-center justify-center flex-col pt-12 pb-5">
            <Stepper currentStep={step - 1} totalSteps={questions?.total_steps} />
            {loading && <div className="absolute left-0 top-0 w-full h-full grid place-items-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.078)", zIndex: 50 }}><Spinner /></div>}

            <section className="flex items-start flex-col mt-12 max-w-[420px] screen500:max-w-[300px]">
                {questions?.questions && <h3 className="text-neutral-700 font-bold text-2xl w-[420px]">{questions?.questions[0]?.category}</h3>}
            </section>

            {questions?.questions?.length && React.Children.toArray(
                questions?.questions.map((ques: any) => ques.step === 2 && ques.index === 1 ? renderBooleanQuestionaire(ques) : renderMultipleChoiceQuestionaire(ques))
            )}

            <section className="flex items-start justify-center w-full flex-col mt-6 max-w-[420px] screen500:max-w-[300px]">
                <div className="w-full inline-flex items-center justify-between mt-16">
                    <button className="text-neutral-900 tracking-[0.03em] bg-white font-bold rounded-md border border-grey rounded-md focus:outline-none focus:shadow-outline h-[38px] w-[140px]"
                        type="button" onClick={onSetPrev}>
                        {language?.buttons?.back}
                    </button>
                    <button className={`${checkValidation() && "opacity-70"} text-white tracking-[0.03em] bg-cyan-800 font-bold rounded-md focus:outline-none focus:shadow-outline h-[38px] w-[140px]`}
                        type="button" onClick={onSetNext}>
                        {language?.buttons?.continue}
                    </button>
                </div>
            </section>
        </aside >
    )
};
export default Questionare;
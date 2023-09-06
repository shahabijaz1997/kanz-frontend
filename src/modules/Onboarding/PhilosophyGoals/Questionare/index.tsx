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
import Drawer from "../../../../shared/components/Drawer";
import HorionGraph from "../../../../assets/investment_horizon_graph.png";
import Button from "../../../../shared/components/Button";
import { KanzRoles } from "../../../../enums/roles.enum";
import { RoutesEnums } from "../../../../enums/routes.enum";
import { saveAnswer, savePhilosophyData } from "../../../../redux-toolkit/slicer/philosophy.slicer";
import { filterObjectsByTrueValue } from "../../../../utils/object.utils";

const Questionare = ({ step, returnSuccessRedirection }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user: any = useSelector((state: RootState) => state.user.value);
  const language: any = useSelector((state: RootState) => state.language.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const event: any = useSelector((state: RootState) => state.event.value);
  const philosophyData: any = useSelector((state: RootState) => state.philosophy.value);
  const [isOpen, setOpen]: any = useState("");
  const [questions, setQuestions]: any = useState([]);
  const [totalSteps, setTotalSteps] = useState();
  const [page, setPage] = useState(1);
  const [selected]: any = useState({});
  const [loading, setLoading]: any = useState(true);

  useLayoutEffect(() => {
    if (user.type !== KanzRoles.INVESTOR) navigate(RoutesEnums.WELCOME);
  }, []);

  useLayoutEffect(() => {
    getQuestionares(step);
  }, [step]);

  const getQuestionares = async (pg: number) => {
    try {
      setLoading(true);
      const { status, data }: any = await getInvestmentPhilisophyQuestions(pg, authToken);
      if (status === 200) {
        setQuestions(data?.status?.data);
        let steps: any = [];
        for (let i = 1; i <= data?.status?.data?.total_steps; i++)
          steps.push({ id: i });
        setTotalSteps(steps);
        dispatch(savePhilosophyData(data?.status?.data));
        setPage(pg);
      }
    } catch (error: any) {
      const message = error?.response?.data?.status?.message || error?.response?.data || language.promptMessages.errorGeneral;
      toast.error(message, toastUtil);
      if (error.response && error.response.status === 401) {
        dispatch(saveToken(""));
        navigate(RoutesEnums.LOGIN, { state: `${RoutesEnums.PHILOSOPHY_GOALS}/${step}` });
      }
    } finally {
      let timer = setTimeout(() => {
        setLoading(false);
        clearTimeout(timer);
      }, 500);
    }
  };

  const submitData = async (payload: any) => {
    try {
      setOpen(false);
      setLoading(true);
      let { status, data } = await postInvestmentPhilisophyData(payload, authToken);
      if (status === 200) localStorage.setItem("step", step);
      if (step === questions?.total_steps && status === 200)
        returnSuccessRedirection(data);
    } catch (error: any) {
      const message = error?.response?.data?.status?.message || error?.response?.data || language.promptMessages.errorGeneral;
      toast.error(message, toastUtil);
      if (error.response && error.response.status === 401) {
        dispatch(saveToken(""));
        navigate(RoutesEnums.LOGIN, { state: `${RoutesEnums.PHILOSOPHY_GOALS}/${step}` });
      }
    } finally {
      let timer = setTimeout(() => {
        setLoading(false);
        clearTimeout(timer);
      }, 500);
    }
  };

  const renderMultipleChoiceQuestionnaires = (ques: any) => {
    if (selected && ques.step === 2 && ques.index === 2 && !philosophyData?.questions[0][event]?.options[0]?.selected)
      return <React.Fragment></React.Fragment>;
    if (ques?.question_type === "text") {
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
            <textarea
              value={ques.answer}
              onChange={(e) => dispatch(saveAnswer({ textAnswer: e.target.value, question: ques, questions: philosophyData, lang: event }))}
              className="rounded-md shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline h-[100px] resize-none"
            ></textarea>
          </section>
        </section>
      );
    }
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
                    <li
                      className={`h-[50px] w-[420px] p-4 grey-neutral-200 text-sm font-medium cursor-pointer border border-grey inline-flex items-center justify-start first:rounded-t-md last:rounded-b-md screen500:w-full ${as.selected ? "check-background" : "bg-white"}`}
                      onClick={() => dispatch(saveAnswer({ option: as, question: ques, questions: philosophyData, lang: event }))}>
                      <input onChange={() => { }}
                        className="accent-cyan-800 relative float-left mx-2 h-3 w-3 rounded-full border-2 border-solid border-cyan-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04]"
                        type="radio" checked={as.selected ? true : false} />
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

  const renderCheckboxQuestionnaire = (ques: any) => {
    if (selected && ques.step === 2 && ques.index === 2 && (!selected[`2`] || selected[`2`]?.questions.find((q: any) => q.answer === questions?.questions[0][event]?.options[1]?.id)))
      return <React.Fragment></React.Fragment>;
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
                        dispatch(saveAnswer({ option: as, question: ques, questions: philosophyData, lang: event })
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

  const renderBooleanQuestionnaires = (ques: any) => {
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
        <section className="w-full inline-flex items-center justify-between mt-4 gap-5">
          {ques[event]?.options &&
            React.Children.toArray(
              ques[event]?.options.map((as: any) => {
                return (
                  <li className={`rounded-md bg-white h-[50px] w-[420px] p-4 grey-neutral-200 text-sm font-medium cursor-pointer border border-grey inline-flex items-center justify-start screen500:w-full${as.selected ? "check-background" : "bg-white"}`}
                    onClick={() => {
                      dispatch(saveAnswer({ option: as, question: ques, questions: philosophyData, lang: event }));
                    }}
                  >
                    <input onChange={() => { }}
                      className="accent-cyan-800 relative float-left mx-2 h-3 w-3 rounded-full border-2 border-solid border-cyan-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04]"
                      type="radio" checked={as.selected ? true : false} />
                    <small>{as?.statement}</small>
                  </li>
                );
              })
            )}
        </section>
      </section>
    );
  };

  const onSetPrev = () => {
    checkValidation();
    setOpen(false);
    let philisophyData: any = localStorage.getItem("philosophy");
    let philData: any = JSON.parse(philisophyData);
    localStorage.setItem("philosophy", JSON.stringify(philData));
    if (page !== 1) navigate(`${RoutesEnums.PHILOSOPHY_GOALS}/${page - 1}`);
    else navigate(RoutesEnums.COMPLETE_GOALS);
  };

  const onSetNext = () => {
    if (!checkValidation()) {
      toast.dismiss();
      return toast.warning(language.promptMessages.pleaseSelectAllData, toastUtil);
    }
    let payload: any = { investment_philosophy: {} };
    payload.investment_philosophy.step = step;
    const _questions: any = [];
    philosophyData.questions.forEach((question: any) => {
      if (question.question_type === "text") {
        const finalQuestion = {
          question_id: question.id,
          selected_option_ids: [],
          answer: question.answer,
        };
        _questions.push(finalQuestion);
      } else {
        const filteredArray = filterObjectsByTrueValue(question[event].options, "selected");
        const finalQuestion = {
          question_id: question.id,
          selected_option_ids: filteredArray,
        };
        _questions.push(finalQuestion);
      }
    });
    payload.investment_philosophy.questions = _questions;
    submitData(payload);
    if (step !== questions?.total_steps) navigate(`${RoutesEnums.PHILOSOPHY_GOALS}/${page + 1}`);
  };

  const checkSelected = (options: any[]): boolean => {
    return options?.some((option: any) => option?.selected === true);
  };

  function checkAtLeastOneOptionSelected(questions: any[]): boolean {
    return questions?.every((question: any) => question[event].options && checkSelected(question[event].options));
  }

  function checkStatement(questions: any[]): boolean {
    if (questions.length === 0) return false;
    return checkAtLeastOneOptionSelected(questions);
  }

  const checkValidation = () => {
    const hasTextQuestion = philosophyData?.questions?.length > 0 && philosophyData.questions[0]?.question_type === "text";

    if (hasTextQuestion) {
      return philosophyData.questions[0]?.answer?.length > 0;
    } else {
      const question = philosophyData?.questions?.find(
        (question: any) => question[event]?.options?.length === 2
      );
      const checkNoOption = question && question[event]?.options?.find((option: any) => option?.statement === "No" || option?.statement === "لا");
      if (step === 2 && checkNoOption?.selected) {
        return true;
      } else if (!philosophyData?.questions?.length) {
        return false;
      } else {
        return checkStatement(philosophyData.questions);
      }
    }
  };

  return (
    <aside className="w-full flex items-center justify-center flex-col pt-12 pb-5">
      <Stepper currentStep={step - 1} totalSteps={totalSteps} />
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

          {philosophyData?.questions?.length &&
            step !== 3 &&
            React.Children.toArray(philosophyData?.questions.map((ques: any) => ques.step === 2 && ques.index === 1 ? renderBooleanQuestionnaires(ques) : renderMultipleChoiceQuestionnaires(ques)))}

          {philosophyData?.questions?.length &&
            philosophyData?.questions[0]?.question_type === "checkbox" &&
            React.Children.toArray(philosophyData?.questions.map((ques: any) => renderCheckboxQuestionnaire(ques)))}

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

      <Drawer isOpen={isOpen} setIsOpen={(val: boolean) => setOpen(val)}>
        {questions?.questions &&
          questions?.questions[0]?.question_type === "checkbox" ? (
          <React.Fragment>
            <p className="text-neutral-700 font-normal text-sm text-justify">
              {language.modal.horizon_para_1}
            </p>
            <p className="text-neutral-700 font-normal text-sm text-justify">
              {language.modal.horizon_para_2}
            </p>
            <img src={HorionGraph} alt={language.investmentHorizon.horizon} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <header className="font-bold text-xl">
              {language.philosophyGoals.objective}
            </header>
            <p className="text-neutral-700 font-normal text-sm text-justify">
              {language?.drawer?.questionare}
            </p>
          </React.Fragment>
        )}
      </Drawer>
    </aside>
  );
};
export default Questionare;
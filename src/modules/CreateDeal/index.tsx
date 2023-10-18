import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../redux-toolkit/store/store";
import { getDealQuestion, postDealStep, submitDeal } from "../../apis/deal.api";
import { DealType, FileType } from "../../enums/types.enum";
import { onResetFields, onResetOptions, saveDealSelection, saveQuestionnaire } from "../../redux-toolkit/slicer/philosophy.slicer";
import Header from "../../shared/components/Header";
import CrossIcon from "../../ts-icons/crossIcon.svg";
import { KanzRoles } from "../../enums/roles.enum";
import Stepper from "../../shared/components/Stepper";
import Spinner from "../../shared/components/Spinner";
import Button from "../../shared/components/Button";
import { saveToken } from "../../redux-toolkit/slicer/auth.slicer";
import { RoutesEnums } from "../../enums/routes.enum";
import { Constants, InputType } from "../../enums/constants.enum";
import { saveDataHolder } from "../../redux-toolkit/slicer/dataHolder.slicer";
import { toastUtil } from "../../utils/toast.utils";
import { toast } from "react-toastify";
import Selector from "../../shared/components/Selector";
import { numberFormatter, uniqueArray } from "../../utils/object.utils";
import FileUpload from "../../shared/components/FileUpload";
import HoverModal from "../../shared/components/HoverModal";
import ExampleRealtor from "../../assets/example_realtor.png";
import BinIcon from "../../ts-icons/binIcon.svg";
import Modal from "../../shared/components/Modal";
import { removeAttachment } from "../../apis/attachment.api";
import EditIcon from "../../ts-icons/editIcon.svg";
import ReviewDeal from "./ReviewDeal";
import Drawer from "../../shared/components/Drawer";
const CURRENCIES = ["USD", "AED"];

const CreateDeal = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const language: any = useSelector((state: RootState) => state.language.value);
  const event: any = useSelector((state: RootState) => state.event.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const metadata: any = useSelector((state: RootState) => state.metadata.value);
  const orientation: any = useSelector((state: RootState) => state.orientation.value);
  const dataHolder: any = useSelector((state: RootState) => state.dataHolder.value);
  const dealData: any = useSelector((state: RootState) => state.questionnaire.value);

  const [step, setStep]: any = useState(Number(params?.id));
  const [multipleFieldsPayload, setMultipleFieldsPayload]: any = useState([]);
  const [restrictions, setRestrictions]: any = useState([]);
  const [deleted, setDeleted]: any = useState([]);
  const [currency, setCurrency] = useState(0);
  const [showHoverModal, setShowHoverModal] = useState(null);
  const [questions, setQuestions]: any = useState(null);
  const [dependencies, setDependencies]: any = useState(null);
  const [totalSteps, setTotalSteps]: any = useState(null);
  const [showCustomBox, setShowCustomBox]: any = useState(true);
  const [open, setOpen]: any = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen]: any = useState(null);

  useEffect(() => {
    setStep(Number(params?.id) || 1);
    getDealStepDetails();
  }, [params, step]);

  /* UI Actions */
  const getDealStepDetails = async () => {
    try {
      setLoading(true);
      const queryParams: any = { type: metadata.role === KanzRoles.STARTUP ? DealType.STARTUP : DealType.REALTOR };
      if (dataHolder) queryParams.id = dataHolder;

      let { status, data } = await getDealQuestion(queryParams, authToken);
      if (status === 200) {
        let _dependencies: any = [];
        data?.status?.data?.steps?.forEach((step: any) => {
          if (step?.dependencies?.length > 0) _dependencies = step.dependencies;
        });
        _dependencies.length > 0 && setDependencies(_dependencies)
        let all_steps: any[] = [];
        for (let i = 0; i < data?.status?.data?.step_titles[event]?.length; i++) {
          const step = data?.status?.data?.step_titles[event][i];
          all_steps.push({ id: i + 1, text: step });
        }

        let options: any = [];
        let stepper: any;
        data?.status?.data?.steps[step - 1][event]?.sections.forEach((sec: any) => {
          sec?.fields?.sort((a: any, b: any) => a.index - b.index);
          let f = sec?.fields?.find((ques: any) => {
            return _dependencies?.find((dep: any) => dep?.dependable_field === ques?.id)
          });
          // Check Unique Selling Points
          if (sec?.display_card && sec?.fields?.some((field: any) => field?.value)) {
            let _multipleFieldsPayload: any[] = []
            for (let i = 0; i < sec?.fields?.length; i++) {
              const fields: [] = sec?.fields?.filter((fd: any) => fd.index === i);
              _multipleFieldsPayload.push({ id: i, fields: fields.reverse() });
            }
            let uniques = uniqueArray(_multipleFieldsPayload);
            let nonZero = uniques.filter((ua: any) => ua?.fields?.length > 0)
            setMultipleFieldsPayload(nonZero);
            sec.fields = [sec.fields.at(-1), sec.fields[0]];
            setShowCustomBox(false);
          }
          // Check External Links
          else if (!sec?.display_card && sec?.is_multiple && sec?.fields?.some((field: any) => field?.value)) {
            console.log(12345);

            let elems = [];
            for (let i = 0; i < sec?.fields?.length; i++) elems.push(sec.fields[i]);

            setMultipleFieldsPayload(elems);
            setShowCustomBox(true);
            let sect: any = data?.status?.data?.steps[step - 1][event]?.sections?.find((s: any) => s.index === sec?.index);

            if (sect?.fields?.length > 1) {
              for (let i = 0; i <= sect?.fields.length; i++) sect?.fields.pop();
            }
          }
          else {
            setShowCustomBox(true);
            setMultipleFieldsPayload([]);
          }
          let opt = f?.options?.find((op: any) => op.selected);
          if (opt) {
            _dependencies?.find((dep: any) => {
              if (dep?.value === String(opt.id) && dep?.dependent_type !== "Stepper") options.push(dep);
            });
          }
        });
        if (stepper) {
          let step = all_steps?.find((ts: any) => ts?.text === stepper[event]?.title);
          let steps = all_steps?.filter((stp: any) => stp?.text !== step?.text);

          setTotalSteps((prev: any) => { return { copy: all_steps, all: steps } })
        }

        else setTotalSteps((prev: any) => { return { copy: all_steps, all: all_steps } })
        options?.length > 0 && setRestrictions(options);
        setQuestions(data?.status?.data?.steps);
        dispatch(saveQuestionnaire(data?.status?.data?.steps));
      }

    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        dispatch(saveToken(""));
        navigate(RoutesEnums.LOGIN, { state: `create-deal/${step}` });
      }
    } finally {
      let timer = setTimeout(() => {
        clearTimeout(timer);
        setLoading(false);
      }, 500)
    }
  };

  const onSetNext = async () => {
    try {

      let all_fields: any[] = [];
      let fields: any[] = [];
      dealData[step - 1][event]?.sections?.forEach((section: any) => {
        all_fields = all_fields.concat(section?.fields);
      });
      if (multipleFieldsPayload?.length > 0 || deleted.length > 0) {
        let concatList = multipleFieldsPayload.concat(deleted);
        concatList?.forEach((sec: any, index: number) => {
          if (sec?.fields) {
            sec?.fields.forEach((field: any) => {
              if (field?.id) fields.push({ id: field.id, value: field.value, index, deleted: sec?.deleted });
              else fields.push({ id: field.ques, value: field.value, index, deleted: sec?.deleted });
            });
          }
          else fields.push({ id: sec.id, value: sec?.value, index, deleted: sec?.deleted })
        });
      }

      else {
        fields = all_fields?.map((field: any) => {
          let selected;
          if (field?.field_type === Constants.MULTIPLE_CHOICE || field?.field_type === Constants.DROPDOWN) selected = field?.options?.find((opt: any) => opt.selected)?.id
          if (field?.field_type === Constants.NUMBER_INPUT || field?.field_type === Constants.TEXT_BOX || field?.field_type === Constants.TEXT_FIELD || field?.field_type === Constants.URL) selected = field.value
          if (field.field_type === Constants.SWITCH) selected = field?.value
          if (field.field_type === Constants.FILE) selected = field?.value?.id
          if (field.field_type === Constants.CHECK_BOX) selected = field?.value;
          return {
            id: field.id,
            value: selected
          }
        });
      }
      let payload: any = {
        deal: {
          deal_type: metadata.role === KanzRoles.STARTUP ? "startup" : "property",
          step: questions[step - 1]?.id,
          fields
        }
      }
      if (dataHolder) payload.deal.id = dataHolder;
      let submission;
      if (step >= totalSteps?.all.length) submission = await submitDeal(dataHolder, authToken);
      else submission = await postDealStep(payload, authToken);

      let { status, data } = submission;

      if (status === 200) {
        dispatch(saveDataHolder(data?.status?.data?.id));
        if (step < totalSteps?.all.length) navigate(`/create-deal/${step + 1}`);
        else {
          dispatch(saveDataHolder(""));
          setModalOpen(true);
        }
      }
    } catch (error: any) {
      const message = error?.response?.data?.status?.message || language.promptMessages.errorGeneral;
      toast.error(message, toastUtil);
    } finally {
      setMultipleFieldsPayload([]);
      setDeleted([]);
    }
  };

  const onSetPrev = () => {
    if (step > 1) navigate(`/create-deal/${step - 1}`);
    else navigate(`/${metadata?.role?.toLowerCase()}`)
  };

  const tieUpRestrictions = (as: any) => {
    let option: any[] = [];
    dependencies?.find((dep: any) => {
      if (String(dep.value) === String(as?.id)) option.push(dep);
    })
    if (option.length) setRestrictions(option)
  };

  const removeFile = async (file: any, data: any) => {
    try {
      setLoading(true);
      let { status } = await removeAttachment(file.id || file, authToken);
      if (status === 200) dispatch(saveDealSelection(data));
    } catch (error: any) {
      setLoading(false);
      dispatch(saveDealSelection(data));
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

  const comaFormattedNumber = (value: string) => {
    if (!value) return value;
    return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  /* UI Components */
  const multipleChoice = (ques: any, secIndex: number, section: any) => {
    let flag = false;
    let dependant = dependencies?.find((dep: any) => dep?.dependent_id === ques?.id && dep?.operation === "hide" && dep.dependent_type !== "Stepper");

    if (dependant) {
      let field = section?.fields?.find((q: any) => q.id === dependant.dependable_field);
      let option = field?.options?.find((op: any) => op.selected);
      if (!option) flag = true;
    }
    if (flag) return <React.Fragment></React.Fragment>
    return (
      <section className="flex items-start justify-center flex-col mt-3 w-full">
        <h3 className="text-neutral-700 font-medium text-base w-[450px]">
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
                  <li className={`h-[70px] w-[450px] px-4 grey-neutral-200 text-sm font-medium cursor-pointer border border-grey inline-flex items-center justify-start first:rounded-t-md last:rounded-b-md screen500:w-full ${as.selected ? "check-background" : "bg-white"}`}
                    onClick={() => {
                      dispatch(saveDealSelection({ option: as, question: ques, fields: dealData, lang: event, secIndex, step: dealData[step - 1] }));
                      if (dependencies.find((dep: any) => dep?.dependable_field === ques.id)) {
                        let section = dealData[step - 1][event]?.sections.find((sec: any) => sec.index === secIndex);
                        let fields = section?.fields?.filter((f: any) => f.id !== ques.id);
                        fields.forEach((f: any) => {
                          dispatch(onResetOptions({ question: f, fields: dealData, lang: event, secIndex, step: dealData[step - 1] }));
                        })
                      }
                      tieUpRestrictions(as);
                    }} id={`rad-chk-${as?.id}`}>
                    <input onChange={(e) => { }} className="accent-cyan-800 relative float-left mx-2 h-3 w-3 rounded-full border-2 border-solid border-cyan-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04]"
                      type="radio" checked={as.selected ? true : false} />
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-neutral-900">{as?.statement}</div>
                      <div className="text-sm font-normal text-neutral-500">{as?.label}</div>
                    </div>
                  </li>
                );
              })
              )}
          </ul>
        </section>
      </section>
    );
  };

  const numberInput = (ques: any, secIndex: number, section: any) => {
    let dependantQuesion = section?.fields?.find((field: any) => field.id === ques?.dependent_id);
    let placeholder = "", symbol = "";
    if (ques?.input_type === InputType.CURRENCY) placeholder = currency === 0 ? "$ 0.00" : "0.00 د.إ";
    else if (ques?.input_type === InputType.SQFT) placeholder = language?.v3?.common?.sqft;
    else if (ques?.input_type === InputType.PERCENT) placeholder = language?.v3?.common?.percent;
    else placeholder = ques?.placeholder || ques?.statement;

    if (ques?.input_type === InputType.CURRENCY) symbol = currency === 0 ? "$" : "د.إ";
    else if (ques?.input_type === InputType.SQFT) symbol = "SQFT";
    else if (ques?.input_type === InputType.PERCENT) symbol = "%";

    if (!dependantQuesion || (dependantQuesion && dependantQuesion?.value)) return (
      <section className="flex items-start justify-center flex-col mt-3 w-full">
        {!dependantQuesion && <h3 className="text-neutral-700 font-medium text-base w-[450px]">{ques?.statement}</h3>}

        <section className="mb-8 w-full relative">
          <div className="relative rounded-md w-full h-10 border-[1px] border-neutral-300 bg-white overflow-hidden inline-flex items-center px-3">
            <input value={comaFormattedNumber(ques?.value)} onInput={(e: any) => {
              const enteredValue = e.target.value;
              const numericValue = enteredValue.replace(/[^0-9.]|(\.(?=.*\.))/g, "");
              if (ques?.input_type === InputType.PERCENT && Number(e.target.value) > 100) return;

              dispatch(saveDealSelection({ option: numericValue, question: ques, fields: dealData, lang: event, secIndex, step: dealData[step - 1] }))
            }} id={`num-${ques.id}`}
              placeholder={placeholder}
              type="text" className="outline-none w-full h-full placeholder-neutral-500" />
            {ques?.input_type === InputType.CURRENCY && <span className="cursor-pointer inline-flex items-center" onClick={() => setCurrency(prev => { return prev === 0 ? 1 : 0 })}>
              <button className="font-normal text-lg text-neutral-500">{CURRENCIES[currency]}</button>
            </span>}
            {ques?.input_type === InputType.SQFT && <span className="cursor-pointer inline-flex items-center">
              <button className="font-normal text-lg text-neutral-500">SQFT</button>
            </span>}
            {ques?.input_type === InputType.PERCENT && <span className="cursor-pointer inline-flex items-center">
              <button className="font-normal text-lg text-neutral-500">%</button>
            </span>}
          </div>
          <ul className="inline-flex items-center gap-6 mt-3">
            {React.Children.toArray(
              ques?.suggestions.map((suggestion: any) => (
                <li onClick={() => {
                  let elem: HTMLInputElement | any = document.getElementById(`num-${ques.id}`);
                  elem.value = String(suggestion);
                  dispatch(saveDealSelection({ option: String(suggestion), question: ques, fields: dealData, lang: event, secIndex, step: dealData[step - 1] }));
                }} className="cursor-pointer py-2 px-3 h-9 w-24 bg-cbc-grey-sec rounded-md text-center text-sm font-normal text-neutral-900">{numberFormatter(Number(suggestion))}&nbsp;{symbol}</li>
              ))
            )}
          </ul>
        </section>
      </section >
    );
    else return <React.Fragment></React.Fragment>
  };

  const attachments = (ques: any, secIndex: number, section: any) => {
    let onlyPDF = (ques?.permitted_types?.length === 1 && ques?.permitted_types?.includes("pdf")) && true;
    let onlvideo: any = (ques?.permitted_types?.length === 1 && ques?.permitted_types?.includes("video")) && true;

    return (
      ques?.value?.id && !ques?.value?.type ? (
        <div className="mb-4 w-full select-none content-center bg-cbc-grey-sec p-4 rounded-md">
          <div className="block text-neutral-700 text-base font-medium">
            <span className="inline-flex w-full items-center justify-between">
              <span className="inline-flex flex-col">
                <div>{ques?.statement}</div>

              </span>
              <EditIcon stroke="#fff" className="w-7 h-7 float-right cursor-pointer rounded-md p-1"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.078)" }} onClick={() => {
                  removeFile(ques?.value?.id, { option: null, question: ques, fields: dealData, lang: event, secIndex, step: dealData[step - 1] })
                }} />
            </span>
            <div className="content-center text-center mt-2  main-embed  h-[200px] overflow-hidden relative">
              {onlvideo ? (
                <video className="w-[100%] h-[90%]" controls>
                  <source src={ques?.value?.url} type="video/webm" />
                </video>
              ) : (<embed src={ques?.value?.url} className="block w-[110%] h-[110%] overflow-hidden" />)}
            </div>
          </div>
        </div>
      ) : (
        <section className="flex items-start justify-center flex-col mt-3 mb-6 w-full">
          {ques?.index < 1 && (
            <h3 className="text-neutral-700 font-medium text-base w-[450px]">
              <span>{section?.description}</span>&nbsp;<span className="text-cc-blue font-medium cursor-pointer" onClick={() => setOpen(true)} >
                {language.philosophyGoals.whyToDo}
              </span>
            </h3>
          )
          }
          <h3 className="text-neutral-700 font-medium text-base w-[450px] mt-3">
            {ques?.statement}
          </h3>
          <p className="text-neutral-500 font-normal text-sm mb-2">
            {/* <span className="text-neutral-500">{language?.buttons?.upload} {React.Children.toArray(ques?.permitted_types?.map((type: any) => <span className="uppercase">{type}&nbsp;</span>))} {language?.drawer?.of} {ques?.statement}</span>&nbsp; */}
            <span className="text-neutral-500">{ques?.label}</span>&nbsp;
            <span className="relative text-cc-blue font-medium cursor-pointer" onMouseEnter={() => setShowHoverModal(ques.id)} onMouseLeave={() => setShowHoverModal(null)} >
              {language.common.example}
              {showHoverModal === ques.id && (
                <HoverModal width="w-[170px]" height="h-[170px]">
                  <section className="inline-flex flex-row items-center justify-evenly h-full">
                    <img src={ExampleRealtor} alt={language.syndicate.logo} className="h-[100px]" />
                  </section>
                </HoverModal>
              )}
            </span>
          </p>

          <FileUpload
            parentId={dataHolder}
            acceptPdf={true}
            onlyVideo={onlvideo}
            size={`${ques?.size_constraints?.limit}${ques?.size_constraints?.unit}`}
            id={ques?.id}
            fid={ques?.id}
            file={ques?.value?.url ? { url: ques?.value?.url, id: ques?.id, fid: ques?.value?.id, type: ques?.value?.type, size: ques?.value?.size, dimensions: ques?.value?.dimensions, file: ques?.value?.file } : {}}
            setModalOpen={() => {
              setModalOpen({ type: ques?.value?.type, url: ques?.value?.url })
            }} setFile={(file: File, id: string, url: string, aid: string, size: string, dimensions: string, type: string, prodURL: string) => {
              dispatch(saveDealSelection({ option: { file, url: prodURL, id: aid, localUrl: url, type, size, dimensions }, question: ques, fields: dealData, lang: event, secIndex, step: dealData[step - 1] }))
            }}
            title={ques?.statement}
            removeFile={() => removeFile(ques?.value?.id, { option: null, question: ques, fields: dealData, lang: event, secIndex, step: dealData[step - 1] })} className="w-full" />
        </section >
      )
    );
  };

  const dropdowns = (ques: any, secIndex: number, section: any) => {
    let dependantQuesion = section?.fields?.find((field: any) => field.id === ques?.dependent_id);

    if (!dependantQuesion || (dependantQuesion && dependantQuesion?.value)) {
      let options = ques?.options?.map((opt: any) => {
        return { label: opt?.statement, value: opt?.statement }
      });
      let currentValue = ques?.options?.find((op: any) => op.selected)?.statement || options[0]?.statement || "";
      return (
        <section className="flex items-start justify-center flex-col mt-2 w-full">
          {!dependantQuesion && <h3 className="text-neutral-700 font-medium text-base w-full capitalize">{ques?.statement}</h3>}
          <section className="mb-5 w-full relative mt-1">
            <div className="relative w-full" style={{ zIndex: 101 }}>
              <Selector disabled={false} defaultValue={{ label: currentValue, value: currentValue }} options={options}
                onChange={(v: any) => {
                  let opt = ques?.options?.find((op: any) => op.statement === v.value);
                  dispatch(saveDealSelection({ option: opt, question: ques, fields: dealData, lang: event, secIndex, step: dealData[step - 1] }))
                }}
              />
            </div>
          </section>
        </section>
      );
    } else return <React.Fragment></React.Fragment>
  }

  const termUI = (ques: any, secIndex: number) => {
    return (
      <section className="flex items-start justify-center flex-col mt-2 w-full">
        <section className="mb-5 w-full relative mt-1">
          <div dangerouslySetInnerHTML={{ __html: ques?.description }}></div>
        </section>

        <section className="w-full inline-flex items-center gap-2 rounded-md border border-grey w-[450px] p-4 check-background cursor-pointer" onClick={() => dispatch(saveDealSelection({ option: !ques?.value, question: ques, fields: dealData, lang: event, secIndex, step: dealData[step - 1] }))}>
          <input type="checkbox" className="accent-cyan-800 h-3 w-3 cursor-pointer" checked={ques?.value} />
          <small className="text-neutral-700 text-lg font-medium">{ques?.statement}</small>
        </section>
      </section>
    );
  }

  const switchInput = (ques: any, secIndex: number, section: any) => {
    return (
      <section className="flex items-start justify-center flex-col mt-3 w-full">
        <div className="mb-3 inline-flex w-full items-center justify-between">
          <small className="text-neutral-700 text-lg font-medium mb-1">{ques?.statement}</small>
          <label className="relative inline-flex items-center cursor-pointer" onChange={(e) => {
            dispatch(saveDealSelection({ option: !ques?.value, question: ques, fields: dealData, lang: event, secIndex, step: dealData[step - 1] }))
            let dependantQuesions: any[] = section?.fields?.filter((field: any) => field.dependent_id === ques?.id);
            if (dependantQuesions.length && !ques?.value) {
              dependantQuesions.forEach(dep => {
                dispatch(saveDealSelection({ option: "", question: dep, fields: dealData, lang: event, secIndex, step: dealData[step - 1] }))
              })
            }
          }}>
            <input type="checkbox" value="" className="sr-only peer" checked={ques?.value} />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-800"></div>
          </label>
        </div>
      </section>
    );
  };

  const textAreaInput = (ques: any, secIndex: number, section: any) => {
    let dependantQuesion = section?.fields?.find((field: any) => field.id === ques?.dependent_id);

    if ((!dependantQuesion || (dependantQuesion && (dependantQuesion?.field_type === Constants.TEXT_FIELD || dependantQuesion?.value)))) {
      return (
        <section className="flex items-start justify-center flex-col mt-3 w-full">
          <div className="mb-6 inline-flex flex-col w-full items-start justify-between">
            {(!dependantQuesion || (dependantQuesion && dependantQuesion?.field_type === Constants.TEXT_FIELD)) && <label htmlFor={ques?.id} className="text-neutral-700 text-lg font-medium mb-1">{ques?.statement}</label>}
            <textarea value={ques?.value} placeholder={ques?.statement} className="h-[100px] mt-2 resize-none shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id={ques?.id} onInput={(e: any) => dispatch(saveDealSelection({ option: e.target.value, question: ques, fields: dealData, lang: event, secIndex, step: dealData[step - 1] }))}></textarea>
          </div>
        </section>
      );
    } else {
      return <React.Fragment></React.Fragment>
    }
  };

  const textFieldInput = (ques: any, secIndex: number, section: any) => {
    let dependantQuesion = section?.fields?.find((field: any) => field.id === ques?.dependent_id);

    if (!dependantQuesion || (dependantQuesion && dependantQuesion?.value)) {
      return (
        <section className="flex items-start justify-center flex-col mb-8 mt-3 w-full">
          {!dependantQuesion && <label htmlFor={ques?.id} className="text-neutral-700 text-lg font-medium mb-1">{ques?.statement}</label>}
          <input title={ques?.statement} className="h-[42px] pr-10 shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight transition-all bg-white w-full focus:outline-none" placeholder={ques?.statement} id={ques?.id} onChange={(e: any) => dispatch(saveDealSelection({ option: e.target.value, question: ques, fields: dealData, lang: event, secIndex, step: dealData[step - 1] }))} value={ques?.value} />
        </section>
      );
    } else return <React.Fragment></React.Fragment>
  };

  const URLInput = (ques: any, secIndex: number, section: any) => {
    return (
      <section className="flex items-start justify-center flex-col mb-1 mt-3 w-full">
        <div className="relative inline-flex w-full mb-3">
          <input type="disabled" value={"https://"}
            className={`text-neutral-500 text-base font-normal border-t border-b border-neutral-300 h-[42px] w-[70px] ${orientation === "rtl"
              ? "border-r rounded-br-md rounded-tr-md pr-2"
              : "border-l rounded-bl-md rounded-tl-md pl-2"
              }`}
          />
          <input placeholder="www.example.com" value={ques?.value}
            className={`h-[42px] shadow-sm appearance-none border border-neutral-300 w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline ${orientation === "rtl"
              ? " rounded-bl-md rounded-tl-md"
              : " rounded-br-md rounded-tr-md"
              }`} type="text" id={ques?.id} onChange={(e: any) => dispatch(saveDealSelection({ option: e.target.value, question: ques, fields: dealData, lang: event, secIndex, step: dealData[step - 1] }))}
          />
        </div>
      </section>
    );
  };

  const renderQuestionType = (ques: any, secIndex: number, section: any) => {
    if (restrictions?.some((res: any) => res.dependent_id === ques?.id && res?.operation !== "show") && restrictions.length > 0) return "";
    else {
      if (ques?.field_type === Constants.MULTIPLE_CHOICE) return multipleChoice(ques, secIndex, section);
      else if (ques?.field_type === Constants.NUMBER_INPUT) return numberInput(ques, secIndex, section);
      else if (ques?.field_type === Constants.FILE) return attachments(ques, secIndex, section)
      else if (ques?.field_type === Constants.DROPDOWN) return dropdowns(ques, secIndex, section)
      else if (ques?.field_type === Constants.SWITCH) return switchInput(ques, secIndex, section)
      else if (ques?.field_type === Constants.TEXT_BOX) return textAreaInput(ques, secIndex, section)
      else if (ques?.field_type === Constants.TEXT_FIELD) return textFieldInput(ques, secIndex, section)
      else if (ques?.field_type === Constants.URL) return URLInput(ques, secIndex, section)
      else if (ques?.field_type === Constants.CHECK_BOX) return termUI(ques, secIndex)
      else return <ReviewDeal language={language} dealId={dataHolder} metadata={metadata} authToken={authToken} navigate={navigate} showDeal={step === totalSteps?.all.length} />
    }
  };

  const checkValidation = () => {
    if (!dealData || !dealData[step - 1] || !dealData[step - 1][event]?.sections.length) return true;
    let flags: any[] = []

    dealData[step - 1][event]?.sections.forEach((sec: any, index: number) => {
      flags.push({ section: sec.id, validations: [] });
      let fields = sec.fields;
      fields.forEach((ques: any) => {
        if (ques?.field_type === Constants.SWITCH) {
          let flag = false;
          if (ques?.is_required && ques?.value) flag = true;
          else if (!ques?.is_required) flag = true;
          flags[index].validations.push(flag);
        }
        else if (ques?.field_type === Constants.MULTIPLE_CHOICE || ques?.field_type === Constants.DROPDOWN) {
          let dependantQuesion = sec?.fields?.find((field: any) => field.id === ques?.dependent_id);
          let flag = false;
          let isSome = ques.options?.some((opt: any) => opt.selected);
          if ((!dependantQuesion && isSome) || (dependantQuesion && dependantQuesion?.value && isSome) || (dependantQuesion && !dependantQuesion.value))
            flag = true;
          else flag = false;
          flags[index].validations.push(flag);
        }
        else if (ques?.field_type === Constants.FILE) {
          let flag = (ques.value?.url || ques.value?.id) ? true : false;
          flags[index].validations.push(flag);
        }
        else if (ques?.field_type === Constants.NUMBER_INPUT || ques.field_type === Constants.TEXT_BOX || ques.field_type === Constants.TEXT_FIELD || ques.field_type === Constants.URL) {
          let dependantQuesion = sec?.fields?.find((field: any) => field.id === ques?.dependent_id);
          let flag = false;
          if ((!dependantQuesion && ques.value) || (dependantQuesion && dependantQuesion?.value && ques.value) || (dependantQuesion && !dependantQuesion.value)) {
            flag = true;
          }
          else flag = false;
          flags[index].validations.push(flag);
        }
        else if (ques.field_type === Constants.SWITCH) {
          flags[index].validations.push(ques.value);
        }
        else if (ques.field_type === Constants.CHECK_BOX) {
          flags[index].validations.push(ques.value);
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
      if (multipleFieldsPayload?.length > 0) isValid = true;
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
    <main className="h-full max-h-full overflow-y-auto overflow-x-hidden bg-cbc-auth">
      <section>
        <Header
          custom={true}
          data={{ leftMenu: language?.v3?.deal?.create_deal, button: (<button onClick={() => navigate(`/${metadata.role}`)}> <CrossIcon stroke="#171717" className="w-6 h-6" /></button>) }}
        />
      </section>

      <aside className="w-full pt-14 px-12">
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
                  <ReviewDeal language={language} navigate={navigate} dealId={dataHolder} metadata={metadata} authToken={authToken} showDeal={step === totalSteps?.all.length} />
                ) : (
                  React.Children.toArray(
                    dealData[step - 1][event]?.sections.map((section: any, index: number) => {
                      return (
                        (section.is_multiple || section?.display_card) ? (
                          <React.Fragment>
                            <h3 className="w-[450px] screen500:w-[350px] text-neutral-700 font-bold text-2xl mb-10">
                              {section?.title}
                            </h3>
                            {/* For Custom Cards */}
                            {(multipleFieldsPayload && multipleFieldsPayload?.length > 0 && section?.display_card) && (
                              React.Children.toArray(
                                multipleFieldsPayload?.map((sec: any) => {
                                  return (
                                    <section className="bg-white border-[1px] border-neutral-300 rounded-md px-5 py-3 w-[450px] mb-6">
                                      <div className="w-full inline-flex justify-end cursor-pointer" onClick={() => {
                                        setMultipleFieldsPayload((prev: any) => {
                                          const secs = prev.filter((pv: any) => pv.id !== sec.id);
                                          return secs;
                                        });
                                        setDeleted((prev: any) => {
                                          return [...prev, { ...sec, deleted: true }];
                                        })
                                      }}><BinIcon stroke="#171717" /></div>
                                      {sec?.fields && (
                                        <React.Fragment>
                                          <div className="font-bold text-neutral-900 text-sm text-center mb-2">{sec?.fields[0]?.value}</div>
                                          <small className="text-neutral-700 font-normal text-sm text-center block w-full">{sec.fields[1]?.value}</small>
                                        </React.Fragment>
                                      )}
                                    </section>
                                  )
                                })
                              )
                            )}

                            {/* For non custom cards */}
                            {showCustomBox && (
                              <section className={`flex items-start flex-col mb-8 w-[450px] screen500:w-[350px] ${(index % 2 != 0 || section?.is_multiple) && "bg-cbc-check p-4 rounded-md"}`}>
                                {section?.fields?.length > 0 && (React.Children.toArray(section?.fields?.map((ques: any) => renderQuestionType(ques, index, section))))}

                                {section?.display_card && (
                                  <div className="w-full inline-flex justify-center items-center gap-2">
                                    <Button className="w-[100px] border-2 border-cyan-800" onClick={() => setShowCustomBox(false)}>{language?.v3?.button?.cancel}</Button>
                                    <Button disabled={checkCurrentBoxStatus(section?.fields)} className="w-[100px] bg-transparent border-2 border-cyan-800 !text-cyan-800 hover:!text-white"
                                      onClick={() => {
                                        setShowCustomBox(false);
                                        setMultipleFieldsPayload((prev: any) => {
                                          if (prev.length === 0) return [{ id: 1, fields: [{ ques: section?.fields[0].id, value: section?.fields[0].value }, { ques: section?.fields[1].id, value: section?.fields[1].value }] }]
                                          else return [...prev, { id: prev?.at(-1).id + 1, fields: [{ ques: section?.fields[0].id, value: section?.fields[0].value }, { ques: section?.fields[1].id, value: section?.fields[1].value }] }]
                                        });
                                        dispatch(onResetFields({ secIndex: section?.index, lang: event, step: dealData[step - 1] }))
                                      }}>{language?.v3?.button?.add}</Button>
                                  </div>
                                )}
                              </section>
                            )}
                            {(multipleFieldsPayload && multipleFieldsPayload?.length > 0 && section?.is_multiple && !section?.display_card) && (
                              <section className={`flex items-start flex-col mb-8 w-[450px] screen500:w-[350px] bg-cbc-check p-4 rounded-md -mt-16`}>
                                {
                                  React.Children.toArray(
                                    multipleFieldsPayload?.map((mp: any) => {
                                      return (
                                        <section className="flex items-start justify-center flex-col mb-1 mt-3 w-[415px]">
                                          <div className="relative inline-flex w-full mb-3">
                                            <p placeholder="www.example.com"
                                              className={`h-[42px] rounded-md shadow-sm appearance-none border border-neutral-300 w-full py-2 px-3 bg-white text-blue-500 leading-tight focus:outline-none focus:shadow-outline inline-flex justify-between items-center`}>
                                              <small className="text-sm;">{mp?.value}</small>
                                              <BinIcon stroke="#171717" className="cursor-pointer w-6 h-6" onClick={() => {
                                                setMultipleFieldsPayload((prev: any) => {
                                                  let fields = prev.filter((f: any) => f.value !== mp.value);
                                                  return [...fields];
                                                });
                                                setDeleted((prev: any) => {
                                                  return [...prev, { ...mp, deleted: true }]
                                                })
                                              }} />
                                            </p>
                                          </div>
                                        </section>
                                      )
                                    })
                                  )
                                }
                              </section>
                            )}
                            {(section?.add_more_label) && (
                              <section className="w-[450px]">
                                <Button disabled={checkMultipleButtonDisabled(section)} onClick={() => {
                                  if (!section?.display_card) {
                                    const element = dealData[step - 1][event]?.sections[index]?.fields?.at(-1);
                                    if (!multipleFieldsPayload?.some((elem: string) => elem === element))
                                      setMultipleFieldsPayload((prev: any) => { return [...prev, element] });
                                    dispatch(saveDealSelection({ option: "", question: section?.fields[0], fields: dealData, lang: event, secIndex: index, step: dealData[step - 1] }))
                                  }
                                  else dispatch(onResetFields({ secIndex: section?.index, lang: event, step: dealData[step - 1] }));
                                  section?.display_card && setShowCustomBox(true);
                                }}
                                  className="w-full bg-white border-2 border-cyan-800 !text-cyan-800 hover:!text-white">{section?.add_more_label}</Button>
                              </section>
                            )}
                          </React.Fragment>
                        ) : (
                          <section className={`flex items-start flex-col mb-8 w-[450px] screen500:w-[350px] ${(index % 2 != 0 || section?.is_multiple) && "bg-cbc-check p-4 rounded-md"}`}>
                            <h3 className="text-neutral-700 font-bold text-2xl w-full mb-6">{section?.title}</h3>
                            {section?.fields?.length > 0 ? (React.Children.toArray(section?.fields?.map((ques: any) => renderQuestionType(ques, index, section)))) : <ReviewDeal language={language} dealId={dataHolder} metadata={metadata} authToken={authToken} navigate={navigate} showDeal={step === totalSteps?.all.length} />}
                          </section>
                        )
                      )
                    })
                  )
                )}
                <section className="flex items-start justify-center w-full flex-col mt-6 pb-10 max-w-[450px] screen500:w-[350px]">
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

        <Modal show={modalOpen} className={"w-[500px] screen1024:w-[300px]"}>
          {modalOpen?.type ? (
            <React.Fragment>
              <div className="rounded-md h-8 w-8 inline-grid place-items-center cursor-pointer absolute right-2 top-2" style={{ backgroundColor: "rgba(0, 0, 0, 0.078" }}>
                <CrossIcon stroke="#fff" className="w-6 h-6" onClick={() => setModalOpen(null)} />
              </div>
              {modalOpen?.type === FileType.IMAGE ? (
                <img src={modalOpen?.url} alt="Img" className="max-h-[100%]" />
              ) : (
                <embed src={modalOpen?.url} type="application/pdf" className="w-[100%] h-[90%]" />
              )}
            </React.Fragment>
          ) : (
            <div className="relative p-12 rounded-md shadow-cs-1 flex flex-col items-center w-full bg-white outline-none focus:outline-none screen800:px-3">
              <div className="rounded-md h-8 w-8 inline-grid place-items-center cursor-pointer absolute right-2 top-2">
                <CrossIcon stroke="#171717" className="w-6 h-6" onClick={() => {
                  setModalOpen(false);
                  navigate(`/${metadata?.role?.toLowerCase()}`);
                }} />
              </div>

              <aside>
                <h2 className="font-bold text-xl text-center text-neutral-900">{language?.v3?.deal?.submitted_deal}</h2>
                <p className="text-sm font-normal text-center text-neutral-500 mt-4 mb-4">{language?.v3?.deal?.deal_status}: <strong>{language?.common?.submitted}</strong></p>
              </aside>
            </div>
          )}
        </Modal>

        <Drawer isOpen={open} setIsOpen={(val: boolean) => setOpen(val)}>
          <header className="font-bold text-xl">
            <h2>{language?.v2?.risk?.sub_head_1}</h2>
            <h4 className="text-sm my-3">{language?.v2?.risk?.sub_head_2}</h4>
          </header>
          <p className="text-neutral-700 font-normal text-sm text-justify">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias tempore libero odio eius, eum blanditiis quod nulla voluptate inventore reiciendis dolores aperiam? Esse sed blanditiis qui a error officia necessitatibus dolor eius quam magni, atque recusandae, consequatur beatae, maiores odit. Laborum dicta animi maxime provident quidem assumenda praesentium nihil temporibus?
          </p>
        </Drawer>
      </aside>
    </main>
  )
};
export default CreateDeal;
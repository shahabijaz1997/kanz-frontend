import React, { useState, useLayoutEffect, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import { useNavigate } from "react-router-dom";
import Header from "../../../shared/components/Header";
import UserIcon from "../../../ts-icons/userIcon.svg";
import EditIcon from "../../../ts-icons/editIcon.svg";
import MoneyIcon from "../../../ts-icons/moneyIcon.svg";
import GoalStepper from "./GoalStepper";
import { getInvestor } from "../../../apis/investor.api";
import { toast } from "react-toastify";
import { toastUtil } from "../../../utils/toast.utils";
import Spinner from "../../../shared/components/Spinner";
import { saveToken } from "../../../redux-toolkit/slicer/auth.slicer";
import AddAttachmentBanner from "../../../shared/components/AddAttachmentBanner";
import { ApplicationStatus } from "../../../enums/types.enum";
import Button from "../../../shared/components/Button";
import { KanzRoles } from "../../../enums/roles.enum";
import { RoutesEnums } from "../../../enums/routes.enum";
import { FinancialModal } from "../../../shared/types/definations";
import { saveUserMetaData } from "../../../redux-toolkit/slicer/metadata.slicer";

const CompleteGoals = ({ }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user: any = useSelector((state: RootState) => state.user.value);
  const metadata: any = useSelector((state: RootState) => state.metadata.value);
  const language: any = useSelector((state: RootState) => state.language.value);
  const event: any = useSelector((state: RootState) => state.event.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);

  const [selectedAccreditation, setSelectedAccreditation] = useState<FinancialModal | null>();
  const [loading, setLoading] = useState(false);
  const [currentStepper, setCurrentStepper]: any = useState();

  useLayoutEffect(() => {
    if ((user.status !== ApplicationStatus.OPENED && user.status !== ApplicationStatus.REOPENED) || user.type !== KanzRoles.INVESTOR) navigate(RoutesEnums.WELCOME);
    setCurrentStepper(metadata?.steps_completed);
  }, []);

  useLayoutEffect(() => {
    getInvestorDetails();
  }, []);

  const getInvestorDetails = async () => {
    try {
      setLoading(true);
      let { status, data } = await getInvestor(authToken);
      if (status === 200) {
        dispatch(saveUserMetaData(data?.status?.data));
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.status?.message ||
        error?.response?.data ||
        language.promptMessages.errorGeneral;
      toast.error(message, toastUtil);
      if (error.response && error.response.status === 401) {
        dispatch(saveToken(""));
        navigate(RoutesEnums.LOGIN, { state: "complete-goals" });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    if(metadata.profile){
     const _selectedAccreditation  = metadata.profile[event].accreditation.options.find((option:any)=>option.selected);
     setSelectedAccreditation(_selectedAccreditation);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[metadata.profile])

  return (
    <main className="h-full max-h-full cbc-auth overflow-y-auto overflow-x-hidden">
      <section>
        <Header />
      </section>
      {loading && (
        <div
          className="absolute left-0 top-0 w-full h-full grid place-items-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.078)" }}
        >
          <Spinner />
        </div>
      )}

      <AddAttachmentBanner language={language} navigate={navigate} currentStepper={currentStepper} />

      <aside className="w-full flex items-center justify-center flex-col pt-[75px]">
        <section className="flex items-start justify-center flex-col w-[800px] screen991:w-[90%]">
          <aside className="cursor-pointer rounded-xl p-6 mb-12 shadow-cs-1 w-full">
            <section className="w-full flex items-start">
              <div className="rounded-full check-background w-9 h-9 inline-grid place-items-center p-2">
                <UserIcon stroke="#171717" />
              </div>
              <div className="center w-[80%] mx-5">
                <h3 className="text-neutral-900 text-lg font-semibold">
                  {event === "en" ? metadata?.role : metadata?.role_ar}
                </h3>
                <p className="text-neutral-700 text-sm font-normal mt-1">
                  {metadata?.role === "Investment Firm" && (
                    <React.Fragment>
                      <div>
                        <small className="text-neutral-700 text-sm font-medium">{language?.company?.legal}:</small>&nbsp;
                        <span className="text-neutral-700 text-sm font-normal">{metadata?.profile[event]?.legal_name}</span>
                      </div>
                      <div>
                        <small className="text-neutral-700 text-sm font-medium">{language?.common?.location}:</small>&nbsp;
                        <span className="text-neutral-700 text-sm font-normal">{metadata?.profile[event]?.location}</span>
                      </div>
                    </React.Fragment>
                  )}
                  {metadata?.role !== "Investment Firm" && (
                    <React.Fragment>
                      <div>
                        <small className="text-neutral-700 text-sm font-medium">{language?.common?.residence}:</small> &nbsp;
                        <span className="text-neutral-700 text-sm font-normal">{metadata?.profile[event]?.residence}</span>
                      </div>
                      <div>
                        <small className="text-neutral-700 text-sm font-medium">{language?.drawer?.country}:</small>&nbsp;
                        <span className="text-neutral-700 text-sm font-normal">{metadata?.profile[event]?.nationality}</span>
                      </div>
                    </React.Fragment>

                  )}
                </p>
              </div>
              <Button className="w-[100px] h-9" htmlType="submit" onClick={() => navigate(RoutesEnums.COMPLETE_DETAILS, { state: metadata?.role })} >
                <EditIcon stroke="#fff" />
                <small className="font-normal text-base">
                  {language.buttons.edit}
                </small>
              </Button>
            </section>
            <section className="border border-cyan-800 w-[320px] h-[100px] rounded-md p-6 inline-flex items-center gap-4 mt-5 ml-11 screen800:ml-0 screen800:w-[220px] screen800:h-[80px] screen800:p-4">
              <div className="rounded-md bg-cyan-800 inline-grid place-items-center w-12 h-12 screen800:w-8 screen800:h-8">
                <MoneyIcon stroke="#fff" />
              </div>
              <div>
                <small className="text-neutral-500 text-sm font-medium">
                  {language.common.accredited}
                </small>
                <div>
                  <small className="text-neutral-900 text-2xl font-semibold screen800:text-sm">
                    {selectedAccreditation?.currency}&nbsp;{selectedAccreditation?.lower_limit}{" "}
                    {selectedAccreditation?.lower_limit !== selectedAccreditation?.upper_limit && " - " + selectedAccreditation?.upper_limit}
                  </small>
                  &nbsp;
                  <small className="text-green-600 text-sm font-semibold">
                    {selectedAccreditation?.unit}
                  </small>
                </div>
              </div>
            </section>
          </aside>
          <GoalStepper language={language} currentStepper={currentStepper} navigate={() => {
            if (metadata?.profile_states?.questionnaire_steps_completed === 5) navigate(`${RoutesEnums.ADD_ATTACHMENTS}`);
            else navigate(`${RoutesEnums.PHILOSOPHY_GOALS}/${metadata?.profile_states?.questionnaire_steps_completed + 1}`);
          }}
          />
        </section>
      </aside>
    </main>
  );
};
export default CompleteGoals;

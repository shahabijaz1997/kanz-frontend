import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../../redux-toolkit/store/store";
import Header from "../../../../shared/components/Header";
import Spinner from "../../../../shared/components/Spinner";
import Button from "../../../../shared/components/Button";
import SyndicateMonthlyDealsGraph from "../SyndicateInfoDrawer/SyndicateMonthlyDealsGraph";
import Selector from "../../../../shared/components/Selector";
import { toast } from "react-toastify";
import { postFollowSyndicate } from "../../../../apis/investor.api";
import { toastUtil } from "../../../../utils/toast.utils";
import { comaFormattedNumber } from "../../../../utils/object.utils";
import { DealCheckType, InviteStatus, MemberInviteType } from "../../../../enums/types.enum";
import { putAcceptInvite } from "../../../../apis/syndicate.api";
import { convertStatusLanguage } from "../../../../utils/string.utils";

const SyndicateFullView = ({}: any) => {
  const params = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const language: any = useSelector((state: RootState) => state.language.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const orientation: any = useSelector(
    (state: RootState) => state.orientation.value
  );
  const [selectedDiscovery, setSelectedDiscovery]: any = useState(null);
  const [buttonDisableTemp, setButtonDisableTemp] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hideButton, setHideButton] = useState(false);
  const [changes, setChanges]: any = useState({
    comment: "",
    action: "",
    document: null,
  });
  const getButtonStatus = () => {
    if (hideButton || state?.invite) return language?.v3?.investor?.applied;
    else return language?.v3?.investor?.apply_to_syndicate;
  };
  const getAcceptButtonStatus = () => {
    if (hideButton) return language?.v3?.investor?.accepted;
    else return language?.v3?.investor?.accept;
  };


  const [enableButton, setEnableButton] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnableButton(event.target.checked);
  };
  const removeSpinning = () => {
    setTimeout(() => {
      setButtonDisableTemp(false);
    }, 1000);
  };

  const onFollow = async (syndId: any) => {
    setButtonDisableTemp(true);
    setHideButton(true);
    try {
      const { status } = await postFollowSyndicate(
        {
          invite: {
            discovery_method: selectedDiscovery,
            message: changes.comment,
            invitee_id: syndId,
          },
        },
        syndId,
        authToken
      );
      if (status === 200) {
        toast.success(language?.v3?.investor?.applied, toastUtil);
      }
      removeSpinning();
    } catch (error: any) {
      removeSpinning();
      if (error?.response?.status === 400)
        toast.warning(error?.response?.data?.status?.message, toastUtil);
    } finally {
      handleToggle();
    }
  };
  const acceptInvite = async (inviteID: any) => {
    setButtonDisableTemp(true);
    try {
      const { status } = await putAcceptInvite(inviteID, authToken);
      if (status === 200) {
        setHideButton(true);
        toast.success(language?.v3?.investor?.invite_accepted, toastUtil);
      }
      removeSpinning();
    } catch (error: any) {
      removeSpinning();
      if (error?.response?.status === 400)
        toast.warning(error?.response?.data?.status?.message, toastUtil);
    } finally {
    }
  };
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSelectChange = (selectedOption: any) => {
    setSelectedDiscovery(selectedOption?.value);
  };

  const abbreviatedMonths = state?.portfolio_stats?.labels.map(
    (month: string) => month.charAt(0)
  );

  const options = [
    { label: language?.v3?.investor?.news, value: "news" },
    { label: language?.v3?.investor?.social_media, value: "social_media" },
    { label: language?.v3?.investor?.website, value: "website" },
    { label: language?.v3?.investor?.other, value: "other" },
  ];

  const [loading, setLoading]: any = useState(false);
  return (
    <main className="h-full max-h-full overflow-y-hidden">
      <section>
        <Header />
      </section>
      <aside className="w-full h-full flex items-start justify-start">
        {loading ? (
          <div
            className="absolute left-0 top-0 w-full h-full grid place-items-center"
            style={{ backgroundColor: "rgba(255, 255, 255, 1)", zIndex: 50 }}
          >
            <Spinner />
          </div>
        ) : (
          <section className="bg-cbc-auth w-full h-full p-[5rem] flex items-start justify-center overflow-y-auto">
            <aside className="w-full">
              <div>
                <div className="flex-col items-center p-4 justify-center">
                  <span className="flex items-center justify-center">
                    <img
                      className=" h-[88px] w-[88px] mr-2.5 shadow-md rounded-full"
                      src={state?.logo}
                    ></img>
                  </span>
                  <span className="items-center justify-center flex mt-2 text-2xl font-medium">
                    {state?.name}
                  </span>
                  <span className=" mt-2 flex items-center justify-center font-normal text-base text-[#404040]">
                    {state?.profile?.tagline}
                  </span>
                </div>
              </div>
              <aside className="flex items-center justify-center w-[100%] px-16 pt-5">
                <div className="flex flex-wrap justify-center gap-2 items-center w-2/3">
                  {state?.profile?.industries?.map((topic: any, index: any) => (
                    <div
                      key={index}
                      className=" bg-[#F2F2F2] p-2 text-xs text-[#202223] rounded-lg"
                    >
                      {topic}
                    </div>
                  ))}
                </div>
              </aside>
              <div className="mt-5">
                <span className=" flex items-center justify-center gap-5">
                  <Button
                    onClick={() => {
                      navigate(-1);
                    }}
                    className="!w-[164px] !text-black !border-[black]"
                    type="outlined"
                  >
                    {language?.v3?.investor?.back_syndicate}
                  </Button>
                  {convertStatusLanguage(state?.invite?.invite_type) === MemberInviteType.INVITE_RECEIVED &&
                    state?.invite?.status === "pending" && (
                      <span className="items-center">
                        <Button
                          type={hideButton ? "outlined" : "primary"}
                          disabled={hideButton}
                          centeredSpinner
                          className={`!min-w-[100px]`}
                          onClick={() => {
                            acceptInvite(state?.invite?.id);
                          }}
                        >
                          {getAcceptButtonStatus()}
                        </Button>
                      </span>
                    )}
                  {state?.invite === null && (
                    <span className="items-center">
                      <Button
                        disabled={hideButton}
                        type={
                          hideButton || state?.invite ? "outlined" : "primary"
                        }
                        centeredSpinner
                        className={`!min-w-[100px] ${
                          state?.is_invited &&
                          `!cursor-not-allowed 'hover:border-none`
                        }`}
                        onClick={() => {
                          if (state?.is_invited) {
                            return;
                          } else {
                            handleToggle();
                          }
                        }}
                      >
                        {getButtonStatus()}
                      </Button>
                    </span>
                  )}
                </span>
              </div>
              <section className="flex items-center justify-center mt-5">
                <aside
                  className={`w-[50%] your-container overflow-hidden bg-[#F2F2F2] rounded-md mt-3 ${
                    isExpanded ? "expanded" : ""
                  }`}
                >
                  <div className="p-5">
                    <div className=" pt-3 font-bold">
                      {language?.v3?.investor?.apply_to_syndicate}
                    </div>
                    <div className="mt-5">
                      <div className=" font-medium text-sm">
                        {language?.v3?.investor?.how_did_you_discover_this_syndicate}
                      </div>
                      <div className="mt-1">
                        <Selector
                          options={options}
                          isSearchable={true}
                          placeholder=""
                          onChange={handleSelectChange}
                        />
                      </div>
                    </div>
                    <div className="mt-5">
                      <span className="mt-5 font-medium text-sm">
                        {language?.v3?.investor?.personal_note_for}
                      </span>
                      <p className="text-sm text-[#737373]">
                        {language?.v3?.investor?.briefly_introduce_yourself}
                      </p>
                      <textarea
                        value={changes?.comment}
                        onChange={(e) =>
                          setChanges((prev: any) => {
                            return { ...prev, comment: e.target.value };
                          })
                        }
                        className="w-full mt-1 border-[1px] border-[#D4D4D4] min-h-[110px] max-h-[220px] p-1.5 text-sm"
                      ></textarea>
                    </div>
                    <div className="mt-5 flex">
                      <input
                        type="checkbox"
                        className="accent-cyan-800 h-3 w-3 mt-1.5 cursor-pointer"
                        onChange={handleCheckboxChange}
                      />
                      <small className="mx-3">
                        <span className="flex items-center font-medium mt-0.5">
                          {language?.v3?.investor?.disclaimer_1}
                        </span>
                        <p className="text-sm text-[#737373]">
                          {language?.v3?.investor?.description_about_disclaimer}
                        </p>
                      </small>
                    </div>
                    <aside className="flex items-center justify-end mt-5">
                      <span className=" flex items-center justify-center gap-5">
                        <Button
                          disabled={hideButton}
                          onClick={() => {
                            setChanges({
                              comment: "",
                              action: "",
                              document: null,
                            });
                            handleToggle();
                          }}
                          className="!w-[140px] !text-black !border-[black]"
                          type="outlined"
                        >
                          {language?.v3?.investor?.cancel}
                        </Button>
                        <Button
                          centeredSpinner
                          className=""
                          onClick={() => {
                            onFollow(state?.id);
                            setChanges({
                              comment: "",
                              action: "",
                              document: null,
                            });
                          }}
                          loading={buttonDisableTemp}
                          disabled={!enableButton || hideButton}
                        >
                          {language?.v3?.investor?.submit_application}
                        </Button>
                      </span>
                    </aside>
                  </div>
                </aside>
              </section>

              <aside className="mt-8 justify-center flex">
                <aside className="flex justify-center items-center text-sm w-[80%]">
                  <div
                    className={`w-4/12 border-[1px] border-[#E4E7EC] rounded-lg shadow-md px-8 mb-4 py-8 mx-6 bg-white`}
                  >
                    <div>
                      <span className="font-medium text-base">
                        {language?.v3?.fundraiser?.total_raised_amount}
                      </span>
                    </div>
                    <div className="mt-2 font-semibold text-2xl">
                      {comaFormattedNumber(
                        state?.portfolio_stats?.total_raised,
                        DealCheckType.STARTUP,
                        false
                      )}
                    </div>
                  </div>
                  <div
                    className={`w-4/12 border-[1px] border-[#E4E7EC] rounded-lg shadow-md px-8 mb-4 py-8 mx-6 bg-white`}
                  >
                    <div>
                      <span className="font-medium text-base">
                        {language?.v3?.fundraiser?.active_deals}
                      </span>
                    </div>
                    <div className="mt-2 font-semibold text-2xl">
                      {state?.portfolio_stats?.active_deals_count}
                    </div>
                  </div>
                </aside>
              </aside>
              <aside className="mt-8 justify-center flex">
                <div className="flex-col justify-center items-center w-[100%]">
                  <div className="flex items-center justify-center">
                    <div className="font-medium text-2xl">
                      {`${
                        state?.portfolio_stats?.total_deals_closed_in_12_months
                      } ${language?.v3?.investor?.last_12_months}`}
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className=" mt-0.5 font-medium text-[#737373]">
                      {language?.v3?.fundraiser?.syndicate_deals}
                    </div>
                  </div>
                  <aside className="flex justify-center items-center text-sm w-full">
                    <div className="items-center flex justify-center w-[60%]">
                      <SyndicateMonthlyDealsGraph
                        months={state?.portfolio_stats?.labels}
                        values={state?.portfolio_stats?.values}
                      />
                    </div>
                  </aside>
                </div>
              </aside>
              {state?.about && (
                <section className="w-full flex items-center justify-center mx-8">
                  <aside className="mt-4 w-[67%] justify-center flex-col items-center">
                    <div className=" pr-2 flex items-center">
                      <span className="font-medium text-2xl mb-2">
                        {language?.v3?.investor?.about}
                      </span>
                    </div>
                    <div className=" text-start whitespace-pre-wrap text-sm">
                      <p>{state?.about}</p>
                    </div>
                  </aside>
                </section>
              )}
              <div className="font-medium text-2xl mt-14 flex items-center justify-center">
              {language?.v3?.investor?.investments}
              </div>
              <div className="mt-4 flex items-center justify-center">
                <div
                  className="flex-wrap items-center justify-center max-w-[50%]"
                  style={{ display: "flex" }}
                >
                  {state?.investments.map((item: any, index: any) => {
                    const initials = item.name.slice(0, 2);
                    return (
                      <div
                        key={index}
                        className="flex-col items-center p-4 justify-center"
                      >
                        <span className="flex items-center justify-center shadow-md p-3 rounded-md border-[1px] border-[#E4E7EC]">
                          {item?.profile_pic ? (
                            <img
                              className="h-[88px] w-[88px] shadow-md rounded-md flex items-center justify-center"
                              src={item?.profile_pic}
                              alt={`Logo ${index}`}
                            />
                          ) : (
                            <div
                              className="h-[88px] w-[88px] shadow-md rounded-md flex items-center justify-center"
                              style={{ backgroundColor: "#155E75" }}
                            >
                              <span className="text-white font-bold text-2xl">
                                {initials}
                              </span>
                            </div>
                          )}
                        </span>
                        <span className="items-center justify-center flex mt-3 text-base font-medium">
                          {item.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <div className="font-medium text-2xl mt-5 flex items-center justify-center">
                  {language?.v3?.investor?.teams}
                </div>
                <div className="flex-col items-center p-4 justify-center">
                  <span className="flex items-center justify-center">
                  {state.lead?.profile_pic ? (
                          <img
                            className="w-full h-full shadow-md rounded-full flex items-center justify-center"
                            src={state?.lead.profile_pic}
                          />
                        ) : (
                          <div
                          className="h-[88px] w-[88px] shadow-md rounded-md flex items-center justify-center"
                          style={{ backgroundColor: "#155E75" }}
                        >
                          <span className="text-white font-bold text-2xl">
                          {state?.lead.name.substr(0, 2)}
                          </span>
                        </div>
                        )}
                  </span>
                  <span className="items-center justify-center flex mt-3 text-base font-medium">
                    {`${state?.lead?.name}(${language?.v3?.investor?.lead})` }
                  </span>
                </div>
              </div>
              
              <div className="font-medium text-2xl mt-14 flex items-center justify-center">
              {language?.v3?.investor?.lp}
              </div>
              {state?.limited_partners?.length > 0 ? ( <div className="mt-4 flex items-center justify-center mb-10">
                <div
                  className="flex-wrap items-center justify-center max-w-[45%]"
                  style={{ display: "flex" }}
                >
                  {state?.limited_partners.map((item: any, index: any) => (
                    <div
                      key={index}
                      className="flex-col items-center p-4 justify-center"
                    >
                      <span className="h-[100px] w-[100px] shadow-sm rounded-full flex items-center justify-center">
                        {item.profile_pic ? (
                          <img
                            className="w-full h-full shadow-md rounded-full flex items-center justify-center"
                            src={item.profile_pic}
                            alt={`Logo ${index}`}
                          />
                        ) : (
                          <div
                          className="h-[88px] w-[88px] shadow-md rounded-md flex items-center justify-center"
                          style={{ backgroundColor: "#155E75" }}
                        >
                          <span className="text-white font-bold text-2xl">
                          {item.name.substr(0, 2)}
                          </span>
                        </div>
                        )}
                      </span>
                      <span className="items-center justify-center flex mt-3 text-base font-medium">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>):(
                <div className="mt-4 italic text-[#737380] text-center">{language?.v3?.investor?.no_member_for_now}</div>
              )}
             
              <div className="font-medium text-2xl mt-14 flex items-center justify-center">
              {language?.v3?.investor?.team_member}
              </div>
              {state?.general_partners?.length > 0 ? (  <div className="mt-4 flex items-center justify-center mb-10">
                <div
                  className="flex-wrap items-center justify-center max-w-[45%]"
                  style={{ display: "flex" }}
                >
                  {state?.general_partners.map((item: any, index: any) => (
                    <div
                      key={index}
                      className="flex-col items-center p-4 justify-center"
                    >
                      <span className="h-[100px] w-[100px] shadow-sm rounded-full flex items-center justify-center">
                        {item.profile_pic ? (
                          <img
                            className="w-full h-full shadow-md rounded-full flex items-center justify-center"
                            src={item.profile_pic}
                            alt={`Logo ${index}`}
                          />
                        ) : (
                          <div
                          className="h-[88px] w-[88px] shadow-md rounded-md flex items-center justify-center"
                          style={{ backgroundColor: "#155E75" }}
                        >
                          <span className="text-white font-bold text-2xl">
                          {item.name.substr(0, 2)}
                          </span>
                        </div>
                        )}
                      </span>
                      <span className="items-center justify-center flex mt-3 text-base font-medium">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>): (
                <div className="mt-4 italic text-[#737380] text-center">{language?.v3?.investor?.no_member_for_now}</div>
              )}
            
            </aside>
          </section>
        )}
      </aside>
    </main>
  );
};
export default SyndicateFullView;

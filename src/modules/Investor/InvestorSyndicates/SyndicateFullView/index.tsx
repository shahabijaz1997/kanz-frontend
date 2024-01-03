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
import { DealCheckType } from "../../../../enums/types.enum";

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
  const [changes, setChanges]: any = useState({
    comment: "",
    action: "",
    document: null,
  });
  const getButtonStatus = () => {
    if (buttonDisableTemp) return;

    return state?.is_invited
      ? language?.v3?.investor?.applied
      : language?.v3?.investor?.apply_to_syndicate;
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
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
  const dataArray = [
    {
      profile: {
        logo: "https://images.unsplash.com/photo-1620000617482-821324eb9a14?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      name: "John",
    },
    {
      profile: {
        logo: "https://images.unsplash.com/photo-1474176857210-7287d38d27c6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      name: "Doe",
    },
    {
      profile: {
        logo: "https://images.unsplash.com/photo-1445053023192-8d45cb66099d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      name: "Jane",
    },
    {
      profile: {
        logo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      name: "Alice",
    },
    {
      profile: {
        logo: "https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?q=80&w=1930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      name: "Bob",
    },
    {
      profile: {
        logo: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      name: "Eve",
    },
    {
      profile: {
        logo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      name: "Charlie",
    },
    {
      profile: {
        logo: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      name: "Sophie",
    },
  ];
  const dataArrayCompany = [
    {
      profile: {
        logo: "https://images.unsplash.com/photo-1635756837851-d3b6edbaa11c?q=80&w=1914&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      name: "Tenosrr",
    },
    {
      profile: {
        logo: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      name: "Venture",
    },
    {
      profile: {
        logo: "https://images.unsplash.com/photo-1602934445884-da0fa1c9d3b3?q=80&w=1916&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      name: "Enigma",
    },
    {
      profile: {
        logo: "https://images.unsplash.com/photo-1541797873665-6d4cc148885f?q=80&w=2031&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      name: "Funavry",
    },
    {
      profile: {
        logo: "https://images.unsplash.com/photo-1574630340198-0252cea163da?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      name: "GinTech",
    },
    {
      profile: {
        logo: "https://images.unsplash.com/photo-1602230167340-881f48d4bda7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      name: "Cative",
    },
    {
      profile: {
        logo: "https://images.unsplash.com/photo-1587987501183-33e43fdde781?q=80&w=1784&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      name: "Capture",
    },
    {
      profile: {
        logo: "https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fGxvZ29zfGVufDB8fDB8fHww",
      },
      name: "VisionX",
    },
  ];
  const handleSelectChange = (selectedOption: any) => {
    setSelectedDiscovery(selectedOption?.value);
  };
  /*   const options = [
    { label: language?.v3?.investor?.news, value: "news" },
    { label: language?.v3?.investor?.profile, value: "profile" },
    { label: language?.v3?.investor?.website, value: "website" },
    { label: language?.v3?.investor?.other, value: "other" },
  ];
 */
  const abbreviatedMonths = state?.portfolio_stats?.labels.map(
    (month: string) => month.charAt(0)
  );

  const options = [
    { label: "News", value: "news" },
    { label: "Social Media", value: "social_media" },
    { label: "Website", value: "website" },
    { label: "Other", value: "other" },
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
                  <Button
                    type={
                      state?.is_invited && !buttonDisableTemp
                        ? "outlined"
                        : "primary"
                    }
                    centeredSpinner
                    className="!min-w-[90px]"
                    onClick={() => {
                      if (state?.is_invited) {
                        return;
                      } else {
                        handleToggle();
                      }
                    }}
                    loading={buttonDisableTemp}
                  >
                    {getButtonStatus()}
                  </Button>
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
                        {
                          language?.v3?.investor
                            ?.how_did_you_discover_this_syndicate
                        }
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
                      <small className="ml-3">
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
                          disabled={!enableButton}
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
                <div className="flex-col justify-center items-center w-[80%]">
                  <div className=" mx-28">
                    <div className="font-medium text-2xl">
                      {`${
                        state?.portfolio_stats?.total_deals_closed_in_12_months
                      } deals in past ${12} months`}
                    </div>
                    <div className=" mt-0.5 font-medium text-[#737373]">
                      {language?.v3?.fundraiser?.syndicate_deals}
                    </div>
                  </div>
                  <aside className="flex justify-between items-center text-sm px-32 mt-4 w-full">
                    <div className="w-full">
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
                Investments
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
                  Teams
                </div>
                <div className="flex-col items-center p-4 justify-center">
                  <span className="flex items-center justify-center">
                    <img
                      className=" h-[88px] w-[88px] mr-2.5 shadow-md rounded-full"
                      src={
                        "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      }
                    ></img>
                  </span>
                  <span className="items-center justify-center flex mt-3 text-base font-medium">
                    {"Leonard Krasner (Lead)"}
                  </span>
                </div>
              </div>
              <div className="font-medium text-2xl mt-14 flex items-center justify-center">
                LPs
              </div>
              <div className="mt-4 flex items-center justify-center mb-10">
                <div
                  className="flex-wrap items-center justify-center max-w-[45%]"
                  style={{ display: "flex" }}
                >
                  {dataArray.map((item, index) => (
                    <div
                      key={index}
                      className="flex-col items-center p-4 justify-center"
                    >
                      <span className="h-[100px] w-[100px] shadow-sm rounded-full flex items-center justify-center">
                        <img
                          className="w-full h-full shadow-md rounded-full flex items-center justify-center"
                          src={item.profile.logo}
                          alt={`Logo ${index}`}
                        />
                      </span>
                      <span className="items-center justify-center flex mt-3 text-base font-medium">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </section>
        )}
      </aside>
    </main>
  );
};
export default SyndicateFullView;

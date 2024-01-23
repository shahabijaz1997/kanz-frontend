import { useEffect, useRef, useState } from "react";
import EditIcon from "../../../ts-icons/editIcon.svg";
import InputProfile from "../InputProfile";
import Button from "../../../shared/components/Button";
import { toast } from "react-toastify";
import { toastUtil } from "../../../utils/toast.utils";
import { updateProfile } from "../../../apis/investor.api";
import { RootState } from "../../../redux-toolkit/store/store";
import { useSelector } from "react-redux";
import { getAllIndustries } from "../../../apis/bootstrap.api";
import SearchedItems from "../../../shared/components/SearchedItems";
import Chevrond from "../../../ts-icons/chevrond.svg";
import React from "react";
import CrossIcon from "../../../ts-icons/crossIcon.svg";

const FundRaiserProfile = ({
  setLoading,
  getDetail,
  data,
  setPhotoUploadModal,
}: any) => {
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const [searchResults, setSearchResults]: any = useState([]);
  const [name, setName] = useState(data?.name);
  const [comapnyName, setCompanyName] = useState(data?.profile?.company_name);
  const [legalName, setLegalname] = useState(data?.profile?.legal_name);
  const [website, setWebsite] = useState(data?.profile?.website);
  const [description, setDescription] = useState(data?.profile?.description);
  const [address, setAddress] = useState(data?.profile?.address);
  const [ceoName, setCeoName] = useState(data?.profile?.ceo_name);
  const [ceoEmail, setCeoEmail] = useState(data?.profile?.ceo_email);
  const [search, setSearch] = useState("");
  const event: any = useSelector((state: RootState) => state.event.value);
  const orientation: any = useSelector(
    (state: RootState) => state.orientation.value
  );
  const [payload, setPayload]: any = useState({
    market: [],
  });
  const onSetPayload = (data: any, type: string) => {
    setPayload((prev: any) => {
      return { ...prev, [type]: data };
    });
  };
  const refInd: any = useRef(null);

  const updateInfo = async (payload: any) => {
    try {
      let sentPayload = {
        user: {
          name: name,
          profile_picture: null,
          profile_attributes: {
            industry_ids: payload?.market,
          },
        },
      };

      let { status, data } = await updateProfile(authToken, sentPayload);
      if (status === 200) {
        toast.success("Profile Updated", toastUtil);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      getDetail();
    }
  };
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    bootstrapData();
  }, []);

  const bootstrapData = async () => {
    try {
      let { status, data } = await getAllIndustries(authToken);
      if (status === 200) {
        setSearchResults(data.status.data);
      }
    } catch (error) {
      console.error("Error in industries: ", error);
    }
  };
  const filteredData: any = [];
  if (searchResults.length > 0 && payload?.market) {
    searchResults?.filter((item: any) => {
      payload?.market?.map((market: any) => {
        if (market === item.id) {
          filteredData.push(item);
        }
      });
    });
  }

  return (
    <section className="inline-flex justify-start gap-36 w-full max-h-full">
      <div className="flex flex-col gap-6 w-[40%]">
        <span className="inline-flex justify-center gap-12 items-center">
          {
            <InputProfile
              disabled={false}
              label={"Name"}
              value={name}
              onChange={setName}
            />
          }
          {<InputProfile disabled={true} label={"Email"} value={data?.email} />}
        </span>
        <span className="inline-flex justify-start w-[76%] gap-12 items-center">
          {
            <InputProfile
              disabled={true}
              label={"Nationality"}
              value={data?.profile?.en?.nationality}
            />
          }
        </span>
        <span className="inline-flex justify-start  font-medium items-center">
          Company Details
        </span>
        <span className="flex-col flex items-center justify-center">
          <img
            className="h-36 w-28"
            style={{
              objectFit: "cover",
              aspectRatio: "1",
            }}
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=3276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <span className="text-[10px] font-medium mt-2">Logo</span>
        </span>
        <span className="inline-flex justify-center gap-12 items-center">
          {
            <InputProfile
              disabled={false}
              label={"Company Name"}
              value={comapnyName}
              onChange={setCompanyName}
            />
          }
          {
            <InputProfile
              disabled={false}
              label={"Legal Name"}
              value={legalName}
              onChange={setLegalname}
            />
          }
        </span>
        <span className="inline-flex justify-center gap-12 items-center">
          {
            <InputProfile
              disabled={false}
              label={"Website"}
              value={website}
              onChange={setWebsite}
            />
          }
          {
            <div className="w-[60%]" ref={refInd}>
              <label
                className="text-xs mb-1 font-medium whitespace-nowrap"
                htmlFor="market"
              >
                {"Markets"}
              </label>
              <span className="relative">
                <input
                  id="market"
                  autoComplete="off"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  onClick={() => setShowData(!showData)}
                  className=" text-[10px] px-2 py-1.5 w-full border-[1px] focus:border-[#155E75] rounded-md bg-white"
                  type="text"
                />
                <span
                  className={`absolute top-[6px] flex items-center pr-2 pointer-events-none ${
                    orientation === "rtl" ? "left-1" : "right-0"
                  }`}
                  style={{ zIndex: 99 }}
                >
                  <Chevrond className="w-3 h-3" stroke="#737373" />
                </span>
              </span>
              <div className="absolute top-[53px] left-0 ">
                {payload?.market && payload?.market?.length > 0 && (
                  <aside className="inline-flex gap-2 flex-wrap  shadow-sm appearance-none border bg-white border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline">
                    {React.Children.toArray(
                      filteredData.map((ind: any) => (
                        <div className="check-background rounded-[4px] px-0.5 py-0.5 text-[7px] inline-flex items-center">
                          <small>{ind[event]?.name}</small>
                          <CrossIcon
                            onClick={() => {
                              let payloadItems = filteredData.filter(
                                (x: any) => x.id !== ind.id
                              );
                              onSetPayload(
                                payloadItems.map((item: any) => item.id),
                                "market"
                              );
                            }}
                            className="cursor-pointer h-2 w-2 ml-1"
                            stroke={"#828282"}
                          />
                        </div>
                      ))
                    )}
                  </aside>
                )}
                {showData && (
                  <SearchedItems
                    items={searchResults}
                    searchString={search}
                    passItemSelected={(it: any) => {
                      let payloadItems = [...payload.market];
                      payloadItems.push(it.id);
                      onSetPayload(Array.from(new Set(payloadItems)), "market");
                    }} 
                    className={
                      "cursor-pointer rounded-md py-1 px-1 bg-cbc-check text-neutral-700 font-normal text-[7px] hover:bg-cbc-check-hover transition-all"
                    }
                    parentClass={"flex rounded-md border-[1px] mt-1 max-h-[200px] custom-scroll flex-wrap gap-4 bg-white p-4 max-h-[350px] overflow-y-auto"}
                  />
                )}
              </div>
            </div>
          }
        </span>
        <span className="inline-flex justify-start gap-12 items-center">
          {
            <InputProfile
              disabled={false}
              label={"Address"}
              value={address}
              onChange={setAddress}
            />
          }
        </span>
        <span className="inline-flex justify-start gap-12 items-center">
          {
            <span className={` w-[60%] flex-col flex`}>
              <p className="text-xs mb-1 font-medium whitespace-nowrap">
                {"Description"}
              </p>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`text-[10px] px-2 py-1.5 w-full border-[1px] rounded-md focus:border-none min-h-20 `}
              />
            </span>
          }
        </span>
        <span className="inline-flex justify-center gap-12 items-center">
          {
            <InputProfile
              disabled={false}
              label={"CEO name"}
              value={ceoName}
              onChange={setCeoName}
            />
          }
          {
            <InputProfile
              disabled={false}
              label={"CEO email"}
              value={ceoEmail}
              onChange={setCeoEmail}
            />
          }
        </span>

        <span className="flex mt-1 items-center justify-start">
          <Button
            onClick={() => {
              updateInfo(payload);
            }}
            className="!p-2 !text-xs !font-medium"
            type="primary"
          >
            Update
          </Button>
        </span>
      </div>
      <span>
        <div>
          <div className="relative ">
            <img
              className="w-48 h-48 rounded-full bg-slate-100 border-[1px] shadow-lg"
              style={{
                objectFit: "cover",
                aspectRatio: "1",
              }}
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=3276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <span
              onClick={() => {
                setPhotoUploadModal(true);
              }}
              className="bottom-0 left-9 absolute cursor-pointer w-6 h-6 hover:bg-slate-100 bg-white rounded-full flex items-center justify-center"
            >
              <EditIcon className="w-4 h-4" stroke="#000" />
            </span>
          </div>
        </div>
      </span>
    </section>
  );
};

export default FundRaiserProfile;

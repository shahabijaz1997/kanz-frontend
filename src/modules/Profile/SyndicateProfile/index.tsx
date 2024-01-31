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

const SyndciateProfile = ({
  setLoading,
  getDetail,
  data,
  setPhotoUploadModal,
}: any) => {
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const [searchResults, setSearchResults]: any = useState([]);
  const [name, setName] = useState(data?.name);
  const [website, setWebsite] = useState(data?.profile?.profile_link);
  const [address, setAddress] = useState(data?.profile?.address);
  const [tagline, setTagline] = useState(data?.profile?.tagline);
  const [search, setSearch] = useState(data?.profile?.industries?.join(", "));
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
  const validateProfileLink = (link: any) => {
    return urlRegex.test(link) ? true : false;
  };
  const refInd: any = useRef(null);
  const urlRegex =
    /^(https?:\/\/)?(www\.)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;
  const updateButtonDisable = () => {
    return !name ||
      !website ||
      !tagline ||
      !validateProfileLink(website) ||
      (!search && !payload?.market.length)
      ? true
      : false;
  };
  const emptyFieldsMessage = () => {
    return !name || !website || !tagline || !website ? true : false;
  };

  const updateInfo = async (payload: any) => {
    try {
      let sentPayload = {
        profile: {
          profile_link: website,
          address: address,
          industry_ids: payload?.market,
          syndicate_attributes: {
            name: name,
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (refInd.current && !refInd.current.contains(event.target as Node)) {
        setShowData(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refInd, showData]);

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
          <InputProfile
            disabled={false}
            label={"Name"}
            value={name}
            onChange={setName}
          />
          <InputProfile
            disabled={true}
            label={"Reigon"}
            value={data?.profile?.regions?.join(", ")}
          />
        </span>
        <span className="inline-flex justify-start gap-12 items-center">
          {<InputProfile disabled={true} label={"Email"} value={data?.email} />}
        </span>
        <span className="inline-flex justify-start gap-12 items-center">
          <div className="w-[90%] relative" ref={refInd}>
            <p className=" mb-1 font-medium whitespace-nowrap">{"Markets"}</p>
            <span className="relative">
              <input
                id="market"
                autoComplete="off"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                onClick={() => setShowData(!showData)}
                className=" text-sm px-2 py-1.5 w-full border-[1px] focus:border-[#155E75] rounded-md bg-white"
                type="text"
              />
              <span
                className={`absolute top-[7px] flex items-center pr-2 pointer-events-none ${
                  orientation === "rtl" ? "left-1" : "right-0"
                }`}
                style={{ zIndex: 99 }}
              >
                <Chevrond className="w-3 h-3" stroke="#737373" />
              </span>
            </span>
            <div className="absolute top-[61px] left-0 z-[1]">
              {payload?.market && payload?.market?.length > 0 && (
                <aside className="inline-flex gap-2 flex-wrap  shadow-sm appearance-none border bg-white border-neutral-300 rounded-md w-full py-1 px-2 text-gray-500 leading-tight focus:outline-none focus:shadow-outline">
                  {React.Children.toArray(
                    filteredData.map((ind: any) => (
                      <div className="check-background rounded-[4px] p-1 text-[11px] whitespace-nowrap inline-flex items-center">
                        <span>{ind[event]?.name}</span>
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
                    "cursor-pointer relative rounded-md py-1 px-1 bg-cbc-check text-neutral-700 font-normal text-[11px] hover:bg-cbc-check-hover transition-all"
                  }
                  parentClass={
                    "flex rounded-md border-[1px] flex-wrap gap-2 bg-white p-2 max-h-[200px] overflow-y-auto"
                  }
                />
              )}
            </div>
          </div>
        </span>
        <span className="inline-flex mt-5 justify-start text-xl font-medium items-center">
          Syndicate Details
        </span>
        <label className="font-medium">Logo</label>
        <span className="flex-col flex">
          <img
            className="h-56 w-48 border-[1px]"
            style={{
              objectFit: "contain",
              aspectRatio: "1",
            }}
            src={data?.profile?.logo}
            alt=""
          />
        </span>
        <span className="inline-flex justify-center gap-12 items-center">
          <InputProfile
            placeholder="example.com"
            disabled={false}
            label={"Profile Link"}
            value={website}
            onChange={setWebsite}
            validationName={"URL"}
            valid={!validateProfileLink(website)}
          />
          <InputProfile
            disabled={false}
            label={"Tagline"}
            value={tagline}
            onChange={setTagline}
          />
        </span>
        {/*    {emptyFieldsMessage() && (<span className="text-red-500 font-medium text-xs px-1">Please fill all fields to update....</span>)} */}
        <span className="flex mt-1 items-center justify-start">
          <Button
            disabled={updateButtonDisable()}
            onClick={() => {
              setLoading(true);
              updateInfo(payload);
            }}
            className="!py-2"
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
              src={
                data?.profile_picture_url ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              alt=""
            />
            <span
              onClick={() => {
                setPhotoUploadModal(true);
              }}
              className="bottom-0 left-9 absolute cursor-pointer w-6 h-6 hover:bg-slate-100 bg-white rounded-full flex items-center justify-center"
            >
              <EditIcon className="w-5 h-5" stroke="#000" />
            </span>
          </div>
        </div>
      </span>
    </section>
  );
};

export default SyndciateProfile;

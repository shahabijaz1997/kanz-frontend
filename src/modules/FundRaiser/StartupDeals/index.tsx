import { useEffect, useState } from "react";
import Spinner from "../../../shared/components/Spinner";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import Button from "../../../shared/components/Button";
import Modal from "../../../shared/components/Modal";
import SelectDealTypeModal from "../SelectDealTypeModal";
import Table from "../../../shared/components/Table";
import { getStartupDeals } from "../../../apis/deal.api";
import { numberFormatter } from "../../../utils/object.utils";
import CustomStatus from "../../../shared/components/CustomStatus";
import { ApplicationStatus, DealCheckType } from "../../../enums/types.enum";
import { saveDataHolder } from "../../../redux-toolkit/slicer/dataHolder.slicer";
import EditIcon from "../../../ts-icons/editIcon.svg";
import { RoutesEnums } from "../../../enums/routes.enum";
import { KanzRoles } from "../../../enums/roles.enum";
import Chevrond from "../../../ts-icons/chevrond.svg";
import { useNavigate } from "react-router-dom";
import { saveToken } from "../../../redux-toolkit/slicer/auth.slicer";
import SearchIcon from "../../../ts-icons/searchIcon.svg";
import EditDealWarningModal from "../EditDealWarningModal";
import { saveUserMetaData } from "../../../redux-toolkit/slicer/metadata.slicer";

const StartupDeals = ({ openStartupRiskModal }: any) => {
  const [loading, setLoading] = useState(false);
  const language: any = useSelector((state: RootState) => state.language.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const [modalOpen, setModalOpen]: any = useState(null);
  const orientation: any = useSelector(
    (state: RootState) => state.orientation.value
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const columns = [
    language?.v3?.table?.title,
    language?.v3?.table?.status,
    language?.v3?.fundraiser?.model,
    language?.v3?.table?.stage,
    language?.v3?.table?.round,
    language?.v3?.table?.target,
    language.v3.fundraiser.end_date,
    language?.v3?.table?.action,
  ];
  const [paginationData, setpaginationData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const metadata: any = useSelector((state: RootState) => state.metadata);
  const [filter, setFilterCounts]: any = useState([]);
  const [selectedTab, setSelectedTab] = useState("All");
  const [selectedTabApi, setSelectedTabApi] = useState("All");
  const [warningModal, setwarningModal]: any = useState(null);
  const [tabs] = useState([
    language?.v3?.startup?.overview?.all,
    language?.v3?.fundraiser?.draft,
    language?.v3?.fundraiser?.reopened,
    language?.v3?.fundraiser?.submitted,
    language?.v3?.fundraiser?.approved,
    language?.v3?.fundraiser?.live,
    language?.v3?.fundraiser?.verified,
    language?.v3?.fundraiser?.rejected,
  ]);
  const backendTabs : any = {
    [language?.v3?.startup?.overview?.all]: 'All',
    [language?.v3?.fundraiser?.draft]: 'Draft',
    [language?.v3?.fundraiser?.reopened]: 'Reopened',
    [language?.v3?.fundraiser?.submitted]: 'Submitted',
    [language?.v3?.fundraiser?.approved]: 'Approved',
    [language?.v3?.fundraiser?.live]: 'Live',
    [language?.v3?.fundraiser?.verified]: 'Verified',
    [language?.v3?.fundraiser?.rejected]: 'Rejected',
  };
  const getCountvalue = (value: string) => {
    let count = 0;
    switch (value) {
      case language?.v3?.startup?.overview?.all:
        count = filter?.all;
        break;
      case language?.v3?.fundraiser?.draft:
        count = filter?.draft;
        break;
      case language?.v3?.fundraiser?.reopened:
        count = filter?.reopened;
        break;
      case language?.v3?.fundraiser?.submitted:
        count = filter?.submitted;
        break;
      case language?.v3?.fundraiser?.approved:
        count = filter?.approved;
        break;
      case language?.v3?.fundraiser?.live:
        count = filter?.live;
        break;
      case language?.v3?.fundraiser?.verified:
        count = filter?.verified;
        break;
      case language?.v3?.fundraiser?.rejected:
        count = filter?.rejected;
        break;
    }

    return count;
  };
  const [deals, setDeals]: any = useState([]);
  const [dealId, setDealId]: any = useState(null);
  const [dealStep, setDealStep]: any = useState(null);
  const [searchQuery, setSearchQuery]: any = useState("");
  const [dealStatus, setDealStatus]: any = useState(null);
  const [selectTypeModal, setSelectTypeModal]: any = useState(null);

  useEffect(() => {
    dispatch(saveDataHolder(""));
    setCurrentPage(1);
    getAllDeals();
  }, [selectedTab]);
  useEffect(() => {
    dispatch(saveDataHolder(""));
    getAllDeals();
  }, [currentPage]);
  useEffect(() => {
    dispatch(saveDataHolder(""));
    getAllDeals();
  }, []);

  const handleCloseModal = () => {
    setSelectTypeModal(false);
  };
  const handleDiscModal = () => {
    setModalOpen("1");
  };
  const handleWarningModal = () => {
    setwarningModal(false);
  };

  const getAllDeals = async () => {
    try {
      setLoading(true);
      let { status, data } = await getStartupDeals(
        authToken,
        selectedTabApi,
        searchQuery,
        currentPage
      );
      if (status === 200) {
        setpaginationData(data?.status?.data?.pagy);
        setFilterCounts(data?.status?.data?.stats);
        let deals = data?.status?.data?.deals?.map((deal: any) => {
          return {
            id: deal?.id,
            [language?.v3?.table?.title]: deal?.title || "N/A",
            ["Model"]:
              <span className=" capitalize">{deal?.model}</span> || "N/A",
            [language?.v3?.table?.target]: `${numberFormatter(
              Number(deal?.target),
              DealCheckType.STARTUP
            )}`,
            [language?.v3?.table?.stage]: deal?.title || "N/A",
            [language?.v3?.table?.round]: deal?.round || "N/A",
            [language?.v3?.table?.status]: (
              <CustomStatus options={deal?.status} />
            ),
            [language.v3.fundraiser.end_date]: deal?.end_at || "N/A",
            [language?.v3?.table?.type]: (
              <span className=" capitalize">{deal?.deal_type}</span>
            ),
            State: deal?.current_state,
            token: deal?.token,
            Steps: deal?.current_state?.steps,
            [language?.v3?.table?.action]: (
              <React.Fragment>
                {(deal?.status === ApplicationStatus.DRAFT ||
                  deal?.status === ApplicationStatus.REOPENED ||
                  deal?.status === ApplicationStatus.APPROVED) && (
                  <div
                    onClick={(e) => {
                      dispatch(
                        saveUserMetaData({
                          ...metadata.value,
                          dealType: KanzRoles.STARTUP,
                        })
                      );
                      if (deal?.status === ApplicationStatus.APPROVED) {
                        setDealId(deal?.id);
                        setDealStatus(deal?.status);
                        setDealStep(deal?.current_state?.current_step);
                        setwarningModal(true);
                      } else {
                        e.preventDefault();
                        e.stopPropagation();
                        dispatch(saveDataHolder(deal.id));
                        if (deal?.status === ApplicationStatus.REOPENED) {
                          navigate(
                            `/create-deal/${
                              deal?.current_state?.current_step + 1
                            }`
                          );
                        } else {
                          navigate(
                            `/create-deal/${
                              deal?.current_state?.current_step + 2
                            }`
                          );
                        }
                      }
                    }}
                    className="bg-neutral-100 inline-flex items-center justify-center w-[26px] h-[26px] p-1 rounded-full transition-all hover:bg-cbc-transparent"
                  >
                    <EditIcon className="w-4 h-4" stroke={"#737373"} />
                  </div>
                )}
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate(`${RoutesEnums.DEAL_DETAIL}/${deal?.token}`, {
                      state:
                        deal?.deal_type === DealCheckType.PROPERTY
                          ? KanzRoles.PROPERTY_OWNER
                          : KanzRoles.STARTUP,
                    });
                  }}
                  className="bg-neutral-100 inline-flex items-center justify-center w-[26px] h-[26px] rounded-full transition-all hover:bg-cbc-transparent mx-2"
                >
                  <Chevrond
                    className={`${
                      orientation === "rtl"
                        ? "rotate-[-270deg]"
                        : "rotate-[-90deg]"
                    } w-4 h-4`}
                    strokeWidth={2}
                    stroke={"#000"}
                  />
                </div>
              </React.Fragment>
            ),
          };
        });
        setDeals(deals);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        dispatch(saveToken(""));
        navigate(RoutesEnums.LOGIN, {
          state: RoutesEnums.FUNDRAISER_DASHBOARD,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-cbc-auth h-full relative" style={{}}>
      {loading ? (
        <div className="mt-48 w-full h-full grid place-items-center">
          <Spinner />
        </div>
      ) : (
        <section className="">
          <section className="inline-flex justify-between items-center w-full">
            <div className="w-full">
              <span className="w-full flex items-center gap-5">
                <div className="rounded-md shadow-cs-6 bg-white border-[1px] border-gray-200 h-9 overflow-hidden max-w-[310px] inline-flex items-center px-2">
                  <SearchIcon
                    onClick={() => {
                      getAllDeals();
                    }}
                  />
                  <input
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        getAllDeals();
                      }
                    }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    type="search"
                    className="h-full w-full outline-none pl-2 font-normal "
                    placeholder={language?.v3?.common?.search}
                  />
                </div>

                <ul className="inline-flex items-center">
                  {React.Children.toArray(
                    tabs.map((tab: any) => (
                      <li
                        onClick={() => {
                          setSelectedTabApi(backendTabs[tab])
                          setSelectedTab(tab)}}
                        className={`py-2 px-4 font-medium text-xs cursor-pointer rounded-md transition-all ${
                          selectedTab === tab
                            ? "text-neutral-900 bg-neutral-100"
                            : "text-gray-500"
                        } `}
                      >
                        {tab} &nbsp;({getCountvalue(tab)})
                      </li>
                    ))
                  )}
                </ul>
              </span>
            </div>
          </section>

          <section className="mt-10">
            <Table
              tableData={deals}
              setCurrentPage={setCurrentPage}
              paginationData={paginationData}
              columns={columns}
              noDataNode={
                <Button
                  onClick={() => {
                    dispatch(
                      saveUserMetaData({
                        ...metadata.value,
                        dealType: KanzRoles.STARTUP,
                      })
                    );
                    openStartupRiskModal();
                  }}
                  className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]"
                >
                  {language.v3.fundraiser.create_startup_deal}
                </Button>
              }
            />
          </section>
        </section>
      )}
      <Modal show={selectTypeModal ? true : false} className="w-full">
        <SelectDealTypeModal
          handleCloseModal={handleCloseModal}
          handleDiscModal={handleDiscModal}
        />
      </Modal>
      <Modal show={warningModal ? true : false} className="w-full">
        <EditDealWarningModal
          handleWarningModal={handleWarningModal}
          dealId={dealId}
          dealStatus={dealStatus}
          dealStep={dealStep}
        />
      </Modal>
    </section>
  );
};

export default StartupDeals;

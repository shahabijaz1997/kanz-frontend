import { useEffect, useState } from "react";
import Spinner from "../../../shared/components/Spinner";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import Button from "../../../shared/components/Button";
import Modal from "../../../shared/components/Modal";
import SelectDealTypeModal from "../SelectDealTypeModal";
import Table from "../../../shared/components/Table";
import { getPropertyDeals } from "../../../apis/deal.api";
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
import EditDealWarningModal from "../EditDealWarningModal";
import { saveUserMetaData } from "../../../redux-toolkit/slicer/metadata.slicer";
import { convertStatusLanguage } from "../../../utils/string.utils";
import Search from "../../../shared/components/Search";

const PropertyDeals = ({ openPropertyRiskModal }: any) => {
  const [loading, setLoading] = useState(false);
  const language: any = useSelector((state: RootState) => state.language.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const [modalOpen, setModalOpen]: any = useState(null);
  const metadata: any = useSelector((state: RootState) => state.metadata);
  const event: any = useSelector((state: RootState) => state.event.value);
  const orientation: any = useSelector(
    (state: RootState) => state.orientation.value
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const columns = [
    language?.v3?.table?.title,
    language?.v3?.table?.status,
    language?.v3?.fundraiser?.model,
    language?.v3?.fundraiser?.size,
    language?.v3?.fundraiser?.state,
    language?.v3?.fundraiser?.city,
    language?.v3?.fundraiser?.selling_price,
    language?.v3?.fundraiser.end_date,
    language?.v3?.table?.action,
  ];
  const [filter, setFilterCounts]: any = useState([]);
  const [selectedTab, setSelectedTab] = useState("all");
  const [warningModal, setwarningModal]: any = useState(null);
  const [paginationData, setpaginationData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [tabs] = useState<any>({
    'all': language?.v3?.startup?.overview?.all,
    'draft': language?.v3?.fundraiser?.draft,
    'reopened': language?.v3?.fundraiser?.reopened,
    'submitted': language?.v3?.fundraiser?.submitted,
    'approved': language?.v3?.fundraiser?.approved,
    'live': language?.v3?.fundraiser?.live,
    'verified': language?.v3?.fundraiser?.verified,
    'rejected': language?.v3?.fundraiser?.rejected,
  });
  const getCountvalue = (value: string) => {
    return filter[value] || 0
  };
  const [deals, setDeals]: any = useState([]);
  const [dealId, setDealId]: any = useState(null);
  const [dealStep, setDealStep]: any = useState(null);
  const [searchQuery, setSearchQuery]: any = useState("");
  const [dealStatus, setDealStatus]: any = useState(null);
  const [selectTypeModal, setSelectTypeModal]: any = useState(null);
  let sqftSymbol = event === "ar" ? "قدم مربع" : "SQFT"
  let currencySymbol = event === "ar" ? "د.إ": "AED"
  useEffect(() => {
    dispatch(saveDataHolder(""));
    setCurrentPage(1)
    getAllDeals(searchQuery);
  }, [selectedTab]);
  useEffect(() => {
    dispatch(saveDataHolder(""));
    getAllDeals(searchQuery);
  }, [currentPage]);
  useEffect(() => {
    dispatch(saveDataHolder(""));
    dispatch(saveUserMetaData(""));
    getAllDeals(searchQuery);
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
  const getAllDeals = async (queryString:string) => {
    try {
      setLoading(true);
      let { status, data } = await getPropertyDeals(
        authToken,
        selectedTab,
        queryString,
        currentPage
      );
      if (status === 200) {
        setFilterCounts(data?.status?.data?.stats);
        setpaginationData(data?.status?.data?.pagy);
        let deals = data?.status?.data?.deals?.map((deal: any) => {
          return {
            id: deal?.id,
            [language?.v3?.table?.title]: deal?.title || language?.v3?.common?.not_added,
            [language?.v3?.fundraiser?.selling_price]: event === "ar" ?  `د.إ ${numberFormatter(
              deal.target,
              null,
              true
            )}` : `${numberFormatter(
              deal.target,
              DealCheckType.PROPERTY
            )}`,
            [language?.v3?.fundraiser?.size]: `${deal?.size ? `${deal.size} ${sqftSymbol}` : language?.v3?.common?.not_added}`,
            [language?.v3?.fundraiser?.state]: deal?.state || language?.v3?.common?.not_added,
            [language?.v3?.fundraiser?.city]: deal?.city || language?.v3?.common?.not_added,
            [language.v3?.fundraiser.end_date]: deal?.end_at || language?.v3?.common?.not_added,
            [language?.v3?.table?.status]: (
              <CustomStatus options={deal?.status} />
            ),
            [language?.v3?.fundraiser?.model]: <span className=" capitalize">{deal?.model}</span>,

            token: deal?.token,
            Steps: deal?.current_state?.steps,
            [language?.v3?.table?.action]: (
              <React.Fragment>
                {(convertStatusLanguage(deal?.status) === ApplicationStatus.DRAFT ||
                  convertStatusLanguage(deal?.status) === ApplicationStatus.REOPENED ||
                  convertStatusLanguage(deal?.status) === ApplicationStatus.APPROVED) && (
                  <div
                    onClick={(e) => {
                      dispatch(
                        saveUserMetaData({
                          ...metadata.value,
                          dealType: KanzRoles.PROPERTY_OWNER,
                        })
                      );

                      if (convertStatusLanguage(deal?.status) === ApplicationStatus.APPROVED) {
                        setDealId(deal?.id);
                        setDealStatus(deal?.status);
                        setDealStep(deal?.current_state?.current_step);
                        setwarningModal(true);
                      } else {
                        e.preventDefault();
                        e.stopPropagation();

                        dispatch(saveDataHolder(deal.id));
                        if (convertStatusLanguage(deal?.status) === ApplicationStatus.REOPENED) {
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
                      KanzRoles.PROPERTY_OWNER
                    });
                  }}
                  className="bg-neutral-100 inline-flex items-center justify-center w-[26px] h-[26px] rounded-full transition-all hover:bg-cbc-transparent mx-2"
                  >
                    <Chevrond
                      className={`${orientation === "rtl" ? "rotate-[-270deg]" : "rotate-[-90deg]"} w-4 h-4`}
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
              <Search apiFunction={getAllDeals} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                <ul className="inline-flex items-center">
                  {React.Children.toArray(
                    Object.keys(tabs).map((tab: any) => (
                      <li
                        onClick={() => {
                          setSelectedTab(tab)}
                        }
                        className={`py-2 px-4 font-medium text-xs cursor-pointer rounded-md transition-all ${
                          selectedTab === tab
                            ? "text-neutral-900 bg-neutral-100"
                            : "text-gray-500"
                        } `}
                      >
                        {tabs[tab]} &nbsp;({getCountvalue(tab)})
                      </li>
                    ))
                  )}
                </ul>
              </span>
            </div>
          </section>

          <section className="mt-10">
            <Table
              columns={columns}
              tableData={deals}
              setCurrentPage={setCurrentPage}
              paginationData={paginationData}
              noDataNode={
                
                      <Button
                  onClick={() => {
                    dispatch(
                      saveUserMetaData({
                        ...metadata.value,
                        dealType: KanzRoles.PROPERTY_OWNER,
                      })
                    );
                    openPropertyRiskModal();
                  }}
                  className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]"
                >
                  {language?.v3?.fundraiser?.create_property_deal}
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
export default PropertyDeals;

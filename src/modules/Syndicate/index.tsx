import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { KanzRoles } from "../../enums/roles.enum";
import Header from "../../shared/components/Header";
import Sidebar from "../../shared/components/Sidebar";
import { RootState } from "../../redux-toolkit/store/store";
import SearchIcon from "../../ts-icons/searchIcon.svg";
import React, { useEffect, useState } from "react";
import Button from "../../shared/components/Button";
import Table from "../../shared/components/Table";
import { RoutesEnums, StartupRoutes } from "../../enums/routes.enum";
import Modal from "../../shared/components/Modal";
import CrossIcon from "../../ts-icons/crossIcon.svg";
import { saveDataHolder } from "../../redux-toolkit/slicer/dataHolder.slicer";
import {  getDealsforsyndicate } from "../../apis/deal.api";
import {
  numberFormatter,
} from "../../utils/object.utils";
import Spinner from "../../shared/components/Spinner";
import CustomStatus from "../../shared/components/CustomStatus";
import Chevrond from "../../ts-icons/chevrond.svg";
import { convertStatusLanguage } from "../../utils/string.utils";
import Search from "../../shared/components/Search";

const SyndicateDashboard = ({}: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language: any = useSelector((state: RootState) => state.language.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const event: any = useSelector((state: RootState) => state.event.value);

  const [filter, setFilterCounts]:any = useState([]);
  const orientation: any = useSelector(
    (state: RootState) => state.orientation.value
  );


  
  const columns = [
    language?.v3?.syndicate?.title,
    language?.v3?.syndicate?.type,
    language?.v3?.table?.status,
    language?.v3?.table?.sellingPrice,
    language?.v3?.syndicate?.start_at,
    language?.v3?.syndicate?.end_at,
    "",

  ];
  const [selectedTab, setSelectedTab] = useState("all");
  const [modalOpen, setModalOpen]: any = useState(null);
  const [searchQuery, setSearchQuery]: any = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationData, setpaginationData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [tabs] = useState<any>({
    'all': language?.v3?.startup?.overview?.all,
    'startup': language?.v3?.fundraiser?.startup,
    'property': language?.v3?.fundraiser?.property,
  });
  const [deals, setDeals] = useState([]);
  const [dummyDisclaimers, setDummyDisclaimers] = useState({
    d1: false,
    d2: false,
    d3: false,
  });
  const [disclaimersToggler, setDisclaimersToggler] = useState({
    d1: false,
    d2: false,
    d3: false,
  });
  
  const getCountvalue = ( value:string ) =>
  { 
    return filter[value] || 0
  }


  useEffect(() => {
    dispatch(saveDataHolder(""));
    getAllDeals(searchQuery);
  }, []);

  useEffect(() => {
    getAllDeals(searchQuery);
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1)
    getAllDeals(searchQuery);
  }, [selectedTab]);

  const getAllDeals = async (queryString:string) => {
    try {
      setLoading(true);
      let { status, data } = await getDealsforsyndicate(authToken, selectedTab,queryString, currentPage);
      if (status === 200) {
        setFilterCounts(data?.status?.data?.stats)
        setpaginationData(data?.status?.data?.pagy)
        let deals = data?.status?.data?.deals?.map((deal: any) => {
          return {
            token: deal?.token,
            type: deal?.deal_type,
            id: deal?.id,
            [language?.v3?.syndicate?.title]: deal?.title || language?.v3?.common?.not_added,
            [language?.v3?.syndicate?.type]: <span className=" capitalize">{deal?.deal_type}</span>,
            [language?.v3?.table?.sellingPrice]: event === "ar" ?  `${numberFormatter(
              deal?.deal?.target
            , convertStatusLanguage(deal?.deal_type), true)}`:  `${numberFormatter(
            deal?.target
            , convertStatusLanguage(deal?.deal_type), false)}`,
            
            [language?.v3?.table?.status]: (
              <CustomStatus options={deal?.status} />
            ),
            [language?.v3?.syndicate?.start_at]: (deal?.start_at),
            [language?.v3?.syndicate?.end_at]: (deal?.end_at),
            [""]: (
              <div
              onClick={() => {
                navigate(
                  `${RoutesEnums.SYNDICATE_DEAL_DETAIL}/${deal?.token}`,
                  { state: window.location.pathname }
                );
              }}
                className="bg-neutral-100 inline-flex items-center justify-center w-[24px] h-[24px] rounded-full transition-all hover:bg-cbc-transparent mx-5"
              >
               <Chevrond
                    className={`${orientation === "rtl" ? "rotate-[-270deg]" : "rotate-[-90deg]"} w-4 h-4`}
                    strokeWidth={2}
                    stroke={"#000"}
                  />
              </div>
            )
          };
        });
        setDeals(deals);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="h-full max-h-full overflow-y-auto">
      <section>
        <Header />
      </section>
      <aside className="w-full h-full flex items-start justify-start">
        <Sidebar type={KanzRoles.SYNDICATE} />
        <section
          className="bg-cbc-auth h-full p-[5rem] relative"
          style={{ width: "calc(100% - 250px)" }}
        >
          {loading ? (
            <div className="absolute left-0 top-0 w-full h-full grid place-items-center">
              <Spinner />
            </div>
          ) : (
            <React.Fragment>
              <section className="inline-flex justify-between items-center w-full">
                <div className="w-full">
                  <h1 className="text-black font-medium text-2xl mb-2">
                    {language?.v3?.startup?.overview?.heading}
                  </h1>

                  <span className="w-full flex items-center gap-5">
                <Search apiFunction={getAllDeals} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                    <ul className="inline-flex items-center">
                        {React.Children.toArray(
                          Object.keys(tabs).map((tab: any) => (
                            <li
                              onClick={() => {
                                setSelectedTab(tab);
                              }}
                              className={`py-2 px-3 font-medium cursor-pointer rounded-md transition-all ${
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
                />
              </section>
            </React.Fragment>
          )}
        </section>
      </aside>

      <Modal
        show={modalOpen ? true : false}
        className={"w-[700px] screen1024:w-[300px]"}
      >
        {modalOpen === "1" ? (
          <div className="relative p-12 rounded-md shadow-cs-1 flex flex-col items-center w-full bg-white outline-none focus:outline-none screen800:px-3">
            <div className="rounded-md h-8 w-8 inline-grid place-items-center cursor-pointer absolute right-2 top-2">
              <CrossIcon
                stroke="#171717"
                className="w-6 h-6"
                onClick={() => setModalOpen(null)}
              />
            </div>
            <aside>
              <h2 className="font-bold text-xl text-center text-neutral-900">
                {language?.v3?.property?.disc_tit}
              </h2>
              <p className="text-sm font-normal text-center text-neutral-500 mt-8 mb-12">
                {language?.v3?.property?.disc_desc}
              </p>
              <div className="py-3 border-t-[1px] border-neutral-200 inline-flex items-start flex-col w-full cursor-pointer">
                <span>
                  <h2 className="font-medium text-neutral-700 text-xl">
                    {language?.v3?.property?.d1}
                  </h2>
                  {disclaimersToggler.d1 ? (
                    <React.Fragment>
                      <p
                        className="font-normal text-neutral-500 text-sm"
                        dangerouslySetInnerHTML={{
                          __html: language?.v3?.property?.d_s_1,
                        }}
                      ></p>
                      <p
                        className="font-normal text-neutral-500 text-sm"
                        dangerouslySetInnerHTML={{
                          __html: language?.v3?.property?.d_s_2,
                        }}
                      ></p>
                      {React.Children.toArray(
                        language?.v3?.property?.d_s_arr?.map((item: any) => (
                          <p
                            className="font-normal text-neutral-500 text-sm"
                            dangerouslySetInnerHTML={{ __html: item }}
                          ></p>
                        ))
                      )}
                      <p
                        className="font-normal text-neutral-500 text-sm"
                        dangerouslySetInnerHTML={{
                          __html: language?.v3?.property?.d_s_3,
                        }}
                      ></p>
                      <p
                        className="font-normal text-neutral-500 text-sm"
                        dangerouslySetInnerHTML={{
                          __html: language?.v3?.property?.d_s_4,
                        }}
                      ></p>
                      <button
                        className="cursor-pointer text-sm text-blue-500"
                        onClick={() =>
                          setDisclaimersToggler((prev) => {
                            return { d1: false, d2: false, d3: false };
                          })
                        }
                      >
                        {language?.v3?.button?.seeLess}
                      </button>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <p
                        className="font-normal text-neutral-500 text-sm"
                        dangerouslySetInnerHTML={{
                          __html:
                            language?.v3?.property?.d_s_1?.slice(0, 200) +
                            "...",
                        }}
                      ></p>
                      <button
                        className="cursor-pointer text-sm text-blue-500"
                        onClick={() =>
                          setDisclaimersToggler((prev) => {
                            return { d1: !prev.d1, d2: false, d3: false };
                          })
                        }
                      >
                        {language?.v3?.button?.seeMore}
                      </button>
                    </React.Fragment>
                  )}
                </span>
                <div
                  className="w-full inline-flex justify-between mt-4 cursor-pointer"
                  onClick={() => {
                    setDummyDisclaimers((prev) => {
                      return { ...prev, d1: !prev.d1 };
                    });
                  }}
                >
                  <p className="font-normal text-neutral-700 text-sm">
                    {language?.v3?.common?.accept}
                  </p>
                  <input
                    type="checkbox"
                    checked={dummyDisclaimers.d1}
                    className="accent-cyan-800 cursor-pointer"
                  />
                </div>
              </div>
              <div className="py-3 border-t-[1px] border-neutral-200 inline-flex items-start flex-col w-full cursor-pointer">
                <span>
                  <h2 className="font-medium text-neutral-700 text-xl">
                    {language?.v3?.property?.d2}
                  </h2>
                  {disclaimersToggler.d2 ? (
                    <React.Fragment>
                      <p
                        className="font-normal text-neutral-500 text-sm"
                        dangerouslySetInnerHTML={{
                          __html: language?.v3?.property?.d2_s_1,
                        }}
                      ></p>
                      {React.Children.toArray(
                        language?.v3?.property?.d2_arr?.map((item: any) => (
                          <p
                            className="font-normal text-neutral-500 text-sm"
                            dangerouslySetInnerHTML={{ __html: item }}
                          ></p>
                        ))
                      )}
                      <p
                        className="font-normal text-neutral-500 text-sm"
                        dangerouslySetInnerHTML={{
                          __html: language?.v3?.property?.d2_s_3,
                        }}
                      ></p>
                      <button
                        className="cursor-pointer text-sm text-blue-500"
                        onClick={() =>
                          setDisclaimersToggler((prev) => {
                            return { d1: false, d2: false, d3: false };
                          })
                        }
                      >
                        {language?.v3?.button?.seeLess}
                      </button>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <p
                        className="font-normal text-neutral-500 text-sm"
                        dangerouslySetInnerHTML={{
                          __html:
                            language?.v3?.property?.d2_s_1?.slice(0, 200) +
                            "...",
                        }}
                      ></p>
                      <button
                        className="cursor-pointer text-sm text-blue-500"
                        onClick={() =>
                          setDisclaimersToggler((prev) => {
                            return { d1: false, d2: !prev.d2, d3: false };
                          })
                        }
                      >
                        {language?.v3?.button?.seeMore}
                      </button>
                    </React.Fragment>
                  )}
                </span>
                <div
                  className="w-full inline-flex justify-between mt-4 cursor-pointer"
                  onClick={() => {
                    setDummyDisclaimers((prev) => {
                      return { ...prev, d2: !prev.d2 };
                    });
                  }}
                >
                  <p className="font-normal text-neutral-700 text-sm">
                    {language?.v3?.common?.accept}
                  </p>
                  <input
                    type="checkbox"
                    checked={dummyDisclaimers.d2}
                    className="accent-cyan-800 cursor-pointer"
                  />
                </div>
              </div>
              <div className="py-3 border-t-[1px] border-neutral-200 inline-flex items-start flex-col w-full cursor-pointer">
                <span>
                  <h2 className="font-medium text-neutral-700 text-xl">
                    {language?.v3?.property?.d3}
                  </h2>
                  {disclaimersToggler.d3 ? (
                    <React.Fragment>
                      <p
                        className="font-normal text-neutral-500 text-sm"
                        dangerouslySetInnerHTML={{
                          __html: language?.v3?.property?.d3_s_1,
                        }}
                      ></p>
                      <p
                        className="font-normal text-neutral-500 text-sm"
                        dangerouslySetInnerHTML={{
                          __html: language?.v3?.property?.d3_s_2,
                        }}
                      ></p>
                      <button
                        className="cursor-pointer text-sm text-blue-500"
                        onClick={() =>
                          setDisclaimersToggler((prev) => {
                            return { d1: false, d2: false, d3: false };
                          })
                        }
                      >
                        {language?.v3?.button?.seeLess}
                      </button>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <p
                        className="font-normal text-neutral-500 text-sm"
                        dangerouslySetInnerHTML={{
                          __html:
                            language?.v3?.property?.d3_s_1?.slice(0, 200) +
                            "...",
                        }}
                      ></p>
                      <button
                        className="cursor-pointer text-sm text-blue-500"
                        onClick={() =>
                          setDisclaimersToggler((prev) => {
                            return { d1: false, d2: false, d3: !prev.d3 };
                          })
                        }
                      >
                        {language?.v3?.button?.seeMore}
                      </button>
                    </React.Fragment>
                  )}
                </span>
                <div
                  className="w-full inline-flex justify-between mt-4 cursor-pointer"
                  onClick={() => {
                    setDummyDisclaimers((prev) => {
                      return { ...prev, d3: !prev.d3 };
                    });
                  }}
                >
                  <p className="font-normal text-neutral-700 text-sm">
                    {language?.v3?.common?.accept}
                  </p>
                  <input
                    type="checkbox"
                    checked={dummyDisclaimers.d3}
                    className="accent-cyan-800 cursor-pointer"
                  />
                </div>
              </div>
              <div className="w-full inline-flex items-center justify-center gap-3 mt-10">
                <Button
                  className="w-[100px] bg-transparent border-cyan-800 border-[1px]"
                  type={"outlined"}
                  onClick={() => setModalOpen(null)}
                >
                  {language?.v3?.button?.cancel}
                </Button>
                <Button
                  className="w-[100px]"
                  disabled={
                    !dummyDisclaimers.d1 ||
                    !dummyDisclaimers.d2 ||
                    !dummyDisclaimers.d3
                  }
                  onClick={() => navigate(`${RoutesEnums.CREATE_DEAL}/1`)}
                >
                  {language?.buttons?.continue}
                </Button>
              </div>
            </aside>
          </div>
        ) : (
          <aside>
            <div className="relative p-12 rounded-md shadow-cs-1 flex flex-col items-center w-full bg-white outline-none focus:outline-none screen800:px-3">
              <h2 className="font-bold text-xl text-center text-neutral-900">
                {language?.v3?.common?.submitted_title}
              </h2>
              <p className="text-sm font-normal text-center text-neutral-500 mt-8 mb-7">
                {language?.v3?.common?.submitted_message}
              </p>
              <Button className="w-[100px]" onClick={() => setModalOpen(null)}>
                {language?.v3?.button?.close}
              </Button>
            </div>
          </aside>
        )}
      </Modal>
    </main>
  );
};
export default SyndicateDashboard;

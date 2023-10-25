import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { KanzRoles } from "../../../enums/roles.enum";
import Header from "../../../shared/components/Header";
import Sidebar from "../../../shared/components/Sidebar";
import { RootState } from "../../../redux-toolkit/store/store";
import SearchIcon from "../../../ts-icons/searchIcon.svg";
import Spinner from "../../../shared/components/Spinner";
import Button from "../../../shared/components/Button";
import Table from "../../../shared/components/Table";
import { RoutesEnums } from "../../../enums/routes.enum";
import Modal from "../../../shared/components/Modal";
import CrossIcon from "../../../ts-icons/crossIcon.svg";
import { saveDataHolder } from "../../../redux-toolkit/slicer/dataHolder.slicer";
import { getInvitedSyndicates } from "../../../apis/syndicate.api";
import { saveToken } from "../../../redux-toolkit/slicer/auth.slicer";
import { ApplicationStatus } from "../../../enums/types.enum";
import Chevrond from "../../../ts-icons/chevrond.svg";
import CustomStatus from "../../../shared/components/CustomStatus";
import Drawer from "../../../shared/components/Drawer";
import ArrowIcon from "../../../ts-icons/arrowIcon.svg";
import DownloadIcon from "../../../ts-icons/downloadIcon.svg";

const SyndicateRequest = ({}: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setOpen]: any = useState(false);
  const [CurrentDealTitle, setCurrentDealTitle]: any = useState("");
  const [CurrentDealStatus, setCurrentDealStatus]: any = useState("");
  const [CurrentDealId, setCurrentDealId]: any = useState("");
  const [CurrentSyndicateName, setCurrentSyndicateName]: any = useState("");

  const language: any = useSelector((state: RootState) => state.language.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const user: any = useSelector((state: RootState) => state.user.value);
  let dealName = "";

  const columns = [
    language?.v3?.syndicate?.table?.title,
    language?.v3?.syndicate?.table?.deal_title,
    language?.v3?.syndicate?.table?.status,
    language?.v3?.syndicate?.table?.comments,
    language?.v3?.syndicate?.table?.documents,
    language?.v3?.syndicate?.table?.view,
  ];
  const [pagination, setPagination] = useState({
    items_per_page: 5,
    total_items: [],
    current_page: 1,
    total_pages: 0,
  });
  const [modalOpen, setModalOpen]: any = useState(null);
  const [loading, setLoading] = useState(false);
  const [syndicates, setDeals] = useState([]);
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

  useEffect(() => {
    dispatch(saveDataHolder(""));
    getAllDeals();
  }, []);

  const getAllDeals = async () => {
    try {
      setLoading(true);
      let { status, data } = await getInvitedSyndicates(user.id, authToken);
      if (status === 200) {
        let syndicates = data?.status?.data?.map((syndicate: any) => {
          return {
            id: syndicate?.id,
            [language?.v3?.syndicate?.table?.title]: syndicate?.invitee?.name,
            [language?.v3?.syndicate?.table?.deal_title]:
              syndicate?.deal?.title || "N/A",
            [language?.v3?.table?.stage]: syndicate?.title || "N/A",
            [language?.v3?.syndicate?.table?.status]: (
              <CustomStatus options={syndicate?.status} />
            ),
            [language?.v3?.syndicate?.table?.comments]: syndicate?.comments,
            [language?.v3?.syndicate?.table?.documents]: syndicate?.documents,
            [language?.v3?.syndicate?.table?.view]: (
              <div
                onClick={() => {
                  console.log(syndicate?.deal?.id);
                  setOpen(true);
                  setCurrentDealId(syndicate?.deal?.id);
                  setCurrentDealTitle(syndicate?.deal?.title || "N/A");
                  setCurrentDealStatus(syndicate?.status || "N/A");
                  setCurrentSyndicateName(syndicate?.invitee?.name || "N/A");
                  /*   console.log("====================================");
                  console.log(CurrentDealId);
                  console.log("===================================="); */
                }}
                className="bg-neutral-100 inline-flex items-center justify-center w-[30px] h-[30px] rounded-full transition-all hover:bg-cbc-transparent"
              >
                <Chevrond
                  className="rotate-[-90deg] w-6 h-6"
                  stroke={"#737373"}
                />
              </div>
            ),
          };
        });
        setPagination((prev) => {
          return {
            ...prev,
            total_items: syndicates.length,
            current_page: 1,
            total_pages: Math.ceil(syndicates.length / prev.items_per_page),
            data: syndicates?.slice(0, prev.items_per_page),
          };
        });
        setDeals(syndicates);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        dispatch(saveToken(""));
        navigate(RoutesEnums.LOGIN, { state: RoutesEnums.STARTUP_DASHBOARD });
      }
    } finally {
      setLoading(false);
    }
  };

  const paginate = (type: string) => {
    if (type === "next" && pagination.current_page < pagination.total_pages) {
      setPagination((prev: any) => {
        const nextPage = prev.current_page + 1;
        const startIndex = (nextPage - 1) * prev.items_per_page;
        const endIndex = startIndex + prev.items_per_page;
        const data = syndicates.slice(startIndex, endIndex);
        return { ...prev, current_page: nextPage, data };
      });
    } else if (type === "previous" && pagination.current_page > 1) {
      setPagination((prev: any) => {
        const prevPage = prev.current_page - 1;
        const startIndex = (prevPage - 1) * prev.items_per_page;
        const endIndex = startIndex + prev.items_per_page;
        const data = syndicates.slice(startIndex, endIndex);

        return { ...prev, current_page: prevPage, data };
      });
    }
  };

  return (
    <main className="h-full max-h-full overflow-y-auto">
      <section>
        <Header />
      </section>
      <aside className="w-full h-full flex items-start justify-start">
        <Sidebar type={KanzRoles.STARTUP} />
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
                <h1 className="text-black font-medium text-2xl mb-2">
                  {language?.v3?.startup?.overview?.heading_4}
                </h1>
              </section>
              <section className="inline-flex justify-between items-center w-full">
                <div className="w-full">
                  <span className="w-full flex items-center gap-5">
                    <div className="rounded-md shadow-cs-6 bg-white border-[1px] border-gray-200 h-9 overflow-hidden max-w-[310px] inline-flex items-center px-2">
                      <SearchIcon />
                      <input
                        type="search"
                        className="h-full w-full outline-none pl-2 px-24 text-sm font-normal text-gray-400"
                        placeholder={language?.v3?.common?.search}
                      />
                    </div>
                  </span>
                </div>
              </section>

              <section className="mt-10">
                <Table
                  columns={columns}
                  pagination={pagination}
                  paginate={paginate}
                  onclick={() => {}}
                  /*   onclick={(row: any) => {
                    if (row?.Status !== ApplicationStatus.SUBMITTED) {
                      dispatch(saveDataHolder(row.id));
                      navigate(
                        `/create-syndicate/${row?.State?.current_step + 2}`
                      );
                    } else setModalOpen("2");
                  }} */
                  noDataNode={
                    <span className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
                      No Data
                    </span>
                  }
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
                {language?.v3?.startup?.disc_tit}
              </h2>
              <p className="text-sm font-normal text-center text-neutral-500 mt-8 mb-12">
                {language?.v3?.startup?.disc_desc}
              </p>
              <div className="py-3 border-t-[1px] border-neutral-200 inline-flex items-start flex-col w-full cursor-pointer">
                <span>
                  <h2 className="font-medium text-neutral-700 text-xl">
                    {language?.v3?.startup?.d1}
                  </h2>
                  {disclaimersToggler.d1 ? (
                    <React.Fragment>
                      <p
                        className="font-normal text-neutral-500 text-sm"
                        dangerouslySetInnerHTML={{
                          __html: language?.v3?.startup?.d_s_1,
                        }}
                      ></p>
                      <p
                        className="font-normal text-neutral-500 text-sm"
                        dangerouslySetInnerHTML={{
                          __html: language?.v3?.startup?.d_s_2,
                        }}
                      ></p>
                      <p
                        className="font-normal text-neutral-500 text-sm"
                        dangerouslySetInnerHTML={{
                          __html: language?.v3?.startup?.d_s_3,
                        }}
                      ></p>
                      {React.Children.toArray(
                        language?.v3?.startup?.d_s_arr_1?.map((item: any) => (
                          <p
                            className="font-normal text-neutral-500 text-sm"
                            dangerouslySetInnerHTML={{ __html: item }}
                          ></p>
                        ))
                      )}
                      <p
                        className="font-normal text-neutral-500 text-sm"
                        dangerouslySetInnerHTML={{
                          __html: language?.v3?.startup?.d_s_4,
                        }}
                      ></p>
                      <p
                        className="font-normal text-neutral-500 text-sm"
                        dangerouslySetInnerHTML={{
                          __html: language?.v3?.startup?.d_s_5,
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
                            language?.v3?.startup?.d_s_1?.slice(0, 200) + "...",
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
                    {language?.v3?.startup?.d2}
                  </h2>
                  {disclaimersToggler.d2 ? (
                    <React.Fragment>
                      <p
                        className="font-normal text-neutral-500 text-sm"
                        dangerouslySetInnerHTML={{
                          __html: language?.v3?.startup?.d2_s_1,
                        }}
                      ></p>
                      <p
                        className="font-normal text-neutral-500 text-sm"
                        dangerouslySetInnerHTML={{
                          __html: language?.v3?.startup?.d2_s_2,
                        }}
                      ></p>
                      {React.Children.toArray(
                        language?.v3?.startup?.d2_arr_1?.map((item: any) => (
                          <p
                            className="font-normal text-neutral-500 text-sm"
                            dangerouslySetInnerHTML={{ __html: item }}
                          ></p>
                        ))
                      )}
                      <p
                        className="font-normal text-neutral-500 text-sm"
                        dangerouslySetInnerHTML={{
                          __html: language?.v3?.startup?.d2_s_3,
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
                            language?.v3?.startup?.d2_s_1?.slice(0, 200) +
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
                    {language?.v3?.startup?.d3}
                  </h2>
                  {disclaimersToggler.d3 ? (
                    <React.Fragment>
                      <p
                        className="font-normal text-neutral-500 text-sm"
                        dangerouslySetInnerHTML={{
                          __html: language?.v3?.startup?.d3_s_1,
                        }}
                      ></p>
                      <p
                        className="font-normal text-neutral-500 text-sm"
                        dangerouslySetInnerHTML={{
                          __html: language?.v3?.startup?.d3_s_2,
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
                            language?.v3?.startup?.d3_s_1?.slice(0, 200) +
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

      <Drawer
        drawerWidth="w-[700px]"
        isOpen={isOpen}
        setIsOpen={(val: boolean) => setOpen(val)}
      >
        <div className="z-[103px]">
          <header className="text-lg pr-3 pt-3 pb-10 items-center  w-full">
            <section className="w-full items-center justify-between flex">
              <span>{CurrentSyndicateName}</span>
              <span>
                <Button>Approve</Button>
              </span>
            </section>
          </header>
          <section>
            <h2 className="text-lg font-bold">About</h2>
            <p className=" overflow-auto max-h-56 text-neutral-700 pt-2 font-normal text-sm text-justify">
              {language?.drawer?.realtor}
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Similique nesciunt magni culpa, dicta, nostrum, explicabo qui cum
              beatae placeat ratione soluta tempore doloremque voluptatum eum?
              Mollitia quae id ullam labore?
            </p>
          </section>
          <section>
            <aside className="pt-4">
              <div className="justify-between pr-2 flex items-center">
                <span className="text-lg font-bold">Deal</span>
                <span>
                  {" "}
                  <CustomStatus options={CurrentDealStatus} />
                </span>
              </div>
            </aside>
            <aside className="pt-2">
              <span>{CurrentDealTitle}</span>
            </aside>
          </section>
          <section className="inline-flex w-full">
            <aside className="pt-8 w-full inline-flex justify-between">
              <div className="justify-between  pr-2 pb-2 w-10/12">
                <div className="text-lg font-bold">Comment</div>
                <p className="w-full pt-2 opacity-80 max-h-24 text-neutral-700 font-normal text-sm text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Deleniti saepe, doloremque numquam amet tempora velit quis,
                  nostrum perspiciatis nesciunt ipsam quo magnam iure dolorem,
                  rerum maxime incidunt similique ea provident?
                </p>
              </div>
              <span className="h-[50px] w-[175px] ">
                <Button type="outlined">
                  <span
                    onClick={() => {}}
                    className="px-5 text-lg font-semibold"
                  >
                    Add Reply
                  </span>
                </Button>
              </span>
            </aside>
          </section>
          <section className="pt-8">
            <aside>
              <h1 className="text-lg font-bold">Documents</h1>
              <aside className="border-[1px] border-neutral-200 rounded-md w-full p-3 mt-5 bg-cbc-check">
                <section className="rounded-md bg-white px-3 py-1 inline-flex items-center justify-between w-full border-[1px] border-neutral-200">
                  <span className="inline-flex items-center">
                    <div className="bg-white  h-14 inline-flex justify-center flex-col w-full">
                      <h4
                        className="inline-flex items-center gap-3 max-w-[200px] cursor-pointer"
                        onClick={() =>
                          setModalOpen({ url: "", open: true, type: "" })
                        }
                      >
                        <div className="text-sm text-black font-medium ">
                          View Doc
                        </div>
                        <ArrowIcon stroke="#000" />
                      </h4>
                      <h2
                        className="text-sm font-medium text-neutral-500 max-w-xl truncate"
                        title={"doc?.name"}
                      >
                        {"doc?.name"}
                      </h2>
                    </div>
                  </span>

                  <div className="h-10 w-10 rounded-lg inline-flex items-center flex-row justify-center gap-2 bg-white cursor-pointer border-[1px] border-neutral-200">
                    <DownloadIcon />
                  </div>
                </section>
              </aside>
            </aside>
          </section>
        </div>
      </Drawer>
    </main>
  );
};
export default SyndicateRequest;

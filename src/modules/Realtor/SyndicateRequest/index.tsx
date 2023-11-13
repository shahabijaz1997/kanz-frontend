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
import { getViewDealSyndicates, signOff } from "../../../apis/deal.api";
import { addCommentOnDeal } from "../../../apis/deal.api";
import { saveToken } from "../../../redux-toolkit/slicer/auth.slicer";
import { ApplicationStatus } from "../../../enums/types.enum";
import Chevrond from "../../../ts-icons/chevrond.svg";
import CustomStatus from "../../../shared/components/CustomStatus";
import Drawer from "../../../shared/components/Drawer";
import UploadIcon from "../../../ts-icons/uploadIcon.svg";
import ArrowIcon from "../../../ts-icons/arrowIcon.svg";
import DownloadIcon from "../../../ts-icons/downloadIcon.svg";
import { fileSize, handleFileRead } from "../../../utils/files.utils";
import { FileType } from "../../../enums/types.enum";
import { toast } from "react-toastify";
import { toastUtil } from "../../../utils/toast.utils";

const SyndicateRequest = ({}: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setOpen]: any = useState(false);
  const [CommentSubmitted, setCommentSubmitted]: any = useState(false);
  const [files, setFiles]: any = useState([]);
  const language: any = useSelector((state: RootState) => state.language.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const user: any = useSelector((state: RootState) => state.user.value);

  const [changes, setChanges]: any = useState({
    comment: "",
    action: "",
    document: null,
  });
  const [pagination, setPagination] = useState({
    items_per_page: 10,
    total_items: [],
    current_page: 1,
    total_pages: 0,
  });
  const [modalOpen, setModalOpen]: any = useState(null);
  const [syndicateInfo, setsyndicateInfo]: any = useState(null);
  const [modalReplyOpen, setmodalReplyOpen]: any = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadDrawer, setLoadingDrawer] = useState(false);

  const [syndicates, setsyndicates]: any = useState([]);
  const [syndicatesInformation, setsyndicatesInformation] = useState([]);
  const [dealDetail, setDealDetail]: any = useState(null);

  useEffect(() => {
    dispatch(saveDataHolder(""));
    getAllDeals();
  }, []);

  const setFileInformation = async (file: File) => {
    let size = fileSize(file.size, "mb");
    let type;

    setLoading(true);
    if (file.type.includes("video")) type = FileType.VIDEO;
    else if (file.type.includes("image")) {
      type = FileType.IMAGE;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img: any = new Image();
        img.src = reader.result;
      };
    } else {
      type = FileType.PDF;
      const reader = new FileReader();
      reader.readAsDataURL(file);
    }
    const fileData: any = await handleFileRead(file);

    doUploadUtil(fileData, size, type);
    setLoading(false);
  };

  const doUploadUtil = (file: any, size: any, type: string) => {
    setFiles((prev: any) => {
      return [...prev, { file, size, type, id: prev.length + 1 }];
    });

    let timer = setTimeout(() => {
      setLoading(false);
      clearTimeout(timer);
    }, 1000);
  };
  const postSignOff = async (id: any) => {
    try {
      setLoading(true);
      let payload: any = {
        deal: {
          invite_id: dealDetail?.invite_id,
        },
      };
      let { status, data } = await signOff(payload, id, authToken);
      if (status === 200) {
        toast.success("Congratulations! Deal Signed Off");
        setModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      viewDealSyndicate(syndicateInfo?.deal?.id, syndicateInfo?.invitee?.id);
      setLoading(false);
      setChanges({ comment: "", action: "", document: null });
    }
  };

  const onAddCommentOnDeal = async (id: any) => {
    try {
      setLoading(true);
      let payload = {
        message: changes.comment,
        thread_id: dealDetail?.comments[0]?.id,
      };
      let { status, data } = await addCommentOnDeal(id, authToken, payload);
      if (status === 200) {
        setModalOpen(false);
        viewDealSyndicate(syndicateInfo?.deal?.id, syndicateInfo?.invitee?.id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.success(language?.v3?.common?.suces_msg, toastUtil);
      setLoading(false);
      setChanges({ comment: "", action: "", document: null });
    }
  };

  const columns = [
    language?.v3?.deal?.syndicate,
    language?.v3?.common?.deal,
    "Invite Status",
    language?.v3?.deal?.comments,
    language?.v3?.table?.view,
    "",
  ];
  const getAllDeals = async () => {
    try {
      setLoading(true);
      let { status, data } = await getInvitedSyndicates(user.id, authToken);
      if (status === 200) {
        let syndicates = data?.status?.data?.map((syndicate: any) => {
          return {
            id: syndicate?.id,
            [language?.v3?.deal?.syndicate]: syndicate?.invitee?.name,
            [language?.v3?.common?.deal]: syndicate?.deal?.title || "N/A",
            [language?.v3?.deal?.comments]: syndicate?.deal?.comment || "N/A",
            ["Invite Status"]: <CustomStatus options={syndicate?.status} />,
            "": (
              <div
                onClick={() => {
                  setsyndicateInfo(syndicate);
                  viewDealSyndicate(
                    syndicate?.deal?.id,
                    syndicate?.invitee?.id
                  );
                  setOpen(true);
                }}
                className="bg-neutral-100 inline-flex items-center justify-center w-[30px] h-[30px] rounded-full transition-all hover:bg-cbc-transparent"
              >
                <Chevrond
                  className="rotate-[-90deg] w-6 h-6"
                  stroke={"#737373"}
                />
              </div>
            ),
            dealId: syndicate?.deal?.id,
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
        setsyndicates(syndicates);
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
  const viewDealSyndicate = async (dealId: any, syndicateId: any) => {
    try {
      setLoadingDrawer(true);
      let { status, data } = await getViewDealSyndicates(
        dealId,
        syndicateId,
        authToken
      );
      if (status === 200) {
        setDealDetail(data?.status?.data);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        dispatch(saveToken(""));
        navigate(RoutesEnums.LOGIN, { state: RoutesEnums.STARTUP_DASHBOARD });
      }
    } finally {
      setLoadingDrawer(false);
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
    } else {
      setPagination((prev: any) => {
        const prevPage = Number(type) + 1 - 1;
        const startIndex = (prevPage - 1) * prev.items_per_page;
        const endIndex = startIndex + prev.items_per_page;
        const data = syndicates.slice(startIndex, endIndex);

        return { ...prev, current_page: type, data };
      });
    }
  };

  return (
    <main className="h-full max-h-full overflow-y-auto">
      <section>
        <Header />
      </section>
      <aside className="w-full h-full flex items-start justify-start">
        <Sidebar type={user?.role} />
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
                  goToPage={paginate}
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
      

{/* 
{/* .########..########.....###....##......##.########.########.
{/* .##.....##.##.....##...##.##...##..##..##.##.......##.....##
{/* .##.....##.##.....##..##...##..##..##..##.##.......##.....##
{/* .##.....##.########..##.....##.##..##..##.######...########.
{/* .##.....##.##...##...#########.##..##..##.##.......##...##..
{/* .##.....##.##....##..##.....##.##..##..##.##.......##....##.
{/* .########..##.....##.##.....##..###..###..########.##.....##
{/* */ }


      
      <Drawer
        drawerWidth="w-[700px]"
        isOpen={isOpen}
        setIsOpen={(val: boolean) => {
          setsyndicateInfo(null);
          setOpen(val);
        }}
      >
        {loadDrawer ? (
          <aside className="relative h-full">
            <div className="absolute left-0 top-0 w-full h-full grid place-items-center">
              <Spinner />
            </div>
          </aside>
        ) : (
          <div className="z-[103px]">
            <header className="text-lg pr-3 pt-3 pb-5 items-center  w-full sticky">
              <section className="border-b-[1px] border-b-neutral-200 pb-10 w-full items-center capitalize justify-between flex">
                <div className="inline-flex items-center">
                  <span>
                    <img
                      className=" h-9 w-9 mr-2.5 rounded-full"
                      src={dealDetail?.profile?.logo}
                    ></img>
                  </span>
                  <span className="items-center">{dealDetail?.name}</span>
                </div>

                <span className="items-center">
                  {dealDetail?.status !== "approved" &&
                    dealDetail?.deal?.status !== "live" && (
                      <Button
                        onClick={() =>
                          postSignOff(dealDetail?.comments[0]?.deal_id)
                        }
                      >
                        Approve
                      </Button>
                    )}
                </span>
              </section>
            </header>
            <section className="border-b-[1px] border-b-neutral-200 pb-5 items-center">
              <aside>
                <div className="justify-between pr-2 flex items-center">
                  <span className="text-lg font-bold">Deal</span>
                  <span>
                    {" "}
                    <CustomStatus options={dealDetail?.deal?.status} />
                  </span>
                </div>
              </aside>
              <aside className="pt-2">
                <span>{dealDetail?.deal?.title}</span>
              </aside>
            </section>
            {dealDetail?.thread_id && (
              <section className="inline-flex w-full border-b-[1px] border-b-neutral-200 pb-5">
                <aside className="pt-8 w-full">
                  {dealDetail?.comments?.length > 0 && (
                    <div className="justify-between  pr-2 pb-2 w-full">
                      <div className="w-full inline-flex justify-between items-center pb-4">
                        <div className="text-lg font-bold">Comments</div>
                        <div>
                          {dealDetail?.thread_id !== null && (
                            <span className="h-[50px] w-[125px] ">
                              <Button type="outlined">
                                <span
                                  onClick={() => setmodalReplyOpen(true)}
                                  className="text-md font-semibold"
                                >
                                  Add Reply
                                </span>
                              </Button>
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="w-full">
                        {" "}
                        <p className=" overflow-y-auto custom-scroll rounded-md  w-full opacity-80 max-h-56 text-neutral-700 font-normal text-sm text-justify">
                          {React.Children.toArray(
                            dealDetail?.comments?.map((comments: any) => (
                              <div className="p-2 pt-3 overflow-hidden font-medium  w-full items-center justify-between">
                                <div className=" pl-2 inline-flex items-start">
                                  <img
                                    className="h-7 w-7 rounded-full"
                                    src={
                                      comments?.author_id === user?.id
                                        ? "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
                                        : dealDetail?.profile?.logo
                                    }
                                    alt="Author Logo"
                                  />
                                  <span className="ml-2 mr-4">
                                    <h1 className="font-medium capitalize text-xl">
                                      {comments?.author_id === user?.id
                                        ? "You"
                                        : comments?.author_name}
                                    </h1>
                                    <p className="pt-1 overflow-auto custom-scroll">
                                      {comments?.message}
                                    </p>
                                  </span>
                                </div>
                              </div>
                            ))
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                </aside>
              </section>
            )}
            {dealDetail?.attachments?.length > 0 && (
              <section className="pt-8">
                <aside>
                  <h1 className="text-lg font-bold">Documents</h1>
                  <aside className="overflow-y-auto custom-scroll max-h-56 border-[1px] border-neutral-200 rounded-md w-full p-3 mt-5 bg-cbc-check">
                    {React.Children.toArray(
                      dealDetail?.attachments?.map((documents: any) => (
                        <section className="rounded-md bg-white px-3 py-1 my-1 inline-flex items-center justify-between w-full border-[1px] border-neutral-200">
                          <span className="inline-flex items-center">
                            <div className="bg-white  h-14 inline-flex justify-center flex-col w-full">
                              <h4
                                className="inline-flex items-center gap-3 max-w-[200px] cursor-pointer"
                                onClick={() => {
                                  window.open(documents?.url, "_blank");
                                }}
                              >
                                <div
                                  onClick={() => {
                                    window.open(documents?.url, "_blank");
                                  }}
                                  className="text-sm text-black font-medium "
                                >
                                  View Doc
                                </div>
                                <ArrowIcon stroke="#000" />
                              </h4>
                              <h2
                                className="text-sm font-medium text-neutral-500 max-w-xl truncate"
                                title={documents?.name}
                              >
                                {documents?.name}
                              </h2>
                            </div>
                          </span>

                          <div
                            className="h-10 w-10 rounded-lg inline-flex items-center flex-row justify-center gap-2 bg-white cursor-pointer border-[1px] border-neutral-200"
                            onClick={() => {
                              const downloadLink = document.createElement("a");
                              downloadLink.href = documents?.url;
                              downloadLink.target = "_blank";
                              downloadLink.download = documents?.name;
                              downloadLink.click();
                              downloadLink.remove();
                            }}
                          >
                            <DownloadIcon />
                          </div>
                        </section>
                      ))
                    )}
                  </aside>
                </aside>
              </section>
            )}
          </div>
        )}
      </Drawer>

      {/*
      {.......##.................###....########..########..########...#######..##.....##.########....##.....##..#######..########.....###....##..........................##
      {......##...##...##.......##.##...##.....##.##.....##.##.....##.##.....##.##.....##.##..........###...###.##.....##.##.....##...##.##...##...........##...##.......##.
      {.....##.....##.##.......##...##..##.....##.##.....##.##.....##.##.....##.##.....##.##..........####.####.##.....##.##.....##..##...##..##............##.##.......##..
      {....##....#########....##.....##.########..########..########..##.....##.##.....##.######......##.###.##.##.....##.##.....##.##.....##.##..........#########....##...
      {...##.......##.##......#########.##........##........##...##...##.....##..##...##..##..........##.....##.##.....##.##.....##.#########.##............##.##.....##....
      {..##.......##...##.....##.....##.##........##........##....##..##.....##...##.##...##..........##.....##.##.....##.##.....##.##.....##.##...........##...##...##.....
      {.##....................##.....##.##........##........##.....##..#######.....###....########....##.....##..#######..########..##.....##.########..............##......
      {*/}

      <Modal show={modalOpen ? true : false} className="w-full">
        {!CommentSubmitted ? (
          <div
            className="rounded-md overflow-hidden inline-grid place-items-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.078" }}
          >
            <aside className="bg-white w-[700px] rounded-md h-full">
              <header className="bg-cbc-grey-sec h-16 py-2 px-3 inline-flex w-full justify-between items-center">
                <h3 className="text-xl font-medium text-neutral-700">
                  Deal Approval
                </h3>
                <div
                  className="bg-white h-8 w-8 border-[1px] border-black rounded-md  shadow-cs-6 p-1 cursor-pointer"
                  onClick={() => {
                    setModalOpen(false);
                    setChanges({ comment: "", action: "", document: null });
                  }}
                >
                  <CrossIcon stroke="#000" />
                </div>
              </header>
              <section>
                <div className="justify-between  px-4 pt-2 w-full">
                  <div className="text-lg font-bold">Comment</div>
                  <p className="w-full pt-2 opacity-80 max-h-24 text-neutral-700  font-lg text-sm text-justify">
                    {dealDetail?.comments && dealDetail.comments.length > 0 && (
                      <p>
                        {dealDetail.comments
                          .slice(-1)
                          .map((comment: any) => comment.message)}
                      </p>
                    )}
                  </p>
                </div>
              </section>
              <section className="py-3 px-4">
                <div className="mb-6">
                  <label
                    htmlFor=""
                    className="text-neutral-900 font-medium text-sm"
                  >
                    Add Comment
                  </label>
                  <textarea
                    value={changes?.comment}
                    onChange={(e) =>
                      setChanges((prev: any) => {
                        return { ...prev, comment: e.target.value };
                      })
                    }
                    placeholder="Add Comment"
                    className=" h-[100px] mt-1 shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                  ></textarea>
                </div>
              </section>

              <footer className="w-full inline-flex justify-between gap-3 py-2 px-3">
                <Button
                  className="w-full !py-1"
                  divStyle="flex items-center justify-center w-full"
                  onClick={() => {
                    onAddCommentOnDeal(dealDetail?.comments[0]?.deal_id);
                    setmodalReplyOpen(null);
                    setCommentSubmitted(0);
                  }}
                >
                  Submit
                </Button>
              </footer>
            </aside>
          </div>
        ) : (
          <aside>
            <div className="relative p-12 rounded-md shadow-cs-1 flex flex-col items-center w-full bg-white outline-none focus:outline-none screen800:px-3">
              <h2 className="font-bold text-xl text-center text-neutral-900">
                {language?.v3?.common?.submitted_title}
              </h2>
              {
                <p className="text-sm font-normal text-center text-neutral-500 mt-8 mb-7">
                  {language?.v3?.common?.submitted_message}
                </p>
              }
              <Button
                className="w-[100px]"
                onClick={() => {
                  setModalOpen(null);
                  setCommentSubmitted(0);
                }}
              >
                {language?.v3?.button?.close}
              </Button>
            </div>
          </aside>
        )}
      </Modal>

      {/*
      {.......##...............######...#######..##.....##.##.....##.########.##....##.########.......##.....##..#######..########.....###....##..........................##
      {......##...##...##.....##....##.##.....##.###...###.###...###.##.......###...##....##..........###...###.##.....##.##.....##...##.##...##...........##...##.......##.
      {.....##.....##.##......##.......##.....##.####.####.####.####.##.......####..##....##..........####.####.##.....##.##.....##..##...##..##............##.##.......##..
      {....##....#########....##.......##.....##.##.###.##.##.###.##.######...##.##.##....##..........##.###.##.##.....##.##.....##.##.....##.##..........#########....##...
      {...##.......##.##......##.......##.....##.##.....##.##.....##.##.......##..####....##..........##.....##.##.....##.##.....##.#########.##............##.##.....##....
      {..##.......##...##.....##....##.##.....##.##.....##.##.....##.##.......##...###....##..........##.....##.##.....##.##.....##.##.....##.##...........##...##...##.....
      {.##.....................######...#######..##.....##.##.....##.########.##....##....##..........##.....##..#######..########..##.....##.########..............##......
      {*/}

      <Modal show={modalReplyOpen ? true : false} className="w-full">
        {!CommentSubmitted ? (
          <div
            className="rounded-md overflow-hidden inline-grid place-items-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.078" }}
          >
            <aside className="bg-white w-[700px] rounded-md p-5 h-full">
              <section>
                <div className="justify-between inline-flex pt-3 px-3 w-full">
                  <div className="text-lg font-bold">Latest Comment</div>
                  <div
                    className="bg-white h-8 w-8 border-[1px] border-black rounded-md  shadow-cs-6 p-1 cursor-pointer"
                    onClick={() => {
                      setmodalReplyOpen(false);
                      setChanges({ comment: "", action: "", document: null });
                    }}
                  >
                    <CrossIcon stroke="#000" />
                  </div>
                </div>
              </section>

              <section>
                <div className="justify-between  px-3  w-full">
                  <p className="w-full pt-2 opacity-80 max-h-24 text-neutral-700  font-lg text-sm text-justify">
                    {dealDetail?.comments && dealDetail.comments.length > 0 && (
                      <p className="overflow-auto custom-scroll max-h-24">
                        {dealDetail.comments
                          .slice(-1)
                          .map((comment: any) => comment.message)}
                      </p>
                    )}
                  </p>
                </div>
              </section>
              <section className="py-3 px-3">
                <div className="mb-6">
                  <label
                    htmlFor=""
                    className="text-neutral-900 font-medium text-sm"
                  >
                    Reply:
                  </label>
                  <textarea
                    value={changes?.comment}
                    onChange={(e) =>
                      setChanges((prev: any) => {
                        return { ...prev, comment: e.target.value };
                      })
                    }
                    placeholder="Add Reply"
                    className=" h-[100px] mt-1 shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                  ></textarea>
                </div>
              </section>

              <footer className="w-full inline-flex justify-between gap-3 py-2 px-3">
                <Button
                  disabled={!changes.comment}
                  className="w-full !py-1"
                  divStyle="flex items-center justify-center w-full"
                  onClick={() => {
                    onAddCommentOnDeal(dealDetail?.comments[0]?.deal_id);
                    setmodalReplyOpen(null);
                    setCommentSubmitted(0);
                  }}
                >
                  Submit
                </Button>
              </footer>
            </aside>
          </div>
        ) : (
          <aside>
            <div className="relative p-12 rounded-md shadow-cs-1 flex flex-col items-center w-full bg-white outline-none focus:outline-none screen800:px-3">
              <h2 className="font-bold text-xl text-center text-neutral-900">
                {language?.v3?.common?.submitted_title}
              </h2>
              {
                <p className="text-sm font-normal text-center text-neutral-500 mt-8 mb-7">
                  {language?.v3?.common?.submitted_message}
                </p>
              }
              <Button
                className="w-[100px]"
                onClick={() => {
                  setmodalReplyOpen(null);
                  setCommentSubmitted(0);
                }}
              >
                {language?.v3?.button?.close}
              </Button>
            </div>
          </aside>
        )}
      </Modal>
    </main>
  );
};
export default SyndicateRequest;

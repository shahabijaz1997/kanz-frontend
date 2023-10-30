import React, { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { KanzRoles } from "../../enums/roles.enum";
import { RootState } from "../../redux-toolkit/store/store";
import Header from "../../shared/components/Header";
import Sidebar from "../../shared/components/Sidebar";
import Chevrond from "../../ts-icons/chevrond.svg";
import Button from "../../shared/components/Button";
import CustomDropdown from "../../shared/components/CustomDropdown";
import MenuIcon from "../../ts-icons/menuIcon.svg";
import DealInvestors from "./DealInvestors";
import DealTable from "../../shared/components/DealTable";
import DealViewDetails from "./DealViewDetails";
import DocumentDetails from "./DocumentDetails";
import NoteDetails from "./NoteDetails";
import ActivityDetails from "./ActivityDetails";
import Spinner from "../../shared/components/Spinner";
import { getDealDetail, getDealDocuments } from "../../apis/deal.api";
import InvitedSyndicates from "./InvitedSyndicates";
import UserListingPopup from "./UserListingPopup";
import Requests from "./Requests";
import { ApplicationStatus } from "../../enums/types.enum";

const DealDetail = ({}: any) => {
  const params = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const { id }: any = params;
  const language: any = useSelector((state: RootState) => state.language.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const tabs = [
    { id: 1, title: "Details" },
    { id: 2, title: "Investors" },
    { id: 3, title: "Documents" },
    { id: 4, title: "Existing SAFE/Note Holders" },
    { id: 5, title: "Activity" },
    { id: 6, title: "Invited Syndicates" },
    { id: 7, title: "Requests" },
  ];

  const [selected, setSelected]: any = useState(tabs[0]);
  const [loading, setLoading]: any = useState(false);
  const [dealDetail, setDealDetail]: any = useState(null);
  const [dealDocs, setDealDocs] = useState(null);
  const [showInviteSyndicate, setShowInviteSyndicate] = useState(false);

  useLayoutEffect(() => {
    if (selected.id === 1) onGetDealDetail();
    else if (selected.id === 3) onGetDealFiles();
  }, [selected]);

  const onGetDealDetail = async () => {
    try {
      setLoading(true);
      let { status, data } = await getDealDetail(id, authToken);
      if (status === 200) setDealDetail(data?.status?.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const onGetDealFiles = async () => {
    try {
      setLoading(true);
      let { status, data } = await getDealDocuments(id, authToken);
      if (status === 200) setDealDocs(data?.status?.data);
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
        <Sidebar
          type={
            state === KanzRoles.STARTUP
              ? KanzRoles.STARTUP
              : KanzRoles.SYNDICATE
          }
        />
        {loading ? (
          <div
            className="absolute left-0 top-0 w-full h-full grid place-items-center"
            style={{ backgroundColor: "rgba(255, 255, 255, 1)", zIndex: 50 }}
          >
            <Spinner />
          </div>
        ) : (
          <section
            className="bg-cbc-auth h-full p-[5rem]"
            style={{ width: "calc(100% - 250px)" }}
          >
            <span
              className="inline-flex items-center gap-2 relative top-[-25px] cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <Chevrond stroke="#000" className="rotate-90 w-4 h-4" />
              <small className="text-neutral-500 text-sm font-medium">
                {language?.v3?.common?.deal}
              </small>
            </span>

            <section className="inline-flex justify-between items-center w-full mb-4">
              <h1 className="text-black font-medium text-2xl">
                {state === KanzRoles.STARTUP
                  ? language?.v3?.deal?.angel_round
                  : language?.v3?.deal?.deal_detail}
              </h1>
              <div className="inline-flex items-center gap-2">
                <div className="relative z-10">
                  <Button
                    onClick={() => setShowInviteSyndicate(!showInviteSyndicate)}
                    className="w-[80px]"
                    disabled={dealDetail?.status !== ApplicationStatus.APPROVED}
                  >
                    {language?.v3?.button?.invite}
                  </Button>
                  {showInviteSyndicate && (
                    <UserListingPopup dealId={id} type={KanzRoles.SYNDICATE} />
                  )}
                </div>

                <div className="bg-white rounded-md border-neutral-300 border-[1px] inline-flex items-center justify-center">
                  <CustomDropdown
                    className="px-5 py-3"
                    mainNode={<MenuIcon />}
                  />
                </div>
              </div>
            </section>
            {state !== KanzRoles.REALTOR && (
              <section className="mt-1 mb-16">
                <DealTable />
              </section>
            )}

            <section>
              <ul className="flex border-neutral-200 border-b-[1px]">
                {React.Children.toArray(
                  tabs.map((tab) => (
                    <li
                      className={`${
                        selected?.id === tab?.id
                          ? "border-cyan-800 border-b-[1px] text-cyan-800"
                          : "text-neutral-500"
                      } cursor-pointer font-medium text-sm py-4 mr-9 px-2 transition-all`}
                      onClick={() => setSelected(tab)}
                    >
                      {tab.title}
                    </li>
                  ))
                )}
              </ul>

              <div className="mt-10 mb-4">
                <h2 className="text-black text-xl font-medium">
                  {selected?.title}
                </h2>
              </div>
            </section>

            {selected?.id === 1 && (
              <DealViewDetails
                id={id}
                state={state}
                dealDetail={dealDetail}
                navigate={navigate}
              />
            )}
            {selected?.id === 2 && <DealInvestors />}
            {selected?.id === 3 && <DocumentDetails dealDocs={dealDocs} />}
            {selected?.id === 4 && <NoteDetails />}
            {selected?.id === 5 && <ActivityDetails />}
            {selected?.id === 6 && <InvitedSyndicates id={id} />}
            {selected?.id === 7 && <Requests id={id} />}
          </section>
        )}
      </aside>
    </main>
  );
};
export default DealDetail;

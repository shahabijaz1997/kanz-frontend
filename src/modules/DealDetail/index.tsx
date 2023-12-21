import React, { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { KanzRoles } from "../../enums/roles.enum";
import { RootState } from "../../redux-toolkit/store/store";
import Header from "../../shared/components/Header";
import Sidebar from "../../shared/components/Sidebar";
import Chevrond from "../../ts-icons/chevrond.svg";
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
import Usp from "./Usp";
import { DealPromotionType } from "../../enums/types.enum";
import InvitesListing from "../SyndicateDealOverview/InvitesListing";
import InvitedInvestors from "./InvitedInvestors";

const DealDetail = ({}: any) => {
  const params = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const { id }: any = params;
  const language: any = useSelector((state: RootState) => state.language.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const orientation: any = useSelector(
    (state: RootState) => state.orientation.value
  );

  const [loading, setLoading]: any = useState(false);
  const [dealDetail, setDealDetail]: any = useState(null);
  const [dealDocs, setDealDocs] = useState(null);

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
      let { status, data } = await getDealDocuments(dealDetail?.id, authToken);
      if (status === 200) setDealDocs(data?.status?.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const tabs =
    dealDetail?.model !== "_"
      ? dealDetail?.model === DealPromotionType.SYNDICATE
        ? [
            { id: 1, title: language?.v3?.fundraiser?.details },
            { id: 3, title: language?.v3?.fundraiser?.investors },
            { id: 4, title: language?.v3?.fundraiser?.documents },
            { id: 5, title: language?.v3?.fundraiser?.activity },
            { id: 6, title: language?.v3?.fundraiser?.invited_syndicates },
            { id: 7, title: language?.v3?.fundraiser?.interested_syndicates },
          ]
        : [
            { id: 1, title: language?.v3?.fundraiser?.details },
            { id: 3, title: language?.v3?.fundraiser?.investors },
            { id: 4, title: language?.v3?.fundraiser?.documents },
            { id: 5, title: language?.v3?.fundraiser?.activity },
            { id: 6, title:  language?.v3?.fundraiser?.invited_investors},
          ]
      : [
          { id: 1, title: language?.v3?.fundraiser?.details },
          { id: 3, title: language?.v3?.fundraiser?.investors },
          { id: 4, title: language?.v3?.fundraiser?.documents },
          { id: 5, title: language?.v3?.fundraiser?.activity },
        ];
  if (state === KanzRoles.PROPERTY_OWNER) {
    const newTab = { id: 2, title: language?.v3?.fundraiser?.unique_selling_points };
    tabs.splice(1, 0, newTab);
  }
console.log(tabs)
  const [selected, setSelected]: any = useState(tabs[0]);
  useLayoutEffect(() => {
    if (selected.id === 1) onGetDealDetail();
    else if (selected.id === 4) onGetDealFiles();
  }, [selected]);

  return (
    <main className="h-full max-h-full overflow-y-hidden">
      <section>
        <Header />
      </section>
      <aside className="w-full h-full flex items-start justify-start">
        <Sidebar type={KanzRoles.FUNDRAISER} />
        {loading ? (
          <div
            className="absolute left-0 top-0 w-full h-full grid place-items-center"
            style={{ backgroundColor: "rgba(255, 255, 255, 1)", zIndex: 50 }}
          >
            <Spinner />
          </div>
        ) : (
          <section
            className="bg-cbc-auth h-full p-[5rem] overflow-y-auto"
            style={{ width: "calc(100% - 250px)" }}
          >
            <span
              className="inline-flex items-center gap-2 relative top-[-25px] cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <Chevrond
                    className={`${
                      orientation === "rtl"
                        ? "rotate-[-90deg]"
                        : "rotate-[90deg]"
                    } w-4 h-4`}
                    strokeWidth={2}
                    stroke={"#000"}
                  />
              <small className="text-neutral-500 text-sm font-medium">
                {language?.v3?.common?.deal}
              </small>
            </span>

            <section className="inline-flex justify-between items-center w-full mb-4">
              <h1 className="text-black font-medium text-2xl">
                {dealDetail?.title}
              </h1>
              <div className="inline-flex items-center gap-2">
                {dealDetail?.model === DealPromotionType.SYNDICATE ? (
                  <div className="relative z-10">
                    <UserListingPopup
                      approve={dealDetail?.status}
                      dealId={id}
                      type={KanzRoles.SYNDICATE}
                      dealIdReal={dealDetail?.id}
                    />
                  </div>
                ) : (
                  <div className="relative z-10">
                    <InvitesListing
                      approve={dealDetail?.status}
                      dealPromotionType={dealDetail?.model}
                      dealId={dealDetail?.token}
                      type={KanzRoles.SYNDICATE}
                      dealIdReal={dealDetail?.id}
                    />
                  </div>
                )}

                <div className="bg-white rounded-md border-neutral-300 border-[1px] inline-flex items-center justify-center">
                  <CustomDropdown
                    className="px-5 py-3"
                    mainNode={<MenuIcon />}
                  />
                </div>
              </div>
            </section>

            <section className="mt-1 mb-16">
              <DealTable
                dealType={dealDetail?.category}
                targetSize={dealDetail?.selling_price}
                committed={dealDetail?.committed}
                investors={dealDetail?.investors}
              />
            </section>

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
            {selected?.id === 2 && <Usp id={dealDetail?.id} />}
            {selected?.id === 3 && (
              <DealInvestors id={dealDetail?.id} dealCreatorView={true} />
            )}
            {selected?.id === 4 && <DocumentDetails dealDocs={dealDocs} />}
            {selected?.id === 5 && <ActivityDetails id={dealDetail?.id} />}
            {selected?.id === 6 &&
              dealDetail?.model === DealPromotionType.SYNDICATE && (
                <InvitedSyndicates id={dealDetail?.id} />
              )}
            {selected?.id === 6 &&
              dealDetail?.model === DealPromotionType.CLASSIC && (
                <InvitedInvestors id={dealDetail?.id} />
              )}
            {selected?.id === 7 && <Requests id={dealDetail?.id} />}
          </section>
        )}
      </aside>
    </main>
  );
};
export default DealDetail;

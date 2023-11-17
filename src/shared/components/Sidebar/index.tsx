import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import { useLocation, useNavigate } from "react-router-dom";
import { KanzRoles } from "../../../enums/roles.enum";
import { RoutesEnums } from "../../../enums/routes.enum";
import BagIcon from "../../../ts-icons/bagIcon.svg";
import InvestorHomeIcon from "../../../ts-icons/InvestorHomeIcon.svg";
import InvestorInvestmentIcon from "../../../ts-icons/InvestorInvestmentIcon.svg";
import InvestorSyndicateIcon from "../../../ts-icons/InvestorSyndicateIcon.svg";
import InvestorPortfolioIcon from "../../../ts-icons/InvestorPortfolioIcon.svg";
import InvestorInvitesIcon from "../../../ts-icons/InvestorInvitesIcon.svg";
import SyndicateDealApprovalIcon from "../../../ts-icons/SyndicateDealApprovalIcon.svg";
import SyndicateInvestorUpdates from "../../../ts-icons/SyndicateInvestorUpdates.svg";

const Sidebar = ({ type }: any) => {
 
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const language: any = useSelector((state: RootState) => state.language.value);
  const orientation: any = useSelector(
    (state: RootState) => state.orientation.value
  );
  const DASHBOARD_ITEMS = [
    {
      id: 1,
      title: language?.v3?.startup?.sidebar?.overview,
      route: `/${type.toLowerCase()}`,
    },
    {
      id: 2,
      title:
        language?.v3?.startup?.sidebar
          ?.investor_updates /* RoutesEnums.INVESTOR_UPDATES  */,
    },
    {
      id: 3,
      title:
        language?.v3?.startup?.sidebar
          ?.data_rooms /*  RoutesEnums.DATA_ROOMS */,
    },
    {
      id: 4,
      title:
        language?.v3?.startup?.sidebar
          ?.market_insights /* RoutesEnums.MARKET_INSIGHTS */,
    },
    {
      id: 5,
      title:
        language?.v3?.startup?.sidebar?.contacts /* RoutesEnums.CONTACTS */,
    },
  ];
  const [sidebarData, setSidebarData]: any = useState();
  const [selected, setSelected]: any = useState();

  useLayoutEffect(() => {
    renderRoleBasedSidebar();
  }, [type]);


  useLayoutEffect(() => {
    setSelected(window.location.pathname)
  },[window.location.pathname]);

  const renderRoleBasedSidebar = () => {
    let route;
    switch (type) {
      case KanzRoles.STARTUP:
        

        setSidebarData({
          title: language?.v3?.startup?.sidebar?.sidebar_title,
          icon: <BagIcon />,
          items: [
            ...DASHBOARD_ITEMS,
            {
              id: 6,
              title: language?.v3?.startup?.sidebar?.syndicate_requests,
              route: RoutesEnums.DEAL_SYNDICATE_REQUESTS,
            },
          ],
        });
        route = DASHBOARD_ITEMS.find((it) => it.route === pathname);
        setSelected(route);
        break;
      case KanzRoles.REALTOR:
        

        setSidebarData({
          title: language?.v3?.startup?.sidebar?.sidebar_title,
          icon: <BagIcon />,
          items: [
            ...DASHBOARD_ITEMS,
            {
              id: 6,
              title: language?.v3?.startup?.sidebar?.syndicate_requests,
              route: RoutesEnums.DEAL_SYNDICATE_REQUESTS,
            },
          ],
        });
        route = DASHBOARD_ITEMS.find((it) => it.route === pathname);
        setSelected(route);
        break;
      case KanzRoles.SYNDICATE:
        setSidebarData({
          title: "",
          items: [
            {
              id: 1,
              icon:<InvestorHomeIcon />,
              title: language?.v3?.startup?.sidebar?.dashboard,
              route: "/syndicate",
            },
            {
              id: 2,
              icon: <InvestorInvestmentIcon/>,
              title: "Investments",
              route: RoutesEnums.SYNDICATE_INVESTMENTS

            },
            {
              id: 3,
              icon: <SyndicateInvestorUpdates/>,
              title: "Investor Updates",
         
            },
            {
              id: 4,
              icon: <SyndicateDealApprovalIcon/>,
              title: language?.v3?.startup?.sidebar?.deal_approval,
              route: RoutesEnums.DEAL_APPROVAL,
            },
            {
              id: 5,
              icon: <InvestorSyndicateIcon/>,
              title: "Manage Group",
              route: RoutesEnums.SYNDICATE_MANAGE_GROUP,
            },
          ],
        });
        break;
      case KanzRoles.INVESTOR:
        setSidebarData({
          items: [
            {
              id: 1,
              icon: <InvestorHomeIcon />,
              title: language?.v3?.startup?.sidebar?.dashboard,
              route: RoutesEnums.INVESTOR_DASHBOARD
              
            },
            {
              id: 2,
              icon: <InvestorInvestmentIcon/>,
              title: "Investments",
              
            },
            {
              id: 3,
              icon: <InvestorSyndicateIcon/>,
              title: "Syndicates",
              route: RoutesEnums.INVESTOR_SYNDICATES
              
            },
            {
              id: 4,
              icon: <InvestorInvitesIcon/>,
              title: "Deals",
              route: RoutesEnums.INVESTOR_DEALS
              
            },
            {
              id: 5,
              icon: <InvestorPortfolioIcon/>,
              title: "Portfolio",
              
            },
          ],
        });
        break;

      default:
        break;
    }
  };
  return (
    sidebarData && (
      <aside className="w-[250px] bg-white h-full pt-[2rem]">
        <div
          className={`inline-flex items-center gap-2 pb-6 ${
            orientation === "rtl" ? "pr-[2rem]" : "pl-[2rem]"
          }`}
        >
          <span>{sidebarData?.icon}</span>
          <h2 className="text-black font-medium text-sm">
            {sidebarData?.title}
          </h2>
        </div>
        <ul>
          {React.Children.toArray(
            sidebarData?.items?.map((item: any) => {
              return (
                <li
                  onClick={() => {
                    if (!item?.route) return;
                    navigate(item?.route);
                  }}
                  className={`${
                    orientation === "rtl" ? "pr-[2rem]" : "pl-[2rem]"
                  } py-3 w-full flex items-center text-sm font-medium text-neutral-600 transition-all hover:bg-sidebar-item-hover hover:border-l-sidebar-item-hover border-l-4 border-white ${
                    item.route ? "cursor-pointer" : "cursor-not-allowed"
                  } ${
                    selected === item?.route &&
                    "bg-sidebar-item-hover border-l-4 border-l-cyan-800 hover:!border-l-cyan-800"
                  }`}
                >
             <span>{item?.icon}</span>
          <p className="text-black font-medium text-sm ml-1 mt-1">
            {item?.title}
          </p>
                </li>
              );
            })
          )}
        </ul>
      </aside>
    )
  );
};
export default Sidebar;

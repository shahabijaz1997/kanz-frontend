import React, { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import { useLocation, useNavigate } from "react-router-dom";
import { KanzRoles } from "../../../enums/roles.enum";
import { RoutesEnums } from "../../../enums/routes.enum";
import BagIcon from "../../../ts-icons/bagIcon.svg";

const Sidebar = ({ type }: any) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const language: any = useSelector((state: RootState) => state.language.value);
    const orientation: any = useSelector((state: RootState) => state.orientation.value);
    const DASHBOARD_ITEMS = [
        { id: 1, title: language?.v3?.startup?.sidebar?.overview, route: `/${type.toLowerCase()}` },
        { id: 2, title: language?.v3?.startup?.sidebar?.investor_updates, route: '/' /* RoutesEnums.INVESTOR_UPDATES  */},
        { id: 3, title: language?.v3?.startup?.sidebar?.data_rooms, route:'/' /*  RoutesEnums.DATA_ROOMS */ },
        { id: 4, title: language?.v3?.startup?.sidebar?.market_insights, route:'/' /* RoutesEnums.MARKET_INSIGHTS */ },
        { id: 5, title: language?.v3?.startup?.sidebar?.contacts, route:'/' /* RoutesEnums.CONTACTS */ }
    ]
    const [sidebarData, setSidebarData]: any = useState();
    const [selected, setSelected]: any = useState();

    useLayoutEffect(() => {
        renderRoleBasedSidebar();
    }, [type]);

    const renderRoleBasedSidebar = () => {
        let route;
        switch (type) {
            case KanzRoles.STARTUP:
                setSidebarData({
                    title: language?.v3?.startup?.sidebar?.sidebar_title, icon: <BagIcon />, items: [...DASHBOARD_ITEMS, { id: 6, title: language?.v3?.startup?.sidebar?.syndicate_requests, route: RoutesEnums.DEAL_SYNDICATE_REQUESTS } ]
                });
                route = DASHBOARD_ITEMS.find(it => it.route === pathname);
                setSelected(route);
                break;
            case KanzRoles.REALTOR:
                setSidebarData({
                    title: language?.v3?.startup?.sidebar?.sidebar_title, icon: <BagIcon />, items: DASHBOARD_ITEMS
                });
                route = DASHBOARD_ITEMS.find(it => it.route === pathname);
                setSelected(route);
                break;
            case KanzRoles.SYNDICATE:
                setSidebarData({
                    title: "", items: [
                        { id: 1, title: language?.v3?.startup?.sidebar?.dashboard, route: "/" },
                        { id: 2, title: language?.v3?.startup?.sidebar?.deal_approval, route: RoutesEnums.DEAL_APPROVAL },
                        { id: 3, title: language?.v3?.startup?.sidebar?.startup_investment, route: RoutesEnums.STARTUP_INVESTMENTS },
                        { id: 4, title: language?.v3?.startup?.sidebar?.syndicate_requests, route: RoutesEnums.DEAL_SYNDICATE_REQUESTS }]
                });
                break;
            case KanzRoles.INVESTOR:
                setSidebarData({
                    title: language?.v3?.startup?.sidebar?.sidebar_title, items: []
                });
                break;

            default:
                break;
        }
    };
    return (
        sidebarData && (
            <aside className="w-[250px] bg-white h-full pt-[2rem]">
                <div className={`inline-flex items-center gap-2 pb-6 ${orientation === "rtl" ? "pr-[2rem]" : "pl-[2rem]"}`}>
                    <span>{sidebarData?.icon}</span>
                    <h2 className="text-black font-medium text-sm">{sidebarData?.title}</h2>
                </div>
                <ul>
                    {React.Children.toArray(
                        sidebarData?.items?.map((item: any) => {
                            return (
                                <li onClick={() => {
                                    setSelected(item);
                                    navigate(item?.route)
                                }}
                                    className={`${orientation === "rtl" ? "pr-[2rem]" : "pl-[2rem]"} py-3 text-sm font-medium text-neutral-600 cursor-pointer transition-all hover:bg-sidebar-item-hover hover:border-l-sidebar-item-hover border-l-4 border-white ${selected?.id === item.id && "bg-sidebar-item-hover border-l-4 border-l-cyan-800 hover:!border-l-cyan-800"}`}>{item?.title}</li>
                            )
                        })
                    )}
                </ul>
            </aside>
        )
    )
};
export default Sidebar;
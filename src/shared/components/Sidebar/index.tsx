import React, { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import { useLocation, useNavigate } from "react-router-dom";
import { KanzRoles } from "../../../enums/roles.enum";
import { StartupRoutes } from "../../../enums/routes.enum";
import BagIcon from "../../../ts-icons/bagIcon.svg";

const Sidebar = ({ type }: any) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const language: any = useSelector((state: RootState) => state.language.value);
    
    const DASHBOARD_ITEMS = [
        { id: 1, title: language?.v3?.startup?.sidebar?.overview, route: `/${type.toLowerCase()}` },
        { id: 2, title: language?.v3?.startup?.sidebar?.investor_updates, route: StartupRoutes.INVESTOR_UPDATES },
        { id: 3, title: language?.v3?.startup?.sidebar?.data_rooms, route: StartupRoutes.DATA_ROOMS },
        { id: 4, title: language?.v3?.startup?.sidebar?.market_insights, route: StartupRoutes.MARKET_INSIGHTS },
        { id: 5, title: language?.v3?.startup?.sidebar?.contacts, route: StartupRoutes.CONTACTS },
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
                    title: language?.v3?.startup?.sidebar?.sidebar_title, icon: <BagIcon />, items: DASHBOARD_ITEMS
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
                    title: language?.v3?.startup?.sidebar?.sidebar_title, items: []
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
            <aside className="w-[250px] bg-white h-full pt-[5rem]">
                <div className="inline-flex items-center gap-2 pb-6 pl-[2rem]">
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
                                    className={`pl-[2rem] py-3 text-sm font-medium text-neutral-600 cursor-pointer transition-all hover:bg-sidebar-item-hover hover:border-l-sidebar-item-hover border-l-4 border-white ${selected?.id === item.id && "bg-sidebar-item-hover border-l-4 border-l-cyan-800 hover:!border-l-cyan-800"}`}>{item?.title}</li>
                            )
                        })
                    )}
                </ul>
            </aside>
        )
    )
};
export default Sidebar;
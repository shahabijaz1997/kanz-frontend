import { useSelector } from "react-redux";
import { KanzRoles } from "../../enums/roles.enum";
import Header from "../../shared/components/Header";
import Sidebar from "../../shared/components/Sidebar";
import { RootState } from "../../redux-toolkit/store/store";
import SearchIcon from "../../ts-icons/searchIcon.svg";
import React, { useState } from "react";
import Button from "../../shared/components/Button";
import { Table } from "../../shared/components/Table";

const Startup = ({ }: any) => {
    const language: any = useSelector((state: RootState) => state.language.value);
    const [selectedTab, setSelectedTab] = useState();
    const [tabs] = useState([language?.v3?.startup?.overview?.all, language?.v3?.startup?.overview?.raising, language?.v3?.startup?.overview?.closed]);

    return (
        <main className="h-full max-h-full overflow-y-auto">
            <section>
                <Header />
            </section>
            <aside className="w-full h-full flex items-start justify-start">
                <Sidebar type={KanzRoles.STARTUP} />
                <section className="bg-cbc-auth h-full p-[5rem]" style={{ width: "calc(100% - 250px)" }}>
                    <section className="inline-flex justify-between items-center w-full">
                        <div className="w-full">
                            <h1 className="text-black font-medium text-2xl mb-2">{language?.v3?.startup?.overview?.heading}</h1>

                            <span className="w-full flex items-center gap-5">
                                <div className="rounded-md class-cs-6 bg-white border-[1px] border-gray-200 h-9 overflow-hidden max-w-[310px] inline-flex items-center px-2">
                                    <SearchIcon />
                                    <input type="search" className="h-full w-full outline-none pl-2 text-sm font-normal text-gray-400" placeholder={language?.v3?.common?.search} />
                                </div>

                                <ul className="inline-flex items-center">
                                    {React.Children.toArray(tabs.map(tab => <li onClick={() => setSelectedTab(tab)} className={`py-2 px-3 text-g font-medium cursor-pointer rounded-md transition-all ${selectedTab === tab ? "text-neutral-900 bg-neutral-100" : "text-gray-500"} `}><small>{tab}</small> <span>(0)</span></li>))}
                                </ul>
                            </span>
                        </div>
                        <Button className="w-[170px]">{language?.v3?.button?.new_deal}</Button>
                    </section>

                    <Table />
                </section>
            </aside>
        </main>
    );
};
export default Startup;
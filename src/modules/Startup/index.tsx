import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { KanzRoles } from "../../enums/roles.enum";
import Header from "../../shared/components/Header";
import Sidebar from "../../shared/components/Sidebar";
import { RootState } from "../../redux-toolkit/store/store";
import SearchIcon from "../../ts-icons/searchIcon.svg";
import React, { useState } from "react";
import Button from "../../shared/components/Button";
import Table from "../../shared/components/Table";
import { StartupRoutes } from "../../enums/routes.enum";
import Modal from "../../shared/components/Modal";
import CrossIcon from "../../ts-icons/crossIcon.svg";
import DealTable from "../../shared/components/DealTable";

const columns = ['Name', 'Type', 'Status', 'Stage', 'Raised', 'Target'];

const data: any = [

];
const Startup = ({ }: any) => {
    const navigate = useNavigate();
    const language: any = useSelector((state: RootState) => state.language.value);
    const [selectedTab, setSelectedTab] = useState();
    const [modalOpen, setModalOpen] = useState(false);
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
                            <h1 className="text-black font-medium text-2xl mb-2">{language?.v3?.startup?.overview?.heading_2}</h1>
                        </div>
                        <Button onClick={() => setModalOpen(true)} className="w-[170px]">{language?.v3?.button?.new_deal}</Button>
                    </section>

                    <section className="mt-10 mb-16">
                        <DealTable />
                    </section>

                    <section className="inline-flex justify-between items-center w-full">
                        <div className="w-full">
                            <h1 className="text-black font-medium text-2xl mb-2">{language?.v3?.startup?.overview?.heading}</h1>

                            <span className="w-full flex items-center gap-5">
                                <div className="rounded-md class-cs-6 bg-white border-[1px] border-gray-200 h-9 overflow-hidden max-w-[310px] inline-flex items-center px-2">
                                    <SearchIcon />
                                    <input type="search" className="h-full w-full outline-none pl-2 text-sm font-normal text-gray-400" placeholder={language?.v3?.common?.search} />
                                </div>

                                <ul className="inline-flex items-center">
                                    {React.Children.toArray(tabs.map(tab => <li onClick={() => setSelectedTab(tab)} className={`py-2 px-3 font-medium cursor-pointer rounded-md transition-all ${selectedTab === tab ? "text-neutral-900 bg-neutral-100" : "text-gray-500"} `}>{tab} &nbsp;(0)</li>))}
                                </ul>
                            </span>
                        </div>
                        <Button onClick={() => setModalOpen(true)} className="w-[170px]">{language?.v3?.button?.new_deal}</Button>
                    </section>

                    <section className="mt-10">
                        <Table columns={columns} data={data} noDataNode={<Button onClick={() => setModalOpen(true)} className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">{language?.v3?.button?.new_deal}</Button>} />
                    </section>
                </section>
            </aside>

            <Modal show={modalOpen}>
                <div className="relative p-12 rounded-md shadow-cs-1 flex flex-col items-center w-full bg-white outline-none focus:outline-none screen800:px-3">
                    <div className="rounded-md h-8 w-8 inline-grid place-items-center cursor-pointer absolute right-2 top-2">
                        <CrossIcon stroke="#171717" className="w-6 h-6" onClick={() => setModalOpen(false)} />
                    </div>

                    <aside>
                        <h2 className="font-bold text-xl text-center text-neutral-900">{language?.v3?.common?.disclaimer}</h2>
                        <p className="text-sm font-normal text-center text-neutral-500 mt-8 mb-12">{language?.v3?.common?.disclaimer_desc}</p>
                        <Button onClick={() => navigate(`${StartupRoutes.CREATE_DEAL}/1`)}>{language?.buttons?.continue}</Button>
                    </aside>
                </div>
            </Modal>
        </main>
    );
};
export default Startup;
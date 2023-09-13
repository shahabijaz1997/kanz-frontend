import React, { useState } from "react";
import { useSelector } from "react-redux";
import { KanzRoles } from "../../../enums/roles.enum";
import { RootState } from "../../../redux-toolkit/store/store";
import Header from "../../../shared/components/Header";
import Sidebar from "../../../shared/components/Sidebar";
import Chevrond from "../../../ts-icons/chevrond.svg";
import Button from "../../../shared/components/Button";
import CustomDropdown from "../../../shared/components/CustomDropdown";
import MenuIcon from "../../../ts-icons/menuIcon.svg";
import DealInvestors from "./DealInvestors";
import DealTable from "../../../shared/components/DealTable";
import DealDetails from "./DealDetails";
import DocumentDetails from "./DocumentDetails";
import NoteDetails from "./NoteDetails";
import ActivityDetails from "./ActivityDetails";
import { useNavigate } from "react-router-dom";

const DealDetail = ({ }: any) => {
    const navigate = useNavigate();
    const language: any = useSelector((state: RootState) => state.language.value);
    const tabs = [{ id: 1, title: "Investors" }, { id: 2, title: "Details" }, { id: 3, title: "Documents" }, { id: 4, title: "Existing SAFE/Note Holders" }, { id: 5, title: "Activity" }];
    const [selected, setSelected]: any = useState(tabs[0]);
    return (
        <main className="h-full max-h-full overflow-y-auto">
            <section>
                <Header />
            </section>
            <aside className="w-full h-full flex items-start justify-start">
                <Sidebar type={KanzRoles.STARTUP} />
                <section className="bg-cbc-auth h-full p-[5rem]" style={{ width: "calc(100% - 250px)" }}>
                    <span className="inline-flex items-center gap-2 relative top-[-25px] cursor-pointer" onClick={() => navigate(-1)}>
                        <Chevrond stroke="#000" className="rotate-90 w-4 h-4" />
                        <small className="text-neutral-500 text-sm font-medium">{language?.v3?.common?.deal}</small>
                    </span>

                    <section className="inline-flex justify-between items-center w-full mb-4">
                        <h1 className="text-black font-medium text-2xl">Angel Round</h1>
                        <span className="inline-flex items-center gap-2">
                            <Button onClick={() => { }} className="w-[80px]">{language?.v3?.button?.invite}</Button>
                            <div className="bg-white rounded-md border-neutral-300 border-[1px] inline-flex items-center justify-center"><CustomDropdown className="px-5 py-3" mainNode={<MenuIcon />} /></div>
                        </span>
                    </section>
                    <section className="mt-1 mb-16">
                        <DealTable />
                    </section>

                    <section>
                        <ul className="flex border-neutral-200 border-b-[1px]">
                            {React.Children.toArray(
                                tabs.map(tab => <li className={`${selected?.id === tab?.id ? "border-cyan-800 border-b-[1px] text-cyan-800" : "text-neutral-500"} cursor-pointer font-medium text-sm py-4 mr-9 px-2 transition-all`} onClick={() => setSelected(tab)}>{tab.title}</li>)
                            )}
                        </ul>

                        <div className="mt-10 mb-4">
                            <h2 className="text-black text-xl font-medium">{selected?.title}</h2>
                        </div>
                    </section>

                    {selected?.id === 1 && <DealInvestors />}
                    {selected?.id === 2 && <DealDetails />}
                    {selected?.id === 3 && <DocumentDetails />}
                    {selected?.id === 4 && <NoteDetails />}
                    {selected?.id === 5 && <ActivityDetails />}
                </section>
            </aside>
        </main>
    )
};
export default DealDetail;
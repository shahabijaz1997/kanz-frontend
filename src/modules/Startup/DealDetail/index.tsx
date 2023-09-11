import React, { useState } from "react";
import { useSelector } from "react-redux";
import { KanzRoles } from "../../../enums/roles.enum";
import { RootState } from "../../../redux-toolkit/store/store";
import Header from "../../../shared/components/Header";
import Sidebar from "../../../shared/components/Sidebar";
import Chevrond from "../../../ts-icons/chevrond.svg";
import Button from "../../../shared/components/Button";
import DealTable from "../../../shared/components/DealTable";

const DealDetail = ({ }: any) => {
    const language: any = useSelector((state: RootState) => state.language.value);
    const [tabs] = useState(["Investors", "Details", "Documents", "Existing SAFE/Note Holders", "Activity"]);
    const [selected, setSelected]: any = useState(tabs[0]);

    return (
        <main className="h-full max-h-full overflow-y-auto">
            <section>
                <Header />
            </section>
            <aside className="w-full h-full flex items-start justify-start">
                <Sidebar type={KanzRoles.STARTUP} />
                <section className="bg-cbc-auth h-full p-[5rem]" style={{ width: "calc(100% - 250px)" }}>
                    <span className="inline-flex gap-2">
                        <Chevrond stroke="#000" className="rotate-90 w-6 h-6" />
                        <small className="text-neutral-500 text-sm font-medium">{language?.v3?.common?.deal}</small>
                    </span>

                    <section className="inline-flex justify-between items-center w-full">
                        <h1 className="text-black font-medium text-2xl mb-2">Angle Round</h1>
                        <Button onClick={() => { }} className="w-[80px]">{language?.v3?.button?.invite}</Button>
                    </section>

                    <section className="mt-1 mb-16">
                        <DealTable />
                    </section>

                    <section>
                        <ul className="flex border-neutral-200 border-b-[1px]">
                            {React.Children.toArray(
                                tabs.map(tab => <li className={`${selected === tab ? "border-cyan-800 border-b-[1px] text-cyan-800" : "text-neutral-500"} cursor-pointer font-medium text-sm py-4 mr-9 px-2 transition-all`} onClick={() => setSelected(tab)}>{tab}</li>)
                            )}
                        </ul>

                        <div className="mt-10 mb-4">
                            <h2 className="text-black text-xl font-medium">{selected}</h2>
                        </div>

                        <div className="rounded-md bg-white border-[1px] border-neutral-200 overflow-hidden p-8">
                            <p className="text-cc-gray text-xl font-medium text-center w-full py-[6rem]">{language?.v3?.common?.noData}</p>
                        </div>
                    </section>
                </section>
            </aside>
        </main>
    )
};
export default DealDetail;
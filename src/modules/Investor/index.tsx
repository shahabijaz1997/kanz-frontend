import React, {  useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { KanzRoles } from "../../enums/roles.enum";

import Header from "../../shared/components/Header";
import Sidebar from "../../shared/components/Sidebar";
import Spinner from "../../shared/components/Spinner";
import { useDispatch } from "react-redux";
import Insights from "./Dashboard/Insights";
import Activity from "./Dashboard/Acitivity";
import Performance from "./Dashboard/Performance";





const Investor = ({}: any) => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const { state } = useLocation();

  interface Syndicate {
    id: number;
    title: React.ReactNode;
    handle: string;
    action: React.ReactNode;
  }

  const tabs = [
    { id: 1, title: "Performance" },
    { id: 2, title: "Activity" },
    { id: 3, title: "Insights" },
    
  ];


  const [selected, setSelected]: any = useState(tabs[0]);
  const [loading, setLoading]: any = useState(false);

  return (
    <main className="h-full max-h-full overflow-y-hidden">
      <section>
        <Header/>
      </section>
      <aside className="w-full h-full flex items-start justify-start">
        <Sidebar
          type={
            KanzRoles.INVESTOR 
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
            className="bg-cbc-auth h-full p-[5rem] overflow-y-auto"
            style={{ width: "calc(100% - 250px)" }}
          >
            <section className="inline-flex justify-between items-center w-full mb-4">
              <h1 className="text-black font-medium text-2xl">
                {"Deals"}
              </h1>
          
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
              </div>
            </section>
            {selected?.id === 1 && <Performance/>}
            {selected?.id === 2 && <Activity />}
            {selected?.id === 3 && <Insights />}
          </section>
        )}
      </aside>
    </main>
  );
};
export default Investor;

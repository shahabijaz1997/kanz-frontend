import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../../redux-toolkit/store/store";
import Header from "../../../../shared/components/Header";
import Spinner from "../../../../shared/components/Spinner";
import Button from "../../../../shared/components/Button";

const SyndicateFullView = ({}: any) => {
  const params = useParams();
  const navigate = useNavigate();


  interface Syndicate {
    id: number;
    title: React.ReactNode;
    handle: string;
    action: React.ReactNode;
  }
  const { state } = useLocation();
  const language: any = useSelector((state: RootState) => state.language.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);

  const dataArray = [
    { profile: { logo: "https://images.unsplash.com/photo-1620000617482-821324eb9a14?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }, name: "John" },
    { profile: { logo: "https://images.unsplash.com/photo-1474176857210-7287d38d27c6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }, name: "Doe" },
    { profile: { logo: "https://images.unsplash.com/photo-1445053023192-8d45cb66099d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }, name: "Jane" },
    { profile: { logo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }, name: "Alice" },
    { profile: { logo: "https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?q=80&w=1930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }, name: "Bob" },
    { profile: { logo: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }, name: "Eve" },
    { profile: { logo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }, name: "Charlie" },
    { profile: { logo: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }, name: "Sophie" },
  ];
  const dataArrayCompany = [
    { profile: { logo: "https://images.unsplash.com/photo-1635756837851-d3b6edbaa11c?q=80&w=1914&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }, name: "Tenosrr" },
    { profile: { logo: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }, name: "Venture" },
    { profile: { logo: "https://images.unsplash.com/photo-1602934445884-da0fa1c9d3b3?q=80&w=1916&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }, name: "Enigma" },
    { profile: { logo: "https://images.unsplash.com/photo-1541797873665-6d4cc148885f?q=80&w=2031&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }, name: "Funavry" },
    { profile: { logo: "https://images.unsplash.com/photo-1574630340198-0252cea163da?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }, name: "GinTech" },
    { profile: { logo: "https://images.unsplash.com/photo-1602230167340-881f48d4bda7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }, name: "Cative" },
    { profile: { logo: "https://images.unsplash.com/photo-1587987501183-33e43fdde781?q=80&w=1784&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }, name: "Capture" },
    { profile: { logo: "https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fGxvZ29zfGVufDB8fDB8fHww" }, name: "VisionX" },
  ];


  const [loading, setLoading]: any = useState(false);
  return (
    <main className="h-full max-h-full overflow-y-hidden">
      <section>
        <Header />
      </section>
      <aside className="w-full h-full flex items-start justify-start">
        {loading ? (
          <div
            className="absolute left-0 top-0 w-full h-full grid place-items-center"
            style={{ backgroundColor: "rgba(255, 255, 255, 1)", zIndex: 50 }}
          >
            <Spinner />
          </div>
        ) : (
          <section className="bg-cbc-auth w-full h-full p-[5rem] flex items-start justify-center overflow-y-auto">
            <aside>
              <div>
                <div className="flex-col items-center p-4 justify-center">
                  <span className="flex items-center justify-center">
                    <img
                      className=" h-[88px] w-[88px] mr-2.5 shadow-md rounded-full"
                      src={state?.profile?.logo}
                    ></img>
                  </span>
                  <span className="items-center justify-center flex mt-2 text-2xl font-medium">
                    {state?.name}
                  </span>
                  <span className=" mt-2 flex items-center justify-center font-normal text-base text-[#404040]">
                    {state?.profile?.tagline}
                  </span>
                </div>
              </div>
              <div className="mt-5">
                <span className=" flex items-center justify-center gap-5">
                  <Button
                  onClick={()=>{
                    navigate(-1)
                  }}
                    className="!w-[164px] !text-black !border-[black]"
                    type="outlined"
                  >
                    Back Syndicate
                  </Button>
                  <Button className="!w-[164px]">Apply to Syndicate</Button>
                </span>
              </div>
              <aside className="flex items-center justify-center w-[100%] px-16 pt-5">
                <div className="flex flex-wrap gap-2 items-center w-2/3">
                  {state?.profile?.industries?.map((topic:any, index:any) => (
                    <div
                      key={index}
                      className=" bg-[#F2F2F2] p-2 text-xs text-[#202223] rounded-lg"
                    >
                      {topic}
                    </div>
                  ))}
                </div>
              </aside>
              <div className="font-medium text-2xl mt-14 flex items-center justify-center">
                Investments
              </div>
              <div className="mt-4 flex items-center justify-center">
                <div
                  className="flex-wrap items-center justify-center max-w-[50%]"
                  style={{ display: "flex" }}
                >
                  {dataArrayCompany.map((item, index) => (
                    <div
                      key={index}
                      className="flex-col items-center p-4 justify-center"
                    >
                      <span className="flex items-center justify-center shadow-md p-3 rouned-md border-[1px] border-[#E4E7EC]">
                        <img
                          className="h-[88px] w-[88px] shadow-md rounded-md flex items-center justify-center"
                          src={item.profile.logo}
                          alt={`Logo ${index}`}
                        />
                      </span>
                      <span className="items-center justify-center flex mt-3 text-base font-medium">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="font-medium text-2xl mt-5 flex items-center justify-center">
                  Teams
                </div>
                <div className="flex-col items-center p-4 justify-center">
                  <span className="flex items-center justify-center">
                    <img
                      className=" h-[88px] w-[88px] mr-2.5 shadow-md rounded-full"
                      src={"https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                    >
                    </img>
                  </span>
                  <span className="items-center justify-center flex mt-3 text-base font-medium">
                    {"Leonard Krasner (Lead)"}
                  </span>
                </div>
              </div>
              <div className="font-medium text-2xl mt-14 flex items-center justify-center">
                LPs
              </div>
              <div className="mt-4 flex items-center justify-center mb-10">
                <div
                  className="flex-wrap items-center justify-center max-w-[50%]"
                  style={{ display: "flex" }}
                >
                  {dataArray.map((item, index) => (
                    <div
                      key={index}
                      className="flex-col items-center p-4 justify-center"
                    >
                      <span className="h-[88px] w-[88px] shadow-sm rounded-full flex items-center justify-center">
                        <img
                          className="w-full h-full shadow-md rounded-full flex items-center justify-center"
                          src={item.profile.logo}
                          alt={`Logo ${index}`}
                        />
                      </span>
                      <span className="items-center justify-center flex mt-3 text-base font-medium">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </section>
        )}
      </aside>
    </main>
  );
};
export default SyndicateFullView;

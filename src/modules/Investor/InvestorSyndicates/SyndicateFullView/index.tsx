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
    { profile: { logo: state?.profile?.logo }, name: "John" },
    { profile: { logo: state?.profile?.logo }, name: "Jane" },
    { profile: { logo: state?.profile?.logo }, name: "Doe" },
    { profile: { logo: state?.profile?.logo }, name: "Alice" },
    { profile: { logo: state?.profile?.logo }, name: "Bob" },
    { profile: { logo: state?.profile?.logo }, name: "Eve" },
    { profile: { logo: state?.profile?.logo }, name: "Charlie" },
    { profile: { logo: state?.profile?.logo }, name: "Sophie" },
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
                    {"Lorem ipsum dolor sit amet, consectetur adipiscing elit"}
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
              <div className="font-medium text-2xl mt-14 flex items-center justify-center">
                Investments
              </div>
              <div className="mt-4 flex items-center justify-center">
                <div
                  className="flex-wrap items-center justify-center max-w-[50%]"
                  style={{ display: "flex" }}
                >
                  {dataArray.map((item, index) => (
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
                      src={state?.profile?.logo}
                    >
                    </img>
                  </span>
                  <span className="items-center justify-center flex mt-3 text-base font-medium">
                    {state?.name}
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

import React, {  useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../../redux-toolkit/store/store";
import Header from "../../../../shared/components/Header";
import Spinner from "../../../../shared/components/Spinner";




const SyndicateFullView = ({}: any) => {
  const params = useParams();

  interface Syndicate {
    id: number;
    title: React.ReactNode;
    handle: string;
    action: React.ReactNode;
  }
  const { state } = useLocation();
  const language: any = useSelector((state: RootState) => state.language.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  

  const [loading, setLoading]: any = useState(false);
  console.log("Syndicate passed ID", state)
  return (
    <main className="h-full max-h-full overflow-y-hidden">
      <section>
        <Header/>
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
          <section
            className="bg-cbc-auth w-full h-full p-[5rem] overflow-y-auto"
          >
            
          </section>
        )}
      </aside>
    </main>
  );
};
export default SyndicateFullView;

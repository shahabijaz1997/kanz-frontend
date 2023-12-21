import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import { saveDataHolder } from "../../../redux-toolkit/slicer/dataHolder.slicer";
import { getSellingPoints } from "../../../apis/deal.api";
import { saveToken } from "../../../redux-toolkit/slicer/auth.slicer";
import { RoutesEnums } from "../../../enums/routes.enum";
import BagSVG from "../../../assets/svg/bag.svg";
import React from "react";
import Spinner from "../../../shared/components/Spinner";

const Usp = ({ id }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language: any = useSelector((state: RootState) => state.language.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);

  const [loading, setLoading]: any = useState(false);
  const [uniqueSP, setuniqueSP]: any = useState(null);

  useEffect(() => {
    dispatch(saveDataHolder(""));
    getUSPs();
  }, []);

  const getUSPs = async () => {
    try {
      setLoading(true);
      let { status, data } = await getSellingPoints(id, authToken);
      if (status === 200) {
        setuniqueSP(data?.status?.data);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        dispatch(saveToken(""));
        navigate(RoutesEnums.LOGIN, { state: RoutesEnums.FUNDRAISER_DASHBOARD });
      }
    } finally {
     
      setLoading(false);
    }
  };
  {
    
  }
  return (
    <main>
      {loading ? (
        <div className="absolute left-0 top-0 w-full h-full grid place-items-center">
          <Spinner />
        </div>
      ) : (
        <React.Fragment>
          {" "}
          <section className="mt-10 rounded-md px-5 py-4 mb-7 max-w-[80%] ">
            {React.Children.toArray(
              uniqueSP?.map((usp: any) => {
                return (
                  <div className="mb-4 border-[1px] rounded-xl border-neutral-300 bg-white overflow-hidden py-10 px-5">
                    <div className="bg-cyan-800 rounded-full h-10 w-10 overflow-hidden inline-grid place-items-center inline-block align-top mr-4 ml-4">
                      <img src={BagSVG} alt="Bag" />
                    </div>
                    <div className="inline-block w-[80%] align-top">
                      <div className="font-bold text-neutral-900 text-sm mb-2 ">
                        {usp?.title}
                      </div>
                      <small className="text-neutral-700 font-normal text-sm">
                        {usp?.description}
                      </small>
                    </div>
                  </div>
                );
              })
            )}
          </section>
        </React.Fragment>
      )}
    </main>
  );
};
export default Usp;

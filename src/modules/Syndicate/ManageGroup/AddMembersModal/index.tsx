import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../shared/components/Button";
import { RootState } from "../../../../redux-toolkit/store/store";
import { saveToken } from "../../../../redux-toolkit/slicer/auth.slicer";
import { RoutesEnums } from "../../../../enums/routes.enum";
import SearchIcon from "../../../../ts-icons/searchIcon.svg";
import { toastUtil } from "../../../../utils/toast.utils";
import { toast } from "react-toastify";
import Spinner from "../../../../shared/components/Spinner";

import {
  numberFormatter,
} from "../../../../utils/object.utils";
import CrossIcon from "../../../../ts-icons/crossIcon.svg";
import {
  getNonAddedInvestors,
  postAddInvestor,
} from "../../../../apis/syndicate.api";

const AddMembersModal = ({ reloadgetMembers, closeModal }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language: any = useSelector((state: RootState) => state.language.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const user: any = useSelector((state: RootState) => state.user.value);


  const [modalLoading, setmodalLoading] = useState(false);
  const [searchModalQuery, setModalSearchQuery]: any = useState("");
  const [searchText, setSearchText] = useState("");
  const [investors, setInvestors] = useState<any>([]);
  const [buttonDisable, setButtonDisable]: any = useState(false);

  const handleCloseModal = () =>{
    closeModal()
    setSearchText("")
  }
  const handleReload = () => {
    reloadgetMembers(); 
  };

  const onAddInvestor = async (currSyndId: any, investorID: any) => {
    try {
      const { status } = await postAddInvestor(
        {
          member_id: investorID,
          member_type: "Investor",
          connection: "added",
        },
        currSyndId,
        authToken
      );
      if (status === 200) {
        toast.dismiss();
        toast.success(language?.v3?.syndicate?.investor_added, toastUtil);
        const dataCopy = [...investors];
        const index = dataCopy.findIndex((item) => item.id === investorID);
        dataCopy[index].status = true;
      }
    } catch (error: any) {
      if (error?.response?.status === 400)
        toast.warning(error?.response?.data?.status?.message, toastUtil);
        setButtonDisable(false)
    } finally {
      setButtonDisable(false)
      handleReload()
    }
  };

  const getAllUserListings = async () => {
    try {
      setmodalLoading(true);
      let { status, data } = await getNonAddedInvestors(
        authToken,
        searchModalQuery
      );
      if (status === 200) {
        let investorData = data?.status?.data || [];
        let investors: any = investorData.map((investor: any) => ({
          id: investor?.id,
          member_name: <span className="capitalize">{investor?.name}</span>,
          profileImage: investor?.image,
          invested_amount: investor?.invested_amount,
          no_investments: investor?.no_investments,
          status: false,
        }));

        setInvestors(investors);
      }
    } catch (error: any) {
      console.log(error);

      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.status === 400
      ) {
        toast.dismiss();
        toast.warn(language?.v3?.syndicate?.already_invited, toastUtil);
      }
      if (error.response && error.response.status === 401) {
        dispatch(saveToken(""));
        navigate(RoutesEnums.LOGIN, {
          state: RoutesEnums.FUNDRAISER_DASHBOARD,
        });
      }
    } finally {
      setmodalLoading(false);
    }
  };

  useEffect(()=>{
    getAllUserListings()
  },[])

  return(
  <div
    className="rounded-md overflow-hidden inline-grid place-items-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
    style={{ backgroundColor: "rgba(0, 0, 0, 0.078" }}
  >
    <aside className="bg-white w-[500px] rounded-md p-5 h-full">
      <section>
        <div className="justify-end inline-flex pt-3 px-3 w-full">
          <div
            className="bg-white h-8 w-8 border-[1px] border-black rounded-md  shadow-cs-6 p-1 cursor-pointer"
            onClick={closeModal}
          >
            <CrossIcon stroke="#000" />
          </div>
        </div>
      </section>
      <section className="inline-flex justify-between items-center mt-2 w-full">
        <span className="w-full flex items-center gap-5">
          <div className="rounded-md shadow-cs-6 bg-white border-[1px] border-gray-200 h-9 overflow-hidden min-w-full inline-flex items-center px-2">
            <SearchIcon
              onClick={() => {
                getAllUserListings();
              }}
            />
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  getAllUserListings();
                }
              }}
              value={searchModalQuery}
              onChange={(e) => setModalSearchQuery(e.target.value)}
              type="search"
              className="h-full w-full outline-none pl-2 text-sm font-normal "
              placeholder={language?.v3?.syndicate?.search_for_investors}
            />
          </div>
        </span>
      </section>
      {modalLoading ? (
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 1)",
            zIndex: 50,
          }}
          className="absolute left-0 top-0 w-full h-full grid place-items-center"
        >
          <Spinner />
        </div>
      ) : investors.length > 0 ? (
        React.Children.toArray(
          investors
            .filter((investor: any) =>
              JSON.stringify(investor.member_name?.props?.children)
                .toLowerCase()
                .includes(searchText.toLowerCase())
            )
            .map((investor: any) => (
              <div className="py-3 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center">
                <div className=" justify-between items-center w-full">
                  <p>{investor.member_name}</p>
                  <div className="font-sm text-xs font-light">
                    {numberFormatter(investor.invested_amount)}{" "}
                    {language?.v3?.syndicate?.invested}
                    {language?.v3?.syndicate?.in}{" "}
                    {numberFormatter(investor.no_investments)}{" "}
                    {language?.v3?.syndicate?.investments}
                  </div>
                </div>
                <div>
                  {!investor?.status ? (
                    <Button
                      disabled={buttonDisable}
                      divStyle="items-center justify-end max-w-fit"
                      type="outlined"
                      className="!p-3 !py-1 !rounded-full"
                      onClick={() => {
                        setButtonDisable(true);
                        onAddInvestor(user.id, investor?.id);
                      }}
                    >
                      {language?.v3?.syndicate?.add}
                    </Button>
                  ) : (
                    <Button
                      divStyle="items-center justify-end max-w-fit"
                      onClick={() => {}}
                      type="outlined"
                      className="!p-2 !py-[1px] !border-[#D4D4D4] !border-[1px] !text-[#737373]  !shadow-none !rounded-full"
                    >
                      {language?.v3?.syndicate?.added}
                    </Button>
                  )}
                </div>
              </div>
            ))
        )
      ) : (
        <div className="flex flex-col items-center justify-start mt-8 space-y-4 font-semibold pb-5">
          {language?.v3?.fundraiser?.all_investors_invited}
        </div>
      )}
    </aside>
  </div>
  )
};
export default AddMembersModal;

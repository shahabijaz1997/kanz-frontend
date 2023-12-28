import { useLocation, useParams } from "react-router-dom";
import { KanzRoles } from "../../../enums/roles.enum";
import StartupCase from "./StartupCase";
import PropertyOwnerCase from "./PropertyOwnerCase";
import { getDealDetail } from "../../../apis/deal.api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import { convertStatusLanguage } from "../../../utils/string.utils";


const GuestInvestorOverview = ({}: any) => {
 
  useEffect(() => {
    onGetdeal()
  }, [])
  
  const { dealToken } :any = useParams()
  const authToken: any = useSelector((state: RootState) => state.auth.value)

  const [deal, setDeal]: any = useState([])
  const [selectedDocs, setSelectedDocs]: any = useState([])

  const onGetdeal = async () => {
    try {
      let { status, data } = await getDealDetail(dealToken, authToken)
      if (status === 200) {
        setDeal(data?.status?.data)
        setSelectedDocs(data?.status?.data?.docs[0])
      }
    } catch (error) {
      console.log(error)
    }
  }
  return deal && (
   convertStatusLanguage(deal?.category) === KanzRoles?.STARTUP?.toLocaleLowerCase() ?
    <StartupCase dealToken={dealToken} dealDetail={deal} docs= {selectedDocs} />
    :
    <PropertyOwnerCase dealToken={dealToken} dealDetail={deal} dealDocs= {selectedDocs}  />
  )
};
export default GuestInvestorOverview;

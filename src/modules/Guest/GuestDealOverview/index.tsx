import { useLocation, useParams } from "react-router-dom";
import { KanzRoles } from "../../../enums/roles.enum";
import StartupCase from "./StartupCase";
import PropertyOwnerCase from "./PropertyOwnerCase";

const CURRENCIES = ["USD", "AED"];

const GuestInvestorOverview = ({}: any) => {
  const { state } = useLocation();
  const { dealToken } = useParams();
  console.log(state)
  return state === KanzRoles.STARTUP?.toLocaleLowerCase() ? (
    <StartupCase dealToken={dealToken} />
  ) : (
    <PropertyOwnerCase dealToken={dealToken} />
  );
};
export default GuestInvestorOverview;

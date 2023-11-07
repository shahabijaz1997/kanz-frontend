import { useLocation, useParams } from "react-router-dom";
import { KanzRoles } from "../../enums/roles.enum";
import StartupCase from "./StartupCase";
import RealtorCase from "./RealtorCase";

const CURRENCIES = ["USD", "AED"];

const SyndicateDealOverview = ({}: any) => {
  const { state } = useLocation();
  const { dealToken } = useParams();

  return state === KanzRoles.STARTUP?.toLocaleLowerCase() ? (
    <StartupCase dealToken={dealToken} />
  ) : (
    <RealtorCase dealToken={dealToken} />
  );
};
export default SyndicateDealOverview;

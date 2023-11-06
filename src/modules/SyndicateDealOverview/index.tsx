import { useLocation, useParams } from "react-router-dom";
import { KanzRoles } from "../../enums/roles.enum";
import StartupCase from "./StartupCase";
import RealtorCase from "./RealtorCase";

const CURRENCIES = ["USD", "AED"];

const SyndicateDealOverview = ({}: any) => {
  const { state } = useLocation();
  const { dealToken, id } = useParams();

  return state === KanzRoles.STARTUP?.toLocaleLowerCase() ? (
    <StartupCase dealToken={dealToken} id={id} />
  ) : (
    <RealtorCase dealToken={dealToken} id={id} />
  );
};
export default SyndicateDealOverview;

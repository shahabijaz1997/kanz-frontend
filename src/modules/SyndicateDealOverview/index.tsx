import { useLocation, useParams } from "react-router-dom";
import { KanzRoles } from "../../enums/roles.enum";
import StartupCase from "./StartupCase";
import RealtorCase from "./RealtorCase";

const CURRENCIES = ["USD", "AED"];

const SyndicateDealOverview = ({ }: any) => {
    const { state } = useLocation();
    const { id } = useParams();

    return (
      state === KanzRoles.STARTUP ? <StartupCase id={id} /> : <RealtorCase id={id} />
    );
};
export default SyndicateDealOverview;
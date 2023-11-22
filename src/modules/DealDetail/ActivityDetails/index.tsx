import { useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import DealActivity from "../../SyndicateDealOverview/DealActivity";

const ActivityDetails = (id:any) => {

    return (
        <DealActivity dealID = {id?.id}/>
    )
};
export default ActivityDetails;
import { useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import DealActivity from "../../SyndicateDealOverview/DealActivity";

const ActivityDetails = ({id, dealCreatorView}:any)  => {
    return (
        <DealActivity dealID = {id} dealCreatorView={true}/>
    )
};
export default ActivityDetails;
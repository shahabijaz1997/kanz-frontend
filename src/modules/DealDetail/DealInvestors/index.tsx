import { useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import DealActivity from "../../SyndicateDealOverview/DealActivity";

const DealInvestors = (id:any) => {
    const language: any = useSelector((state: RootState) => state.language.value);

    return (
        <DealActivity dealID = {id?.id}/>
    )
};
export default DealInvestors;
import { useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import Investors from "../../SyndicateDealOverview/DealInvestors";

const DealInvestors = (id:any) => {
    const language: any = useSelector((state: RootState) => state.language.value);

    return (
        <Investors dealID = {id?.id}/>
    )
};
export default DealInvestors;
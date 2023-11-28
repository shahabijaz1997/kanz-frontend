import { useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import Investors from "../../SyndicateDealOverview/DealInvestors";

const DealInvestors = ({id , dealCreatorView } :any ) => {
    const language: any = useSelector((state: RootState) => state.language.value);

    return (
        <Investors dealID = {id?.id} dealCreatorView = {dealCreatorView}/>
    )
};
export default DealInvestors;
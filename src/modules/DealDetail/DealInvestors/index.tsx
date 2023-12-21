import Investors from "../../SyndicateDealOverview/DealInvestors";
const DealInvestors = ({id , dealCreatorView } :any ) => {

    return (
        <Investors dealID = {id} dealCreatorView = {dealCreatorView}/>
    )
};
export default DealInvestors;
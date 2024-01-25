import { useEffect, useState } from "react";
import Spinner from "../../../../shared/components/Spinner";
import Table from "../../../../shared/components/Table";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux-toolkit/store/store";
import CustomStatus from "../../../../shared/components/CustomStatus";
import { numberFormatter } from "../../../../utils/object.utils";
import { DealCheckType } from "../../../../enums/types.enum";
import { getTransactions } from "../../../../apis/wallet.api";

const Transactions = ({}: any) => {
  const columns: any = ["Date", "Status", "Amount"];
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationData, setpaginationData] = useState(null);
  const [queryString, setQueryString] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<string>("");
  const authToken: any = useSelector((state: RootState) => state.auth.value);
useEffect(()=>{
    getTransactionData()
},[])
  const getTransactionData = async () => {
    try {
      setLoading(true);
      let { status, data } = await getTransactions(
        authToken,
        queryString,
        currentPage
      );
      if (status === 200) {
        setpaginationData(data?.status?.data?.pagy);
        let transactionsData = data?.transactions?.map((transaction: any) => {
          return {
            id: transaction?.id,
            ["Date"]: (
              <span className=" capitalize">{transaction?.timestamp}</span>
            ),
            ["Status"]: (
              <span className=" capitalize">
                <CustomStatus options={transaction?.status} />
              </span>
            ),
            ["Amount"]: (
              <span className=" capitalize">
                {numberFormatter(transaction?.amount, DealCheckType.PROPERTY)}
              </span>
            ),
          };
        });
        setTransactions(transactionsData);
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-5 relative">
      {loading ? (
        <div
          className="absolute left-0 top-0 w-full h-full grid place-items-center"
          style={{ backgroundColor: "rgba(255, 255, 255, 1)", zIndex: 50 }}
        >
          <Spinner />
        </div>
      ) : (
        <Table
          columns={columns}
          tableData={transactions}
          setCurrentPage={setCurrentPage}
          paginationData={paginationData}
          noDataNode={
            <span className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
              No transactions found at the moment
              <br />
              Deposit amount to get started
            </span>
          }
        />
      )}
    </section>
  );
};

export default Transactions;

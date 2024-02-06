import { useEffect, useState } from "react";
import Spinner from "../../../../shared/components/Spinner";
import Table from "../../../../shared/components/Table";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux-toolkit/store/store";
import CustomStatus from "../../../../shared/components/CustomStatus";
import { getTransactions } from "../../../../apis/wallet.api";
import React from "react";
import Header from "../../../../shared/components/Header";
import Sidebar from "../../../../shared/components/Sidebar";
import DepositWithdrawalColor from "./DepositWithdrawalColor";

const Transactions = ({}: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const metadata: any = useSelector((state: RootState) => state.metadata.value);
  const [paginationData, setpaginationData] = useState(null);
  const language: any = useSelector((state: RootState) => state.language.value);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<string>("");
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const columns: any = [language?.v3?.wallet?.date, language?.v3?.wallet?.status, language?.v3?.wallet?.method, language?.v3?.wallet?.type, language?.v3?.wallet?.amount];
  useEffect(() => {
    getTransactionData();
  }, [currentPage]);
  const getTransactionData = async () => {
    try {
      setLoading(true);
      let { status, data } = await getTransactions(
        authToken,
        currentPage
      );
      if (status === 200) {
        setpaginationData(data?.pagination);
        let transactionsData = data?.transactions?.map((transaction: any) => {
          return {
            id: transaction?.id,
            [language?.v3?.wallet?.date]: (
              <span>{transaction?.timestamp}</span>
            ),
            [language?.v3?.wallet?.method]: (
              <span className="capitalize">{transaction?.method}</span>
            ),
            [language?.v3?.wallet?.type]: (
              <span className="capitalize">{transaction?.transaction_type}</span>
            ),
            [language?.v3?.wallet?.status]: (
              <span className=" capitalize">
                <CustomStatus options={transaction?.status} />
              </span>
            ),
            [language?.v3?.wallet?.amount]: (
              <span className=" capitalize">
               <DepositWithdrawalColor status={transaction?.status} amount={transaction?.amount} type={transaction?.transaction_type} />
              </span>
            ),
          };
        });
        setTransactions(transactionsData);
      }
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-full max-h-full overflow-y-auto">
      <section>
        <Header />
      </section>
      <aside className="w-full h-full flex items-start justify-start">
        <Sidebar type={metadata?.type} />
        <section
          className="bg-cbc-auth h-full p-[5rem] relative"
          style={{ width: "calc(100% - 250px)" }}
        >
          {loading ? (
            <div className="absolute left-0 top-0 w-full h-full grid place-items-center">
              <Spinner />
            </div>
          ) : (
            <React.Fragment>
              <section className="inline-flex justify-between items-center w-full">
                <div className="w-full">
                  <h1 className="text-black font-medium text-2xl mb-2">
                    {language?.v3?.wallet?.transactions}
                  </h1>
                </div>
              </section>

              <section className="mt-10 pb-10">
                <Table
                  removeHref={true}
                  fullWidthData={true}
                  columns={columns}
                  tableData={transactions}
                  setCurrentPage={setCurrentPage}
                  paginationData={paginationData}
                  noDataNode={
                    <span className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
                      {language?.v3?.wallet?.no_transactions}
                      <br />
                      {language?.v3?.wallet?.deposit_amount_to_start}
                    </span>
                  }
                />
              </section>
            </React.Fragment>
          )}
        </section>
      </aside>
    </main>
  );
};

export default Transactions;

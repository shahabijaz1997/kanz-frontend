import { useSelector } from "react-redux";
import Header from "../../shared/components/Header";
import Sidebar from "../../shared/components/Sidebar";
import Spinner from "../../shared/components/Spinner";
import { RootState } from "../../redux-toolkit/store/store";
import { useEffect, useState } from "react";
import Overview from "./Overview";
import AccountDetails from "./AccountDetails";
import UploadReceipt from "./UploadReceipt";
import { createTransaction, getBalance } from "../../apis/wallet.api";
import { jsonToFormData } from "../../utils/files.utils";

const Wallet = () => {
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const metadata: any = useSelector((state: RootState) => state.metadata.value);
  const [loading, setLoading] = useState(false);
  const [step, setCurrentStep] = useState(1);
  const [amount, setAmount] = useState<number>(0);
  const [currentBalance, setCurrentBalance] = useState<string>();
  const [method, setMethod] = useState("");
  const [image, setImage]: any = useState();

  useEffect(() => {
    console.log(image)
  },[image])

  useEffect(() => {
    getCurrentBalance()
  }, []);

  const getCurrentBalance = async () => {
    try {
      setLoading(true);
      let { status, data } = await getBalance(authToken);
      if (status === 200) {
        setCurrentBalance(data?.wallet?.balance)
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const postTransaction = async () => {
    try {
      setLoading(true);
      let payload : any = {
        transaction : {
          amount: amount,
          transaction_type:"deposit",
          method: method,
          receipt: image,
          timestamp: String(new Date())
        }
      }
      let { status, data } = await createTransaction(jsonToFormData(payload),authToken);
      if (status === 200) {
        setCurrentBalance(data?.wallet?.balance)
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
      setCurrentStep(1)
    }
  };

  return (
    <main className="max-h-full">
      <Header />
      <aside className="w-full h-full flex items-start justify-start ">
        <Sidebar type={metadata?.type} />
        <section
          style={{
            width: "calc(100% - 250px)",
          }}
          className="bg-cbc-auth p-[4rem] h-[100vh] relative overflow-y-scroll w-full"
        >
          {loading ? (
            <div className="mt-48 w-full h-full grid place-items-center">
              <Spinner />
            </div>
          ) : (
            <aside>
              <h1 className="text-black font-medium text-xl mb-2">
                {"Wallet"}
              </h1>

              {step === 1 && (
                <Overview
                  currentBalance={currentBalance}
                  method={method}
                  setStep={setCurrentStep}
                  amount={amount}
                  setAmount={setAmount}
                  setMethod={setMethod}
                />
              )}
              {step === 2 && <AccountDetails setStep={setCurrentStep} />}
              {step === 3 && <UploadReceipt  setImage={setImage} setStep={setCurrentStep} submitForm={postTransaction} />}
            </aside>
          )}
        </section>
      </aside>
    </main>
  );
};

export default Wallet;

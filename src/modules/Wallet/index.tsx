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
import Modal from "../../shared/components/Modal";
import CrossIcon from "../../ts-icons/crossIcon.svg";
import Button from "../../shared/components/Button";
import { toast } from "react-toastify";
import { toastUtil } from "../../utils/toast.utils";

const Wallet = () => {
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const metadata: any = useSelector((state: RootState) => state.metadata.value);
  const orientation: any = useSelector((state: RootState) => state.orientation.value);
  const event: any = useSelector((state: RootState) => state.event.value);
  const language: any = useSelector((state: RootState) => state.language.value);
  const [loading, setLoading] = useState(false);
  const [step, setCurrentStep] = useState(1);
  const [amount, setAmount] = useState<number>(0);
  const [currentBalance, setCurrentBalance] = useState<string>();
  const [method, setMethod] = useState("");
  const [image, setImage]: any = useState();
  const [verificationModal, setVerificationModal] = useState(false);

  useEffect(() => {
   step === 1 && getCurrentBalance()
  }, [step]);

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
          method: method,
          receipt: image,
          timestamp: String(new Date())
        }
      }
      let { status, data } = await createTransaction(jsonToFormData(payload),authToken);
      if (status === 200) {
        setCurrentBalance(data?.wallet?.balance)
        setCurrentStep(1)
        setVerificationModal(true)
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.status?.message, toastUtil);
      console.log(error);
    } finally {
      setLoading(false);
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
                {language?.v3?.wallet?.wallet}
              </h1>

              {step === 1 && (
                <Overview
                  event={event}
                  orientation={orientation}
                  language={language}
                  getCurrentBalance={getCurrentBalance}
                  currentBalance={currentBalance}
                  method={method}
                  setStep={setCurrentStep}
                  amount={amount}
                  setAmount={setAmount}
                  setMethod={setMethod}
                />
              )}
              {step === 2 && <AccountDetails language={language} event= {event} amount={amount} setStep={setCurrentStep} />}
              {step === 3 && <UploadReceipt setImage={setImage} setStep={setCurrentStep} submitForm={postTransaction} language={language} />}
            </aside>
          )}
        </section>
        <Modal show={verificationModal ? true : false} className="w-full">
        <div
          className="rounded-md overflow-hidden inline-grid place-items-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.078" }}
        >
          <aside className="bg-white w-[500px] rounded-md h-full">
            <header className=" h-16 py-2 px-3 inline-flex w-full justify-end items-center">
              <div
                onClick={() => setVerificationModal(false)}
                className="bg-white h-8 w-8 p-1 cursor-pointer"
              >
                <CrossIcon stroke="#000" />
              </div>
            </header>
            <section className="flex flex-col items-center justify-center">
              <h3 className="flex items-center w-full justify-center font-bold text-lg">
                {language?.v3?.wallet?.verification_notice}
              </h3>
              <p className="text-[#737373] text-sm mt-3 w-full text-center px-10">
              {language?.v3?.wallet?.receipt_pending_verification}
              </p>
              <footer className="w-[80%] inline-flex justify-center gap-10 py-6 px-3">
                <Button
                onClick={()=>{
                  setVerificationModal(false)
                }}
                  type="outlined"
                  className="w-full !py-1"
                  divStyle="flex items-center justify-center w-full"
                >
                  {language?.v3?.wallet?.cancel}
                </Button>
                <Button
                  onClick={() => {
                    setVerificationModal(false)
                  }}
                  className="w-full !py-1"
                  divStyle="flex items-center justify-center w-full"
                >
                  {language?.v3?.wallet?.continue}
                </Button>
              </footer>
            </section>
          </aside>
        </div>
      </Modal>
      </aside>
    </main>
  );
};

export default Wallet;

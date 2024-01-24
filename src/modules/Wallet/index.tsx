import { useSelector } from "react-redux";
import Header from "../../shared/components/Header";
import Sidebar from "../../shared/components/Sidebar";
import Spinner from "../../shared/components/Spinner";
import { RootState } from "../../redux-toolkit/store/store";
import { useEffect, useState } from "react";
import Overview from "./Overview";
import AccountDetails from "./AccountDetails";


const Wallet = () => {
  const [loading, setLoading] = useState(false);
  const [step, setCurrentStep] = useState(1);
  const [amount, setAmount] = useState(0);
  const [method, setMethod] = useState("");
  const metadata: any = useSelector((state: RootState) => state.metadata.value);

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

          {step === 1 && <Overview setStep={setCurrentStep} amount= {amount} setAmount={setAmount} setMethod = {setMethod}/>}
          {step === 2 && <AccountDetails setStep={setCurrentStep}/>}
            </aside>
          )}
        </section>
      </aside>
    </main>
  );
};

export default Wallet;

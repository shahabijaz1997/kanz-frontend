import { useSelector } from "react-redux";
import Button from "../../../shared/components/Button";
import { RootState } from "../../../redux-toolkit/store/store";
import { getCurrentConversionRate } from "../../../apis/wallet.api";
import { useEffect, useState } from "react";
import Spinner from "../../../shared/components/Spinner";
import { comaFormattedNumber } from "../../../utils/object.utils";
import { DealCheckType } from "../../../enums/types.enum";

const CurrencyConversionModal = ({ setOpen, amount }: any) => {
  const language: any = useSelector((state: RootState) => state.language.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const [loading, setLoading] = useState(false);
  const [rate, setRate] = useState<number>(0);
  const getConversionRate = async () => {
    try {
      setLoading(true);
      let { status, data } = await getCurrentConversionRate(authToken);
      if (status === 200) {
        setRate(data?.exchange_rate);
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getConversionRate();
  }, []);

  return (
    <>
      {loading ? (
        <div
          className="rounded-md overflow-hidden inline-grid place-items-center absolute top-1/2 w-[500px] h-[180px] left-1/2 translate-x-[-50%] translate-y-[-50%] "
          style={{
            backgroundColor: "rgba(255, 255, 255, 1)",
            zIndex: 50,
          }}
        >
          <Spinner />
        </div>
      ) : (
        <div
          className="rounded-md overflow-hidden inline-grid place-items-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.078)" }}
        >
          <aside className="bg-white w-[500px] rounded-md h-full">
            <section className="py-3 px-10">
              <div className="mb-6 pt-5 text-center">
                <label
                  htmlFor=""
                  className="text-neutral-900 text-center font-bold text-xl"
                >
                  {"Current Conversion rate: " + (1 / rate).toFixed(2)}
                </label>
                <p className="pt-5">
                  {"Amount in AED = "} {amount} {" x "} {(1 / rate).toFixed(2)}{" "}
                  ={" "}
                  {comaFormattedNumber(
                    (amount * (1 / rate)).toFixed(2),
                    DealCheckType.PROPERTY
                  )}
                </p>
              </div>
            </section>

            <footer className="w-full inline-flex justify-center gap-3 py-2 px-3 ">
              <Button
                type="primary"
                className="w-full !py-1"
                divStyle="flex items-center justify-center w-6/12"
                onClick={(e) => {
                  setOpen(false);
                }}
              >
                {language?.v3?.investor?.cancel}
              </Button>
            </footer>
          </aside>
        </div>
      )}
    </>
  );
};

export default CurrencyConversionModal;

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
  const [rotation, setRotation] = useState(0);
  const [border, setBorder] = useState("#737373");
  const [isRotated, setIsRotated] = useState(false);
  const getConversionRate = async () => {
    try {
      setLoading(true);
      let { status, data } = await getCurrentConversionRate(authToken);
      if (status === 200) {
        setRate(data?.exchange_rate);
      }
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };
  const handleRotation = () => {
    setRotation(rotation + 180);
    setBorder("#155E75");
    setIsRotated((prevState) => !prevState);
    setTimeout(() => setBorder("#737373"), 600);
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
          <aside className="bg-white rounded-md h-full p-5">
            <section className="py-3 px-10">
              <div className="mb-6 pt-5 text-center">
                <label
                  htmlFor=""
                  className="text-neutral-900 text-center font-medium text-sm"
                >
                  {"Conversion rate: "}{" "}
                  <span className="text-[#155E75] font-bold text-lg">
                    {isRotated ? ((1/rate).toFixed(2)) : rate}
                  </span>
                </label>
                <p
                  className={`pt-5 flex gap-3 min-w-full items-center justify-center ${
                    isRotated ? "rotated" : ""
                  }`} 
                >
                  {isRotated ? (
                    <>
                      <span className="min-w-30 text-2xl font-semibold">
                        {comaFormattedNumber(
                          (amount * rate).toFixed(3),
                          DealCheckType.PROPERTY
                        )}
                      </span>
                      <span
                        style={{ transform: `rotate(${rotation}deg)`, userSelect:'none' }}
                        className={`text-[#155E75] font-bold text-3xl cursor-pointer rounded-full h-11 flex items-center w-11 justify-center border-[2px] border-[${border}] transition-transform duration-300 ease-in-out`}
                        onClick={handleRotation}
                      >
                        &#x21cb;
                      </span>
                      <span className="w-30 text-2xl font-semibold">&#xFF04;{amount}</span>
                    </>
                  ) : (
                    <>
                      <span className="min-w-30 text-2xl font-semibold">&#xFF04;{amount}</span>
                      <span
                        style={{ transform: `rotate(${rotation}deg)`, userSelect:'none' }}
                        className={`text-[#155E75] font-bold text-3xl cursor-pointer rounded-full h-11 flex items-center w-11 justify-center border-[2px] border-[${border}] transition-transform duration-300 ease-in-out`}
                        onClick={handleRotation}
                      >
                        &#x21cb;
                      </span>
                      <span className="min-w-30 text-2xl font-semibold">
                        {comaFormattedNumber(
                          (amount * rate).toFixed(3),
                          DealCheckType.PROPERTY
                        )}
                      </span>
                    </>
                  )}
                </p>
              </div>
            </section>

            <footer className="w-full inline-flex justify-center gap-3 py-2 px-3 ">
              <Button
                type="outlined"
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

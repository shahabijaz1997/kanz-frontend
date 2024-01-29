import { useEffect, useState } from "react";
import { comaFormattedNumber } from "../../../utils/object.utils";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import { DealCheckType } from "../../../enums/types.enum";
import { useLocation } from "react-router-dom";

const InvestmentCalculator = ({}: any) => {
  const [investmentAmount, setinvestmentAmount] = useState(0);
  const language: any = useSelector((state: RootState) => state.language.value);
  const [expectedDividendYield, setexpectedDividendYield] = useState(0);
  const [expectedAnnualAppreciation, setexpectedAnnualAppreciation] =
    useState(0);
  const [numberOfYears, setNumberOfYears] = useState(5);
  const [finalValue, setFinalValue] = useState({
    finalCapitalAppreciation: 0,
    dividendComponent: 0,
    finalTotalReturn: 0,
    averageAnnualizedReturn: 0,
  });
  const event: any = useSelector((state: RootState) => state.event.value);
  const { state } = useLocation();
  const handleSlider1Change = (event: any) => {
    setinvestmentAmount(event.target.value);
  };

  const handleSlider2Change = (event: any) => {
    setexpectedDividendYield(event.target.value);
  };

  const handleSlider3Change = (event: any) => {
    setexpectedAnnualAppreciation(event.target.value);
  };
  const handleSlider4Change = (event: any) => {
    setNumberOfYears(event.target.value);
  };

  function returnOnIvestment(
    initialInvestment: number,
    annualAppreciationRate: number,
    dividendYield: number,
    numberOfYears: number
  ): {
    finalCapitalAppreciation: number;
    dividendComponent: number;
    finalTotalReturn: number;
    averageAnnualizedReturn: number;
  } {
    annualAppreciationRate = annualAppreciationRate / 100;
    dividendYield = dividendYield / 100;
    // Calculate Capital Appreciation Component
    const capitalAppreciation =
      initialInvestment * Math.pow(1 + annualAppreciationRate, numberOfYears);

    // Calculate Dividend Component
    const dividendComponent = initialInvestment * dividendYield * numberOfYears;

    // Calculate Total Return
    const totalReturn = capitalAppreciation + dividendComponent;

    const finalTotalReturn = totalReturn - initialInvestment;
    const finalCapitalAppreciation = capitalAppreciation - initialInvestment;

    const averageAnnualizedReturn =
      (finalTotalReturn / (numberOfYears * initialInvestment)) * 100 || 0;

    return {
      finalCapitalAppreciation,
      dividendComponent,
      finalTotalReturn,
      averageAnnualizedReturn,
    };
  }

  const [amount, setAmount] = useState(0);


  useEffect(() => {
    setFinalValue(
      returnOnIvestment(
        investmentAmount,
        expectedDividendYield,
        expectedAnnualAppreciation,
        numberOfYears
      )
    );
  }, [
    investmentAmount,
    expectedDividendYield,
    expectedAnnualAppreciation,
    numberOfYears,
  ]);

  return (
    <main>
      <section className="mb-4 mt-10 items-center justify-center">
        <h1 className="text-black font-medium text-2xl mb-8">
          {language?.v3?.syndicate?.investment_calc}
        </h1>
        <div className="w-full items-center grid">
          <div className="min-w-full mb-4">
            <div className="relative w-full">
              <input
                dir="ltr"
                className="min-w-full "
                type="range"
                id="rangeSlider1"
                step="500"
                min="0"
                max="1000000"
                value={investmentAmount}
                onChange={handleSlider1Change}
              />
            </div>
            <p className="justify-end flex items-center">
              <span className="text-sm text-neutral-500 mr-2 ml-2">
                {language?.v3?.syndicate?.inv_amount}
              </span>
              <span className="text-lg font-semibold text-[#155E75]">{`(${language?.v3?.investor?.aedSymbol} ${comaFormattedNumber(
                investmentAmount.toString()
              )})`}</span>
            </p>
          </div>

          <div className="min-w-full mt-3 mb-8">
            <input
              dir="ltr"
              className="min-w-full mb-2"
              type="range"
              id="rangeSlider2"
              min="0.0"
              max="50.0"
              step=".1"
              value={expectedDividendYield}
              onChange={handleSlider2Change}
            />
            <label className="justify-end flex items-center">
              <span className="text-sm text-neutral-500 mr-2 ml-2">
                {language?.v3?.syndicate?.expec_div_yeild}
              </span>
              <span className="text-lg font-semibold text-[#155E75]">{`(${expectedDividendYield}%)`}</span>
            </label>
          </div>

          <div className="min-w-full">
            <input
              dir="ltr"
              className="min-w-full mb-2"
              type="range"
              id="rangeSlider3"
              min="0.0"
              max="50.0"
              step=".01"
              value={expectedAnnualAppreciation}
              onChange={handleSlider3Change}
            />
            <label className="justify-end flex items-center">
              <span className="text-sm text-neutral-500 mr-2 ml-2">
                {language?.v3?.syndicate?.expec_annual_app}
              </span>
              <span className="text-lg font-semibold text-[#155E75]">{`(${expectedAnnualAppreciation}%)`}</span>
            </label>
          </div>
          <div className="min-w-full mt-5">
            <input
              dir="ltr"
              className="min-w-full mb-2"
              type="range"
              id="rangeSlider3"
              min="0"
              max="5"
              step="1"
              value={numberOfYears}
              onChange={handleSlider4Change}
            />
            <label className="justify-end flex items-center">
              <span className="text-sm text-neutral-500 mr-2 ml-2">
                {language?.v3?.syndicate?.num_of_years}
              </span>
              <span className="text-lg font-semibold text-[#155E75]">{`(${numberOfYears})`}</span>
            </label>
          </div>
        </div>
        <section>
          <div className="flex justify-between">
            <div className=" mb-4 mt-10 font-medium w-[45%]">
              <div className=" border-[#155E75] border-[1px] rounded-xl">
                <p className="px-5 pt-5 text-xl text-[#155E75] ">
                  {language?.v3?.syndicate?.total_return_on_inv}
                </p>
                <p className="px-5 pb-5 text-2xl  font-bold text-[#155E75] ">
                  {" "}
                  <span>
                  {language?.v3?.investor?.aedSymbol}{" "}
                    {comaFormattedNumber(
                      parseFloat(
                        finalValue.finalTotalReturn.toString()
                      ).toFixed(2)
                    )}
                  </span>
                </p>
              </div>
              <div className="grid px-2 mt-3 ">
                <p className="text-xl font-normal"> {language?.v3?.syndicate?.net_div_inc}
</p>
                <p className="text-2xl font-bold">
                  {comaFormattedNumber(
                    parseFloat(finalValue.dividendComponent.toString()).toFixed(
                      2
                    ),
                    DealCheckType.PROPERTY, event === "ar"
                  )}
                </p>
              </div>
            </div>
            <div className=" mb-4 mt-10 font-medium  w-[45%]">
              <div className="border-[#155E75] border-[1px] rounded-xl">
                <p className="px-5 pt-5 text-xl text-[#155E75] ">
                  {language?.v3?.syndicate?.avg_annualised_return}
                </p>
                <p className="px-5 pb-5 text-2xl  font-bold text-[#155E75] ">
                  {" "}
                  <span>
                    {parseFloat(
                      finalValue.averageAnnualizedReturn.toString()
                    ).toFixed(2)}
                    %
                  </span>
                </p>
              </div>
              <div className="grid mt-3 px-2">
                {" "}
                <p className="text-xl font-normal">
                  {" "}
                  {language?.v3?.syndicate?.exp_cap_app}
                </p>{" "}
                <p className="text-2xl font-bold">
                  {comaFormattedNumber(
                    parseFloat(
                      finalValue.finalCapitalAppreciation.toString()
                    ).toFixed(2),DealCheckType.PROPERTY, event === "ar"
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full items-center justify-between flex"></div>
        </section>
      </section>
    </main>
  );
};
export default InvestmentCalculator;

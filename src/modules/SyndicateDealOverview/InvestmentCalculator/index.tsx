import { useEffect, useState } from "react";
import { comaFormattedNumber } from "../../../utils/object.utils";


const CURRENCIES = ["USD", "AED"];

const InvestmentCalculator = ({}: any) => {


  const [investmentAmount, setSlider1Value] = useState(0);
  const [netDividendIncome, setnetDividendIncome] = useState(0);
  const [avgAnnualisedReturn, setavgAnnualisedReturn] = useState(0);
  const [expectedDividendYield, setSlider2Value] = useState(0);
  const [expectedAnnualAppreciation, setSlider3Value] = useState(0);
  const [finalValue, setFinalValue] : any = useState(0)

  const handleSlider1Change = (event: any) => {
    setSlider1Value(event.target.value);
  };

  const handleSlider2Change = (event: any) => {
    setSlider2Value(event.target.value);
  };

  const handleSlider3Change = (event: any) => {
    setSlider3Value(event.target.value);
  };

  const handleFinalOutput = (investmentAmount: any,expectedDividendYield: any,expectedAnnualAppreciation: any) => {
    const answer = investmentAmount * Math.pow(1 + expectedDividendYield, 5) + (expectedAnnualAppreciation * investmentAmount * 5);
    setnetDividendIncome(answer/5)
    setavgAnnualisedReturn(answer/5)
    setFinalValue(answer);
  };

  const [amount, setAmount] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const handleAmountChange = (event: any) => {
    setAmount(event.target.value);
  };

  const handleCurrencyChange = (event:any) => {
    setSelectedCurrency(event.target.value);
  };

  useEffect (()=>{
    handleFinalOutput(investmentAmount,expectedDividendYield,expectedAnnualAppreciation)
  },[investmentAmount,expectedDividendYield,expectedAnnualAppreciation])

 
  return (
<main>
<section className="mb-4 mt-10 items-center justify-center">
                <h1 className="text-black font-medium text-2xl mb-4">
                  Investment Calcluator
                </h1>
                <div className="w-full items-center grid">
                  <div className="min-w-full mb-4">
                    <div className="relative w-full">
                      <input
                        className="min-w-full "
                        type="range"
                        id="rangeSlider1"
                        min="0"
                        max="100000"
                        value={investmentAmount}
                        onChange={handleSlider1Change}
                      />
                    </div>
                    <p className="justify-end flex items-center">
                      <span className="text-sm text-neutral-500 mr-2">
                        Investment Amount
                      </span>
                      <span className="text-lg font-semibold text-[#155E75]">{`(AED ${comaFormattedNumber(
                        investmentAmount.toString()
                      )})`}</span>
                    </p>
                  </div>

                  <div className="min-w-full">
                    <input
                      className="min-w-full mb-4"
                      type="range"
                      id="rangeSlider2"
                      min="0.0"
                      max="10.0"
                      step=".1"
                      value={expectedDividendYield}
                      onChange={handleSlider2Change}
                    />
                    <label className="justify-end flex items-center">
                      <span className="text-sm text-neutral-500 mr-2">
                        Expected Dividend Yield
                      </span>
                      <span className="text-lg font-semibold text-[#155E75]">{`(${expectedDividendYield}%)`}</span>
                    </label>
                  </div>

                  <div className="min-w-full">
                    <input
                      className="min-w-full mb-4"
                      type="range"
                      id="rangeSlider3"
                      min="0.0"
                      max="10.0"
                      step=".1"
                      value={expectedAnnualAppreciation}
                      onChange={handleSlider3Change}
                    />
                    <label className="justify-end flex items-center">
                      <span className="text-sm text-neutral-500 mr-2">
                        Expected Annual Appreciation
                      </span>
                      <span className="text-lg font-semibold text-[#155E75]">{`(${expectedAnnualAppreciation}%)`}</span>
                    </label>
                  </div>
                </div>
                <section>
                  <div>
                    <div className=" mb-4 mt-10  w-full font-medium border-[#155E75] border-[1px] rounded-md ">
                      <p className="px-5 pt-5 text-xl text-[#155E75] ">
                        Total return on investment
                      </p>
                      <p className="px-5 pb-5 text-2xl  font-bold text-[#155E75] ">
                        {" "}
                        <span>AED {comaFormattedNumber(parseFloat(finalValue).toFixed(2))}</span>
                      </p>
                    </div>
                  </div>
                  <div className="w-full items-center justify-between flex px-3">
                    <div className="grid px-2 ">
                      <p className="text-xl">Net Dividend Income</p>
                      <p className="text-2xl font-bold">{comaFormattedNumber(parseFloat(netDividendIncome.toString()).toFixed(2))}</p>
                    </div>
                    <div className="grid px-2">
                      {" "}
                      <p className="text-xl">Average Annualised Return</p>{" "}
                      <p className="text-2xl font-bold">{comaFormattedNumber(parseFloat(avgAnnualisedReturn.toString()).toFixed(2))}</p>
                    </div>
                  </div>
                </section>
              </section>
          
</main>
  )
};
export default InvestmentCalculator;

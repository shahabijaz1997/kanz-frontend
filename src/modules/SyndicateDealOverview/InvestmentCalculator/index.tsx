import { useEffect, useState } from "react";
import { comaFormattedNumber } from "../../../utils/object.utils";


const CURRENCIES = ["USD", "AED"];

const InvestmentCalculator = ({}: any) => {


  const [investmentAmount, setinvestmentAmount] = useState(0);
  const [netDividendIncome, setnetDividendIncome] = useState(0);
  const [avgAnnualisedReturn, setavgAnnualisedReturn] = useState(0);
  const [expectedDividendYield, setexpectedDividendYield] = useState(0);
  const [expectedAnnualAppreciation, setexpectedAnnualAppreciation] = useState(0);
  const [numberOfYears, setNumberOfYears] = useState(5);
  const [finalValue, setFinalValue] : any = useState(0)

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
  ): { finalCapitalAppreciation: number; dividendComponent: number; finalTotalReturn: number ; averageAnnualizedReturn: number } {

    annualAppreciationRate=annualAppreciationRate/100
    dividendYield=dividendYield/100
    // Calculate Capital Appreciation Component
    const capitalAppreciation = initialInvestment * Math.pow(1 + annualAppreciationRate, numberOfYears);
  
    // Calculate Dividend Component
    const dividendComponent = initialInvestment * dividendYield * numberOfYears;
  
    // Calculate Total Return
    const totalReturn = capitalAppreciation + dividendComponent;

    const finalTotalReturn = totalReturn - initialInvestment
    const finalCapitalAppreciation = capitalAppreciation - initialInvestment  
   
    const averageAnnualizedReturn = (finalTotalReturn / (numberOfYears * initialInvestment)) * 100;
    

    return {
      finalCapitalAppreciation,
      dividendComponent,
      finalTotalReturn,
      averageAnnualizedReturn,
    };
  }
  

  const [amount, setAmount] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const handleAmountChange = (event: any) => {
    setAmount(event.target.value);
  };

  const handleCurrencyChange = (event:any) => {
    setSelectedCurrency(event.target.value);
  };

  useEffect (()=>{
     setFinalValue(returnOnIvestment(investmentAmount,expectedDividendYield,expectedAnnualAppreciation,numberOfYears))
  },[investmentAmount,expectedDividendYield,expectedAnnualAppreciation,numberOfYears])

 
  return (
<main>
<section className="mb-4 mt-10 items-center justify-center">
                <h1 className="text-black font-medium text-2xl mb-8">
                  Investment Calcluator
                </h1>
                <div className="w-full items-center grid">
                  <div className="min-w-full mb-4">
                    <div className="relative w-full">
                      <input
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
                      <span className="text-sm text-neutral-500 mr-2">
                        Investment amount
                      </span>
                      <span className="text-lg font-semibold text-[#155E75]">{`(AED ${comaFormattedNumber(
                        investmentAmount.toString()
                      )})`}</span>
                    </p>
                  </div>

                  <div className="min-w-full mt-3 mb-8">
                    <input
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
                      <span className="text-sm text-neutral-500 mr-2">
                        Expected Dividend Yield
                      </span>
                      <span className="text-lg font-semibold text-[#155E75]">{`(${expectedDividendYield}%)`}</span>
                    </label>
                  </div>

                  <div className="min-w-full">
                    <input
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
                      <span className="text-sm text-neutral-500 mr-2">
                        Expected Annual Appreciation
                      </span>
                      <span className="text-lg font-semibold text-[#155E75]">{`(${expectedAnnualAppreciation}%)`}</span>
                    </label>
                  </div>
                  <div className="min-w-full mt-5">
                    <input
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
                      <span className="text-sm text-neutral-500 mr-2">
                      Number of years
                      </span>
                      <span className="text-lg font-semibold text-[#155E75]">{`(${numberOfYears})`}</span>
                    </label>
                  </div>
                </div>
                <section>
                  <div className="flex justify-between">
                    <div className=" mb-4 mt-10 font-medium border-[#155E75] border-[1px] rounded-xl w-[45%]">
                      <p className="px-5 pt-5 text-xl text-[#155E75] ">
                        Total return on investment
                      </p>
                      <p className="px-5 pb-5 text-2xl  font-bold text-[#155E75] ">
                        {" "}
                        <span>AED {comaFormattedNumber(parseFloat(finalValue.finalTotalReturn).toFixed(2))}</span>
                      </p>
                    </div>
                    <div className=" mb-4 mt-10 font-medium border-[#155E75] border-[1px] rounded-xl w-[45%]">
                      <p className="px-5 pt-5 text-xl text-[#155E75] ">
                      Average Annualised Return
                      </p>
                      <p className="px-5 pb-5 text-2xl  font-bold text-[#155E75] ">
                        {" "}
                        <span>{comaFormattedNumber(parseFloat(finalValue.averageAnnualizedReturn).toFixed(2))}%</span>
                      </p>
                    </div>
                  </div>
                  <div className="w-full items-center justify-between flex px-3">
                    <div className="grid px-2 ">
                      <p className="text-xl">Net Dividend Income</p>
                      <p className="text-2xl font-bold">{comaFormattedNumber(parseFloat(finalValue.dividendComponent).toFixed(2))}</p>
                    </div>
                    <div className="grid px-2">
                      {" "}
                      <p className="text-xl">Expected Capital Appreciation</p>{" "}
                      <p className="text-2xl font-bold">{comaFormattedNumber(parseFloat(finalValue.finalCapitalAppreciation).toFixed(2))}</p>
                    </div>
                  </div>
                </section>
              </section>
          
</main>
  )
};
export default InvestmentCalculator;

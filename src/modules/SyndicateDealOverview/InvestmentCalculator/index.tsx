import { useEffect, useState } from "react";
import { comaFormattedNumber } from "../../../utils/object.utils";


const CURRENCIES = ["USD", "AED"];

const InvestmentCalculator = ({}: any) => {


    
  const [slider1Value, setSlider1Value] = useState(0);
  const [slider2Value, setSlider2Value] = useState(0);
  const [slider3Value, setSlider3Value] = useState(0);
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

  const handleFinalOutput = (slider1Value: any,slider2Value: any,slider3Value: any) => {
    let answer = (slider1Value * slider2Value) + (slider1Value * slider3Value)
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
    handleFinalOutput(slider1Value,slider2Value,slider3Value)
  },[slider1Value,slider2Value,slider3Value])
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
                        value={slider1Value}
                        onChange={handleSlider1Change}
                      />
                    </div>
                    <p className="justify-end flex items-center">
                      <span className="text-sm text-neutral-500 mr-2">
                        Investment Amount
                      </span>
                      <span className="text-lg font-semibold text-[#155E75]">{`(AED ${comaFormattedNumber(
                        slider1Value.toString()
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
                      value={slider2Value}
                      onChange={handleSlider2Change}
                    />
                    <label className="justify-end flex items-center">
                      <span className="text-sm text-neutral-500 mr-2">
                        Expected Dividend Yield
                      </span>
                      <span className="text-lg font-semibold text-[#155E75]">{`(${slider2Value}%)`}</span>
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
                      value={slider3Value}
                      onChange={handleSlider3Change}
                    />
                    <label className="justify-end flex items-center">
                      <span className="text-sm text-neutral-500 mr-2">
                        Expected Annual Appreciation
                      </span>
                      <span className="text-lg font-semibold text-[#155E75]">{`(${slider3Value}%)`}</span>
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
                      <p className="text-2xl font-bold">Value</p>
                    </div>
                    <div className="grid px-2">
                      {" "}
                      <p className="text-xl">Average Annualised Return</p>{" "}
                      <p className="text-2xl font-bold">Value</p>
                    </div>
                  </div>
                </section>
              </section>
              <section className="mb-4 mt-10">
                <div className="font-semibold text-sm">Invest</div>
                <div className=" text-xs  text-neutral-500 mb-2">
                  Minimum is $2500 Invest by Oct 2
                </div>
                <div className="border-neutral-500 border-[1px] rounded-md min-w-full pl-2 justify-between flex bg-white">
                  <label className="w-full">
                    <input className="min-w-full h-9 no-spin-button"
                    pattern="[0-9]*"
                    placeholder={
                      selectedCurrency === 'USD' ? '$ 00.00' : 'AED 00.00'
                    }
                    onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                      min="0"
                      type="number"
                      value={amount}
                      onChange={handleAmountChange}
                    />
                  </label>
                  <label className="w-[10%]">
                    <select
                    className="h-9"
                      value={selectedCurrency}
                      onChange={handleCurrencyChange}
                    >
                      <option className="text-md font-light" value="USD">USD</option>
                      <option className="text-md font-light" value="AED">AED</option>
                    </select>
                  </label>
                </div>
              </section>
</main>
  )
};
export default InvestmentCalculator;

import { useState } from "react";
const CURRENCIES = ["USD", "AED"];

const SellingPriceUI = ({ language }: any) => {
    const [currency, setCurrency] = useState(0);

    return (
        <section className="flex items-start justify-center flex-col mt-10 max-w-[420px] screen500:max-w-[300px]">
            <h3 className="text-neutral-700 font-medium text-base w-[420px]">
                Price
            </h3>

            <section className="mb-8 w-full relative mt-3">
                <div className="relative rounded-md w-full h-10 border-[1px] border-neutral-300 overflow-hidden inline-flex items-center px-3">
                    <input placeholder={`${currency === 0 ? "$" : "د.إ"} 0.00`} type="text" className="outline-none w-full h-full placeholder-neutral-500" />
                    <span className="cursor-pointer inline-flex items-center" onClick={() => setCurrency(prev => { return prev === 0 ? 1 : 0 })}>
                        <button className="font-normal text-lg text-neutral-500">{CURRENCIES[currency]}</button>
                    </span>
                </div>

                <ul className="inline-flex items-center gap-3 mt-3">
                    <li className="cursor-pointer py-2 px-3 h-9 w-24 bg-cbc-grey-sec rounded-md text-center text-sm font-normal text-neutral-900">{currency === 0 ? "$" : "د.إ"} 34</li>
                </ul>
            </section>
        </section>
    )
};
export default SellingPriceUI;
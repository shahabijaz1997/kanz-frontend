import LinearProgressBar from ".././LinearProgressBar";

const YourTopMarkets = ({}: any): any => {
  return (
    <main className="w-[50%]">
      <aside className="border-[1px] bg-white w-full border-neutral-200 rounded-md  p-3">
        <div>
          <h1 className="font-bold text-sm"> Your Top Markets</h1>
          <div className="text-xs mt-1 mb-2 text-[#667085]">by your investment multiple</div>
            <div className="w-full  inline-flex justify-between items-center">
              <div className="w-full   p-1 gap-5 items-center flex">
                <div className="inline-block gap-3 items-center ">
                <span className="text-xs font-bold">MyAsiaVC</span>
                <span className="w-full  px-[340px]">
                  <LinearProgressBar />
                </span>
                </div>
                <span className=" text-xs font-medium">1.02X</span>
              </div>
            </div>
            <div className="w-full inline-flex justify-between items-center">
              <div className="w-full   p-1 gap-5 items-center flex">
                <div className="inline-block gap-3 items-center ">
                <span className="text-xs font-bold">MyAsiaVC</span>
                <span className="w-full px-[340px]">
                  <LinearProgressBar />
                </span>
                </div>
                <span className=" text-xs font-medium">1.02X</span>
              </div>
            </div>
            <div className="w-full inline-flex justify-between items-center">
              <div className="w-full   p-1 gap-5 items-center flex">
                <div className="inline-block gap-3 items-center ">
                <span className="text-xs font-bold">MyAsiaVC</span>
                <span className="w-full px-[340px]">
                  <LinearProgressBar />
                </span>
                </div>
                <span className=" text-xs font-medium">1.02X</span>
              </div>
            </div>
            <div className="w-full inline-flex justify-between items-center">
              <div className="w-full   p-1 gap-5 items-center flex">
                <div className="inline-block gap-3 items-center ">
                <span className="text-xs font-bold">MyAsiaVC</span>
                <span className="w-full px-[340px]">
                  <LinearProgressBar />
                </span>
                </div>
                <span className=" text-xs font-medium">1.02X</span>
              </div>
            </div>
            <div className="w-full inline-flex justify-between items-center">
              <div className="w-full mt-2  p-1 gap-5 items-center flex">
                <div className="inline-block gap-3 items-center ">
                <span className="text-xs font-bold">MyAsiaVC</span>
                <span className="w-full px-[340px]">
                  <LinearProgressBar />
                </span>
                </div>
                <span className=" text-xs font-medium">1.02X</span>
              </div>
            </div>
        </div>
      </aside>
    </main>
  );
};
export default YourTopMarkets;

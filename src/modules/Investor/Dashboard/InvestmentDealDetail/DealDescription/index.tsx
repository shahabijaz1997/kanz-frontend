const DealDescription = () => {
  return (
    <section className="min-w-full border-[1px] border-[#E5E5E5] rounded-md shadow-md">
      <p className=" cursor-pointer flex justify-end items-center px-4 text-sm pt-4 font-medium text-[#155E75]">
        <span className="hover:underline">View more detail</span> <span className="px-1">&#10140;</span>
      </p>
      <div className="h-full w-full flex flex-col justify-between px-[2rem] pt-[1rem] pb-[2rem]">
        <h1 className=" font-medium text-xl">Invest</h1>
        <p className="text-sm text-[#737373]">
          Minimum is $2500 Invest by Oct 2
        </p>
        <aside className="w-[80%] flex pt-7 items-start justify-between">
          <div className="flex-col flex gap-6">
            <span className="flex-col flex gap-1">
              <label className="font-medium">Insturment type</label>
              <p>Value</p>
            </span>
            <span className="flex-col flex gap-1">
              <label className="font-medium">Equity Type</label>
              <p>Value</p>
            </span>
            <span className="flex-col flex gap-1">
              <label className="font-medium">Stage</label>
              <p>Value</p>
            </span>
          </div>
          <div className="flex-col flex gap-6">
            <span className="flex-col flex gap-1">
              <label className="font-medium">Deal Target</label>
              <p>Value</p>
            </span>
            <span className="flex-col flex gap-1">
              <label className="font-medium">Valuation</label>
              <p>Value</p>
            </span>
            <span className="flex-col flex gap-1">
              <label className="font-medium">Type</label>
              <p>Value</p>
            </span>
          </div>
          <div className="flex-col flex gap-6">
            <span className="flex-col flex gap-1">
              <label className="font-medium">Minimum Check Size</label>
              <p>Value</p>
            </span>
            <span className="flex-col flex gap-1">
              <label className="font-medium">Pro Rata</label>
              <p>Value</p>
            </span>
          </div>
        </aside>
      </div>
    </section>
  );
};
export default DealDescription;

import Button from "../../../shared/components/Button";

const AccountDetails = ({ setStep }: any): any => {
  return (
    <aside className="p-2 flex items-center justify-center w-full">
      <section className="w-[60%] border-[1px] p-1 rounded-md bg-white border-[#E5E5E5]">
        <div className="gap-4 px-6 py-1 justify-start flex flex-col ">
          <span
            className=" mt-2 cursor-pointer flex justify-end items-center w-full"
            onClick={() => setStep(1)}
          >
            X
          </span>
          <section className="flex justify-center items-center w-full flex-col">
            <span className="text-lg font-semibold" >
                Wallet Deposit Intiated
            </span>
            <span className="text-[#737373] text-xs mt-3" >
                Description related to discalaimer
            </span>
            <span className="text-[#737373] text-xs mt-3 w-1/2 text-center whitespace-break-spaces" >
            Kindly send a proof of transfer to Kanz@gmail.com to speed up your investment process
            </span>
          </section>
          <span className="border-b-[1px] border-[#E5E5E5] w-full flex font-medium text-sm py-1.5 justify-between">
            Current Balance <span className="font-normal">AED 74K</span>
          </span>
          <span className="border-b-[1px] border-[#E5E5E5] w-full flex font-medium text-sm py-1.5 justify-between">
            Deposit Amount <span className="font-normal">AED 74K</span>
          </span>
          <span className=" w-full border-b-[1px] border-[#E5E5E5] flex font-medium text-sm py-1 justify-between">
            New Balance <span className="font-normal">AED 74K</span>
          </span>
          <span className="border-b-[1px] border-[#E5E5E5] w-full flex font-medium text-sm py-1.5 justify-between">
            Deposit Amount <span className="font-normal">AED 74K</span>
          </span>
          <span className="border-b-[1px] border-[#E5E5E5] w-full flex font-medium text-sm py-1.5 justify-between">
            Deposit Amount <span className="font-normal">AED 74K</span>
          </span>
          <span className="border-b-[1px] border-[#E5E5E5] w-full flex font-medium text-sm py-1.5 justify-between">
            Deposit Amount <span className="font-normal">AED 74K</span>
          </span>
          <span className="border-b-[1px] border-[#E5E5E5] w-full flex font-medium text-sm py-1.5 justify-between">
            Deposit Amount <span className="font-normal">AED 74K</span>
          </span>
          <span className="border-b-[1px] border-[#E5E5E5] w-full flex font-medium text-sm py-1.5 justify-between">
            Deposit Amount <span className="font-normal">AED 74K</span>
          </span>
          <span className="w-full flex font-medium text-sm py-1.5 justify-between">
            Deposit Amount <span className="font-normal">AED 74K</span>
          </span>
          <span className="w-full flex font-medium text-sm pt-1.5 pb-2 gap-8 justify-evenly">
            <span className="w-full" >
                <Button className="w-full" type="outlined">Print</Button>
            </span>
            <span className="w-full" >
                <Button className="w-full" type="outlined">Copy Details</Button>
            </span>
            <span className="w-full" >
                <Button className="w-full" type="primary">Upload Receipt</Button>
            </span>
          </span>
        </div>
      </section>
    </aside>
  );
};

export default AccountDetails;

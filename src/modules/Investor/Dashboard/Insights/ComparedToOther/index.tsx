import LinearProgressBar from ".././LinearProgressBar";
import LightGrayWidthLinearProgressBar from "./LightGrayWidthLinearProgressBar";
import WidthLinearProgressBar from "./WidthLinearProgressBar";

const ComparedToOther = ({}: any): any => {
  return (
    <main className="min-h-full w-1/2">
      <aside className="border-[1px] bg-white w-full border-neutral-200 min-h-full rounded-md  p-3">
        <div>
          <h1 className="font-bold text-sm"> Compared to Other Investors</h1>
          <div className="text-xs my-1 text-[#667085]">
            over the past 12 months
          </div>
          <span className="flex items-center mt-5 mb-3 gap-4">
            <span className="text-xs">
              {" "}
              <span className="px-2 py-0 text-xs mr-2 bg-[#B8E4F2]"></span>You
            </span>
            <span className="text-xs">
              {" "}
              <span className="px-2 py-0 text-xs mr-2 bg-[#F2F2F2]"></span>Others
            </span>
          </span>
          <div className="w-full  inline-flex justify-between my-4 items-center">
            <div className="w-full p-1 gap-5 ">
              <span className="text-xs">Average # of Syndicates joined</span>
              <span className="inline">
                <WidthLinearProgressBar labelString={"1"} />
              </span>
              <LightGrayWidthLinearProgressBar labelString={"3"} />
            </div>
          </div>
          <div className="w-full  inline-flex justify-between my-4 items-center">
            <div className="w-full p-1 gap-5 ">
              <span className="text-xs">Average # of Monthly Deal Invites</span>
              <span className="inline">
                <WidthLinearProgressBar labelString={"1"} />
              </span>
              <LightGrayWidthLinearProgressBar labelString={"3"} />
            </div>
          </div>
          <div className="w-full  inline-flex justify-between my-4 items-center">
            <div className="w-full p-1 gap-5 ">
              <span className="text-xs">Participation Rate</span>
              <span className="inline">
                <WidthLinearProgressBar labelString={"1"} />
              </span>
              <LightGrayWidthLinearProgressBar labelString={"3"} />
            </div>
          </div>

        </div>
      </aside>
    </main>
  );
};
export default ComparedToOther;

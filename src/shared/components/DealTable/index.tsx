import { useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import RaiseIcon from "../../../ts-icons/raiseIcon.svg";
import {
  comaFormattedNumber,
  numberFormatter,
} from "../../../utils/object.utils";

const DealTable = ({ dealType, targetSize, committed, investors }: any) => {
  const language: any = useSelector((state: RootState) => state.language.value);
  const event: any = useSelector((state: RootState) => state.event.value);


  return (
    <aside className="rounded-lg shadow-cs-5 border-[1px] border-neutral-200">
      <div className="min-w-full overflow-hidden rounded-lg justify-evenly bg-white px-10 py-8">
        <div className="inline-block align-middle w-[33%] relative">
          <span className="inline-flex flex-col gap-2">
            <small className="uppercase text-neutral-500 font-medium text-sm">
              {language?.v3?.fundraiser?.target_size}
            </small>
            <p className="uppercase text-neutral-900 font-semibold text-2xl">
              {event === "ar" ? comaFormattedNumber(targetSize, dealType, true):comaFormattedNumber(targetSize, dealType, false)}
            </p>
          </span>
          {committed > 0 && investors > 0 && (
            <div className="absolute bottom-1 ml-3 inline-flex items-center justify-around bg-green-100 py-1 px-1.5 rounded-[9px] h-[20px] gap-1">
              <RaiseIcon />
              <span className="text-green-800 text-sm font-medium">
                {language?.v3?.startup?.overview?.raising}
              </span>
            </div>
          )}
        </div>
        <div className="inline-flex justify-center align-middle w-[33%]">
          <span className="inline-flex flex-col gap-2">
            <small className="uppercase text-neutral-500 font-medium text-sm">
              {language?.v3?.startup?.overview?.committed}
            </small>
            <p className="uppercase text-neutral-900 font-semibold text-2xl">
            {event === "ar" ? comaFormattedNumber(committed, dealType, true):comaFormattedNumber(committed, dealType, false)}
            </p>
          </span>
        </div>
        <div className="inline-flex justify-center align-middle w-[33%]">
          <span className="inline-flex flex-col gap-2">
            <small className="uppercase text-neutral-500 font-medium text-sm">
              {language?.v3?.startup?.overview?.investors}
            </small>
            <p className="uppercase text-neutral-900 font-semibold text-2xl">
              {investors}
            </p>
          </span>
        </div>
      </div>
    </aside>
  );
};
export default DealTable;

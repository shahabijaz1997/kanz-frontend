import { useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import RaiseIcon from "../../../ts-icons/raiseIcon.svg";

const DealTable = ({ }: any) => {
    const language: any = useSelector((state: RootState) => state.language.value);

    return (
        <aside className="rounded-lg shadow-cs-5 border-[1px] border-neutral-200">
            <div className="min-w-full overflow-hidden rounded-lg bg-white px-10 py-8">
                <div className="inline-block align-middle w-[40%] relative">
                    <span className="inline-flex flex-col gap-2">
                        <small className="uppercase text-neutral-500 font-medium text-sm">{language?.v3?.startup?.overview?.total}</small>
                        <p className="uppercase text-neutral-900 font-semibold text-2xl">$10,000</p>
                    </span>

                    <div className="absolute bottom-1 ml-3 inline-flex items-center justify-around bg-green-100 py-1 px-2.5 rounded-[9px] h-[20px] gap-1">
                        <RaiseIcon />
                        <span className="text-green-800 text-sm font-medium">{language?.v3?.startup?.overview?.raising}</span>
                    </div>
                </div>
                <div className="inline-block align-middle w-[20%]">
                    <span className="inline-flex flex-col gap-2">
                        <small className="uppercase text-neutral-500 font-medium text-sm">{language?.v3?.startup?.overview?.committed}</small>
                        <p className="uppercase text-neutral-900 font-semibold text-2xl">$450</p>
                    </span>
                </div>
                <div className="inline-block align-middle w-[20%]">
                    <span className="inline-flex flex-col gap-2">
                        <small className="uppercase text-neutral-500 font-medium text-sm">{language?.v3?.startup?.overview?.investors}</small>
                        <p className="uppercase text-neutral-900 font-semibold text-2xl">5</p>
                    </span>
                </div>
                <div className="inline-block align-middle w-fit">
                    <span className="inline-flex flex-col gap-2">
                        <small className="uppercase text-neutral-500 font-medium text-sm">{language?.v3?.startup?.overview?.rounds}</small>
                        <p className="uppercase text-neutral-900 font-semibold text-2xl">1</p>
                    </span>
                </div>
            </div>
        </aside>
    );
};
export default DealTable;
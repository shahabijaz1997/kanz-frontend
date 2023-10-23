import { useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";

const NoteDetails = () => {
    const language: any = useSelector((state: RootState) => state.language.value);

    return (
        <div className="rounded-md bg-white border-[1px] border-neutral-200 overflow-hidden p-8">
            <p className="text-cc-gray text-xl font-medium text-center w-full py-[6rem]">{language?.v3?.common?.noData}</p>
        </div>
    );
};
export default NoteDetails;
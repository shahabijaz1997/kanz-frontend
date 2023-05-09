import { PromptMessage } from "../../../enums/types.enum";
import CheckIcon from "../../../ts-icons/CheckIcon.svg";
import CrossIcon from "../../../ts-icons/crossIcon.svg";

const AlertMessage = ({ type, message, icon, removeMessage }: any) => {
    const messageIcon = () => {
        if (type === PromptMessage.SUCCESS) return <CheckIcon stroke="#fff" />
        else if (type === PromptMessage.ERROR) return <CrossIcon stroke="#fff" className="w-4 h-4" />
    };

    return (
        <aside className={`w-full h-[52px] inline-flex items-center pl-4 relative ${type === PromptMessage.SUCCESS && "bg-green-50"} ${type === PromptMessage.ERROR && "bg-red-50"}`}>
            <div className="bg-green-400 h-4 w-4 rounded-full inline-grid place-items-center">{messageIcon()}</div>
            <p className="text-green-800 pl-3 text-sm font-medium">{message}</p>
            <CrossIcon onClick={removeMessage} stroke="#22C55E" className="absolute top-1/2 translate-y-[-50%] right-4 h-5 w-5 cursor-pointer" />
        </aside>
    )
};
export default AlertMessage;
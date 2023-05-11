import { PromptMessage } from "../../../enums/types.enum";
import CheckIcon from "../../../ts-icons/CheckIcon.svg";
import CrossIcon from "../../../ts-icons/crossIcon.svg";

const FIleUploadAlert = ({ type, message, removeMessage }: any) => {
    const renderAlert = () => {
        if (type === PromptMessage.SUCCESS) {
            return (
                <aside className={`w-full h-[52px] inline-flex items-center pl-4 relative bg-green-50`}>
                    <div className={`bg-green-400 h-4 w-4 rounded-full inline-grid place-items-center`}><CheckIcon stroke="#fff" /></div>
                    <p className="text-green-800 pl-3 text-sm font-medium">{message}</p>
                    <CrossIcon onClick={removeMessage} stroke="#22C55E" className="absolute top-1/2 translate-y-[-50%] right-4 h-5 w-5 cursor-pointer" />
                </aside>
            )
        } else if (type === PromptMessage.ERROR) {
            return (
                <aside className={`w-full h-[52px] inline-flex items-center pl-4 relative bg-red-300`}>
                    <div className={`bg-white h-4 w-4 rounded-full inline-grid place-items-center`}><CrossIcon stroke="rgb(252 165 165)" className="w-4 h-4" /></div>
                    <p className="text-white pl-3 text-sm font-medium">{message}</p>
                    <CrossIcon onClick={removeMessage} stroke="#fff" className="absolute top-1/2 translate-y-[-50%] right-4 h-5 w-5 cursor-pointer" />
                </aside>
            )
        } else {
            return (
                <aside className={`w-full h-[52px] inline-flex items-center pl-4 relative bg-red-300`}>
                    <div className={`bg-white h-4 w-4 rounded-full inline-grid place-items-center`}><CrossIcon stroke="rgb(252 165 165)" className="w-4 h-4" /></div>
                    <p className="text-green-800 pl-3 text-sm font-medium">{message}</p>
                    <CrossIcon onClick={removeMessage} stroke="#22C55E" className="absolute top-1/2 translate-y-[-50%] right-4 h-5 w-5 cursor-pointer" />
                </aside>
            )
        }
    };

    return renderAlert()
};
export default FIleUploadAlert;
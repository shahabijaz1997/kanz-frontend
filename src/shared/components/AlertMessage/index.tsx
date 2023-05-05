import CheckIcon from "../../../ts-icons/CheckIcon.svg";
import CrossIcon from "../../../ts-icons/crossIcon.svg";

const AlertMessage = ({ type, message, icon }: any) => {
    return (
        <aside className="w-full h-[52px] bg-green-50 inline-flex items-center pl-4 relative">
            <div className="bg-green-400 h-4 w-4 rounded-full inline-grid place-items-center">
                <CheckIcon stroke="#fff" />
            </div>

            <p className="text-green-800 pl-3 text-sm font-medium">{message}</p>

            <CrossIcon stroke="#22C55E" className="absolute top-1/2 translate-y-[-50%] right-4 h-5 w-5 cursor-pointer" />
        </aside>
    )
 };
export default AlertMessage;
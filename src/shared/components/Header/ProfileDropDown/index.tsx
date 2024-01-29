import { useNavigate } from "react-router-dom";
import LogoutDropDownIcon from "../../../../ts-icons/LogoutDropDownIcon.svg";
import ProfileDropDownIcon from "../../../../ts-icons/ProfileDropDownIcon.svg";
import { RoutesEnums } from "../../../../enums/routes.enum";
import WalletDropDownIcon from "../../../../ts-icons/WalletDropDownIcon.scg";
import { RootState } from "../../../../redux-toolkit/store/store";
import { useSelector } from "react-redux";

const ProfileDropDown = ({
  isProfileOpen,
  setIsProfileOpen,
  onLogout,
}: any) => {
    const navigate = useNavigate();
    const orientation = useSelector((state: RootState) => state.orientation.value);
  return (
    isProfileOpen && (
      <section
        className={`absolute z-[1] top-[3.25rem] ${orientation === "rtl" ? `left-8` : `right-8`} bg-white border-[1px] border-neutral-200 rounded-md w-[100px]`}
      >
        <div className="items-center justify-center flex flex-col py-1 cursor-pointer">
          <span onClick={()=> navigate(RoutesEnums.PROFILE)} className="w-full flex items-center gap-2 px-3 py-1 hover:bg-slate-100">
            <ProfileDropDownIcon />
            <span className="text-sm">Profile</span>
          </span>
          <span
            onClick={()=>{navigate(RoutesEnums.WALLET)}}
            className="w-full flex items-center px-3 py-1 gap-2 cursor-pointer hover:bg-slate-100"
          >
            <WalletDropDownIcon />
            <span className="text-sm">Wallet</span>
          </span>
          <span
            onClick={onLogout}
            className="w-full flex items-center px-3 py-1 gap-2 cursor-pointer hover:bg-slate-100"
          >
            <LogoutDropDownIcon />
            <span className="text-sm">Logout</span>
          </span>
        </div>
      </section>
    )
  );
};

export default ProfileDropDown;

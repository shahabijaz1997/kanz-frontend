import { useNavigate } from "react-router-dom";
import LogoutDropDownIcon from "../../../../ts-icons/LogoutDropDownIcon.svg";
import ProfileDropDownIcon from "../../../../ts-icons/ProfileDropDownIcon.svg";
import { RoutesEnums } from "../../../../enums/routes.enum";
import WalletDropDownIcon from "../../../../ts-icons/WalletDropDownIcon.scg";

const ProfileDropDown = ({
  isProfileOpen,
  setIsProfileOpen,
  onLogout,
}: any) => {
    const navigate = useNavigate();
  return (
    isProfileOpen && (
      <section
        className={`absolute z-[1] top-[3.25rem] right-8 bg-white border-[1px] border-neutral-200 rounded-md w-[100px]`}
      >
        <div className="items-center justify-center flex flex-col py-1 cursor-pointer">
          <span onClick={()=> navigate(RoutesEnums.PROFILE)} className="w-full flex items-center gap-2 px-3 py-1 hover:bg-slate-100">
            <ProfileDropDownIcon />
            <span className="text-xs">Profile</span>
          </span>
          <span
            onClick={()=>{navigate(RoutesEnums.WALLET)}}
            className="w-full flex items-center px-3 py-1 gap-2 cursor-pointer hover:bg-slate-100"
          >
            <WalletDropDownIcon />
            <span className="text-xs">Wallet</span>
          </span>
          <span
            onClick={onLogout}
            className="w-full flex items-center px-3 py-1 gap-2 cursor-pointer hover:bg-slate-100"
          >
            <LogoutDropDownIcon />
            <span className="text-xs">Logout</span>
          </span>
        </div>
      </section>
    )
  );
};

export default ProfileDropDown;

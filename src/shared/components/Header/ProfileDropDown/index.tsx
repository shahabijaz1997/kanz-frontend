import { useNavigate } from "react-router-dom";
import LogoutDropDownIcon from "../../../../ts-icons/LogoutDropDownIcon.svg";
import ProfileDropDownIcon from "../../../../ts-icons/ProfileDropDownIcon.svg";
import { RoutesEnums } from "../../../../enums/routes.enum";

const ProfileDropDown = ({
  isProfileOpen,
  setIsProfileOpen,
  onLogout,
}: any) => {
    const navigate = useNavigate();
  return (
    isProfileOpen && (
      <section
        className={`absolute z-[1] top-[3.75rem] right-8 bg-white border-[1px] border-neutral-200 rounded-md w-[120px]`}
      >
        <div className="items-center justify-center flex flex-col py-1 cursor-pointer">
          <span onClick={()=> navigate(RoutesEnums.PROFILE)} className=" w-full flex items-center justify-center gap-3 p-1 hover:bg-slate-100">
            <span className="flex items-center justify-center">
              <ProfileDropDownIcon />
            </span>
            <span className="flex items-center justify-center ">Profile</span>
          </span>
          <span
            onClick={onLogout}
            className=" w-full flex items-center justify-center p-1 gap-3 cursor-pointer  hover:bg-slate-100"
          >
            <span className="flex items-center justify-center">
           <LogoutDropDownIcon />
            </span>
            <span className="flex items-center justify-center ">Logout</span>
          </span>
        </div>
      </section>
    )
  );
};

export default ProfileDropDown;

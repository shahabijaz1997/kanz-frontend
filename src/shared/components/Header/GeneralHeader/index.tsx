import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux-toolkit/store/store";
import Logo from "../../../../assets/logo.png";
import BellIcon from "../../../../ts-icons/BellIcon.svg";
import { logout } from "../../../../apis/auth.api";
import { useNavigate } from "react-router-dom";
import { saveToken } from "../../../../redux-toolkit/slicer/auth.slicer";
import { saveUserData } from "../../../../redux-toolkit/slicer/user.slicer";
import { KanzRoles } from "../../../../enums/roles.enum";
import CrossIcon from "../../../../ts-icons/crossIcon.svg";
import { saveUserMetaData } from "../../../../redux-toolkit/slicer/metadata.slicer";
import LanguageDrodownWrapper from "../../../views/LanguageDrodownWrapper";
import { saveLogo } from "../../../../redux-toolkit/slicer/attachments.slicer";
import { languageDropdownItems } from "../../../../utils/dropdown-items.utils";
import { RoutesEnums } from "../../../../enums/routes.enum";
import { saveDataHolder } from "../../../../redux-toolkit/slicer/dataHolder.slicer";
import ProfileDropDown from "../ProfileDropDown";
import Notifcations from "../Notifications";

const GeneralHeader = ({
  responsive = false,
  showMenu = false,
  showLanguageDropdown = false,
  onSuperLogout = () => {},
}: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user: any = useSelector((state: RootState) => state.user.value);
  const language: any = useSelector((state: RootState) => state.language.value);
  const orientation: any = useSelector(
    (state: RootState) => state.orientation.value
  );
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const metadata: any = useSelector((state: RootState) => state.metadata.value);
  const event: any = useSelector((state: RootState) => state.event.value);
  const navigationMenu = [
    { id: 1, title: language.landing?.invest },
    { id: 2, title: language.landing?.raise },
    { id: 3, title: language.header?.syndicate },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifcationsOpen, setNotificationsOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const onLogout = async () => {
    try {
      onSuperLogout(true);
      dispatch(saveToken(""));
      localStorage.clear();
      dispatch(saveUserData(""));
      dispatch(saveUserMetaData(""));
      dispatch(saveLogo(""));
      dispatch(saveDataHolder(""));
      navigate(RoutesEnums.LOGIN);
      await logout(authToken);
    } catch (error: any) {
    } finally {
      let timer = setTimeout(() => {
        clearTimeout(timer);
        onSuperLogout(false);
      }, 500);
    }
  };

  const showSelectedDisabled = () => {
    let item = languageDropdownItems.find((lang: any) => lang.name === event);
    return (
      <button
        type="button"
        className={`inline-flex items-center gap-x-1.5 px-3 py-2 text-sm font-medium text-neutral-700 cursor-not-allowed ${
          orientation === "rtl" ? "w-full justify-end pl-5" : "justify-end"
        }`}
      >
        <img className="h-4" src={item?.icon} alt={item?.title} />
        {item?.title}
        <svg
          className="-mr-1 h-5 w-5"
          viewBox="0 0 20 20"
          fill="#404040"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    );
  };

  const authenticatedHeaderNav = () => {
    if (authToken) {
      return (
        <React.Fragment>
 
          <li className="">
            <div
              onClick={(e:any) => {
                e.stopPropagation();
                setNotificationsOpen(true);
              }}
              className={`rounded-full w-8 h-9 inline-grid place-items-center ${
                notifcationsOpen ? `bell-background` : ``
              }`}
            >
              <BellIcon stroke={"#4F4F4F"} />
              <Notifcations
                open={notifcationsOpen}
                setOpen={setNotificationsOpen}
              />
            </div>
          </li>
          <li
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
            }}
          >
            <button className="text-neutral-500 font-medium cursor-pointer text-sm tracking-[0.03em] flex items-center">
              {metadata?.profile_picture_url ? (
                <img
                  className="w-8 h-8 rounded-full shadow-lg"
                  src={metadata?.profile_picture_url}
                />
              ) : (
                <div className="text-white justify-center items-center flex w-8 h-8 rounded-full shadow-lg bg-[#155E75]">
                  {metadata?.name?.slice(0, 2).toUpperCase()}
                </div>
              )}{" "}
            </button>
            <ProfileDropDown
              isProfileOpen={isProfileOpen}
              setIsProfileOpen={setIsProfileOpen}
              onLogout={onLogout}
            />
          </li>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          {authToken ? (
            <li
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
              }}
            >
              <button className="text-neutral-500 font-medium cursor-pointer text-sm tracking-[0.03em] flex items-center">
                <img
                  className="w-10 h-10 rounded-full shadow-lg"
                  src={metadata?.profile_picture_url}
                />
              </button>
              <ProfileDropDown
                isProfileOpen={isProfileOpen}
                setIsProfileOpen={setIsProfileOpen}
                onLogout={onLogout}
              />
            </li>
          ) : (
            <React.Fragment> 
              <li onClick={() => navigate(RoutesEnums.LOGIN)}>
                <button className="text-neutral-500 cursor-pointer text-sm tracking-[0.03em]">
                  {language?.buttons?.signin}
                </button>
              </li>
              <li
                onClick={() =>
                  navigate(RoutesEnums.SIGNUP, {
                    state: KanzRoles.INVESTOR,
                  })
                }
              >
                <button className="text-white text-sm tracking-[0.03em] bg-cyan-800 rounded-md focus:outline-none focus:shadow-outline w-full h-[38px] px-3">
                  {language?.buttons?.getStart}
                </button>
              </li>
            </React.Fragment>
          )}
        </React.Fragment>
      );
    }
  };

  return (
    <React.Fragment>
      {!responsive ? (
        <div className="container relative mx-auto px-4 py-4 flex items-center justify-between">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={Logo} alt="App Logo" />
          </div>

          {showMenu && (
            <nav className="absolute left-1/2 translate-x-[-50%]">
              <ul className="inline-flex gap-9">
                {React.Children.toArray(
                  navigationMenu.map((i) => (
                    <li className="cursor-pointer transition-all text-neutral-500 text-base font-medium hover:text-neutral-900 hover:underline">
                      <a href={`#${i.title}`}>{i.title}</a>
                    </li>
                  ))
                )}
              </ul>
            </nav>
          )}

          <nav className="">
            <ul className="inline-flex items-center gap-6">
              {window.location.pathname === "/" && (
                <li>
                  <button
                    className="text-neutral-500 font-medium cursor-pointer text-sm tracking-[0.03em]"
                    onClick={() => {
                      navigate(RoutesEnums.BLOGS);
                    }}
                  >
                    Blogs
                  </button>
                </li>
              )}
              <li className="relative">
                {showLanguageDropdown ? (
                  <LanguageDrodownWrapper />
                ) : (
                  showSelectedDisabled()
                )}
              </li>
              {authenticatedHeaderNav()}
            </ul>
          </nav>
        </div>
      ) : (
        <div className="container mx-auto py-6 flex items-start flex-col">
          <div className="flex items-center justify-between container px-4">
            <div
              className="text-xl font-bold text-gray-800 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img src={Logo} alt="App Logo" />
            </div>

            <button
              className="md:hidden rounded-lg focus:outline-none focus:shadow-outline"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <CrossIcon stroke={"#717171"} className="h-8 w-8" />
              ) : (
                <svg
                  className="h-6 w-6 fill-current text-gray-600"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 5h16v2H4V5zm0 7h16v2H4v-2zm0 7h16v2H4v-2z"
                  />
                </svg>
              )}
            </button>
          </div>

          <nav
            className={`${
              isMenuOpen ? "block w-full bg-white z-10" : "hidden"
            }`}
          >
            <ul className="flex items-center flex-row-reverse pt-12 w-full justify-between px-4">
              <li>
                {showLanguageDropdown ? (
                  <LanguageDrodownWrapper />
                ) : (
                  showSelectedDisabled()
                )}
              </li>
              <li>
                <div className="rounded-full w-8 h-8 inline-grid place-items-center bell-background cursor-not-allowed">
                  <BellIcon stroke={"#4F4F4F"} />
                </div>
              </li>
              {authToken ? (
                <li
                  onClick={() => {
                    setIsProfileOpen(!isProfileOpen);
                  }}
                >
                  <button className="text-neutral-500 font-medium cursor-pointer text-sm tracking-[0.03em] flex items-center">
                    <img
                      className="w-10 h-10 rounded-full shadow-lg"
                      src={metadata?.profile?.logo}
                    />
                  </button>
                  <ProfileDropDown
                    isProfileOpen={isProfileOpen}
                    setIsProfileOpen={setIsProfileOpen}
                    onLogout={onLogout}
                  />
                </li>
              ) : (
                <li
                  onClick={() =>
                    navigate(RoutesEnums.SIGNUP, { state: KanzRoles.INVESTOR })
                  }
                >
                  <button className="text-white text-sm tracking-[0.03em] bg-cyan-800 rounded-md focus:outline-none focus:shadow-outline w-full h-[38px] px-3">
                    {language?.buttons?.getStart}
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      )}
    </React.Fragment>
  );
};
export default GeneralHeader;

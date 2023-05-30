import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux-toolkit/store/store";
import Logo from "../../../../assets/logo.png";
import Dropdown from "../../Dropdown";
import { languageDropdownItems } from "../../../../utils/dropdown-items.utils";
import BellIcon from "../../../../ts-icons/BellIcon.svg";
import { logout } from "../../../../apis/auth.api";
import { useNavigate } from "react-router-dom";
import { saveToken } from "../../../../redux-toolkit/slicer/auth.slicer";
import { saveUserData } from "../../../../redux-toolkit/slicer/user.slicer";
import { KanzRoles } from "../../../../enums/roles.enum";

const GeneralHeader = ({ responsive = false, showMenu = false }: any) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const language: any = useSelector((state: RootState) => state.language.value);
    const authToken: any = useSelector((state: RootState) => state.auth.value);
    const user: any = useSelector((state: RootState) => state.user.value);
    const navigationMenu = [{ id: 1, title: language.header.investment }, { id: 2, title: language.header.startup }, { id: 3, title: language.header.syndicate }, { id: 4, title: language.header.company }]
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const onLogout = async () => {
        try {
            let { status } = await logout(authToken);
        } catch (error: any) {
        } finally {
            dispatch(saveToken(""));
            navigate("/login");
            localStorage.clear();
            dispatch(saveUserData(""));
        }
    };

    const authenticatedHeaderNav = () => {
        if (user.type) {
            return (
                <React.Fragment>
                    <li className="">
                        <div className="rounded-full w-8 h-8 inline-grid place-items-center bell-background ">
                            <BellIcon stroke={"#4F4F4F"} />
                        </div>
                    </li>
                    <li onClick={onLogout}>
                        <button className="text-neutral-500 font-medium cursor-pointer text-sm tracking-[0.03em]">{language.buttons.logout}</button>
                    </li>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    {authToken ? (
                        <li onClick={onLogout}>
                            <button className="text-neutral-500 font-medium cursor-pointer text-sm tracking-[0.03em]">{language.buttons.logout}</button>
                        </li>
                    ) : (
                        <React.Fragment>
                            <li onClick={() => navigate("/login")}>
                                <button className="text-neutral-500 cursor-pointer text-sm tracking-[0.03em]">{language.buttons.signin}</button>
                            </li>
                            <li onClick={() => navigate("/signup", { state: KanzRoles.INVESTOR })}>
                                <button className="text-white text-sm tracking-[0.03em] bg-cyan-800 rounded-md focus:outline-none focus:shadow-outline w-full h-[38px] px-3">{language.buttons.getStart}</button>
                            </li>
                        </React.Fragment>
                    )}

                </React.Fragment>
            )
        }
    };

    return (
        <React.Fragment>
            {!responsive ? (
                <div className="container relative mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center justify-between">
                        <img src={Logo} alt="App Logo" />
                    </div>

                    {showMenu && (
                        <nav className="absolute left-1/2 translate-x-[-50%]">
                            <ul className="inline-flex gap-9">
                                {React.Children.toArray(
                                    navigationMenu.map(i => <li className="cursor-pointer transition-all text-neutral-500 text-base font-medium hover:text-neutral-900 hover:underline">{i.title}</li>)
                                )}
                            </ul>
                        </nav>
                    )}

                    <nav className="">
                        <ul className="inline-flex items-center gap-6">
                            <li className="relative">
                                <Dropdown dropdownItems={languageDropdownItems} />
                            </li>
                            {authenticatedHeaderNav()}
                        </ul>
                    </nav>
                </div>
            ) : (
                <div className="container mx-auto py-6 flex items-start flex-col">
                    <div className="flex items-center justify-between container px-4">
                        <div className="text-xl font-bold text-gray-800">
                            <img src={Logo} alt="App Logo" />
                        </div>

                        <button className="md:hidden rounded-lg focus:outline-none focus:shadow-outline" onClick={toggleMenu}>
                            <svg className="h-6 w-6 fill-current text-gray-600" viewBox="0 0 24 24" >
                                {isMenuOpen ? (
                                    <path fillRule="evenodd" clipRule="evenodd" d="M5 8h14v2H5V8zm0 5h14v2H5v-2zm0 5h14v2H5v-2z" />
                                ) : (
                                    <path fillRule="evenodd" clipRule="evenodd" d="M4 5h16v2H4V5zm0 7h16v2H4v-2zm0 7h16v2H4v-2z" />
                                )}
                            </svg>
                        </button>
                    </div>

                    <nav className={`${isMenuOpen ? "block" : "hidden"}`}>
                        <ul className="flex items-center flex-row-reverse pt-12 w-full justify-between px-4">
                            <li>
                                <Dropdown dropdownItems={languageDropdownItems} />
                            </li>
                            <li>
                                <div className="rounded-full w-8 h-8 inline-grid place-items-center bell-background ">
                                    <BellIcon stroke={"#4F4F4F"} />
                                </div>
                            </li>
                            <li onClick={onLogout} className="mr-3">
                                <button className="text-neutral-500 font-medium cursor-pointer text-sm tracking-[0.03em]">{language.buttons.logout}</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </React.Fragment>
    )
};
export default GeneralHeader
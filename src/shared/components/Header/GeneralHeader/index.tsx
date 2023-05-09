import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux-toolkit/store/store";
import Logo from "../../../../assets/logo.png";
import Dropdown from "../../Dropdown";
import { languageDropdownItems } from "../../../../utils/dropdown-items.utils";
import BellIcon from "../../../../ts-icons/BellIcon.svg";

const GeneralHeader = ({ responsive = false, showMenu = false }: any) => {
    const language: any = useSelector((state: RootState) => state.language.value);
    const navigationMenu = [{ id: 1, title: language.header.investment }, { id: 2, title: language.header.startup }, { id: 3, title: language.header.syndicate }, { id: 4, title: language.header.company }]
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
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
                            <li className="">
                                <div className="rounded-full w-8 h-8 inline-grid place-items-center bell-background ">
                                    <BellIcon stroke={"#4F4F4F"} />
                                </div>
                            </li>
                            <li className="">
                                <img className="rounded-full w-8 h-8 inline-grid place-items-center" src="https://randomuser.me/api/portraits/men/46.jpg" alt="User" />
                            </li>
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
                            <li>
                                <img className="rounded-full w-8 h-8 inline-grid place-items-center" src="https://randomuser.me/api/portraits/men/46.jpg" alt="User" />
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </React.Fragment>
    )
};
export default GeneralHeader
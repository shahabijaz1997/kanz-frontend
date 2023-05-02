import React, { useState } from "react";
import Logo from "../../../assets/logo.png";
import Dropdown from "../Dropdown";
import { languageDropdownItems } from "../../../utils/dropdownItems.utils";
import BellIcon from "../../../ts-icons/BellIcon.svg";

const Header = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <React.Fragment>
            <header className="bg-white border border-grey block screen991:hidden h-full">
                <div className="container mx-auto px-4 py-6 flex items-center justify-between">
                    <div className="flex items-center justify-between">
                        <img src={Logo} alt="App Logo" />
                    </div>
                    <nav className="">
                        <ul className="inline-flex items-center gap-6">
                            <li className="">
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
            </header>

            <header className="bg-white border border-grey hidden h-full screen991:block">
                <div className="container mx-auto px-4 py-6 flex items-start flex-col">
                    <div className="flex items-center justify-between container">
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
                        <ul className="md:flex items-center">
                            <li className="md:ml-6 mt-3 md:mt-0">
                                <a href="#" className="block font-medium text-gray-700 hover:text-gray-900 md:inline-block md:mt-0">
                                    Link 1
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        </React.Fragment>
    );
};

export default Header;
import React from "react";
import GeneralHeader from "./GeneralHeader";
import CustomHeader from "./CustomHeader";

const Header = ({ data, showMenu = false, custom = false }: any) => {
    return (
        <React.Fragment>
            <header className="background-auth border border-grey block screen991:hidden h-full">
                {!custom ? <GeneralHeader showMenu={showMenu} /> : <CustomHeader {...data} />}
            </header>

            <header className="background-auth border border-grey hidden h-full screen991:block">
                {!custom ? <GeneralHeader responsive={true} showMenu={showMenu} /> : <CustomHeader {...data} />}
            </header>
        </React.Fragment>
    );
};

export default Header;
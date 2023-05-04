import React from "react";
import GeneralHeader from "./GeneralHeader";
import CustomHeader from "./CustomHeader";

const Header = ({ data, custom = false }: any) => {
    return (
        <React.Fragment>
            <header className="bg-white border border-grey block screen991:hidden h-full">
                {!custom ? <GeneralHeader /> : <CustomHeader {...data} />}
            </header>

            <header className="bg-white border border-grey hidden h-full screen991:block">
                {!custom ? <GeneralHeader responsive={true} /> : <CustomHeader {...data} />}
            </header>
        </React.Fragment>
    );
};

export default Header;
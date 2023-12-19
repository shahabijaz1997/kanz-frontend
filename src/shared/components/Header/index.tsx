import React from "react";
import GeneralHeader from "./GeneralHeader";
import CustomHeader from "./CustomHeader";

const Header = ({
  data = null,
  showMenu = false,
  custom = false,
  showLanguageDropdown = false,
  onSuperLogout = () => {},
}: any) => {
  return (
    <React.Fragment>
      <header className="cbc-auth border border-grey block screen991:hidden h-full">
        {!custom ? (
          <GeneralHeader
            onSuperLogout={onSuperLogout}
            showMenu={showMenu}
            showLanguageDropdown={showLanguageDropdown}
          />
        ) : (
          <CustomHeader {...data} />
        )}
      </header>

      <header className="cbc-auth border border-grey hidden h-full screen991:block">
        {!custom ? (
          <GeneralHeader
            onSuperLogout={onSuperLogout}
            responsive={true}
            showMenu={showMenu}
            showLanguageDropdown={showLanguageDropdown}
          />
        ) : (
          <CustomHeader {...data} />
        )}
      </header>
    </React.Fragment>
  );
};

export default Header;

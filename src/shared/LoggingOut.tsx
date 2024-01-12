import { useNavigate } from "react-router-dom";
import { RoutesEnums } from "../enums/routes.enum";
import Spinner from "../shared/components/Spinner";
import { saveToken } from "../redux-toolkit/slicer/auth.slicer";
import { saveUserData } from "../redux-toolkit/slicer/user.slicer";
import { saveUserMetaData } from "../redux-toolkit/slicer/metadata.slicer";
import { saveLogo } from "../redux-toolkit/slicer/attachments.slicer";
import { saveDataHolder } from "../redux-toolkit/slicer/dataHolder.slicer";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

const LoggingOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(saveToken(""));
    navigate(RoutesEnums.LOGIN);
    localStorage.clear();
    dispatch(saveUserData(""));
    dispatch(saveUserMetaData(""));
    dispatch(saveLogo(""));
    dispatch(saveDataHolder(""));
  }, []);
  return (
    <div className="relative items-center justify-center flex min-h-full min-w-full">
      <div
        className=" left-0 top-0 w-full h-full grid place-items-center"
        style={{
          backgroundColor: "rgba(255, 255, 255, 1)",
          zIndex: 50,
        }}
      >
        <p className="text-lg font-bold mb-8">Logging you out......</p>
        <Spinner />
      </div>
    </div>
  );
};
export default LoggingOut;

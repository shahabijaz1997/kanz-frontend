import { useLayoutEffect } from "react";
import RouterModule from "./modules/Router/router.module";
import { useDispatch } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { saveOrientation } from "./redux-toolkit/slicer/orientation.slicer";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { getEnv } from "./env";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RoutesEnums } from "./enums/routes.enum";
import { saveToken } from "./redux-toolkit/slicer/auth.slicer";
import { saveUserData } from "./redux-toolkit/slicer/user.slicer";
import { saveUserMetaData } from "./redux-toolkit/slicer/metadata.slicer";
import { saveLogo } from "./redux-toolkit/slicer/attachments.slicer";
import { saveDataHolder } from "./redux-toolkit/slicer/dataHolder.slicer";
import { toast } from "react-toastify";
import { toastUtil } from "./utils/toast.utils";

const ENV: any = getEnv();
const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.data.status.code === 401) {
        dispatch(saveToken(""));
        localStorage.clear();
        dispatch(saveUserData(""));
        dispatch(saveUserMetaData(""));
        dispatch(saveLogo(""));
        dispatch(saveDataHolder(""));
        navigate(RoutesEnums.LOGIN + "?sessionTimeout=true")
      }
      return Promise.reject(error);
    }
  );
  useLayoutEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'dir') {
          const newDirValue: any = document.documentElement.getAttribute('dir');
          dispatch(saveOrientation(newDirValue));
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['dir'],
    });

    return () => {
      observer.disconnect();
    };
  }, []);
  return <GoogleOAuthProvider clientId={ENV.GOOGLE_API_KEY}> <CookiesProvider><RouterModule /></CookiesProvider></GoogleOAuthProvider>
}

export default App;
import React, { PropsWithChildren, Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux-toolkit/store/store";
import { saveLanguage } from "../../redux-toolkit/slicer/language.slicer";

import loadLanguage from "../../utils/load-language.utils";

// Modules
const Home = lazy(() => import("../Home"));
const Login = lazy(() => import("../Onboarding"));

const AuthenticateRoute = (props: PropsWithChildren) => {
    const { children } = props;
    const authToken: any = useSelector((state: RootState) => state.auth.value);
    let location = useLocation();
    // if (authToken) {
    return <React.Fragment>{children}</React.Fragment>;
    // }
    // return <Navigate to="/login" state={{ from: location }} replace />;
};

const RouterModule = () => {
    const dispatch = useDispatch();
    const authToken: any = useSelector((state: RootState) => state.auth.value);

    // Getting language preference
    const language: any = loadLanguage("en");
    dispatch(saveLanguage(language));

    return (
        <Routes>
            <Route path="/" element={<Suspense fallback={<div></div>}>
                <AuthenticateRoute><Home guard={authToken} /></AuthenticateRoute>
            </Suspense>} />
            <Route path="/login" element={<Suspense fallback={<div></div>}><Login guard={authToken} /></Suspense>} />
        </Routes>
    )
};
export default RouterModule;
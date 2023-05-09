import React, { PropsWithChildren, Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux-toolkit/store/store";
import { saveLanguage } from "../../redux-toolkit/slicer/language.slicer";
import loadLanguage from "../../utils/load-language.utils";

// Modules
const Home = lazy(() => import("../Home"));
const Login = lazy(() => import("../Onboarding"));
const Welcome = lazy(() => import("../Onboarding/Welcome"));
const InvestorFlow = lazy(() => import("../Onboarding/InvestorFlow"));
const CompleteDetails = lazy(() => import("../Onboarding/CompleteDetails"));
const CompleteGoals = lazy(() => import("../Onboarding/CompleteGoals"));
const PhilosophyGoals = lazy(() => import("../Onboarding/PhilosophyGoals"));
const AddAttachments = lazy(() => import("../Onboarding/AddAttachments"));

const AuthenticateRoute = (props: PropsWithChildren) => {
    const { children } = props;
    // const authToken: any = useSelector((state: RootState) => state.auth.value);
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
            <Route path="/" element={<Suspense fallback={<div></div>}><Home guard={authToken} /></Suspense>} />
            <Route path="/investor-type" element={<Suspense fallback={<div></div>}><AuthenticateRoute><InvestorFlow guard={authToken} /></AuthenticateRoute></Suspense>} />
            <Route path="/complete-details" element={<Suspense fallback={<div></div>}><AuthenticateRoute><CompleteDetails guard={authToken} /></AuthenticateRoute></Suspense>} />
            <Route path="/complete-goals" element={<Suspense fallback={<div></div>}><AuthenticateRoute><CompleteGoals guard={authToken} /></AuthenticateRoute></Suspense>} />
            <Route path="/philosophy-goals/:id" element={<Suspense fallback={<div></div>}><AuthenticateRoute><PhilosophyGoals guard={authToken} /></AuthenticateRoute></Suspense>} />
            <Route path="/add-attachments" element={<Suspense fallback={<div></div>}><AuthenticateRoute><AddAttachments guard={authToken} /></AuthenticateRoute></Suspense>} />
            <Route path="/login" element={<Suspense fallback={<div></div>}><Login guard={authToken} /></Suspense>} />
            <Route path="/welcome" element={<Suspense fallback={<div></div>}><AuthenticateRoute><Welcome guard={authToken} /></AuthenticateRoute></Suspense>} />
        </Routes>
    )
};
export default RouterModule;
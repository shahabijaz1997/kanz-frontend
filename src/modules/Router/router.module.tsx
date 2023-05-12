import React, { PropsWithChildren, Suspense, lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux-toolkit/store/store";
import { saveLanguage } from "../../redux-toolkit/slicer/language.slicer";
import loadLanguage from "../../utils/load-language.utils";
import Spinner from "../../shared/components/Spinner";

// Modules
const Home = lazy(() => import("../Home"));
const Onboarding = lazy(() => import("../Onboarding"));
const Login = lazy(() => import("../Login"));
const Welcome = lazy(() => import("../Onboarding/Welcome"));
const InvestorFlow = lazy(() => import("../Onboarding/InvestorFlow"));
const CompleteDetails = lazy(() => import("../Onboarding/CompleteDetails"));
const CompleteGoals = lazy(() => import("../Onboarding/CompleteGoals"));
const PhilosophyGoals = lazy(() => import("../Onboarding/PhilosophyGoals"));
const AddAttachments = lazy(() => import("../Onboarding/AddAttachments"));
const SyndicateLeadInfo = lazy(() => import("../Onboarding/SyndicateFlow"));

const AuthenticateRoute = (props: PropsWithChildren) => {
    const { children } = props;
    // const authToken: any = useSelector((state: RootState) => state.auth.value);
    // if (authToken) {
    return <React.Fragment>{children}</React.Fragment>;
    // }
    // return <Navigate to="/login" state={{ from: location }} replace />;
};

const AuthenticateAuthRoute = (props: PropsWithChildren) => {
    const { children } = props;
    const authToken: any = useSelector((state: RootState) => state.auth.value);
    if (!authToken) {
        return <React.Fragment>{children}</React.Fragment>;
    }
    return <Navigate to="/welcome" replace />;
};

const RouterModule = () => {
    const dispatch = useDispatch();
    const authToken: any = useSelector((state: RootState) => state.auth.value);

    // Getting language preference
    const language: any = loadLanguage("en");
    dispatch(saveLanguage(language));

    return (
        <Routes>
            <Route path="/" element={<Suspense fallback={<Spinner />}><Home guard={authToken} /></Suspense>} />
            <Route path="/investor-type" element={<Suspense fallback={<Spinner />}><AuthenticateRoute><InvestorFlow guard={authToken} /></AuthenticateRoute></Suspense>} />
            <Route path="/complete-details" element={<Suspense fallback={<Spinner />}><AuthenticateRoute><CompleteDetails guard={authToken} /></AuthenticateRoute></Suspense>} />
            <Route path="/complete-goals" element={<Suspense fallback={<Spinner />}><AuthenticateRoute><CompleteGoals guard={authToken} /></AuthenticateRoute></Suspense>} />
            <Route path="/philosophy-goals/:id" element={<Suspense fallback={<Spinner />}><AuthenticateRoute><PhilosophyGoals guard={authToken} /></AuthenticateRoute></Suspense>} />
            <Route path="/add-attachments" element={<Suspense fallback={<Spinner />}><AuthenticateRoute><AddAttachments guard={authToken} /></AuthenticateRoute></Suspense>} />
            <Route path="/syndicate-lead" element={<Suspense fallback={<Spinner />}><AuthenticateRoute><SyndicateLeadInfo guard={authToken} /></AuthenticateRoute></Suspense>} />
            <Route path="/signup" element={<Suspense fallback={<Spinner />}><Onboarding guard={authToken} /></Suspense>} />
            <Route path="/login" element={<Suspense fallback={<Spinner />}><AuthenticateAuthRoute><Login guard={authToken} /></AuthenticateAuthRoute></Suspense>} />
            <Route path="/welcome" element={<Suspense fallback={<Spinner />}><AuthenticateRoute><Welcome guard={authToken} /></AuthenticateRoute></Suspense>} />
        </Routes>
    )
};
export default RouterModule;
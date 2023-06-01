import React, { PropsWithChildren, Suspense, lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux-toolkit/store/store";
import { saveLanguage } from "../../redux-toolkit/slicer/language.slicer";
import loadLanguage from "../../utils/load-language.utils";
import Loader from "../../shared/views/Loader";
import { KanzRoles } from "../../enums/roles.enum";
import { ApplicationStatus } from "../../enums/types.enum";

// Modules
const Home = lazy(() => import("../Home"));
const Onboarding = lazy(() => import("../Onboarding"));
const Login = lazy(() => import("../Login"));
const Welcome = lazy(() => import("../Onboarding/Welcome"));
const InvestorFlow = lazy(() => import("../Onboarding/InvestorFlow"));
const CompleteDetails = lazy(() => import("../Onboarding/CompleteDetails"));
const Realtors = lazy(() => import("../Onboarding/RealtorsFlow"));
const CompleteGoals = lazy(() => import("../Onboarding/CompleteGoals"));
const PhilosophyGoals = lazy(() => import("../Onboarding/PhilosophyGoals"));
const AddAttachments = lazy(() => import("../Onboarding/AddAttachments"));
const SyndicateLeadInfo = lazy(() => import("../Onboarding/SyndicateFlow"));

const AuthenticateRoute = (props: PropsWithChildren) => {
  const { children } = props;
  const authToken: any = useSelector((state: RootState) => state.auth.value);

  if (authToken) {
    return <React.Fragment>{children}</React.Fragment>;
  }
  return <Navigate to="/login" replace />;
};

const AuthenticateAuthRoute = (props: PropsWithChildren) => {
  const { children } = props;
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  if (!authToken) {
    return <React.Fragment>{children}</React.Fragment>;
  }
  return <Navigate to="/welcome" replace />;
};

const AuthenticateRole = (props: PropsWithChildren | any) => {
  const { children } = props;
  const user: any = useSelector((state: RootState) => state.user.value);

  if (
    (user &&
      (user.type === props.role || props.role === KanzRoles.ALL) &&
      user.status === ApplicationStatus.OPENED) ||
    user.status === ApplicationStatus.IN_PROGRESS
  ) {
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
      <Route
        path="/"
        element={
          <Suspense fallback={<Loader />}>
            <Home guard={authToken} />
          </Suspense>
        }
      />
      <Route
        path="/investor-type"
        element={
          <Suspense fallback={<Loader />}>
            <AuthenticateRoute>
              <AuthenticateRole role={KanzRoles.INVESTOR}>
                <InvestorFlow guard={authToken} />
              </AuthenticateRole>
            </AuthenticateRoute>
          </Suspense>
        }
      />
      <Route
        path="/realtor-type"
        element={
          <Suspense fallback={<Loader />}>
            <AuthenticateRoute>
              <Realtors guard={authToken} />
            </AuthenticateRoute>
          </Suspense>
        }
      />
      <Route
        path="/complete-details"
        element={
          <Suspense fallback={<Loader />}>
            {/* <AuthenticateRoute> */}
            <CompleteDetails guard={authToken} />
            {/* </AuthenticateRoute> */}
          </Suspense>
        }
      />
      <Route
        path="/complete-goals"
        element={
          <Suspense fallback={<Loader />}>
            <AuthenticateRoute>
              <AuthenticateRole role={KanzRoles.INVESTOR}>
                <CompleteGoals guard={authToken} />
              </AuthenticateRole>
            </AuthenticateRoute>
          </Suspense>
        }
      />
      <Route
        path="/philosophy-goals/:id"
        element={
          <Suspense fallback={<Loader />}>
            <AuthenticateRoute>
              <PhilosophyGoals guard={authToken} />
            </AuthenticateRoute>
          </Suspense>
        }
      />
      <Route
        path="/add-attachments"
        element={
          <Suspense fallback={<Loader />}>
            <AuthenticateRoute>
              <AuthenticateRole role={KanzRoles.ALL}>
                <AddAttachments guard={authToken} />
              </AuthenticateRole>
            </AuthenticateRoute>
          </Suspense>
        }
      />
      <Route
        path="/syndicate-lead/:id"
        element={
          <Suspense fallback={<Loader />}>
            <AuthenticateRoute>
              <SyndicateLeadInfo guard={authToken} />
            </AuthenticateRoute>
          </Suspense>
        }
      />
      <Route
        path="/signup"
        element={
          <Suspense fallback={<Loader />}>
            <AuthenticateAuthRoute>
              <Onboarding guard={authToken} />
            </AuthenticateAuthRoute>
          </Suspense>
        }
      />
      <Route
        path="/login"
        element={
          <Suspense fallback={<Loader />}>
            <AuthenticateAuthRoute>
              <Login guard={authToken} />
            </AuthenticateAuthRoute>
          </Suspense>
        }
      />
      <Route
        path="/welcome"
        element={
          <Suspense fallback={<Loader />}>
            <AuthenticateRoute>
              <Welcome guard={authToken} />
            </AuthenticateRoute>
          </Suspense>
        }
      />
    </Routes>
  );
};
export default RouterModule;

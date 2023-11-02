import React, {
  PropsWithChildren,
  Suspense,
  lazy,
  useLayoutEffect,
  useState,
} from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux-toolkit/store/store";
import { saveLanguage } from "../../redux-toolkit/slicer/language.slicer";
import loadLanguage from "../../utils/load-language.utils";
import Loader from "../../shared/views/Loader";
import { KanzRoles } from "../../enums/roles.enum";
import { ApplicationStatus } from "../../enums/types.enum";
import { RoutesEnums, StartupRoutes } from "../../enums/routes.enum";
import { LinkedInCallback } from "react-linkedin-login-oauth2";

/* --- Modules --- */

/* ---### Authentication ###--- */
const Home = lazy(() => import("../Home"));
const Signup = lazy(() => import("../Signup"));
const Verification = lazy(() => import("../EmailVerification"));
const Login = lazy(() => import("../Login"));
const Welcome = lazy(() => import("../Onboarding/Welcome"));

/* ---### Onboarding ###--- */
const InvestorOnboarding = lazy(() => import("../Onboarding/InvestorFlow"));
const CompleteDetails = lazy(() => import("../Onboarding/CompleteDetails"));
const CompleteGoals = lazy(() => import("../Onboarding/CompleteGoals"));
const PhilosophyGoals = lazy(() => import("../Onboarding/PhilosophyGoals"));
const StartupOnboarding = lazy(() => import("../Onboarding/StartupFlow"));
const RealtorsOnboarding = lazy(() => import("../Onboarding/RealtorsFlow"));
const SyndicateOnboarding = lazy(() => import("../Onboarding/SyndicateFlow"));
const AddAttachments = lazy(() => import("../Onboarding/AddAttachments"));

/* ---### Post Onboarding ###--- */
const StartupDashboard = lazy(() => import("../Startup"));
const RealtorDashboard = lazy(() => import("../Realtor"));
const CreateDeal = lazy(() => import("../CreateDeal"));
const DealDetail = lazy(() => import("../DealDetail"));
const DealApproval = lazy(() => import("../Syndicate/DealApproval"));
const SyndicateRequest = lazy(() => import("../Realtor/SyndicateRequest"));
const InvestorUpdates = lazy(() => import("../InvestorUpdates"));
const DataRooms = lazy(() => import("../DataRooms"));
const Contacts = lazy(() => import("../Contacts"));
const MarketInsights = lazy(() => import("../MarketInsights"));
const StartupInvestment = lazy(() => import("../Syndicate/StartupInvestment"));
const SyndicateDashboard = lazy(() => import("../Syndicate"));
const SyndicateDealOverview = lazy(() => import("../SyndicateDealOverview"));

/* ---### Static ###--- */
const PrivacyPolicy = lazy(() => import("../Policies/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("../Policies/TermsAndConditions"));

const CHECK_LOGGED_IN = (props: PropsWithChildren) => {
  const { children } = props;
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  if (authToken) return <React.Fragment>{children}</React.Fragment>;
  return <Navigate to={RoutesEnums.LOGIN} replace />;
};

const CHECK_LOGGED_OUT = (props: PropsWithChildren | any) => {
  const { children, isVerify = false } = props;
  const user: any = useSelector((state: RootState) => state.user.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  if (!isVerify && !authToken)
    return <React.Fragment>{children}</React.Fragment>;
  else if (isVerify && !user?.profile_states?.account_confirmed)
    return <React.Fragment>{children}</React.Fragment>;
  return <Navigate to={RoutesEnums.WELCOME} replace />;
};

const GUARD_ROUTE = (props: PropsWithChildren | any) => {
  const { children } = props;
  const user: any = useSelector((state: RootState) => state.user.value);
  if (
    user &&
    (user.type === props.role || props.role === KanzRoles.ALL) &&
    (user.status === ApplicationStatus.OPENED ||
      user.status === ApplicationStatus.REOPENED)
  )
    return <React.Fragment>{children}</React.Fragment>;
  return <Navigate to={RoutesEnums.WELCOME} replace />;
};

const GUARD_SUBMITTED_ROUTE = (props: PropsWithChildren | any) => {
  const { children, status } = props;
  const user: any = useSelector((state: RootState) => state.user.value);
  if (user && props.role.includes(user.type) && user.status === status)
    return <React.Fragment>{children}</React.Fragment>;
  return <Navigate to={RoutesEnums.WELCOME} replace />;
};

const RouterModule = () => {
  const dispatch = useDispatch();
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const event: any = useSelector((state: RootState) => state.event.value);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    onLoadLanguage();
  }, [event]);

  const onLoadLanguage = async () => {
    try {
      setLoading(true);
      const _language: any = loadLanguage(event);
      dispatch(saveLanguage(_language));
      if (event === "ar") document.documentElement.dir = "rtl";
      else document.documentElement.dir = "ltr";
      const element: HTMLElement | any = document.querySelector("html");
      element.style.fontFamily =
        event === "ar"
          ? "'Almarai', sans-serif"
          : "Roboto, 'Open Sans', 'Helvetica Neue', sans-serif";
      const toastElements = document.querySelectorAll(".Toastify__toast");
      toastElements.forEach(
        (elem: any) =>
        (elem.style.fontFamily =
          event === "ar"
            ? "'Almarai', sans-serif"
            : "Roboto, 'Open Sans', 'Helvetica Neue', sans-serif")
      );
    } catch (error) {
    } finally {
      let timer = setTimeout(() => {
        setLoading(false);
        clearTimeout(timer);
      }, 1000);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<Loader />}>
            <Home guard={authToken} />
          </Suspense>
        }
      />

      {/*
        {.......##...............#######..##....##.########...#######.....###....########..########..####.##....##..######......########...#######..##.....##.########.########..######.....................##
        {......##...##...##.....##.....##.###...##.##.....##.##.....##...##.##...##.....##.##.....##..##..###...##.##....##.....##.....##.##.....##.##.....##....##....##.......##....##.....##...##.......##.
        {.....##.....##.##......##.....##.####..##.##.....##.##.....##..##...##..##.....##.##.....##..##..####..##.##...........##.....##.##.....##.##.....##....##....##.......##............##.##.......##..
        {....##....#########....##.....##.##.##.##.########..##.....##.##.....##.########..##.....##..##..##.##.##.##...####....########..##.....##.##.....##....##....######....######.....#########....##...
        {...##.......##.##......##.....##.##..####.##.....##.##.....##.#########.##...##...##.....##..##..##..####.##....##.....##...##...##.....##.##.....##....##....##.............##......##.##.....##....
        {..##.......##...##.....##.....##.##...###.##.....##.##.....##.##.....##.##....##..##.....##..##..##...###.##....##.....##....##..##.....##.##.....##....##....##.......##....##.....##...##...##.....
        {.##.....................#######..##....##.########...#######..##.....##.##.....##.########..####.##....##..######......##.....##..#######...#######.....##....########..######...............##......
        {*/}
      <Route
        path={RoutesEnums.INVESTOR_DETAILS}
        element={
          <Suspense fallback={<Loader />}>
            <CHECK_LOGGED_IN>
              <GUARD_ROUTE role={KanzRoles.INVESTOR}>
                <InvestorOnboarding guard={authToken} />
              </GUARD_ROUTE>
            </CHECK_LOGGED_IN>
          </Suspense>
        }
      />
      <Route
        path={`${RoutesEnums.STARTUP_DETAILS}/:id`}
        element={
          <Suspense fallback={<Loader />}>
            <CHECK_LOGGED_IN>
              <GUARD_ROUTE role={KanzRoles.STARTUP}>
                <StartupOnboarding guard={authToken} />
              </GUARD_ROUTE>
            </CHECK_LOGGED_IN>
          </Suspense>
        }
      />
      <Route
        path={`${RoutesEnums.SYNIDCATE_DETAILS}/:id`}
        element={
          <Suspense fallback={<Loader />}>
            <CHECK_LOGGED_IN>
              <GUARD_ROUTE role={KanzRoles.SYNDICATE}>
                <SyndicateOnboarding guard={authToken} />
              </GUARD_ROUTE>
            </CHECK_LOGGED_IN>
          </Suspense>
        }
      />
      <Route
        path={RoutesEnums.REALTOR_DETAILS}
        element={
          <Suspense fallback={<Loader />}>
            <CHECK_LOGGED_IN>
              <GUARD_ROUTE role={KanzRoles.REALTOR}>
                <RealtorsOnboarding guard={authToken} />
              </GUARD_ROUTE>
            </CHECK_LOGGED_IN>
          </Suspense>
        }
      />
      <Route
        path={RoutesEnums.LINKEDIN}
        element={
          <Suspense fallback={<Loader />}>
            <LinkedInCallback />
          </Suspense>
        }
      />
      <Route
        path={RoutesEnums.COMPLETE_DETAILS}
        element={
          <Suspense fallback={<Loader />}>
            <CHECK_LOGGED_IN>
              <CompleteDetails guard={authToken} />
            </CHECK_LOGGED_IN>
          </Suspense>
        }
      />
      <Route
        path={RoutesEnums.COMPLETE_GOALS}
        element={
          <Suspense fallback={<Loader />}>
            <CHECK_LOGGED_IN>
              <GUARD_ROUTE role={KanzRoles.INVESTOR}>
                <CompleteGoals guard={authToken} />
              </GUARD_ROUTE>
            </CHECK_LOGGED_IN>
          </Suspense>
        }
      />
      <Route
        path={`${RoutesEnums.PHILOSOPHY_GOALS}/:id`}
        element={
          <Suspense fallback={<Loader />}>
            <CHECK_LOGGED_IN>
              <GUARD_ROUTE role={KanzRoles.INVESTOR}>
                <PhilosophyGoals guard={authToken} />
              </GUARD_ROUTE>
            </CHECK_LOGGED_IN>
          </Suspense>
        }
      />
      <Route
        path={RoutesEnums.ADD_ATTACHMENTS}
        element={
          <Suspense fallback={<Loader />}>
            <CHECK_LOGGED_IN>
              <GUARD_ROUTE role={KanzRoles.ALL}>
                <AddAttachments guard={authToken} />
              </GUARD_ROUTE>
            </CHECK_LOGGED_IN>
          </Suspense>
        }
      />

      {/* Authentication Routes */}
      <Route
        path={`${RoutesEnums.STARTUP_DETAILS}/:id`}
        element={
          <Suspense fallback={<Loader />}>
            <CHECK_LOGGED_IN>
              <GUARD_ROUTE role={KanzRoles.STARTUP}>
                <StartupOnboarding guard={authToken} />
              </GUARD_ROUTE>
            </CHECK_LOGGED_IN>
          </Suspense>
        }
      />
      <Route
        path={RoutesEnums.SIGNUP}
        element={
          <Suspense fallback={<Loader />}>
            {" "}
            <CHECK_LOGGED_OUT>
              <Signup guard={authToken} />
            </CHECK_LOGGED_OUT>
          </Suspense>
        }
      />
      <Route
        path={RoutesEnums.VERIFICATION}
        element={
          <Suspense fallback={<Loader />}>
            <CHECK_LOGGED_OUT isVerify={true}>
              <Verification guard={authToken} />
            </CHECK_LOGGED_OUT>
          </Suspense>
        }
      />
      <Route
        path={RoutesEnums.LOGIN}
        element={
          <Suspense fallback={<Loader />}>
            <CHECK_LOGGED_OUT>
              <Login guard={authToken} />
            </CHECK_LOGGED_OUT>
          </Suspense>
        }
      />
      <Route
        path={RoutesEnums.WELCOME}
        element={
          <Suspense fallback={<Loader />}>
            <CHECK_LOGGED_IN>
              <Welcome guard={authToken} />
            </CHECK_LOGGED_IN>
          </Suspense>
        }
      />

      {/* Dashboard */}
      <Route
        path={`${RoutesEnums.STARTUP_DASHBOARD}`}
        element={
          <Suspense fallback={<Loader />}>
            <CHECK_LOGGED_IN>
              <GUARD_SUBMITTED_ROUTE role={[KanzRoles.STARTUP]} status={ApplicationStatus.APPROVED}>
                <StartupDashboard />
              </GUARD_SUBMITTED_ROUTE>
            </CHECK_LOGGED_IN>
          </Suspense>
        }
      />
      <Route
        path={`${RoutesEnums.REALTOR_DASHBOARD}`}
        element={
          <Suspense fallback={<Loader />}>
            <CHECK_LOGGED_IN>
              <GUARD_SUBMITTED_ROUTE role={[KanzRoles.REALTOR]} status={ApplicationStatus.APPROVED}>
                <RealtorDashboard />
              </GUARD_SUBMITTED_ROUTE>
            </CHECK_LOGGED_IN>
          </Suspense>
        }
      />
      <Route
        path={`${RoutesEnums.SYNDICATE_DASHBOARD}`}
        element={
          <Suspense fallback={<Loader />}>
            <CHECK_LOGGED_IN>
              <GUARD_SUBMITTED_ROUTE role={[KanzRoles.SYNDICATE]} status={ApplicationStatus.APPROVED}>
                <SyndicateDashboard />
              </GUARD_SUBMITTED_ROUTE>
            </CHECK_LOGGED_IN>
          </Suspense>
        }
      />
      <Route
        path={`${RoutesEnums.CREATE_DEAL}/:id`}
        element={
          <Suspense fallback={<Loader />}>
            <CHECK_LOGGED_IN>
              <GUARD_SUBMITTED_ROUTE role={[KanzRoles.STARTUP, KanzRoles.REALTOR]} status={ApplicationStatus.APPROVED}>
                <CreateDeal />
              </GUARD_SUBMITTED_ROUTE>
            </CHECK_LOGGED_IN>
          </Suspense>
        }
      />

      <Route
        path={`${RoutesEnums.DEAL_DETAIL}/:id`}
        element={
          <Suspense fallback={<Loader />}>
            <CHECK_LOGGED_IN>
              <GUARD_SUBMITTED_ROUTE role={[KanzRoles.STARTUP, KanzRoles.REALTOR]} status={ApplicationStatus.APPROVED}>
                <DealDetail />
              </GUARD_SUBMITTED_ROUTE>
            </CHECK_LOGGED_IN>
          </Suspense>
        }
      />

      <Route
        path={`${RoutesEnums.SYNDICATE_DEAL_DETAIL}/:id`}
        element={
          <Suspense fallback={<Loader />}>
            <CHECK_LOGGED_IN>
              <GUARD_SUBMITTED_ROUTE role={[KanzRoles.SYNDICATE]} status={ApplicationStatus.APPROVED}>
                <SyndicateDealOverview />
              </GUARD_SUBMITTED_ROUTE>
            </CHECK_LOGGED_IN>
          </Suspense>
        }
      />

      {/*
        {.......##...............######..##....##.##....##.########..####..######.....###....########.########....########...#######..##.....##.########.########..######.....................##
        {......##...##...##.....##....##..##..##..###...##.##.....##..##..##....##...##.##......##....##..........##.....##.##.....##.##.....##....##....##.......##....##.....##...##.......##.
        {.....##.....##.##......##.........####...####..##.##.....##..##..##........##...##.....##....##..........##.....##.##.....##.##.....##....##....##.......##............##.##.......##..
        {....##....#########.....######.....##....##.##.##.##.....##..##..##.......##.....##....##....######......########..##.....##.##.....##....##....######....######.....#########....##...
        {...##.......##.##............##....##....##..####.##.....##..##..##.......#########....##....##..........##...##...##.....##.##.....##....##....##.............##......##.##.....##....
        {..##.......##...##.....##....##....##....##...###.##.....##..##..##....##.##.....##....##....##..........##....##..##.....##.##.....##....##....##.......##....##.....##...##...##.....
        {.##.....................######.....##....##....##.########..####..######..##.....##....##....########....##.....##..#######...#######.....##....########..######...............##......
        {*/}

      <Route
        path={RoutesEnums.DEAL_APPROVAL}
        element={
          <Suspense fallback={<Loader />}>
            <CHECK_LOGGED_IN>
              <GUARD_SUBMITTED_ROUTE role={[KanzRoles.SYNDICATE]} status={ApplicationStatus.APPROVED}>
                <DealApproval guard={authToken} />
              </GUARD_SUBMITTED_ROUTE>
            </CHECK_LOGGED_IN>
          </Suspense>
        }
      />

      {/* This is meant for Deal Creator make changes in below route accordingly */}
      <Route
        path={RoutesEnums.DEAL_SYNDICATE_REQUESTS}
        element={
          <Suspense fallback={<Loader />}>
            <CHECK_LOGGED_IN>
              <GUARD_SUBMITTED_ROUTE role={[KanzRoles.REALTOR, KanzRoles.STARTUP]} status={ApplicationStatus.APPROVED}>
                <SyndicateRequest guard={authToken} />
              </GUARD_SUBMITTED_ROUTE>
            </CHECK_LOGGED_IN>
          </Suspense>
        }
      />
      <Route
        path={RoutesEnums.STARTUP_INVESTMENTS}
        element={
          <Suspense fallback={<Loader />}>
            <CHECK_LOGGED_IN>
              <GUARD_SUBMITTED_ROUTE role={KanzRoles.SYNDICATE} status={ApplicationStatus.APPROVED}>
                <StartupInvestment guard={authToken} />
              </GUARD_SUBMITTED_ROUTE>
            </CHECK_LOGGED_IN>
          </Suspense>
        }
      />

      <Route
        path={`${RoutesEnums.INVESTOR_UPDATES}`}
        element={
          <Suspense fallback={<Loader />}>
            <CHECK_LOGGED_IN>
              <GUARD_ROUTE role={KanzRoles.STARTUP}>
                <InvestorUpdates />
              </GUARD_ROUTE>
            </CHECK_LOGGED_IN>
          </Suspense>
        }
      />

      <Route
        path={`${RoutesEnums.DATA_ROOMS}`}
        element={
          <Suspense fallback={<Loader />}>
            <CHECK_LOGGED_IN>
              <GUARD_ROUTE role={KanzRoles.STARTUP}>
                <DataRooms />
              </GUARD_ROUTE>
            </CHECK_LOGGED_IN>
          </Suspense>
        }
      />

      <Route
        path={`${RoutesEnums.CONTACTS}`}
        element={
          <Suspense fallback={<Loader />}>
            <CHECK_LOGGED_IN>
              <GUARD_ROUTE role={KanzRoles.STARTUP}>
                <Contacts />
              </GUARD_ROUTE>
            </CHECK_LOGGED_IN>
          </Suspense>
        }
      />
      <Route
        path={`${RoutesEnums.MARKET_INSIGHTS}`}
        element={
          <Suspense fallback={<Loader />}>
            <CHECK_LOGGED_IN>
              <GUARD_ROUTE role={KanzRoles.STARTUP}>
                <MarketInsights />
              </GUARD_ROUTE>
            </CHECK_LOGGED_IN>
          </Suspense>
        }
      />

      {/* Static Routes */}
      <Route
        path={RoutesEnums.PRIVACY_POLICY}
        element={
          <Suspense fallback={<Loader />}>
            <PrivacyPolicy />
          </Suspense>
        }
      />
      <Route
        path={RoutesEnums.TERMS_CONDITIONS}
        element={
          <Suspense fallback={<Loader />}>
            <TermsAndConditions />
          </Suspense>
        }
      />
    </Routes>
  );
};
export default RouterModule;

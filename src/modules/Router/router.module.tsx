import React, {
  PropsWithChildren,
  Suspense,
  lazy,
  useEffect,
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
import InvestorSyndicates from "../Investor/InvestorSyndicates";
import Deals from "../Investor/Deals";
import SyndicateInvestments from "../Syndicate/Investments";
import ManageGroup from "../Syndicate/ManageGroup";
import GuestInvestorOverview from "../Guest/GuestDealOverview";
import SyndicateFullView from "../Investor/InvestorSyndicates/SyndicateFullView";
import InvestmentDealDetail from "../Investor/Dashboard/InvestmentDealDetail";
import PageNotFound from "../PageNotFound";
import Profile from "../Profile";
import Wallet from "../Wallet";
import Transactions from "../Wallet/Overview/Transactions";
import Blogs from "../Blogs";
import BlogView from "../Blogs/BlogView";

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
const FundRaiserOnboarding = lazy(() => import("../Onboarding/FundRaiserFlow"));
const SyndicateOnboarding = lazy(() => import("../Onboarding/SyndicateFlow"));
const AddAttachments = lazy(() => import("../Onboarding/AddAttachments"));

/* ---### Post Onboarding ###--- */
const FundRaiserDashboard = lazy(() => import("../FundRaiser"));
const InvestorDashboard = lazy(() => import("../Investor"));
const CreateDeal = lazy(() => import("../CreateDeal"));
const DealDetail = lazy(() => import("../DealDetail"));
const DealApproval = lazy(() => import("../Syndicate/DealApproval"));
const SyndicateRequest = lazy(() => import("../FundRaiser/SyndicateRequest"));
const InvestorUpdates = lazy(() => import("../FundRaiser/InvestorUpdates"));
const DataRooms = lazy(() => import("../DataRooms"));
const Contacts = lazy(() => import("../Contacts"));
const MarketInsights = lazy(() => import("../MarketInsights"));
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

const CHECK_GUARD_GUEST_ROUTE = (props: PropsWithChildren | any) => {
  const { children, guestRoute } = props;
  const user: any = useSelector((state: RootState) => state.user.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  if (user && authToken) return <React.Fragment>{children}</React.Fragment>;
  return <Navigate to={guestRoute} replace />;
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

      <Route
        path={`${RoutesEnums.SYNDICATE_DEAL_DETAIL}/:dealToken`}
        element={
          <Suspense fallback={<Loader />}>
            {authToken ? <SyndicateDealOverview /> : <GuestInvestorOverview />}
          </Suspense>
        }
      />

      <Route
        path={`${RoutesEnums.BLOGS}`}
        element={<Suspense fallback={<Loader />}>{<Blogs/>}</Suspense>}
      />

      <Route
        path={`${RoutesEnums.BLOG}/:id`}
        element={<Suspense fallback={<Loader />}>{<BlogView/>}</Suspense>}
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
        path={`${RoutesEnums.FUNDRAISER_DETAILS}/:id`}
        element={
          <Suspense fallback={<Loader />}>
            <CHECK_LOGGED_IN>
              <GUARD_ROUTE role={KanzRoles.FUNDRAISER}>
                <FundRaiserOnboarding guard={authToken} />
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
        path={`${RoutesEnums.FUNDRAISER_DETAILS}/:id`}
        element={
          <Suspense fallback={<Loader />}>
            <CHECK_LOGGED_IN>
              <GUARD_ROUTE role={KanzRoles.FUNDRAISER}>
                <FundRaiserOnboarding guard={authToken} />
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
        path={`${RoutesEnums.FUNDRAISER_DASHBOARD}`}
        element={
          <Suspense fallback={<Loader />}>
            <CHECK_LOGGED_IN>
              <GUARD_SUBMITTED_ROUTE
                role={[KanzRoles.FUNDRAISER]}
                status={ApplicationStatus.APPROVED}
              >
                <FundRaiserDashboard />
              </GUARD_SUBMITTED_ROUTE>
            </CHECK_LOGGED_IN>
          </Suspense>
        }
      />

      <Route
        path={`${RoutesEnums.INVESTOR_DASHBOARD}`}
        element={
          <Suspense fallback={<Loader />}>
            <CHECK_LOGGED_IN>
              <GUARD_SUBMITTED_ROUTE
                role={[KanzRoles.INVESTOR]}
                status={ApplicationStatus.APPROVED}
              >
                <InvestorDashboard />
              </GUARD_SUBMITTED_ROUTE>
            </CHECK_LOGGED_IN>
          </Suspense>
        }
      />
      <Route
        path={`${RoutesEnums.INVESTOR_SYNDICATES}`}
        element={
          <Suspense fallback={<Loader />}>
            <CHECK_LOGGED_IN>
              <GUARD_SUBMITTED_ROUTE
                role={[KanzRoles.INVESTOR]}
                status={ApplicationStatus.APPROVED}
              >
                <InvestorSyndicates />
              </GUARD_SUBMITTED_ROUTE>
            </CHECK_LOGGED_IN>
          </Suspense>
        }
      />
      <Route
        path={`${RoutesEnums.INVESTOR_DEAL_DETAILS}/:token`}
        element={
          <Suspense fallback={<Loader />}>
            <CHECK_LOGGED_IN>
              <GUARD_SUBMITTED_ROUTE
                role={[KanzRoles.INVESTOR]}
                status={ApplicationStatus.APPROVED}
              >
                <InvestmentDealDetail />
              </GUARD_SUBMITTED_ROUTE>
            </CHECK_LOGGED_IN>
          </Suspense>
        }
      />
      <Route
        path={`${RoutesEnums.INVESTOR_DEALS}`}
        element={
          <Suspense fallback={<Loader />}>
            <CHECK_LOGGED_IN>
              <GUARD_SUBMITTED_ROUTE
                role={[KanzRoles.INVESTOR]}
                status={ApplicationStatus.APPROVED}
              >
                <Deals />
              </GUARD_SUBMITTED_ROUTE>
            </CHECK_LOGGED_IN>
          </Suspense>
        }
      />
      <Route
        path={`${RoutesEnums.SYNDICATE_DETAILED_VIEW}`}
        element={
          <Suspense fallback={<Loader />}>
            <CHECK_LOGGED_IN>
              <GUARD_SUBMITTED_ROUTE
                role={[KanzRoles.INVESTOR]}
                status={ApplicationStatus.APPROVED}
              >
                <SyndicateFullView />
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
              <GUARD_SUBMITTED_ROUTE
                role={[KanzRoles.SYNDICATE]}
                status={ApplicationStatus.APPROVED}
              >
                <SyndicateDashboard />
              </GUARD_SUBMITTED_ROUTE>
            </CHECK_LOGGED_IN>
          </Suspense>
        }
      />
      <Route
        path={`${RoutesEnums.CREATE_DEAL}`}
        element={
          <Suspense fallback={<Loader />}>
            <CHECK_LOGGED_IN>
              <GUARD_SUBMITTED_ROUTE
                role={[KanzRoles.FUNDRAISER, KanzRoles.PROPERTY_OWNER]}
                status={ApplicationStatus.APPROVED}
              >
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
              <GUARD_SUBMITTED_ROUTE
                role={[KanzRoles.FUNDRAISER, KanzRoles.PROPERTY_OWNER]}
                status={ApplicationStatus.APPROVED}
              >
                <DealDetail />
              </GUARD_SUBMITTED_ROUTE>
            </CHECK_LOGGED_IN>
          </Suspense>
        }
      />
      <Route
        path={`${RoutesEnums.SYNDICATE_INVESTMENTS}`}
        element={
          <Suspense fallback={<Loader />}>
            <CHECK_LOGGED_IN>
              <GUARD_SUBMITTED_ROUTE
                role={[KanzRoles.SYNDICATE]}
                status={ApplicationStatus.APPROVED}
              >
                <SyndicateInvestments />
              </GUARD_SUBMITTED_ROUTE>
            </CHECK_LOGGED_IN>
          </Suspense>
        }
      />
      <Route
        path={`${RoutesEnums.SYNDICATE_MANAGE_GROUP}`}
        element={
          <Suspense fallback={<Loader />}>
            <CHECK_LOGGED_IN>
              <GUARD_SUBMITTED_ROUTE
                role={[KanzRoles.SYNDICATE]}
                status={ApplicationStatus.APPROVED}
              >
                <ManageGroup />
              </GUARD_SUBMITTED_ROUTE>
            </CHECK_LOGGED_IN>
          </Suspense>
        }
      />
      <Route
        path={`${RoutesEnums.WALLET}`}
        element={
          <Suspense fallback={<Loader />}>
            <CHECK_LOGGED_IN>
              <GUARD_SUBMITTED_ROUTE
                role={[
                  KanzRoles.SYNDICATE,
                  KanzRoles.FUNDRAISER,
                  KanzRoles.PROPERTY_OWNER,
                  KanzRoles.INVESTOR,
                ]}
                status={ApplicationStatus.APPROVED}
              >
                <Wallet />
              </GUARD_SUBMITTED_ROUTE>
            </CHECK_LOGGED_IN>
          </Suspense>
        }
      />
      <Route
        path={`${RoutesEnums.TRANSACTIONS}`}
        element={
          <Suspense fallback={<Loader />}>
            <CHECK_LOGGED_IN>
              <GUARD_SUBMITTED_ROUTE
                role={[
                  KanzRoles.SYNDICATE,
                  KanzRoles.FUNDRAISER,
                  KanzRoles.PROPERTY_OWNER,
                  KanzRoles.INVESTOR,
                ]}
                status={ApplicationStatus.APPROVED}
              >
                <Transactions />
              </GUARD_SUBMITTED_ROUTE>
            </CHECK_LOGGED_IN>
          </Suspense>
        }
      />
      <Route
        path={`${RoutesEnums.PROFILE}`}
        element={
          <Suspense fallback={<Loader />}>
            <CHECK_LOGGED_IN>
              <GUARD_SUBMITTED_ROUTE
                role={[
                  KanzRoles.SYNDICATE,
                  KanzRoles.FUNDRAISER,
                  KanzRoles.PROPERTY_OWNER,
                  KanzRoles.INVESTOR,
                ]}
                status={ApplicationStatus.APPROVED}
              >
                <Profile />
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
              <GUARD_SUBMITTED_ROUTE
                role={[KanzRoles.SYNDICATE]}
                status={ApplicationStatus.APPROVED}
              >
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
              <GUARD_SUBMITTED_ROUTE
                role={[KanzRoles.FUNDRAISER]}
                status={ApplicationStatus.APPROVED}
              >
                <SyndicateRequest guard={authToken} />
              </GUARD_SUBMITTED_ROUTE>
            </CHECK_LOGGED_IN>
          </Suspense>
        }
      />

      <Route
        path={RoutesEnums.INVESTOR_UPDATES}
        element={
          <Suspense fallback={<Loader />}>
            <CHECK_LOGGED_IN>
              <GUARD_SUBMITTED_ROUTE
                role={[KanzRoles.FUNDRAISER]}
                status={ApplicationStatus.APPROVED}
              >
                <InvestorUpdates guard={authToken} />
              </GUARD_SUBMITTED_ROUTE>
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
      <Route
        path="*"
        element={
          <Suspense fallback={<Loader />}>
            <PageNotFound />
          </Suspense>
        }
      />
    </Routes>
  );
};
export default RouterModule;

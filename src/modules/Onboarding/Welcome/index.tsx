import React, { useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux-toolkit/store/store";
import Header from "../../../shared/components/Header";
import { KanzRoles } from "../../../enums/roles.enum";
import AddAttachmentBanner from "../../../shared/components/AddAttachmentBanner";
import { ApplicationStatus } from "../../../enums/types.enum";
import { getUser } from "../../../apis/auth.api";
import { saveToken } from "../../../redux-toolkit/slicer/auth.slicer";
import { saveUserData } from "../../../redux-toolkit/slicer/user.slicer";
import Loader from "../../../shared/views/Loader";
import Button from "../../../shared/components/Button";
import { getInvestor } from "../../../apis/investor.api";
import { getSyndicateInformation } from "../../../apis/syndicate.api";
import { isEmpty } from "../../../utils/object.util";
import { saveUserMetaData } from "../../../redux-toolkit/slicer/metadata.slicer";

const Welcome = ({ }: any) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authToken: any = useSelector((state: RootState) => state.auth.value);
    const language: any = useSelector((state: RootState) => state.language.value);
    const user: any = useSelector((state: RootState) => state.user.value);
    const metadata: any = useSelector((state: RootState) => state.metadata.value);

    const [loading, setLoading] = useState(false);

    useLayoutEffect(() => {
        getUserDetails();
        user.type === KanzRoles.INVESTOR && getInvestorDetails();
        user.type === KanzRoles.SYNDICATE && getSyndicateDetails();
    }, []);

    const getUserDetails = async () => {
        try {
            setLoading(true);
            let { status, data } = await getUser(authToken);
            if (status === 200) {
                dispatch(saveUserData(data.status.data));
            }
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                dispatch(saveToken(""));
                navigate("/login", { state: "complete-goals" });
            }
        } finally {
            setLoading(false);
        }
    };
    const getInvestorDetails = async () => {
        try {
            setLoading(true);
            let { status, data } = await getInvestor(authToken);
            if (status === 200) {
                dispatch(saveUserMetaData(data?.status?.data));
            }
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                dispatch(saveToken(""));
                navigate("/login", { state: '' });
            }
        } finally {
            setLoading(false);
        }
    };
    const getSyndicateDetails = async () => {
        try {
            setLoading(true);
            let { status, data } = await getSyndicateInformation(1, authToken);
            if (status === 200) {
                dispatch(saveUserMetaData(data?.status?.data));
            }
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                dispatch(saveToken(""));
                navigate("/login", { state: '' });
            }
        } finally {
            setLoading(false);
        }
    };

    const renderRoleWiseScreen = () => {
        if (user.type === KanzRoles.INVESTOR) {
            if (user.status == ApplicationStatus.OPENED && isEmpty(metadata?.profile)) {
                return (
                    <React.Fragment>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4 screen500:text-[20px]">
                            {language?.onboarding?.welcomeDashboard}
                        </h2>
                        <h3 className="text-base font-normal text-neutral-700 screen500:text-[12px]">
                            {language?.onboarding?.starterMessage}
                        </h3>
                        <Button className="mt-[60px] h-[38px] w-[143px]" disabled={loading} htmlType="submit" loading={loading} onClick={() => navigate("/investor-type")} >
                            {language?.buttons?.start}
                        </Button>
                    </React.Fragment>
                );
            } else if (user.status == ApplicationStatus.OPENED && !isEmpty(metadata?.profile)) {
                return (
                    <React.Fragment>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4 screen500:text-[20px]">
                            {language?.onboarding?.welcomeDashboard}
                        </h2>
                        <h3 className="text-base font-normal text-neutral-700 screen500:text-[12px]">
                            {language?.onboarding?.starterMessage}
                        </h3>
                        <h3 className="text-base font-normal text-neutral-700 screen500:text-[12px] mt-2">
                            {language?.onboarding?.appStatus}: <strong>{language.common.inprogress}</strong>
                        </h3>
                        <Button className="mt-[60px] h-[38px] w-[143px]" disabled={loading} htmlType="submit" loading={loading} onClick={() => navigate("/investor-type")} >
                            {language?.buttons?.continue}
                        </Button>
                    </React.Fragment>
                );
            } else if (user.status == ApplicationStatus.SUBMITTED) {
                return (
                    <React.Fragment>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4 screen500:text-[20px]">
                            {language?.onboarding?.submitted}
                        </h2>
                        <h3 className="text-base font-normal text-neutral-700 screen500:text-[12px]">
                            {language?.onboarding?.appStatus}: <strong>{language.common.submitted}</strong>
                        </h3>
                    </React.Fragment>
                );
            } else {
                return (
                    <React.Fragment>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4 screen500:text-[20px]">
                            {language?.onboarding?.welcomeDashboard}
                        </h2>
                        <h3 className="text-base font-normal text-neutral-700 screen500:text-[12px]">
                            {language?.onboarding?.starterMessage}
                        </h3>
                        <Button
                            className="mt-6 h-[38px]"
                            disabled={loading}
                            htmlType="submit"
                            loading={loading}
                            onClick={() => navigate("/investor-type")}
                        >
                            {language?.buttons?.start}
                        </Button>
                    </React.Fragment>
                );
            }
        } else if (user.type === KanzRoles.SYNDICATE) {
            if (user.status === ApplicationStatus.OPENED && isEmpty(metadata?.profile)) {
                return (
                    <React.Fragment>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4 screen500:text-[20px]">
                            {language?.onboarding?.syndicateLead}
                        </h2>
                        <h3 className="text-base font-normal text-neutral-700 screen500:text-[12px]">
                            {language?.onboarding?.syndicateLeadSub}
                        </h3>
                        <Button
                            className="mt-6 h-[38px]"
                            disabled={loading}
                            htmlType="submit"
                            loading={loading}
                            onClick={() => navigate("/syndicate-lead/1")}
                        >
                            {language?.buttons?.start}
                        </Button>
                    </React.Fragment>
                );
            }
            else if (user.status === ApplicationStatus.OPENED && !isEmpty(metadata?.profile)) {
                return (
                    <React.Fragment>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4 screen500:text-[20px]">
                            {language?.onboarding?.syndicateLead}
                        </h2>
                        <h3 className="text-base font-normal text-neutral-700 screen500:text-[12px]">
                            {language?.onboarding?.syndicateLeadSub}
                        </h3>
                        <h3 className="text-base font-normal text-neutral-700 screen500:text-[12px] mt-2">
                            {language?.onboarding?.appStatus}: <strong>{language.common.inprogress}</strong>
                        </h3>
                        <Button
                            className="mt-6 h-[38px]"
                            disabled={loading}
                            htmlType="submit"
                            loading={loading}
                            onClick={() => navigate("/syndicate-lead/1")}
                        >
                            {language?.buttons?.start}
                        </Button>
                    </React.Fragment>
                );
            }
            else if (user.status == ApplicationStatus.SUBMITTED) {
                return (
                    <React.Fragment>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4 screen500:text-[20px]">
                            {language?.onboarding?.submitted}
                        </h2>
                        <h3 className="text-base font-normal text-neutral-700 screen500:text-[12px]">
                            {language?.onboarding?.appStatus}: <strong>{language.common.submitted}</strong>
                        </h3>
                    </React.Fragment>
                );
            }
        } else if (user.type === KanzRoles.REALTOR) {
          return (
            <React.Fragment>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4 screen500:text-[20px]">
                {language?.onboarding?.realtorWelcomeText}
              </h2>
              <h3 className="text-base font-normal text-neutral-700 screen500:text-[12px]">
                {language?.onboarding?.syndicateLeadSub}
              </h3>
              <Button
                className="mt-6 h-[38px]"
                disabled={loading}
                htmlType="submit"
                loading={loading}
                onClick={() => navigate("/realtor-type")}
              >
                {language?.buttons?.start}
              </Button>
            </React.Fragment>
          );
        } else if (user.type === KanzRoles.STARTUP) {
          return (
            <React.Fragment>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4 screen500:text-[20px]">
                {language?.onboarding?.addCompanyDetails}
              </h2>
              <h3 className="text-base font-normal text-neutral-700 screen500:text-[12px]">
                {language?.onboarding?.syndicateLeadSub}
              </h3>
              <Button
                className="mt-6 h-[38px]"
                disabled={loading}
                htmlType="submit"
                loading={loading}
                onClick={() => navigate("/startup-type/1")}
              >
                {language?.buttons?.start}
              </Button>
            </React.Fragment>
          );
        }
    };

    return (
        <main className="h-full max-h-full background-auth overflow-y-auto">
            {loading ? (
                <Loader />
            ) : (
                <React.Fragment>
                    <section>
                        <Header />
                    </section>
                    {user.type !== KanzRoles.INVESTOR && (
                        <AddAttachmentBanner language={language} navigate={navigate} />
                    )}

                    <aside className="w-full flex items-center justify-center pt-[75px]">
                        <section
                            className="px-9 bg-white inline-flex flex-col items-center py-14 w-1/2 text-center screen991:w-3/4 screen991:w-[90%]"
                            style={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.04)" }}
                        >
                            {renderRoleWiseScreen()}
                        </section>
                    </aside>
                </React.Fragment>
            )}
        </main>
    );
};
export default Welcome;
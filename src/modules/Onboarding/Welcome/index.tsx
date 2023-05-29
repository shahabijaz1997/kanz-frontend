import React, { useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux-toolkit/store/store";
import Header from "../../../shared/components/Header";
import { KanzRoles } from "../../../enums/roles.enum";
import AddAttachmentBanner from "../../../shared/components/AddAttachmentBanner";
import { ApplicationStatus } from "../../../enums/types.enum";
import { getInvestor } from "../../../apis/investor.api";
import { saveToken } from "../../../redux-toolkit/slicer/auth.slicer";
import { saveUserData } from "../../../redux-toolkit/slicer/user.slicer";
import Loader from "../../../shared/views/Loader";
import { getSyndicateInformation } from "../../../apis/syndicate.api";

const Welcome = ({ }: any) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authToken: any = useSelector((state: RootState) => state.auth.value);
    const language: any = useSelector((state: RootState) => state.language.value);
    const user: any = useSelector((state: RootState) => state.user.value);

    const [loading, setLoading] = useState(false)

    useLayoutEffect(() => {
        user.type === KanzRoles.INVESTOR && getInvestorDetails();
        // user.type === KanzRoles.SYNDICATE && getSyndicateDetails();
    }, [])

    const getInvestorDetails = async () => {
        try {
            setLoading(true);
            let { status, data } = await getInvestor(authToken);
            if (status === 200) {
                dispatch(saveUserData(data.status.data));
            }
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                dispatch(saveToken(""));
                navigate("/login", { state: 'complete-goals' });
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
                dispatch(saveUserData(data?.status?.data?.attributes));
                console.log(data?.status?.data?.attributes);
                
            }
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                dispatch(saveToken(""));
                navigate("/login", { state: 'complete-goals' });
            }
        } finally {
            setLoading(false);
        }
    };

    const renderRoleWiseScreen = () => {
        if (user.type === KanzRoles.INVESTOR) {
            if (user.status == ApplicationStatus.PENDING) {
                return (
                    <React.Fragment>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4 screen500:text-[20px]">{language?.onboarding?.welcomeDashboard}</h2>
                        <h3 className="text-base font-normal text-neutral-700 screen500:text-[12px]">{language?.onboarding?.starterMessage}</h3>
                        <button className="text-white text-sm tracking-[0.03em] font-bold rounded-md bg-cyan-800 focus:outline-none focus:shadow-outline px-8 mt-14 h-[38px]" type="button" onClick={() => navigate("/investor-type")}>
                            {language?.buttons?.start}
                        </button>
                    </React.Fragment>
                )
            }
            else if (user.status == ApplicationStatus.IN_PROGRESS) {
                return (
                    <React.Fragment>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4 screen500:text-[20px]">{language?.onboarding?.welcomeDashboard}</h2>
                        <h3 className="text-base font-normal text-neutral-700 screen500:text-[12px]">{language?.onboarding?.starterMessage}</h3>
                        <h3 className="text-base font-normal text-neutral-700 screen500:text-[12px] mt-3">{language?.onboarding?.appStatus}: <strong>{language.common.inprogress}</strong></h3>
                        <button className="text-white text-sm tracking-[0.03em] font-bold rounded-md bg-cyan-800 focus:outline-none focus:shadow-outline px-8 mt-14 h-[38px]" type="button" onClick={() => navigate("/investor-type")}>
                            {language?.buttons?.continue}
                        </button>
                    </React.Fragment>
                )
            }
            else if (user.status == ApplicationStatus.SUBMITTED) {
                return (
                    <React.Fragment>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4 screen500:text-[20px]">{language?.onboarding?.submitted}</h2>
                        <h3 className="text-base font-normal text-neutral-700 screen500:text-[12px]">{language?.onboarding?.appStatus}: <strong>{language.common.submitted}</strong></h3>
                    </React.Fragment>
                )
            } else {
                return (
                    <React.Fragment>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4 screen500:text-[20px]">{language?.onboarding?.welcomeDashboard}</h2>
                        <h3 className="text-base font-normal text-neutral-700 screen500:text-[12px]">{language?.onboarding?.starterMessage}</h3>
                        <button className="text-white text-sm tracking-[0.03em] font-bold rounded-md bg-cyan-800 focus:outline-none focus:shadow-outline px-8 mt-14 h-[38px]" type="button" onClick={() => navigate("/investor-type")}>
                            {language?.buttons?.start}
                        </button>
                    </React.Fragment>
                )
            }
        } else if (user.type === KanzRoles.SYNDICATE) {
            return (
                <React.Fragment>
                    <h2 className="text-2xl font-bold text-neutral-900 mb-4 screen500:text-[20px]">{language?.onboarding?.syndicateLead}</h2>
                    <h3 className="text-base font-normal text-neutral-700 screen500:text-[12px]">{language?.onboarding?.syndicateLeadSub}</h3>
                    <button className="text-white text-sm tracking-[0.03em] font-bold rounded-md bg-cyan-800 focus:outline-none focus:shadow-outline px-8 mt-14 h-[38px]" type="button" onClick={() => navigate("/syndicate-lead/1")}>
                        {language?.buttons?.start}
                    </button>
                </React.Fragment>
            )
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
                    {user.type !== KanzRoles.INVESTOR && <AddAttachmentBanner language={language} navigate={navigate} />}

                    <aside className="w-full flex items-center justify-center pt-[75px]">
                        <section className="px-5 bg-white inline-flex flex-col items-center py-14 w-1/2 screen991:w-3/4 screen991:w-[90%]" style={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.04)" }}>
                            {renderRoleWiseScreen()}
                        </section>
                    </aside>
                </React.Fragment>
            )}
        </main>
    )
};
export default Welcome
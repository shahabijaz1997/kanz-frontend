import React, { useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux-toolkit/store/store";
import Header from "../../../shared/components/Header";
import { KanzRoles } from "../../../enums/roles.enum";
import AddAttachmentBanner from "../../../shared/components/AddAttachmentBanner";
import { getUser } from "../../../apis/auth.api";
import { saveToken } from "../../../redux-toolkit/slicer/auth.slicer";
import { saveUserData } from "../../../redux-toolkit/slicer/user.slicer";
import Loader from "../../../shared/views/Loader";
import { getInvestor } from "../../../apis/investor.api";
import { getSyndicateInformation } from "../../../apis/syndicate.api";
import { saveUserMetaData } from "../../../redux-toolkit/slicer/metadata.slicer";
import { getCompanyInformation } from "../../../apis/company.api";
import { getPropertyOwnerInformation } from "../../../apis/propertyOwner.api";
import InvestorHome from "../../../shared/views/InvestorHome";
import SyndicateHome from "../../../shared/views/SyndicateHome";
import PropertyOwnerHome from "../../../shared/views/PropertyOwnerHome";
import StartupHome from "../../../shared/views/StartupHome";
import { RoutesEnums } from "../../../enums/routes.enum";

const Welcome = ({ }: any) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authToken: any = useSelector((state: RootState) => state.auth.value);
    const language: any = useSelector((state: RootState) => state.language.value);
    const user: any = useSelector((state: RootState) => state.user.value);

    const [loading, setLoading] = useState(false);

    useLayoutEffect(() => {
        getUserDetails();
        getRoleBasedDetails();
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
                navigate(RoutesEnums.LOGIN, { state: "" });
            }
        } finally {
            setLoading(false);
        }
    };

    const getRoleBasedDetails = async () => {
        try {
            setLoading(true);
            let results: any;
            if (user.type === KanzRoles.INVESTOR)
                results = await getInvestor(authToken);
            else if (user.type === KanzRoles.SYNDICATE)
                results = await getSyndicateInformation(user.id, authToken);
            else if (user.type === KanzRoles.STARTUP)
                results = await getCompanyInformation(user.id, authToken);
            else if (user.type === KanzRoles.PROPERTY_OWNER)
                results = await getPropertyOwnerInformation(user.id, authToken);
            let { status, data } = results;
            if (status === 200) {
                dispatch(saveUserMetaData(data?.status?.data));
            }
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                dispatch(saveToken(""));
                navigate(RoutesEnums.LOGIN, { state: '' });
            }
        } finally {
            setLoading(false);
        }
    };

    const renderRoleWiseScreen = () => {
        if (user.type === KanzRoles.INVESTOR) {
            return <InvestorHome loading={loading} language={language} />
        } else if (user.type === KanzRoles.SYNDICATE) {
            return <SyndicateHome loading={loading} language={language} />
        } else if (user.type === KanzRoles.PROPERTY_OWNER) {
            return <PropertyOwnerHome loading={loading} language={language} />
        } else if (user.type === KanzRoles.STARTUP) {
            return <StartupHome loading={loading} language={language} />
        }
    };

    return (
        <main className="h-full max-h-full cbc-auth overflow-y-auto overflow-x-hidden">
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
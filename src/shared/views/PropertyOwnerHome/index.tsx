import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import Button from "../../components/Button";
import { ApplicationStatus } from "../../../enums/types.enum";
import { isEmpty } from "../../../utils/object.utils";
import { RoutesEnums } from "../../../enums/routes.enum";
import { KanzRoles } from "../../../enums/roles.enum";

const PropertyOwnerHome = ({ loading, language }: any) => {
    const navigate = useNavigate();
    const user: any = useSelector((state: RootState) => state.user.value);
    const metadata: any = useSelector((state: RootState) => state.metadata.value);

    const onPress = () => {
      const { profile_states } = metadata;

      if (profile_states?.profile_completed) {
        navigate(RoutesEnums.ADD_ATTACHMENTS);
      } else {
        navigate(RoutesEnums.PROPERTY_OWNER_DETAILS);
      }
    }; 

    useEffect(()=>{
        if (user.status === ApplicationStatus.APPROVED)
        {
          navigate(RoutesEnums.PROPERTY_OWNER_DASHBOARD)
          return
        }
      })

    const render = () => {
        if (user.status === ApplicationStatus.OPENED && isEmpty(metadata?.profile)) {
            return (
                <React.Fragment>
                    <h2 className="text-2xl font-bold text-neutral-900 mb-4 screen500:text-[20px]">
                        {language?.onboarding?.propertyOwnerWelcomeText}
                    </h2>
                    <h3 className="text-base font-normal text-neutral-700 screen500:text-[12px]">
                        {language?.v2?.propertyOwner?.home_sub}
                    </h3>
                    <Button className="mt-6 h-[38px]" disabled={loading} htmlType="submit" loading={loading} onClick={onPress}>
                        {language?.buttons?.start}
                    </Button>
                </React.Fragment>
            );
        }
        else if (user.status === ApplicationStatus.OPENED && !isEmpty(metadata?.profile)) {
            return (
                <React.Fragment>
                    <h2 className="text-2xl font-bold text-neutral-900 mb-4 screen500:text-[20px]">
                        {language?.onboarding?.propertyOwnerWelcomeText}
                    </h2>
                    <h3 className="text-base font-normal text-neutral-700 screen500:text-[12px]">
                        {language?.v2?.propertyOwner?.home_sub}
                    </h3>
                    <h3 className="text-base font-normal text-neutral-700 screen500:text-[12px] mt-2">
                        {language?.onboarding?.appStatus}: <strong>{language.common.inprogress}</strong>
                    </h3>
                    <Button className="mt-6 h-[38px]" disabled={loading} htmlType="submit" loading={loading} onClick={onPress} >
                        {language?.buttons?.continue}
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
                    <h3 className="text-base font-normal text-neutral-700 screen500:text-[12px]">
                        {language?.v2?.common?.tuned}
                    </h3>
                </React.Fragment>
            );
        }
        else {
            return (
                <React.Fragment>
                    <h2 className="text-2xl font-bold text-neutral-900 mb-4 screen500:text-[20px]">
                        {language?.v2?.common?.has_been}{language.v2.common[user.status]}
                    </h2>
                    <h3 className="text-base font-normal text-neutral-700 screen500:text-[12px]">
                        {language?.onboarding?.appStatus}: <strong>{language.v2.common[user.status]}</strong>
                    </h3>
                    {user.status === ApplicationStatus.REOPENED && <Button className="mt-[30px] h-[38px] min-w-[160px]" disabled={loading} htmlType="submit" loading={loading} onClick={() => navigate(RoutesEnums.PROPERTY_OWNER_DETAILS)} >
                        {language?.buttons?.continue}
                    </Button>}
                    
                    {user.status === ApplicationStatus.APPROVED && <Button className="mt-[30px] h-[38px] min-w-[160px]" disabled={loading} htmlType="submit" loading={loading} onClick={() => navigate(RoutesEnums.PROPERTY_OWNER_DASHBOARD)} >
                        {language?.buttons?.gotoDashboard}
                    </Button>}
                </React.Fragment>
            );
        }
    };
    return render()
};
export default PropertyOwnerHome;
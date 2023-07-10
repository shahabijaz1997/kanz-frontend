import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import Button from "../../components/Button";
import { ApplicationStatus } from "../../../enums/types.enum";
import { isEmpty } from "../../../utils/object.util";
import { RoutesEnums } from "../../../enums/routes.enum";

const SyndicateHome = ({ loading, language }: any) => {
    const navigate = useNavigate();
    const user: any = useSelector((state: RootState) => state.user.value);
    const metadata: any = useSelector((state: RootState) => state.metadata.value);

    const onPress = () => {
      const { profile, profile_states } = metadata;
      if (isEmpty(profile) && profile_states.profile_current_step === 0) {
        navigate(`${RoutesEnums.SYNIDCATE_DETAILS}/1`);
      } else if (!profile_states.profile_completed) {
        navigate(
          `${RoutesEnums.SYNIDCATE_DETAILS}/${profile_states.profile_current_step + 1}`
        );
      } else if (profile_states.profile_completed) {
        navigate(RoutesEnums.ADD_ATTACHMENTS);
      }
    }; 
  

    const render = () => {
        if (user.status === ApplicationStatus.OPENED && isEmpty(metadata?.profile)) {
            return (
                <React.Fragment>
                    <h2 className="text-2xl font-bold text-neutral-900 mb-4 screen500:text-[20px]">
                        {language?.onboarding?.syndicateLead}
                    </h2>
                    <h3 className="text-base font-normal text-neutral-700 screen500:text-[12px]">
                        {language?.v2?.syndicate?.home_sub}
                    </h3>
                    <Button
                        className="mt-6 h-[38px]"
                        disabled={loading}
                        htmlType="submit"
                        loading={loading}
                        onClick={onPress}
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
                        {language?.v2?.syndicate?.home_sub}
                    </h3>
                    <h3 className="text-base font-normal text-neutral-700 screen500:text-[12px] mt-2">
                        {language?.onboarding?.appStatus}: <strong>{language.common.inprogress}</strong>
                    </h3>
                    <Button
                        className="mt-6 h-[38px]"
                        disabled={loading}
                        htmlType="submit"
                        loading={loading}
                        onClick={onPress}
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
                  {language?.v2?.common?.has_been}
                  {language.v2.common[user.status]}
                </h2>
                <h3 className="text-base font-normal text-neutral-700 screen500:text-[12px]">
                  {language?.onboarding?.appStatus}:{" "}
                  <strong>{language.v2.common[user.status]}</strong>
                </h3>
                {user.status === ApplicationStatus.REOPENED && (
                  <Button
                    className="mt-[30px] h-[38px] w-[143px]"
                    disabled={loading}
                    htmlType="submit"
                    loading={loading}
                    onClick={() => navigate(`${RoutesEnums.START_UP}/1`)}
                  >
                    {language?.buttons?.continue}
                  </Button>
                )}
              </React.Fragment>
            );
        }
    };
    return render()
};
export default SyndicateHome;
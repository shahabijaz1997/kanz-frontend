import { LinkedIn } from "react-linkedin-login-oauth2";
import LinkedinIcon from "../../../assets/icons/linedin_logo.png";
import { getEnv } from "../../../env";
import { linkedInOauth } from "../../../apis/auth.api";

const ENV: any = getEnv();

const handleLinkedInLoginSuccess = async (data: any) => {
    try {
        console.log("Linkedin: ", data);
        let res = await linkedInOauth({ code: data });
        console.log("Respomse", res);
    } catch (error) {
        console.error("Linkedin error: ", error);
    }
};

const LinkedInOauth = ({ loading, language, setLoading }: any) => {
    return (
        <LinkedIn clientId={ENV.LINKEDIN_API_KEY} onSuccess={handleLinkedInLoginSuccess} onError={(err) => console.log(err)} redirectUri={`http://localhost:3000/linkedin`} scope={'r_emailaddress r_liteprofile'}>
            {({ linkedInLogin }) => (
                <button className="hover:border-cyan-800 border border-neutral-300 rounded-md py-2.5 px-4 w-2/4 h-[38px] inline-grid place-items-center bg-white" type="button" onClick={linkedInLogin}>
                    <img src={LinkedinIcon} alt={language?.onboarding?.linkedinLogin} />
                </button>
            )}
        </LinkedIn>
    )
};
export default LinkedInOauth;
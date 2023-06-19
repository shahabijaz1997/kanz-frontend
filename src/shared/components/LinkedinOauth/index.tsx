import { LinkedIn } from "react-linkedin-login-oauth2";
import LinkedinIcon from "../../../assets/icons/linedin_logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getEnv } from "../../../env";
import { linkedInOauth } from "../../../apis/auth.api";
import { toast } from "react-toastify";
import { toastUtil } from "../../../utils/toast.utils";
import { saveUserData } from "../../../redux-toolkit/slicer/user.slicer";
import { saveToken } from "../../../redux-toolkit/slicer/auth.slicer";

const ENV: any = getEnv();

const LinkedInOauth = ({ loading, language, setLoading }: any) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLinkedInLoginSuccess = async (code: any) => {
        try {
            setLoading(true);
            let { status, data, headers }: any = await linkedInOauth({ code });
            if (status === 200) {
                console.log(headers);
                
                dispatch(saveUserData(data?.status?.data));
                const token = headers["authorization"].split(" ")[1];
                dispatch(saveToken(token));
                toast.success(data.status.message, toastUtil);
                localStorage.removeItem("role");
                let timeout = setTimeout(() => {
                    clearTimeout(timeout);
                    navigate("/welcome");
                }, 1000)
            }
        } catch (error: any) {
            console.error(error);
            const message = error?.response?.data?.status?.message || language.promptMessages.errorGeneral;
            toast.error(message, toastUtil);
        } finally {
            setLoading(false);
        }
    };
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
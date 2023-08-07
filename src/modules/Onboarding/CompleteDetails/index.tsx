import { useState, useLayoutEffect, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../../shared/components/Header";
import Individual from "../components/Individual";
import Firm from "../components/Firm";
import Drawer from "../../../shared/components/Drawer";
import { ApplicationStatus, InvestorType } from "../../../enums/types.enum";
import { KanzRoles } from "../../../enums/roles.enum";
import { getInvestor } from "../../../apis/investor.api";
import { saveUserMetaData } from "../../../redux-toolkit/slicer/metadata.slicer";
import { saveToken } from "../../../redux-toolkit/slicer/auth.slicer";
import { toast } from "react-toastify";
import { toastUtil } from "../../../utils/toast.utils";
import { RoutesEnums } from "../../../enums/routes.enum";

const CompleteDetails = (props: any) => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const authToken: any = useSelector((state: RootState) => state.auth.value);
    const user: any = useSelector((state: RootState) => state.user.value);
    const metadata: any = useSelector((state: RootState) => state.metadata.value);
    const language: any = useSelector((state: RootState) => state.language.value);
    const [isOpen, setOpen] = useState(false);

    useLayoutEffect(() => {
        if ((user.status !== ApplicationStatus.OPENED && user.status !== ApplicationStatus.REOPENED) || user.type !== KanzRoles.INVESTOR) navigate(RoutesEnums.WELCOME);
    }, []);
    useLayoutEffect(() => {
        if (user.type !== KanzRoles.INVESTOR) navigate(RoutesEnums.WELCOME);
      }, []);

    useEffect(()=>{
      getInvestorDetails();
    },[])
    
      const getInvestorDetails = async () => {
        try {
          let { status, data } = await getInvestor(authToken);
          if (status === 200) {
            dispatch(saveUserMetaData(data?.status?.data));
          }
        } catch (error: any) {
          const message = error?.response?.data?.status?.message || error?.response?.data || language.promptMessages.errorGeneral;
          toast.error(message, toastUtil);
          if (error.response && error.response.status === 401) {
            dispatch(saveToken(""));
            navigate(RoutesEnums.LOGIN, { state: KanzRoles.INVESTOR });
          }
        } finally {
        }
      };
    

    return (
        <main className="h-full max-h-full cbc-auth overflow-y-auto overflow-x-hidden">
            <section className="h-[67px]">
                <Header />
            </section>
            <aside className="w-full flex items-center justify-center flex-col pt-12">
                <section className="flex items-start justify-center flex-col max-w-[420px] screen500:max-w-[300px]">
                    <h2 className="text-[24px] font-bold text-left text-neutral-900 mb-4 screen500:text-[20px]">{state === InvestorType.INDIVIDUAL ? language?.individual?.individual : language?.firm?.firm}</h2>
                    <h3 className="text-[16px] text-left text-neutral-700 mb-12 screen500:text-[12px]">
                        <span className="font-normal">{state === InvestorType.INDIVIDUAL ? language?.individual?.sub : language?.firm?.sub}</span> &nbsp;
                        <span className="text-cc-blue font-medium cursor-pointer" onClick={() => setOpen(true)}>{language?.common?.learn}</span>
                    </h3>
                    { ( metadata?.role || state ) === InvestorType.INDIVIDUAL && <Individual language={language} />}
                    {( metadata?.role || state ) === InvestorType.FIRM && <Firm language={language} />}
                </section>
            </aside>

            <Drawer isOpen={isOpen} setIsOpen={(val: boolean) => setOpen(val)}>
                <header className="font-bold text-xl">{language.philosophyGoals.whyToDo}</header>
                <p className="text-neutral-700 font-normal text-sm text-justify">{language?.v2?.investor?.accreditation_drawer}</p>
            </Drawer>
        </main>
    );
};
export default CompleteDetails;

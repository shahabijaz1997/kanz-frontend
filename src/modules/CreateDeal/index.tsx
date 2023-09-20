import { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../redux-toolkit/store/store";
import Header from "../../shared/components/Header";
import CrossIcon from "../../ts-icons/crossIcon.svg";
import { KanzRoles } from "../../enums/roles.enum";
import StartupDeal from "./StartupDeal";
import RealtorDeal from "./RealtorDeal";

const CreateDeal = ({ }: any) => {
  const navigate = useNavigate();
  const params = useParams();
  const [step, setStep]: any = useState(Number(params?.id));
  const language: any = useSelector((state: RootState) => state.language.value);
  const metadata: any = useSelector((state: RootState) => state.metadata.value);
  const user: any = useSelector((state: RootState) => state.user.value);

  useLayoutEffect(() => {
    setStep(Number(params?.id) || 1);
}, [params]);

  return (
    <main className="h-full max-h-full overflow-y-auto overflow-x-hidden">
      <section>
        <Header
          custom={true}
          data={{ leftMenu: language?.v3?.startup?.create_deal?.title, button: (<button onClick={() => navigate(-1)}> <CrossIcon stroke="#171717" className="w-6 h-6" /></button>) }}
        />
      </section>

      <aside className="w-full pt-14 px-12">
        {metadata.role === KanzRoles.STARTUP ? <StartupDeal step={step} /> : <RealtorDeal step={step} />}
      </aside>
    </main>
  )
};
export default CreateDeal;
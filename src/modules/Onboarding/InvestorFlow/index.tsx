import React, { useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import { useNavigate } from "react-router-dom";
import { ApplicationStatus, InvestorType } from "../../../enums/types.enum";
import Header from "../../../shared/components/Header";
import ArrowIcon from "../../../ts-icons/arrowIcon.svg";
import UserIcon from "../../../ts-icons/userIcon.svg";
import { toast } from "react-toastify";
import { selectInvestorType } from "../../../apis/investor.api";
import { toastUtil } from "../../../utils/toast.utils";
import { saveToken } from "../../../redux-toolkit/slicer/auth.slicer";
import Drawer from "../../../shared/components/Drawer";
import Button from "../../../shared/components/Button";
import GroupIcon from "../../../ts-icons/groupIcon.svg";
import { isEmpty } from "../../../utils/object.util";

const InvestorFlow = ({ }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const language: any = useSelector((state: RootState) => state.language.value);
  const user: any = useSelector((state: RootState) => state.user.value);
  const metadata: any = useSelector((state: RootState) => state.metadata.value);

  const [selectedAccount, setSelectedAccount]: any = useState();
  const [loading, setLoading] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [accounts] = useState([
    { id: 1, payload: "Individual Investor", icon: <UserIcon stroke="#171717" className="absolute h-6 top-4" />, text: language?.investorFow?.individual, subText: language?.investorFow?.subInd, link: InvestorType.INDIVIDUAL },
    { id: 2, payload: "Investment Firm", icon: <GroupIcon stroke="#171717" className="absolute h-6 top-4" />, text: language?.investorFow?.firm, subText: language?.investorFow?.subFirm, link: InvestorType.FIRM },
  ]);

  useLayoutEffect(() => {
    if (user.status == ApplicationStatus.OPENED && !isEmpty(metadata?.profile))
      setSelectedAccount(accounts?.find(ac => ac.payload === metadata.role));
  }, []);

  const onSelectInvestorType = async () => {
    try {
      if (!selectedAccount?.link) return toast.warning(language.promptMessages.pleaseSelectInvest, toastUtil);
      setLoading(true);
      let fd = new FormData();

      fd.append("investor[type]", selectedAccount.payload)
      let { status, data } = await selectInvestorType({ investor: { role: selectedAccount.payload } }, authToken);
      if (status === 200) {
        localStorage.setItem("investor-type", selectedAccount?.link)
        navigate(`/complete-details`, { state: selectedAccount?.link })
      }
    } catch (error: any) {
      const message = error?.response?.data?.status?.message || error?.response?.data || language.promptMessages.errorGeneral;
      toast.error(message, toastUtil);
      if (error.response && error.response.status === 401) {
        dispatch(saveToken(""));
        navigate("/login", { state: 'investor-type' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-full max-h-full  overflow-y-auto">
      <section>
        <Header />
      </section>
      <aside className="w-full flex items-center justify-center flex-col pt-[100px]">
        <section className="flex items-start justify-center flex-col max-w-md screen500:max-w-[300px]">
          <h2 className="text-2xl font-bold text-left text-neutral-900 mb-4 screen500:text-[20px]">
            {language.investorFow.type}
          </h2>
          <h3 className="text-base text-left text-neutral-700 mb-12 screen500:text-[12px]">
            <span className="font-normal">{language.investorFow.sub}</span>{" "}
            &nbsp;
            <span
              className="color-blue font-medium cursor-pointer"
              onClick={() => setOpen(true)}
            >
              {language.common.learn}
            </span>
          </h3>
          {React.Children.toArray(
            accounts.map((account) => {
              return (
                <section
                  className={`w-full cursor-pointer h-24 rounded-xl border-2 border-grey px-4 py-3.5 relative mb-5 transition-all ${selectedAccount?.id === account.id && "border-cyan-800"
                    }`}
                  onClick={() => setSelectedAccount(account)}
                >
                  {account.icon}
                  <div className="center w-[80%]" style={{ margin: "0 auto" }}>
                    <h3 className="text-neutral-900 text-base font-medium">
                      {account.text}
                    </h3>
                    <p className="text-neutral-500 text-sm font-normal">
                      {account.subText}
                    </p>
                  </div>
                  <div className="check-background rounded-full w-9 h-9 inline-grid place-items-center absolute right-5 top-1/2 translate-y-[-50%]">
                    <ArrowIcon stroke="#171717" />
                  </div>
                </section>
              );
            })
          )}

          <section className="w-full inline-flex items-center justify-between mt-16">
            <Button
              className="mt-6 h-[38px] w-[140px]"
              htmlType="submit"
              type="outlined"
              onClick={() => navigate(-1)}
            >
              {language?.buttons?.back}
            </Button>
            <Button
              className="mt-6 h-[38px] w-[140px]"
              disabled={loading}
              htmlType="submit"
              loading={loading}
              onClick={onSelectInvestorType}
            >
              {language?.buttons?.continue}
            </Button>
          </section>
        </section>
      </aside>
      <Drawer isOpen={isOpen} setIsOpen={(val: boolean) => setOpen(val)}>
        <header className="font-bold text-xl">
          {language.philosophyGoals.whyToDo}
        </header>
        <p className="text-neutral-700 font-normal text-sm text-justify">
          Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
          elit sed risus. Maecenas eget condimentum velit, sit amet feugiat
          lectus. Class aptent taciti sociosqu ad litora torquent per conubia
          nostra, per inceptos himenaeos. Praesent auctor purus luctus enim
          egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
          Suspendisse ac rhoncus nisl.
        </p>
      </Drawer>
    </main>
  );
};
export default InvestorFlow;

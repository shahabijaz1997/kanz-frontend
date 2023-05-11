import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import { useNavigate } from "react-router-dom";
import { InvestorType } from "../../../enums/types.enum";
import Header from "../../../shared/components/Header";
import ArrowIcon from "../../../ts-icons/arrowIcon.svg";
import UserIcon from "../../../ts-icons/userIcon.svg";
import GroupIcon from "../../../ts-icons/groupIcon.svg";
import { selectInvestorType } from "../../../apis/auth.api";
import { toast } from "react-toastify";
import { toastUtil } from "../../../utils/toast.utils";
import Spinner from "../../../shared/components/Spinner";

const InvestorFlow = (props: any) => {
    const { guard } = props;
    const navigate = useNavigate();
    const authToken: any = useSelector((state: RootState) => state.auth.value);
    const language: any = useSelector((state: RootState) => state.language.value);
    const [selectedAccount, setSelectedAccount]: any = useState();
    const [loading, setLoading] = useState(false);
    const [accounts] = useState([
        { id: 1, payload: "Individual Investor", icon: <UserIcon stroke="#171717" className="absolute h-6 top-4" />, text: language?.investorFow?.individual, subText: language?.investorFow?.subInd, link: InvestorType.INDIVIDUAL },
        { id: 2, payload: "Investment Firm", icon: <GroupIcon stroke="#171717" className="absolute h-6 top-4" />, text: language?.investorFow?.firm, subText: language?.investorFow?.subFirm, link: InvestorType.FIRM },
    ]);

    const onSelectInvestorType = async () => {
        try {
            if (!selectedAccount?.link) return;
            setLoading(true);
            let fd = new FormData();
            fd.append("investor[type]", selectedAccount.payload)
            let { status, data } = await selectInvestorType(fd, authToken);
            if (status === 200) {
                navigate(`/complete-details`, { state: selectedAccount?.link })
            }
        } catch (error: any) {
            const message = error?.response?.data?.status?.message || error?.response?.data || language.promptMessages.errorGeneral;
            console.info("Error in selecting account :: ", error);
            toast.error(message, toastUtil);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="h-full max-h-full background-auth overflow-y-auto">
            <section>
                <Header />
            </section>
            <aside className="w-full flex items-center justify-center flex-col pt-[100px]">
                <section className="flex items-start justify-center flex-col max-w-md screen500:max-w-[300px]">
                    <h2 className="text-2xl font-bold text-left text-neutral-900 mb-4 screen500:text-[20px]">{language?.investorFow?.type}</h2>
                    <h3 className="text-base text-left text-neutral-700 mb-12 screen500:text-[12px]">
                        <span className="font-normal">{language?.investorFow?.sub}</span> &nbsp;
                        <span className="color-blue font-medium">{language?.common?.learn}</span>
                    </h3>
                    {React.Children.toArray(
                        accounts.map(account => {
                            return (
                                <section className={`w-full cursor-pointer h-24 rounded-xl border-2 border-grey px-4 py-3.5 relative mb-5 transition-all ${selectedAccount?.id === account.id && "border-cyan-800"}`} onClick={() => setSelectedAccount(account)}>
                                    {account.icon}
                                    <div className="center w-[80%]" style={{ margin: "0 auto" }}>
                                        <h3 className="text-neutral-900 text-base font-medium">{account.text}</h3>
                                        <p className="text-neutral-500 text-sm font-normal">{account.subText}</p>
                                    </div>
                                    <div className="check-background rounded-full w-9 h-9 inline-grid place-items-center absolute right-5 top-1/2 translate-y-[-50%]">
                                        <ArrowIcon stroke="#171717" />
                                    </div>
                                </section>
                            )
                        })
                    )}

                    <section className="w-full inline-flex items-center justify-between mt-16">
                        <button className="text-neutral-900 tracking-[0.03em] bg-white text-sm font-bold rounded-md border border-grey font-semibold rounded-md focus:outline-none focus:shadow-outline h-[38px] w-[140px]" type="submit">
                            {language?.buttons?.back}
                        </button>
                        {
                            loading ? (
                                <button className={`${!selectedAccount?.link && "opacity-70"} text-white tracking-[0.03em] font-bold rounded-md bg-cyan-800 focus:outline-none focus:shadow-outline h-[38px] w-[140px]`}>
                                    <Spinner />
                                </button>
                            ) : (
                                <button className={`${!selectedAccount?.link && "opacity-70"} text-white tracking-[0.03em] font-bold rounded-md bg-cyan-800 focus:outline-none focus:shadow-outline h-[38px] w-[140px]`} type="button" onClick={onSelectInvestorType}>
                                    {language?.buttons?.continue}
                                </button>
                            )
                        }
                    </section>
                </section>
            </aside>
        </main >
    )
};
export default InvestorFlow;
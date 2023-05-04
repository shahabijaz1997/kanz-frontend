import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import { useNavigate } from "react-router-dom";
import { InvestorType } from "../../../enums/types.enum";
import Header from "../../../shared/components/Header";
import ArrowIcon from "../../../ts-icons/arrowIcon.svg";
import UserIcon from "../../../ts-icons/userIcon.svg";
import GroupIcon from "../../../ts-icons/groupIcon.svg";

const InvestorFlow = (props: any) => {
    const { guard } = props;
    const navigate = useNavigate();
    const language: any = useSelector((state: RootState) => state.language.value);
    const [selectedAccount, setSelectedAccount]: any = useState();
    const [accounts] = useState([
        { id: 1, icon: <UserIcon stroke="#171717" className="absolute h-6 top-4" />, text: language?.investorFow?.individual, subText: language?.investorFow?.subInd, link: InvestorType.INDIVIDUAL },
        { id: 2, icon: <GroupIcon stroke="#171717" className="absolute h-6 top-4" />, text: language?.investorFow?.firm, subText: language?.investorFow?.subFirm, link: InvestorType.FIRM },
    ])

    return (
        <main className="h-full max-h-full background-auth">
            <section className="h-[67px]">
                <Header />
            </section>
            <aside style={{ height: "calc(100% - 67px)" }} className="w-full flex items-center justify-center flex-col">
                <section className="flex items-start justify-center flex-col max-w-sm screen500:max-w-[300px]">
                    <h2 className="text-[24px] font-bold text-left text-neutral-900 mb-4 screen500:text-[20px]">{language?.investorFow?.type}</h2>
                    <h3 className="text-[16px] text-left text-neutral-700 mb-12 screen500:text-[12px]">
                        <span className="font-normal">{language?.investorFow?.sub}</span> &nbsp;
                        <span className="color-blue-2 font-medium">{language?.common?.learn}</span>
                    </h3>
                    {React.Children.toArray(
                        accounts.map(account => {
                            return (
                                <section className={`cursor-pointer h-24 rounded-xl border-2 border-grey px-4 py-3.5 relative mb-5 transition-all ${selectedAccount?.id === account.id && "border-cyan-800"}`} onClick={() => setSelectedAccount(account)}>
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
                        <button className="text-neutral-900 font-semibold rounded-md border border-grey font-semibold rounded-md focus:outline-none focus:shadow-outline h-[38px] w-[140px]" type="submit">
                            {language?.buttons?.back}
                        </button>
                        <button disabled={!selectedAccount?.link ? true : false} className="text-white font-semibold rounded-md focus:outline-none focus:shadow-outline primary-bg h-[38px] w-[140px]" type="button" onClick={() => navigate(`/complete-details`, { state: selectedAccount?.link })}>
                            {language?.buttons?.continue}
                        </button>
                    </section>
                </section>
            </aside>
        </main>
    )
};
export default InvestorFlow;
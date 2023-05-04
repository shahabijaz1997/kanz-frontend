import { useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import { useLocation } from "react-router-dom";
import Header from "../../../shared/components/Header";
import UserIcon from "../../../ts-icons/userIcon.svg";
import EditIcon from "../../../ts-icons/editIcon.svg";
import MoneyIcon from "../../../ts-icons/moneyIcon.svg";

const CompleteGoals = (props: any) => {
    const { state } = useLocation();
    const language: any = useSelector((state: RootState) => state.language.value);

    return (
        <main className="h-full max-h-full background-auth">
            <section className="h-[67px]">
                <Header />
            </section>
            <aside className="w-full flex items-center justify-center flex-col pt-12">
                <div className="w-full bg-cyan-800 h-12 inline-flex items-center justify-center">
                    <small className="text-white text-base font-semibold mr-4">{language?.common?.attachmentPending}</small>
                    <button className="bg-white rounded-md py-2 px-3 text-neutral-900 font-medium text-xs">{language?.buttons?.addAttachment}</button>
                </div>
                <section className="flex items-start justify-center flex-col w-[800px] mt-12">
                    <aside className="cursor-pointer rounded-xl p-6 mb-12 shadow-cs-1 w-full">
                        <section className="w-full flex items-start">
                            <div className="rounded-full check-background w-9 h-9 inline-grid place-items-center p-2">
                                <UserIcon stroke="#171717" />
                            </div>
                            <div className="center w-[80%]" style={{ margin: "0 auto" }}>
                                <h3 className="text-neutral-900 text-base font-medium">{language.individual.individual}</h3>
                                <p className="text-neutral-700 text-sm font-normal mt-2">Emirati nationality, 4556 Brendan Ferry Los Angeles, CA 90210</p>
                            </div>
                            <button className="bg-cyan-800 text-white w-[100px] h-9 inline-flex items-center justify-center rounded-md">
                                <EditIcon stroke="#fff" />
                                <small>{language.buttons.edit}</small>
                            </button>
                        </section>
                        <section className="border border-cyan-800 w-[300px] h-[100px] rounded-md p-6 inline-flex items-center gap-4 mt-5 ml-11">
                            <div className="rounded-md bg-cyan-800 inline-grid place-items-center w-12 h-12">
                                <MoneyIcon stroke="#fff" />
                            </div>
                            <div>
                                <small className="text-neutral-500 text-sm font-medium">{language.common.accredited}</small>
                                <div>
                                    <small className="text-neutral-900 text-2xl font-semibold">{language.common.aed}&nbsp;{state.selected.amount}</small>&nbsp;
                                    {state.selected.currency && <small className="text-green-600 text-sm font-semibold">{state.selected.currency}</small>}
                                </div>
                            </div>
                        </section>
                    </aside>

                    <aside className="cursor-pointer rounded-xl p-6 mb-5 shadow-cs-1 w-full = inline-flex justify-center">
                        <section className="w-full inline-flex items-center flex-col max-w-[370px]">
                            <h3 className="text-neutral-900 text-2xl font-bold">{language.individual.philosophyGoals}</h3>
                            <p className="text-neutral-700 text-base font-normal my-5 text-center">{language.individual.philosophysub}</p>

                            <button className="bg-cyan-800 text-white w-[120px] h-9 inline-flex items-center justify-center rounded-md">
                                <small>{language.buttons.start}</small>
                            </button>
                        </section>
                    </aside>
                </section>
            </aside>
        </main>
    );
};
export default CompleteGoals;
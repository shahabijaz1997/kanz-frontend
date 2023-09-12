import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux-toolkit/store/store";
import ApprovedSVG from "../../../../assets/svg/approved.svg";

const DealDetails = ({ }: any) => {
    const language: any = useSelector((state: RootState) => state.language.value);
    const dummy = [{ id: 1, title: "Customer Representative", completed: true, ongoing: false }, { id: 2, title: "Compliance Officer", completed: false, ongoing: true }, { id: 3, title: "Approved", completed: false, ongoing: false }];

    return (
        <aside className="flex items-start justify-between mt-10 w-full gap-5">
            <section className="flex items-start justify-center flex-col w-9/12 min-h-[250px]">
                <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
                    <h3 className="text-neutral-900 font-medium text-sm">Investment Round</h3>
                    <p className="text-neutral-900 font-normal text-sm">Angel Round</p>
                </div>
                <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
                    <h3 className="text-neutral-900 font-medium text-sm">Investment Type</h3>
                    <p className="text-neutral-900 font-normal text-sm">Equity</p>
                </div>
                <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
                    <h3 className="text-neutral-900 font-medium text-sm">Share Class</h3>
                    <p className="text-neutral-900 font-normal text-sm">Common</p>
                </div>
                <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
                    <h3 className="text-neutral-900 font-medium text-sm">Deal Target</h3>
                    <p className="text-neutral-900 font-normal text-sm">$0.00</p>
                </div>
                <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
                    <h3 className="text-neutral-900 font-medium text-sm">Valuation</h3>
                    <p className="text-neutral-900 font-normal text-sm">$10,000,000 (Pre-money)</p>
                </div>
                <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
                    <h3 className="text-neutral-900 font-medium text-sm">Attachments</h3>
                    <p className="text-neutral-900 font-normal text-sm">PDF 2MB</p>
                </div>
            </section>
            <section className="bg-white rounded-md border-[1px] border-neutral-200 px-6 py-4 w-1/4 min-h-[250px]">
                <h3 className="font-medium text-xl text-neutral-900 mb-4">{language?.v3?.deal?.status}</h3>
                <div className="relative flex flex-col justify-center">
                    {React.Children.toArray(dummy.map((item: any, index: number) => {
                        return (
                            <div className="relative w-[30px] inline-flex items-center">
                                <span className="inline-flex items-center flex-col">
                                    {item.completed && <img src={ApprovedSVG} alt="Approved" className="h-[20px] w-[20px]" />}
                                    {(!item.completed && item.ongoing) && <div className="h-[20px] w-[20px] bg-neutral-200 rounded-full inline-grid place-items-center"><div className="h-[12px] w-[12px] bg-cyan-800 rounded-full"></div></div>}
                                    {(!item.completed && !item.ongoing) && <div className="h-[20px] w-[20px] bg-neutral-300 rounded-full inline-grid place-items-center"></div>}
                                    {index !== (dummy.length - 1) && <div className="h-[55px] w-1 bg-neutral-300"></div>}
                                </span>
                                <small className="absolute top-[2px] left-[80%] whitespace-nowrap text-xs font-medium text-neutral-500">{item.title}</small>
                            </div>
                        )
                    }))}
                </div>
            </section>
        </aside>
    )
};
export default DealDetails;
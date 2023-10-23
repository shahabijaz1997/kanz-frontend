import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import ApprovedSVG from "../../../assets/svg/approved.svg";
import { comaFormattedNumber, formatDate, numberFormatter } from "../../../utils/object.utils";
import { KanzRoles } from "../../../enums/roles.enum";


const DealViewDetails = ({ dealDetail, state }: any) => {
    const language: any = useSelector((state: RootState) => state.language.value);
    const dummy = [{ id: 1, title: "Customer Representative", completed: true, ongoing: false }, { id: 2, title: "Compliance Officer", completed: false, ongoing: true }, { id: 3, title: "Approved", completed: false, ongoing: false }];

    const getRoleBasedUI = () => {
        if (state === KanzRoles.STARTUP) return (
            <section className="flex items-start justify-center flex-col w-9/12 min-h-[250px]">
                <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
                    <h3 className="text-neutral-900 font-medium text-sm">{language?.v3?.table?.title}</h3>
                    <p className="text-neutral-900 font-normal text-sm capitalize">{dealDetail?.title || language?.v3?.common?.not_added}</p>
                </div>
                <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
                    <h3 className="text-neutral-900 font-medium text-sm">{language?.v3?.deal?.description}</h3>
                    <p className="text-neutral-900 font-normal text-sm capitalize">{dealDetail?.description || language?.v3?.common?.not_added}</p>
                </div>
                <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
                    <h3 className="text-neutral-900 font-medium text-sm">{language?.v3?.deal?.instrument_type}</h3>
                    <p className="text-neutral-900 font-normal text-sm capitalize">{dealDetail?.instrument_type || language?.v3?.common?.not_added}</p>
                </div>
                <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
                    <h3 className="text-neutral-900 font-medium text-sm">{language?.v3?.table?.stage}</h3>
                    <p className="text-neutral-900 font-normal text-sm capitalize">{dealDetail?.stage || language?.v3?.common?.not_added}</p>
                </div>
                <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
                    <h3 className="text-neutral-900 font-medium text-sm">{language?.v3?.table?.valuation}</h3>
                    <p className="text-neutral-900 font-normal text-sm capitalize">${comaFormattedNumber(dealDetail?.valuation)} ({dealDetail?.equity_type})</p>
                </div>
                <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
                    <h3 className="text-neutral-900 font-medium text-sm">{language?.v3?.deal?.attachments}</h3>
                    <p className="text-neutral-900 font-normal text-sm capitalize">PDF 2MB</p>
                </div>
                <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
                    <h3 className="text-neutral-900 font-medium text-sm">{language?.v3?.table?.sellingPrice}</h3>
                    <p className="text-neutral-900 font-normal text-sm capitalize">{numberFormatter(dealDetail?.selling_price) || language?.v3?.common?.not_added}</p>
                </div>
                <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
                    <h3 className="text-neutral-900 font-medium text-sm">{language?.v3?.table?.status}</h3>
                    <p className="text-neutral-900 font-normal text-sm capitalize">{dealDetail?.status || language?.v3?.common?.not_added}</p>
                </div>
                <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
                    <h3 className="text-neutral-900 font-medium text-sm">{language?.v3?.deal?.start_at}</h3>
                    <p className="text-neutral-900 font-normal text-sm capitalize">{formatDate(dealDetail?.start_at) || language?.v3?.common?.not_added}</p>
                </div>
                <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
                    <h3 className="text-neutral-900 font-medium text-sm">{language?.v3?.deal?.end_at}</h3>
                    <p className="text-neutral-900 font-normal text-sm capitalize">{formatDate(dealDetail?.end_at) || language?.v3?.common?.not_added}</p>
                </div>
            </section>
        )
        else if (state === KanzRoles.REALTOR) return (
            <section className="flex items-start justify-center flex-col w-9/12 min-h-[250px]">
                <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
                    <h3 className="text-neutral-900 font-medium text-sm">{language?.v3?.table?.title}</h3>
                    <p className="text-neutral-900 font-normal text-sm capitalize">{dealDetail?.title || language?.v3?.common?.not_added}</p>
                </div>
                <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
                    <h3 className="text-neutral-900 font-medium text-sm">{language?.v3?.deal?.description}</h3>
                    <p className="text-neutral-900 font-normal text-sm capitalize">{dealDetail?.description || language?.v3?.common?.not_added}</p>
                </div>
                <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
                    <h3 className="text-neutral-900 font-medium text-sm">{language?.v3?.deal?.committed}</h3>
                    <p className="text-neutral-900 font-normal text-sm capitalize">{numberFormatter(dealDetail?.committed)}</p>
                </div>
                <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
                    <h3 className="text-neutral-900 font-medium text-sm">{language?.v3?.deal?.location}</h3>
                    <p className="text-neutral-900 font-normal text-sm capitalize">{dealDetail?.location}</p>
                </div>
                <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
                    <h3 className="text-neutral-900 font-medium text-sm">{language?.v3?.deal?.raised}</h3>
                    <p className="text-neutral-900 font-normal text-sm capitalize">${numberFormatter(dealDetail?.raised)}</p>
                </div>
                <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
                    <h3 className="text-neutral-900 font-medium text-sm">{language?.v3?.deal?.attachments}</h3>
                    <p className="text-neutral-900 font-normal text-sm capitalize">PDF 2MB</p>
                </div>
                <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
                    <h3 className="text-neutral-900 font-medium text-sm">{language?.v3?.table?.size}</h3>
                    <p className="text-neutral-900 font-normal text-sm capitalize">{comaFormattedNumber(dealDetail?.size)} sqft</p>
                </div>
                <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
                    <h3 className="text-neutral-900 font-medium text-sm">{language?.v3?.table?.sellingPrice}</h3>
                    <p className="text-neutral-900 font-normal text-sm capitalize">{numberFormatter(dealDetail?.selling_price) || language?.v3?.common?.not_added}</p>
                </div>
                <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
                    <h3 className="text-neutral-900 font-medium text-sm">{language?.v3?.table?.status}</h3>
                    <p className="text-neutral-900 font-normal text-sm capitalize">{dealDetail?.status || language?.v3?.common?.not_added}</p>
                </div>
                <div className="pt-6 w-full inline-flex items-start justify-between flex-col">
                    <h3 className="text-neutral-900 font-medium text-xl">{language?.v3?.table?.features}</h3>
                    <aside className="mt-5 w-full">
                        <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
                            <h3 className="text-neutral-900 font-medium text-sm">{language?.v3?.deal?.beds}</h3>
                            <p className="text-neutral-900 font-normal text-sm capitalize">{dealDetail?.features?.bedrooms}</p>
                        </div>
                        <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
                            <h3 className="text-neutral-900 font-medium text-sm">{language?.v3?.deal?.kitchen}</h3>
                            <p className="text-neutral-900 font-normal text-sm capitalize">{dealDetail?.features?.kitchen}</p>
                        </div>
                        {dealDetail?.features?.washroom && <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
                            <h3 className="text-neutral-900 font-medium text-sm">{language?.v3?.deal?.washroom}</h3>
                            <p className="text-neutral-900 font-normal text-sm capitalize">{dealDetail?.features?.washroom}</p>
                        </div>}
                        {dealDetail?.features?.parking && <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
                            <h3 className="text-neutral-900 font-medium text-sm">{language?.v3?.deal?.parking}</h3>
                            <p className="text-neutral-900 font-normal text-sm capitalize">{dealDetail?.features?.parking}</p>
                        </div>}
                        {dealDetail?.features?.swimming_pool && <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
                            <h3 className="text-neutral-900 font-medium text-sm">{language?.v3?.deal?.swim}</h3>
                            <p className="text-neutral-900 font-normal text-sm capitalize">{dealDetail?.features?.swimming_pool}</p>
                        </div>}
                        {dealDetail?.features?.rental_amount && <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
                            <h3 className="text-neutral-900 font-medium text-sm">{language?.v3?.deal?.por_2}</h3>
                            <p className="text-neutral-900 font-normal text-sm capitalize">${numberFormatter(dealDetail?.features?.rental_amount)} ({dealDetail?.features?.rental_period})</p>
                        </div>}
                    </aside>
                </div>
            </section>
        )
        else return (
            <div></div>
        )
    };

    return (
        <aside className="flex items-start justify-between mt-10 w-full gap-5">
            {dealDetail && getRoleBasedUI()}
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
export default DealViewDetails;
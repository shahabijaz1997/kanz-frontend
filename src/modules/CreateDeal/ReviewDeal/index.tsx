import React, { useEffect, useState } from "react";
import { StartupRoutes } from "../../../enums/routes.enum";
import { onReviewDeal } from "../../../apis/deal.api";
import { KanzRoles } from "../../../enums/roles.enum";
import { DealType } from "../../../enums/types.enum";
import Spinner from "../../../shared/components/Spinner";

const ReviewDeal = ({ navigate, dealId, authToken, metadata, language }: any) => {
    const [loading, setLoading] = useState(false);
    const [data, setData]: any = useState();

    useEffect(() => {
        getReviewDetail()
    }, []);

    const getReviewDetail = async () => {
        try {
            setLoading(true);
            const queryParams: any = { type: metadata.role === KanzRoles.STARTUP ? DealType.STARTUP : DealType.REALTOR };
            let { status, data } = await onReviewDeal(dealId, queryParams, authToken);
            if (status === 200)
                setData(data?.status?.data?.steps);

        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    };

    const showUI = (field: any) => {
        return (
            <div className="py-4 border-b-[1px] border-b-neutral-200 w-full cursor-pointer inline-flex w-full justify-between" onClick={() => navigate(`${StartupRoutes.CREATE_DEAL}/1`)}>
                <h3 className="text-neutral-900 font-medium text-sm">{field?.statement}</h3>
                {typeof field?.value === "string" && <p className="capitalize text-neutral-500 font-normal text-sm">{field?.value}</p>}
                {typeof field?.value === "boolean" && <p className="capitalize text-neutral-500 font-normal text-sm">{field?.value ? language?.buttons?.yes : language?.buttons?.no}</p>}
                {typeof field?.value === "object" && <p className="capitalize text-neutral-500 font-normal text-sm">{field?.value ? language?.buttons?.yes : language?.buttons?.no}</p>}
            </div>
        )
    }

    return (
        <React.Fragment>
            {loading ? (
                <div className="absolute left-0 top-0 w-full h-full grid place-items-center" style={{ backgroundColor: "rgba(255, 255, 255, 1)", zIndex: 50 }} >
                    <Spinner />
                </div>
            ) : (
                <section className="flex items-start justify-center flex-col mt-10 max-w-[420px] min-w-[450px] screen500:max-w-[350px]">
                    {
                        data && React.Children.toArray(
                            data?.map((step: any) => {
                                return (
                                    <div className="py-4 w-full cursor-pointer" onClick={() => navigate(`${StartupRoutes.CREATE_DEAL}/1`)}>
                                        <h2 className="text-cc-black font-semibold text-2xl capitalize">{step?.title}</h2>
                                        {React.Children.toArray(
                                            step.fields[0]?.map((field: any) => {
                                                return (
                                                    showUI(field)
                                                )
                                            })
                                        )}
                                    </div>
                                )
                            })
                        )
                    }
                </section>
            )}
        </React.Fragment>
    );
};
export default ReviewDeal;
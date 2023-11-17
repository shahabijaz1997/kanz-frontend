import React, { useEffect, useState } from "react";
import { RoutesEnums, StartupRoutes } from "../../../enums/routes.enum";
import { onReviewDeal } from "../../../apis/deal.api";
import { KanzRoles } from "../../../enums/roles.enum";
import { DealType } from "../../../enums/types.enum";
import Spinner from "../../../shared/components/Spinner";
import { comaFormattedNumber, uniqueArray } from "../../../utils/object.utils";

const ReviewDeal = ({
  navigate,
  dealId,
  authToken,
  metadata,
  language,
  showDeal,
}: any) => {
  const [loading, setLoading] = useState(false);
  const [data, setData]: any = useState();

  useEffect(() => {
    showDeal && getReviewDetail();
  }, []);

  const getReviewDetail = async () => {
    try {
      setLoading(true);
      const queryParams: any = {
        type:
          metadata.role === KanzRoles.STARTUP
            ? DealType.STARTUP
            : DealType.PROPERTY_OWNER,
      };
      let { status, data } = await onReviewDeal(dealId, queryParams, authToken);
      if (status === 200) {
        let stepsArray = data?.status?.data?.steps;
        stepsArray.pop();
        setData(stepsArray);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const showUI = (field: any) => {
    return (
      <div
        className="pb-3 w-full cursor-pointer inline-flex w-full justify-between"
        onClick={() => navigate(`${RoutesEnums.CREATE_DEAL}/1`)}
      >
        <h3 className="capitalize text-neutral-900 font-medium text-sm">
          {field?.statement}
        </h3>
        <span className="inline-flex items-center">
          {(typeof field?.value === "string" ||
            typeof field?.value === "number") && (
            <p className="capitalize text-neutral-500 font-normal text-sm">
              {comaFormattedNumber(field?.value)}
            </p>
          )}
          {typeof field?.value === "boolean" && (
            <p className="capitalize text-neutral-500 font-normal text-sm">
              {field?.value ? language?.buttons?.yes : language?.buttons?.no}
            </p>
          )}
          {typeof field?.value === "object" && (
            <p className="capitalize text-neutral-500 font-normal text-sm">
              {field?.value ? language?.buttons?.yes : language?.buttons?.no}
            </p>
          )}

          {field?.unit && field?.value && (
            <small className="uppercase ml-2 text-neutral-500 font-normal text-sm">
              {field?.unit}
            </small>
          )}
        </span>
      </div>
    );
  };

  const showLoopSelection = (step: any) => {
    if (typeof step?.fields[0]?.index === "number") {
      let payload: any[] = [];
      for (let i = 0; i < step?.fields?.length; i++) {
        const fields = step?.fields?.filter((fd: any) => fd.index === i);
        payload.push({ id: i, fields });
      }

      let uniques = uniqueArray(payload);
      uniques = uniques?.filter((uq) => uq?.fields?.length > 0);
      return React.Children.toArray(
        uniques?.map((nz: any) => {
          return (
            <div
              className="pb-3 w-full cursor-pointer inline-flex flex-col"
              onClick={() => navigate(`${RoutesEnums.CREATE_DEAL}/1`)}
            >
              <h3 className="capitalize text-neutral-900 font-medium text-sm">
                {nz?.fields[1]?.value}
              </h3>
              <p className="capitalize text-neutral-500 font-normal text-sm">
                {nz?.fields[0]?.value}
              </p>
            </div>
          );
        })
      );
    } else
      return React.Children.toArray(
        step.fields?.map((field: any) => {
          return showUI(field);
        })
      );
  };

  return (
    <React.Fragment>
      {loading ? (
        <div
          className="absolute left-0 top-0 w-full h-full grid place-items-center"
          style={{ backgroundColor: "rgba(255, 255, 255, 1)", zIndex: 50 }}
        >
          <Spinner />
        </div>
      ) : (
        <section className="flex items-start justify-center flex-col mt-2 max-w-full screen500:max-w-[350px]">
          {data &&
            React.Children.toArray(
              data?.map((step: any, index: number) => {
                return (
                  <div
                    className={`w-full cursor-pointer border-b-[1px] border-b-neutral-200 ${
                      index !== 0 ? "py-4" : "pb-4"
                    }`}
                    onClick={() =>
                      navigate(`${RoutesEnums.CREATE_DEAL}/${index + 1}`)
                    }
                  >
                    <h2 className="text-cc-black font-semibold text-2xl capitalize mb-3">
                      {step?.title}
                    </h2>
                    {showLoopSelection(step)}
                  </div>
                );
              })
            )}
        </section>
      )}
    </React.Fragment>
  );
};
export default ReviewDeal;

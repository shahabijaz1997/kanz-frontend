import { comaFormattedNumber } from "../../../../../utils/object.utils";
import { DealCheckType, DealType } from "../../../../../enums/types.enum";
import { useNavigate } from "react-router-dom";
import { RoutesEnums } from "../../../../../enums/routes.enum";

const DealDescription: any = ({ data }: any) => {
  const navigate = useNavigate();
  const RenderDecider = () => {
    if (data?.deal_type === DealCheckType.PROPERTY) return renderPropertyDeal();
    else if (
      data?.deal_type === DealCheckType.STARTUP &&
      data?.details?.instrument_type === "SAFE"
    )
      return renderSafeStartupDeal();
    else if (
      data?.deal_type === DealCheckType.STARTUP &&
      data?.details?.instrument_type === "Equity Financing"
    )
      return renderEquityStartupDeal();
  };

  const renderSafeStartupDeal: any = () => {
    return (
      <aside className="w-[80%] flex pt-7 items-start justify-between">
        <div className="flex-col flex gap-6">
          <span className="flex-col flex gap-1">
            <label className="font-medium">Insturment type</label>
            <p>{data?.detail?.instrument_type || "N/A"}</p>
          </span>
          <span className="flex-col flex gap-1">
            <label className="font-medium">SAFE Type</label>
            <p>{data?.detail?.safe_type || "N/A"}</p>
          </span>
          <span className="flex-col flex gap-1">
            <label className="font-medium">Valuation Cap</label>
            <p>{data?.details?.["Valuation Cap"] || "N/A"}</p>
          </span>
        </div>
        <div className="flex-col flex gap-6">
          <span className="flex-col flex gap-1">
            <label className="font-medium">Deal Target</label>
            <p>
              {comaFormattedNumber(data?.target, DealCheckType.STARTUP) ||
                "N/A"}
            </p>
          </span>
          <span className="flex-col flex gap-1">
            <label className="font-medium">Valuation</label>
            <p>{data?.details?.["Valuation"] || "N/A"}</p>
          </span>
          <span className="flex-col flex gap-1">
            <label className="font-medium">Discount</label>
            <p>{data?.details?.["Discount"] || "N/A"}</p>
          </span>
        </div>
        <div className="flex-col flex gap-6">
          <span className="flex-col flex gap-1">
            <label className="font-medium">Minimum Check Size</label>
            <p>{data?.details?.["Minimum Check Size"] || "N/A"}</p>
          </span>
          <span className="flex-col flex gap-1">
            <label className="font-medium">Pro Rata</label>
            <p>{data?.details?.["Pro Rata"] || "N/A"}</p>
          </span>
          <span className="flex-col flex gap-1">
            <label className="font-medium">MFN only</label>
            <p>{data?.details?.["MFN Only"] || "N/A"}</p>
          </span>
        </div>
      </aside>
    );
  };
  const renderEquityStartupDeal: any = () => {
    return (
      <aside className="w-[80%] flex pt-7 items-start justify-between">
        <div className="flex-col flex gap-6">
          <span className="flex-col flex gap-1">
            <label className="font-medium">Insturment type</label>
            <p>{data?.details?.instrument_type || "N/A"}</p>
          </span>
          <span className="flex-col flex gap-1">
            <label className="font-medium">Equity Type</label>
            <p>{data?.details?.equity_type || "N/A"}</p>
          </span>
          <span className="flex-col flex gap-1">
            <label className="font-medium">Stage</label>
            <p>{data?.details?.round || "N/A"}</p>
          </span>
        </div>
        <div className="flex-col flex gap-6">
          <span className="flex-col flex gap-1">
            <label className="font-medium">Deal Target</label>
            <p>
              {comaFormattedNumber(data?.target, DealCheckType.STARTUP) ||
                "N/A"}
            </p>
          </span>
          <span className="flex-col flex gap-1">
            <label className="font-medium">Valuation</label>
            <p>
              {comaFormattedNumber(
                data?.details?.valuation,
                DealCheckType.STARTUP
              ) || "N/A"}
            </p>
          </span>
          <span className="flex-col flex gap-1">
            <label className="font-medium">Valuation Type</label>
            <p>{data?.details?.valuation_type || "N/A"}</p>
          </span>
        </div>
        <div className="flex-col flex gap-6">
          <span className="flex-col flex gap-1">
            <label className="font-medium">Minimum Check Size</label>
            <p>{data?.details?.["Minimum Check Size"] || "N/A"}</p>
          </span>
          <span className="flex-col flex gap-1">
            <label className="font-medium">Pro Rata</label>
            <p>{data?.details?.["Pro Rata"] || "N/A"}</p>
          </span>
          <span className="flex-col flex gap-1">
            <label className="font-medium">Additional Terms</label>
            <p>{data?.details?.["Additional Terms"] || "N/A"}</p>
          </span>
        </div>
      </aside>
    );
  };
  const renderPropertyDeal: any = () => {
    return (
      <aside className="w-[80%] flex pt-7 items-start justify-between">
        <div className="flex-col flex gap-6">
          <span className="flex-col flex gap-1">
            <label className="font-medium">Selling Price</label>
            <p>
              {comaFormattedNumber(data?.target, DealCheckType.PROPERTY) ||
                "N/A"}
            </p>
          </span>
          <span className="flex-col flex gap-1">
            <label className="font-medium">Location</label>
            <p>{data?.details?.location || "N/A"}</p>
          </span>
          <span className="flex-col flex gap-1">
            <label className="font-medium">Size</label>
            <p>{data?.details?.size || "N/A"}</p>
          </span>
        </div>
        <div className="flex-col flex gap-6">
          <span className="flex-col flex gap-1">
            <label className="font-medium">State</label>
            <p>{data?.details?.state || "N/A"}</p>
          </span>
          <span className="flex-col flex gap-1">
            <label className="font-medium">City</label>
            <p>{data?.details?.city || "N/A"}</p>
          </span>
          <span className="flex-col flex gap-1">
            <label className="font-medium">Rental Amount</label>
            <p>
              {(data?.details?.rental_amount || "N/A") +
                " " +
                (data?.details?.rental_period_id || "")}
            </p>
          </span>
        </div>
        <div className="flex-col flex gap-6">
          <span className="flex-col flex gap-1">
            <label className="font-medium">Dividend Yield</label>
            <p>
              {data?.details?.dividend_yield
                ? data?.details?.dividend_yield 
                : "N/A"}{" "}
              %
            </p>
          </span>
          <span className="flex-col flex gap-1">
            <label className="font-medium">Yearly Appreciation</label>
            <p>
              {data?.details?.yearly_appreciation
                ? data?.details?.yearly_appreciation
                : "N/A"}{" "}
              %
            </p>
          </span>
        </div>
      </aside>
    );
  };
  return (
    <section className="min-w-full border-[1px] border-[#E5E5E5] rounded-md shadow-md">
      <p
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          navigate(`${RoutesEnums.SYNDICATE_DEAL_DETAIL}/${data?.token}`, {
            state: window.location.pathname,
          });
        }}
        className=" cursor-pointer flex justify-end items-center px-4 text-sm pt-4 font-medium text-[#155E75]"
      >
        <span className="hover:underline">View more detail</span>{" "}
        <span className="px-1">&#10140;</span>
      </p>
      <div className="h-full w-full flex flex-col justify-between px-[2rem] pt-[1rem] pb-[2rem]">
        <h1 className=" font-medium text-xl">Invest</h1>
        <p className="text-sm text-[#737373]">
          Minimum is $2500 Invest by Oct 2
        </p>
        {RenderDecider()}
      </div>
    </section>
  );
};
export default DealDescription;

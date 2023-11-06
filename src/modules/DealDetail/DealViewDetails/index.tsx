import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import ApprovedSVG from "../../../assets/svg/approved.svg";
import {
  comaFormattedNumber,
  formatDate,
  numberFormatter,
} from "../../../utils/object.utils";
import { KanzRoles } from "../../../enums/roles.enum";

const DealViewDetails = ({ dealDetail, state }: any) => {
  const language: any = useSelector((state: RootState) => state.language.value);
  const dummy = [
    {
      id: 1,
      title: "Customer Representative",
      completed: true,
      ongoing: false,
    },
    { id: 2, title: "Compliance Officer", completed: false, ongoing: true },
    { id: 3, title: "Approved", completed: false, ongoing: false },
  ];

  const getRoleBasedUI = () => {
    if (state === KanzRoles.STARTUP)
      return (
        <section className="flex items-start justify-center flex-col w-9/12 min-h-[250px]">
          <div className="mt-10 mb-4">
            <h2 className="text-black text-xl font-bold">{"Instrument"}</h2>
          </div>
          <div className="py-4  border-b-neutral-200 w-full inline-flex items-center justify-between">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.deal?.instrument_type}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {dealDetail?.instrument_type || language?.v3?.common?.not_added}
            </p>
          </div>
          <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.deal?.equity_type}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {dealDetail?.equity_type || language?.v3?.common?.not_added}
            </p>
          </div>
          <div className="mt-10 mb-4">
            <h2 className="text-black text-xl font-bold">{"Stage"}</h2>
          </div>
          <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
            <h3 className="text-neutral-900 font-medium text-sm">
              {"What round is this?"}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {dealDetail?.stage || language?.v3?.common?.not_added}
            </p>
          </div>
          <div className="mt-10 mb-4">
            <h2 className="text-black text-xl font-bold">
              {language?.v3?.table?.title}
            </h2>
          </div>
          <div className="py-4  border-b-neutral-200 w-full inline-flex items-center justify-between">
            <h3 className="text-neutral-900 font-medium text-sm">
              {"Startup Title"}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {dealDetail?.title || language?.v3?.common?.not_added}
            </p>
          </div>
          <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
            <h3 className="text-neutral-900 font-medium text-sm w-full  whitespace-nowrap">
              {"Startup Description"}
            </h3>
            <p className="text-neutral-900  text-xs capitalize text-right  flex-wrap pl-5">
              {dealDetail?.description || language?.v3?.common?.not_added}
            </p>
          </div>
          <div className="mt-10 mb-4">
            <h2 className="text-black text-xl font-bold">{"Deal Target"}</h2>
          </div>
          <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
            <h3 className="text-neutral-900 font-medium text-sm">
              {"Deal target"}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              ${comaFormattedNumber(dealDetail?.selling_price)}
            </p>
          </div>
          <div className="mt-10 mb-4">
            <h2 className="text-black text-xl font-bold">{"Valuation"}</h2>
          </div>
          <div className="py-4  border-b-neutral-200 w-full inline-flex items-center justify-between">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.table?.valuation}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {dealDetail?.valuation || language?.v3?.common?.not_added}
            </p>
          </div>
          <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
            <h3 className="text-neutral-900 font-medium text-sm">{"Type"}</h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {dealDetail?.valuation_type || language?.v3?.common?.not_added}
            </p>
          </div>
          <div className="mt-10 mb-4">
            <h2 className="text-black text-xl font-bold">{"Deal Timeline"}</h2>
          </div>
          <div className="py-4  border-b-neutral-200 w-full inline-flex items-center justify-between">
            <h3 className="text-neutral-900 font-medium text-sm">
              {"Start Date"}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {dealDetail?.start_at || language?.v3?.common?.not_added}
            </p>
          </div>
          <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
            <h3 className="text-neutral-900 font-medium text-sm">
              {"End Date"}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {dealDetail?.end_at || language?.v3?.common?.not_added}
            </p>
          </div>
          <div className="mt-10 mb-4">
            <h2 className="text-black text-xl font-bold">{"Terms"}</h2>
          </div>
          <div className="py-4  border-b-neutral-200 w-full inline-flex items-center justify-between">
            <h3 className="text-neutral-900 font-medium text-sm">
              {"Minimum Check Size"}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {dealDetail?.stage || language?.v3?.common?.not_added}
            </p>
          </div>
          <div className="py-4  border-b-neutral-200 w-full inline-flex items-center justify-between">
            <h3 className="text-neutral-900 font-medium text-sm">
              {"Pro rata"}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {dealDetail?.stage || language?.v3?.common?.not_added}
            </p>
          </div>
          <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
            <h3 className="text-neutral-900 font-medium text-sm">
              {"Expected Dividend Yield"}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {dealDetail?.stage || language?.v3?.common?.not_added}
            </p>
          </div>
        </section>
      );
    else if (state === KanzRoles.REALTOR)
      return (
        <section className="flex items-start justify-center flex-col w-9/12 min-h-[250px]">
          <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.table?.title}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {dealDetail?.title || language?.v3?.common?.not_added}
            </p>
          </div>
          <div className="mt-10 mb-4">
            <h2 className="text-black text-xl font-medium">Location</h2>
          </div>
          {/*       <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.deal?.committed}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {numberFormatter(dealDetail?.committed)}
            </p>
          </div> */}
          <div className="py-4  w-full inline-flex items-center justify-between">
            <h3 className="text-neutral-900 font-medium text-sm">Country</h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {dealDetail?.address?.country_name}
            </p>
          </div>
          <div className="py-4  w-full inline-flex items-center justify-between">
            <h3 className="text-neutral-900 font-medium text-sm">State</h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {dealDetail?.address?.state}
            </p>
          </div>
          <div className="py-4  w-full inline-flex items-center justify-between">
            <h3 className="text-neutral-900 font-medium text-sm">City</h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {dealDetail?.address?.city}
            </p>
          </div>
          <div className="py-4  w-full inline-flex items-center justify-between">
            <h3 className="text-neutral-900 font-medium text-sm">Area </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {dealDetail?.address?.area}
            </p>
          </div>
          <div className="py-4 w-full inline-flex items-center justify-between">
            <h3 className="text-neutral-900 font-medium text-sm">
              Building Name
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {dealDetail?.address?.building_name}
            </p>
          </div>
          <div className="py-4  w-full inline-flex items-center justify-between">
            <h3 className="text-neutral-900 font-medium text-sm">
              Street Address
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {dealDetail?.address?.street_address}
            </p>
          </div>
          <div className="py-6 border-b-[2px] border-b-neutral-200 border-t-[2px] border-t-neutral-200 w-full inline-flex items-center justify-between">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.table?.size}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {comaFormattedNumber(dealDetail?.size)} sqft
            </p>
          </div>
          <div className="pt-6 w-full inline-flex items-start justify-between flex-col">
            <h3 className="text-neutral-900 font-medium text-xl">
              {language?.v3?.table?.features}
            </h3>
            <aside className="mt-5 w-full">
              {dealDetail?.features?.bedrooms && (
                <div className="py-4  w-full inline-flex items-center justify-between">
                  <h3 className="text-neutral-900 font-medium text-sm">
                    {language?.v3?.deal?.beds}
                  </h3>
                  <p className="text-neutral-900 font-normal text-sm capitalize">
                    {dealDetail?.features?.bedrooms}
                  </p>
                </div>
              )}
              {dealDetail?.features?.kitchen && (
                <div className="py-4  w-full inline-flex items-center justify-between">
                  <h3 className="text-neutral-900 font-medium text-sm">
                    {language?.v3?.deal?.kitchen}
                  </h3>
                  <p className="text-neutral-900 font-normal text-sm capitalize">
                    {dealDetail?.features?.kitchen}
                  </p>
                </div>
              )}
              {dealDetail?.features?.washroom && (
                <div className="py-4  w-full inline-flex items-center justify-between">
                  <h3 className="text-neutral-900 font-medium text-sm">
                    {language?.v3?.deal?.washroom}
                  </h3>
                  <p className="text-neutral-900 font-normal text-sm capitalize">
                    {dealDetail?.features?.washroom}
                  </p>
                </div>
              )}
              {dealDetail?.features?.parking && (
                <div className="py-4  w-full inline-flex items-center justify-between">
                  <h3 className="text-neutral-900 font-medium text-sm">
                    {language?.v3?.deal?.parking}
                  </h3>
                  <p className="text-neutral-900 font-normal text-sm capitalize">
                    {dealDetail?.features?.parking}
                  </p>
                </div>
              )}
              {dealDetail?.features?.swimming_pool && (
                <div className="py-4 w-full inline-flex items-center justify-between">
                  <h3 className="text-neutral-900 font-medium text-sm">
                    {language?.v3?.deal?.swim}
                  </h3>
                  <p className="text-neutral-900 font-normal text-sm capitalize">
                    {dealDetail?.features?.swimming_pool}
                  </p>
                </div>
              )}
              {dealDetail?.features?.rental_amount && (
                <div className="py-4  w-full inline-flex items-center justify-between">
                  <h3 className="text-neutral-900 font-medium text-sm">
                    {language?.v3?.deal?.por_2}
                  </h3>
                  <p className="text-neutral-900 font-normal text-sm capitalize">
                    ${numberFormatter(dealDetail?.features?.rental_amount)} (
                    {dealDetail?.features?.rental_period})
                  </p>
                </div>
              )}
              {dealDetail?.description && (
                <div className="py-6 border-b-[2px]  border-b-neutral-200 border-t-[2px]  border-t-neutral-200 w-full inline-flex items-center justify-between">
                  <h3 className="text-neutral-900 font-medium text-sm">
                    Property Description
                  </h3>
                  <p className="text-neutral-900 font-normal ml-3 text-sm capitalize text-justify ">
                    {dealDetail?.description}
                  </p>
                </div>
              )}
              {dealDetail?.selling_price && (
                <div>
                  <div className="mt-10 mb-4">
                    <h2 className="text-black text-xl font-medium">
                      Selling Price
                    </h2>
                  </div>

                  <div className="py-6 border-b-[2px]  border-b-neutral-200 border-t-[2px]  border-t-neutral-200 w-full inline-flex items-center justify-between">
                    <h3 className="text-neutral-900 font-medium text-sm">
                      Price
                    </h3>
                    <p className="text-neutral-900 font-normal text-sm capitalize">
                      ${comaFormattedNumber(dealDetail?.valuation)} (
                      {dealDetail?.selling_price})
                    </p>
                  </div>
                </div>
              )}
              {dealDetail?.expected_dividend_yield &&
                dealDetail?.expected_annual_return && (
                  <div>
                    {" "}
                    <div className="mt-10 mb-4">
                      <h2 className="text-black text-xl font-medium">
                        Expected Return
                      </h2>
                    </div>
                    <div className="py-4  w-full inline-flex items-center justify-between">
                      <h3 className="text-neutral-900 font-medium text-sm">
                        {language?.v3?.deal?.expected_dividend_yield}
                      </h3>
                      <p className="text-neutral-900 font-normal text-sm capitalize">
                        {dealDetail?.expected_dividend_yield + "%" ||
                          language?.v3?.common?.not_added}
                      </p>
                    </div>
                    <div className="py-4  w-full inline-flex items-center justify-between">
                      <h3 className="text-neutral-900 font-medium text-sm">
                        {language?.v3?.deal?.expected_annual_return}
                      </h3>
                      <p className="text-neutral-900 font-normal text-sm capitalize">
                        {dealDetail?.expected_annual_return + "%" ||
                          language?.v3?.common?.not_added}
                      </p>
                    </div>
                  </div>
                )}
            </aside>
          </div>
        </section>
      );
    else return <div></div>;
  };

  return (
    <aside className="flex items-start justify-between mt-10 w-full gap-5">
      {dealDetail && getRoleBasedUI()}
      <section className="bg-white rounded-md border-[1px] border-neutral-200 px-6 py-4 w-1/4 min-h-[250px]">
        <h3 className="font-medium text-xl text-neutral-900 mb-4">
          {language?.v3?.deal?.status}
        </h3>
        <div className="relative flex flex-col justify-center">
          {React.Children.toArray(
            dummy.map((item: any, index: number) => {
              return (
                <div className="relative w-[30px] inline-flex items-center">
                  <span className="inline-flex items-center flex-col">
                    {item.completed && (
                      <img
                        src={ApprovedSVG}
                        alt="Approved"
                        className="h-[20px] w-[20px]"
                      />
                    )}
                    {!item.completed && item.ongoing && (
                      <div className="h-[20px] w-[20px] bg-neutral-200 rounded-full inline-grid place-items-center">
                        <div className="h-[12px] w-[12px] bg-cyan-800 rounded-full"></div>
                      </div>
                    )}
                    {!item.completed && !item.ongoing && (
                      <div className="h-[20px] w-[20px] bg-neutral-300 rounded-full inline-grid place-items-center"></div>
                    )}
                    {index !== dummy.length - 1 && (
                      <div className="h-[55px] w-1 bg-neutral-300"></div>
                    )}
                  </span>
                  <small className="absolute top-[2px] left-[80%] whitespace-nowrap text-xs font-medium text-neutral-500">
                    {item.title}
                  </small>
                </div>
              );
            })
          )}
        </div>
      </section>
    </aside>
  );
};
export default DealViewDetails;

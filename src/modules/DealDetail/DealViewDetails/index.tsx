import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import ApprovedSVG from "../../../assets/svg/approved.svg";
import {
  comaFormattedNumber,
  numberFormatter,
} from "../../../utils/object.utils";
import { KanzRoles } from "../../../enums/roles.enum";
import { DealCheckType } from "../../../enums/types.enum";
import { convertStatusLanguage } from "../../../utils/string.utils";

const DealViewDetails = ({ dealDetail, state }: any) => {
  const language: any = useSelector((state: RootState) => state.language.value);
  const event: any = useSelector((state: RootState) => state.event.value);
  const [showFullText, setShowFullText] = useState(false);
  function getTermDisplayName(term: any) {
    const termDisplayNames: any = {
      "MFN Only": language?.v3?.fundraiser?.mfn_only,
      "Pro Rata": language?.v3?.fundraiser?.pro_rata,
      "Discount": language?.v3?.fundraiser?.discount,
      "Minimum Check Size": language?.v3?.fundraiser?.min_check_size,
      "Additional Terms": language?.v3?.fundraiser?.additional_terms,
      "Valuation Cap": language?.v3?.fundraiser?.valuation_cap,
    };

    return termDisplayNames[term] || term;
  }

  function getTermValue(term: any) {
    if (term?.is_enabled) {
      if (term?.term === language?.v3?.fundraiser?.discount) {
        return `${term?.value}%` || language?.v3?.fundraiser?.yes;
      } else if (term?.term === language?.v3?.fundraiser?.min_check_size || term?.term === language?.v3?.fundraiser?.valuation_cap) {
        return term?.value && event === "ar"
          ? comaFormattedNumber(term?.value, DealCheckType.STARTUP, true)
          : comaFormattedNumber(term?.value, DealCheckType.STARTUP) ||
              language?.v3?.fundraiser?.yes;
      } else if (term?.term === language?.v3?.fundraiser?.additional_terms) {
        return term?.value
      }
       else {
        return language?.v3?.fundraiser?.yes;
      }
    } else {
      return language?.v3?.fundraiser?.no;
    }
  }

  const handleToggleText = () => {
    setShowFullText(!showFullText);
  };
  const description =
    dealDetail?.description || language?.v3?.common?.not_added;
  const dummy = [
    {
      id: 1,
      title: language?.v3?.fundraiser?.customer_rep,
      completed: true,
      ongoing: false,
    },
    {
      id: 2,
      title: language?.v3?.fundraiser?.compliance_officer,
      completed: false,
      ongoing: true,
    },
    {
      id: 3,
      title: language?.v3?.fundraiser?.approved,
      completed: false,
      ongoing: false,
    },
    {
      id: 4,
      title: language?.v3?.fundraiser?.live,
      completed: false,
      ongoing: false,
    },
  ];
  const orientation: any = useSelector(
    (state: RootState) => state.orientation.value
  );
  const getRoleBasedUI = () => {
    if (state === KanzRoles.STARTUP)
      return (
        <section className="flex items-start justify-center flex-col w-9/12 min-h-[250px]">
          <div className="mt-10 mb-4">
            <h2 className="text-black text-xl font-bold">
              {language?.v3?.fundraiser?.instrument}
            </h2>
          </div>
          <div className="py-4  border-b-neutral-200 w-full inline-flex items-center justify-between">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.deal?.instrument_type}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize px-4">
              {dealDetail?.instrument_type || language?.v3?.common?.not_added}
            </p>
          </div>
          {dealDetail?.equity_type ? (
            <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
              <h3 className="text-neutral-900 font-medium text-sm">
                {language?.v3?.deal?.equity_type}
              </h3>
              <p className="text-neutral-900 font-normal text-sm capitalize px-4">
                {dealDetail?.equity_type || language?.v3?.common?.not_added}
              </p>
            </div>
          ) : (
            <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
              <h3 className="text-neutral-900 font-medium text-sm">
                {language?.v3?.fundraiser?.safe_type}
              </h3>
              <p className="text-neutral-900 font-normal text-sm capitalize px-4">
                {dealDetail?.safe_type || language?.v3?.common?.not_added}
              </p>
            </div>
          )}
          {dealDetail?.equity_type && (
            <React.Fragment>
              {" "}
              <div className="mt-10 mb-4">
                <h2 className="text-black text-xl font-bold">
                  {language?.v3?.table?.stage}
                </h2>
              </div>
              <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
                <h3 className="text-neutral-900 font-medium text-sm">
                  {language?.v3?.fundraiser?.what_round_is_this}
                </h3>
                <p className="text-neutral-900 font-normal text-sm capitalize px-4">
                  {dealDetail?.stage || language?.v3?.common?.not_added}
                </p>
              </div>
            </React.Fragment>
          )}

          <div className="mt-10 mb-4">
            <h2 className="text-black text-xl font-bold">
              {language?.v3?.table?.title}
            </h2>
          </div>
          <div className="py-4  border-b-neutral-200 w-full inline-flex items-center justify-between">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.fundraiser?.startup_title}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize px-4">
              {dealDetail?.title || language?.v3?.common?.not_added}
            </p>
          </div>
          <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
            <h3 className="text-neutral-900 font-medium text-sm w-full  whitespace-nowrap">
              {language?.v3?.fundraiser?.startup_desc}
            </h3>
            <p
              className={`text-neutral-900 text-xs capitalize ${
                showFullText
                  ? "whitespace-pre-line"
                  : "text-ellipsis overflow-hidden max-w-[500px] whitespace-nowrap"
              } flex-wrap cursor-pointer`}
              onClick={handleToggleText}
            >
              {description}
            </p>
          </div>
          <div className="mt-10 mb-4">
            <h2 className="text-black text-xl font-bold">
              {language?.v3?.fundraiser?.deal_target}
            </h2>
          </div>
          <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.fundraiser?.deal_target}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize px-4">
              {event === "ar"
                ? comaFormattedNumber(
                    dealDetail?.selling_price,
                    DealCheckType.STARTUP,
                    true
                  )
                : comaFormattedNumber(
                    dealDetail?.selling_price,
                    DealCheckType.STARTUP,
                    false
                  )}
            </p>
          </div>
          {dealDetail?.equity_type && (
            <React.Fragment>    
              <div className="mt-10 mb-4">
                <h2 className="text-black text-xl font-bold">{"Valuation"}</h2>
              </div>
              <div className="py-4  border-b-neutral-200 w-full inline-flex items-center justify-between">
                <h3 className="text-neutral-900 font-medium text-sm">
                  {language?.v3?.table?.valuation}
                </h3>
                <p className="text-neutral-900 font-normal text-sm capitalize px-4">
                  {event === "ar"
                    ? comaFormattedNumber(
                        dealDetail?.valuation,
                        DealCheckType.STARTUP,
                        true
                      )
                    : comaFormattedNumber(
                        dealDetail?.valuation,
                        DealCheckType.STARTUP,
                        false
                      ) || language?.v3?.common?.not_added}
                </p>
              </div>
              <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
                <h3 className="text-neutral-900 font-medium text-sm">
                  {language?.v3?.fundraiser?.type}
                </h3>
                <p className="text-neutral-900 font-normal text-sm capitalize px-4">
                  {dealDetail?.valuation_type ||
                    language?.v3?.common?.not_added}
                </p>
              </div>
            </React.Fragment>
          )}
          <div className="mt-10 mb-4">
            <h2 className="text-black text-xl font-bold">
              {language?.v3?.fundraiser?.deal_timeline}
            </h2>
          </div>
          <div className="py-4  border-b-neutral-200 w-full inline-flex items-center justify-between">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.fundraiser?.start_date}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize px-4">
              {dealDetail?.start_at || language?.v3?.common?.not_added}
            </p>
          </div>
          <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.fundraiser?.end_date}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize px-4">
              {dealDetail?.end_at || language?.v3?.common?.not_added}
            </p>
          </div>
          <div className="mt-10 mb-4">
            <h2 className="text-black text-xl font-bold">
              {language?.v3?.fundraiser?.terms}
            </h2>
          </div>
          {dealDetail?.safe_type && (
            <React.Fragment>
              {dealDetail.terms && (
                <div className="w-full">
                  {dealDetail.terms.map((term: any, index: any) => (
                    <div
                      key={index}
                      className="py-4 border-b-neutral-200 w-full inline-flex items-center justify-between"
                    >
                      <h3 className="text-neutral-900 font-medium text-sm">
                        {getTermDisplayName(term.term)}
                      </h3>
                      <p className="text-neutral-900 font-normal text-sm capitalize px-4">
                        {getTermValue(term)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </React.Fragment>
          )}

          {dealDetail?.equity_type && (
            <React.Fragment>
              {dealDetail.terms && (
                <div className="w-full">
                  {dealDetail.terms.map((term: any, index: any) => (
                    <div
                      key={index}
                      className="py-4 border-b-neutral-200 w-full inline-flex items-center justify-between"
                    >
                      <h3 className="text-neutral-900 font-medium text-sm">
                        {getTermDisplayName(term.term)}
                      </h3>
                      <p className="text-neutral-900 font-normal text-sm capitalize px-4">
                        {getTermValue(term)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </React.Fragment>
          )}
        </section>
      );
    else if (state === KanzRoles.PROPERTY_OWNER)
      return (
        <section className="flex items-start justify-center flex-col w-9/12 min-h-[250px]">
          <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.table?.title}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize px-4">
              {dealDetail?.title || language?.v3?.common?.not_added}
            </p>
          </div>
          <div className="mt-10 mb-4">
            <h2 className="text-black text-xl font-medium">
              {language?.v3?.fundraiser?.location}
            </h2>
          </div>
          <div className="py-4  w-full inline-flex items-center justify-between">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.fundraiser?.country}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize px-4">
              {dealDetail?.address?.country_name}
            </p>
          </div>
          <div className="py-4  w-full inline-flex items-center justify-between">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.fundraiser?.state}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize px-4">
              {dealDetail?.address?.state}
            </p>
          </div>
          <div className="py-4  w-full inline-flex items-center justify-between">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.fundraiser?.city}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize px-4">
              {dealDetail?.address?.city}
            </p>
          </div>
          <div className="py-4  w-full inline-flex items-center justify-between">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.fundraiser?.area}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize px-4">
              {dealDetail?.address?.area}
            </p>
          </div>
          <div className="py-4 w-full inline-flex items-center justify-between">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.fundraiser?.building_name}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize px-4">
              {dealDetail?.address?.building_name}
            </p>
          </div>
          <div className="py-4  w-full inline-flex items-center justify-between">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.fundraiser?.street_address}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize px-4">
              {dealDetail?.address?.street_address}
            </p>
          </div>
          <div className="py-6 border-b-[2px] border-b-neutral-200 border-t-[2px] border-t-neutral-200 w-full inline-flex items-center justify-between">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.table?.size}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize px-4">
              {comaFormattedNumber(dealDetail?.size)}{" "}
              {language?.v3?.common?.sqft}
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
                  <p className="text-neutral-900 font-normal text-sm capitalize px-4">
                    {dealDetail?.features?.bedrooms}
                  </p>
                </div>
              )}
              {dealDetail?.features?.kitchen && (
                <div className="py-4  w-full inline-flex items-center justify-between">
                  <h3 className="text-neutral-900 font-medium text-sm">
                    {language?.v3?.deal?.kitchen}
                  </h3>
                  <p className="text-neutral-900 font-normal text-sm capitalize px-4">
                    {dealDetail?.features?.kitchen}
                  </p>
                </div>
              )}
              {dealDetail?.features?.washroom && (
                <div className="py-4  w-full inline-flex items-center justify-between">
                  <h3 className="text-neutral-900 font-medium text-sm">
                    {language?.v3?.deal?.washroom}
                  </h3>
                  <p className="text-neutral-900 font-normal text-sm capitalize px-4">
                    {dealDetail?.features?.washroom}
                  </p>
                </div>
              )}
              {dealDetail?.features?.parking && (
                <div className="py-4  w-full inline-flex items-center justify-between">
                  <h3 className="text-neutral-900 font-medium text-sm">
                    {language?.v3?.deal?.parking}
                  </h3>
                  <p className="text-neutral-900 font-normal text-sm capitalize px-4">
                    {dealDetail?.features?.parking}
                  </p>
                </div>
              )}
              {dealDetail?.features?.swimming_pool && (
                <div className="py-4 w-full inline-flex items-center justify-between">
                  <h3 className="text-neutral-900 font-medium text-sm">
                    {language?.v3?.deal?.swim}
                  </h3>
                  <p className="text-neutral-900 font-normal text-sm capitalize px-4">
                    {dealDetail?.features?.swimming_pool}
                  </p>
                </div>
              )}
              {dealDetail?.features?.rental_amount && (
                <div className="py-4  w-full inline-flex items-center justify-between">
                  <h3 className="text-neutral-900 font-medium text-sm">
                    {language?.v3?.deal?.por_2}
                  </h3>
                  <p className="text-neutral-900 font-normal text-sm capitalize px-4">
                    {event === "ar"
                      ? comaFormattedNumber(
                          dealDetail?.features?.rental_amount,
                          DealCheckType.PROPERTY,
                          true
                        )
                      : comaFormattedNumber(
                          dealDetail?.features?.rental_amount,
                          DealCheckType.PROPERTY,
                          false
                        )}{" "}
                    ({dealDetail?.features?.rental_period})
                  </p>
                </div>
              )}
              {dealDetail?.description && (
                <div className="py-6 border-b-[2px]  border-b-neutral-200 border-t-[2px]  border-t-neutral-200 w-full inline-flex items-center justify-between">
                  <h3 className="text-neutral-900 font-medium text-sm">
                    {language?.v3?.fundraiser?.property_description}
                  </h3>
                  <p
                    className={`text-neutral-900 text-xs capitalize ${
                      showFullText
                        ? "whitespace-pre-line"
                        : "text-ellipsis overflow-hidden max-w-[500px] whitespace-nowrap"
                    } flex-wrap cursor-pointer`}
                    onClick={handleToggleText}
                  >
                    {description}
                  </p>
                </div>
              )}
              <div className="mt-10 mb-4">
                <h2 className="text-black text-xl font-bold">
                  {language?.v3?.fundraiser?.deal_timeline}
                </h2>
              </div>
              <div className="py-4  border-b-neutral-200 w-full inline-flex items-center justify-between">
                <h3 className="text-neutral-900 font-medium text-sm">
                  {language?.v3?.fundraiser?.start_date}
                </h3>
                <p className="text-neutral-900 font-normal text-sm capitalize px-4">
                  {dealDetail?.start_at || language?.v3?.common?.not_added}
                </p>
              </div>
              <div className="py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between">
                <h3 className="text-neutral-900 font-medium text-sm">
                  {language?.v3?.fundraiser?.end_date}
                </h3>
                <p className="text-neutral-900 font-normal text-sm capitalize px-4">
                  {dealDetail?.end_at || language?.v3?.common?.not_added}
                </p>
              </div>
              {dealDetail?.selling_price && (
                <div>
                  <div className="mt-10 mb-4">
                    <h2 className="text-black text-xl font-medium">
                      {language?.v3?.fundraiser?.selling_price}
                    </h2>
                  </div>

                  <div className="py-6 border-b-neutral-200 border-t-[2px]  border-t-neutral-200 w-full inline-flex items-center justify-between">
                    <h3 className="text-neutral-900 font-medium text-sm">
                      {language?.v3?.fundraiser?.price}
                    </h3>
                    <p className="text-neutral-900 font-normal text-sm capitalize px-4">
                      {event === "ar"
                        ? comaFormattedNumber(
                            dealDetail?.selling_price,
                            DealCheckType.PROPERTY,
                            true
                          )
                        : comaFormattedNumber(
                            dealDetail?.selling_price,
                            DealCheckType.PROPERTY,
                            false
                          )}
                    </p>
                  </div>
                </div>
              )}
              {dealDetail?.expected_dividend_yield !== 0.0 &&
                dealDetail?.expected_dividend_yield &&
                dealDetail?.expected_annual_return !== 0.0 &&
                dealDetail?.expected_annual_return && (
                  <div className="border-t-[2px]  border-b-neutral-200">
                    <div className="mt-10 mb-4">
                      <h2 className="text-black text-xl font-medium">
                        {language?.v3?.fundraiser?.expected_return}
                      </h2>
                    </div>
                    <div className="py-4  w-full inline-flex items-center justify-between">
                      <h3 className="text-neutral-900 font-medium text-sm">
                        {language?.v3?.deal?.expected_dividend_yield}
                      </h3>
                      <p className="text-neutral-900 font-normal text-sm capitalize px-4">
                        {dealDetail?.expected_dividend_yield + "%" ||
                          language?.v3?.common?.not_added}
                      </p>
                    </div>
                    <div className="py-4  w-full inline-flex items-center justify-between">
                      <h3 className="text-neutral-900 font-medium text-sm">
                        {language?.v3?.deal?.expected_annual_return}
                      </h3>
                      <p className="text-neutral-900 font-normal text-sm capitalize px-4">
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
          {language?.v3?.deal.status}
        </h3>
        <div className="relative flex flex-col justify-center">
          {React.Children.toArray(
            dummy.map((item: any, index: number) => {
              return (
                <div className="relative w-[30px] inline-flex items-center">
                  <span className="inline-flex items-center flex-col">
                    {convertStatusLanguage(dealDetail?.status) === "live" && (
                      <img
                        src={ApprovedSVG}
                        alt="Approved"
                        className="h-[20px] w-[20px]"
                      />
                    )}
                    {convertStatusLanguage(dealDetail?.status) ===
                      "submitted" &&
                      (index === 0 ? (
                        <div className="h-[20px] w-[20px] bg-neutral-200 rounded-full inline-grid place-items-center">
                          <div className="h-[12px] w-[12px] bg-cyan-800 rounded-full"></div>
                        </div>
                      ) : index === 1 || index === 2 || index === 3 ? (
                        <div className="h-[20px] w-[20px] bg-neutral-300 rounded-full inline-grid place-items-center"></div>
                      ) : null)}
                    {convertStatusLanguage(dealDetail?.status) === "draft" ||
                      (convertStatusLanguage(dealDetail?.status) ===
                        "reopened" && (
                        <div className="h-[20px] w-[20px] bg-neutral-300 rounded-full inline-grid place-items-center"></div>
                      ))}

                    {convertStatusLanguage(dealDetail?.status) === "verified" &&
                      (index === 0 ? (
                        <img
                          src={ApprovedSVG}
                          alt="Approved"
                          className="h-[20px] w-[20px]"
                        />
                      ) : index === 1 ? (
                        <div className="h-[20px] w-[20px] bg-neutral-200 rounded-full inline-grid place-items-center">
                          <div className="h-[12px] w-[12px] bg-cyan-800 rounded-full"></div>
                        </div>
                      ) : index === 2 ? (
                        <div className="h-[20px] w-[20px] bg-neutral-300 rounded-full inline-grid place-items-center"></div>
                      ) : index === 3 ? (
                        <div className="h-[20px] w-[20px] bg-neutral-300 rounded-full inline-grid place-items-center"></div>
                      ) : null)}
                    {convertStatusLanguage(dealDetail?.status) === "approved" &&
                      (index === 0 ? (
                        <img
                          src={ApprovedSVG}
                          alt="Approved"
                          className="h-[20px] w-[20px]"
                        />
                      ) : index === 1 ? (
                        <img
                          src={ApprovedSVG}
                          alt="Approved"
                          className="h-[20px] w-[20px]"
                        />
                      ) : index === 2 ? (
                        <img
                          src={ApprovedSVG}
                          alt="Approved"
                          className="h-[20px] w-[20px]"
                        />
                      ) : index === 3 ? (
                        <div className="h-[20px] w-[20px] bg-neutral-300 rounded-full inline-grid place-items-center"></div>
                      ) : null)}
                    {index !== dummy.length - 1 && (
                      <div className="h-[55px] w-1 bg-neutral-300"></div>
                    )}
                  </span>
                  <small
                    className={`absolute top-[2px] ${
                      orientation === "rtl" ? "right-[80%]" : "left-[80%]"
                    } whitespace-nowrap text-xs font-medium text-neutral-500`}
                  >
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

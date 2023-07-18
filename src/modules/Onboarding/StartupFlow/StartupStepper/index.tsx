import React, { useState, useLayoutEffect, useRef } from "react";
import Chevrond from "../../../../ts-icons/chevrond.svg";
import HoverModal from "../../../../shared/components/HoverModal";
import FileUpload from "../../../../shared/components/FileUpload";
import SampleImage from "../../../../assets/example_id.png";
import SampleImage_2 from "../../../../assets/example_id_2.png";
import CountrySelector from "../../../../shared/components/CountrySelector";
import { getAllIndustries } from "../../../../apis/bootstrap.api";
import Selector from "../../../../shared/components/Selector";
import CrossIcon from "../../../../ts-icons/crossIcon.svg";
import SearchedItems from "../../../../shared/components/SearchedItems";
import EditIcon from "../../../../ts-icons/editIcon.svg";
import Loader from "../../../../shared/views/Loader";

const currencies = [{ label: "AED", value: "AED" }, { label: "USD", value: "USD" }];

const StartupStepper = ({ load, event, countries, orientation, language, file, payload, onSetPayload, step, removeFile, setFile, setModalOpen, setFileType, authToken }: any) => {
    const refInd: any = useRef(null);
    const [showHoverModal, setShowHoverModal] = useState(false);
    const [search, setSearch] = useState("");
    const [showData, setShowData] = useState(false);
    const [searchResults, setSearchResults]: any = useState([]);

    useLayoutEffect(() => {
        bootstrapData();
    }, []);

    useLayoutEffect(() => {
        const handleClickOutside = (event: any) => {
            if (refInd.current && !refInd.current.contains(event.target)) {
                setShowData(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);



    const bootstrapData = async () => {
        try {
            let { status, data } = await getAllIndustries(authToken);
            if (status === 200) {
                setSearchResults(data.status.data);
            }
        } catch (error) {
            console.error("Error in industries: ", error);
        }
    };

    const filteredData: any = [];
    if (searchResults.length > 0 && payload?.market) {
        searchResults?.filter((item: any) => {
            payload?.market?.map((market: any) => {
                if (market === item.id) {
                    filteredData.push(item);
                }
            });
        });
    }

    const startupUI = () => {
        return step === 1 ? (
          <section className="flex items-start justify-center flex-col">
            <form className="pt-8 mb-4 w-full">
              <div className="mb-8 relative">
                <label
                  className="block text-neutral-700 text-sm font-medium mb-1"
                  htmlFor="comp"
                >
                  {language.company.compName}
                </label>
                <input
                  id="comp"
                  value={payload?.company}
                  onChange={(e) => onSetPayload(e.target.value, "company")}
                  placeholder={language.company.compName}
                  className=" h-[42px] shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                />
              </div>

              <div className="mb-8 relative">
                <label
                  className="block text-neutral-700 text-sm font-medium mb-1"
                  htmlFor="legal"
                >
                  {language.company.legal}
                </label>
                <input
                  id="legal"
                  value={payload?.legal}
                  onChange={(e) => onSetPayload(e.target.value, "legal")}
                  placeholder={language.company.legal}
                  className=" h-[42px] shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                />
              </div>

              <div className="mb-8 w-full" ref={refInd}>
                <label
                  className="block text-neutral-700 text-sm font-medium mb-1"
                  htmlFor="market"
                >
                  {language.company.market}
                </label>
                <span className="relative">
                  <input
                    id="market"
                    autoComplete="off"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onClick={() => setShowData(!showData)}
                    className="h-[42px] shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                  />
                  <span
                    className={`absolute top-[0px] flex items-center pr-2 pointer-events-none ${
                      orientation === "rtl" ? "left-1" : "right-0"
                    }`}
                    style={{ zIndex: 99 }}
                  >
                    <Chevrond stroke="#737373" />
                  </span>
                </span>
                {payload?.market && payload.market.length > 0 && (
                  <aside className="inline-flex gap-2 flex-wrap min-h-[42px] shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline">
                    {React.Children.toArray(
                      filteredData.map((ind: any) => (
                        <div className="check-background rounded-[4px] px-1 py-[2px] inline-flex items-center">
                          <small>{ind[event]?.name}</small>
                          <CrossIcon
                            onClick={() => {
                              let payloadItems = filteredData.filter(
                                (x: any) => x.id !== ind.id
                              );
                              onSetPayload(
                                payloadItems.map((item: any) => item.id),
                                "market"
                              );
                            }}
                            className="cursor-pointer h-5 w-5 ml-1"
                            stroke={"#828282"}
                          />
                        </div>
                      ))
                    )}
                  </aside>
                )}
                {showData && (
                  <SearchedItems
                    items={searchResults}
                    searchString={search}
                    passItemSelected={(it: any) => {
                      let payloadItems = [...payload.market];
                      payloadItems.push(it.id);
                      onSetPayload(Array.from(new Set(payloadItems)), "market");
                    }}
                  />
                )}
              </div>

              <div className="mb-8 w-full relative" style={{ zIndex: 90 }}>
                <label
                  className="block text-neutral-700 text-sm font-medium mb-1"
                  htmlFor="full-name"
                >
                  {language?.company?.country}
                </label>

                <CountrySelector
                  onChange={(v: any) => {
                    let c = countries.all.find(
                      (c: any) => c[event].name === v.value
                    );
                    onSetPayload(c, "country");
                  }}
                  selectedValue={{
                    label: payload?.country?.name,
                    value: payload?.country?.name,
                  }}
                  allCountries={countries.names}
                  value={payload?.country?.name}
                  defaultValue={{
                    label: payload?.country?.name,
                    value: payload?.country?.name,
                  }}
                />
              </div>

              <div className="mb-8 relative">
                <label
                  className="block text-neutral-700 text-sm font-medium mb-1"
                  htmlFor="link"
                >
                  {language.company.compWeb}
                </label>
                <div className="relative inline-flex w-full">
                  <input
                    type="disabled"
                    value={"https://"}
                    className={`text-neutral-500 text-base font-normal check-background border-t border-b border-neutral-300 h-[42px] w-[70px] ${
                      orientation === "rtl"
                        ? "border-r rounded-br-md rounded-tr-md pr-2"
                        : "border-l rounded-bl-md rounded-tl-md pl-2"
                    }`}
                  />
                  <input
                    id="link"
                    value={payload?.web}
                    onChange={(e) => onSetPayload(e.target.value, "web")}
                    placeholder="www.example.com"
                    className={`h-[42px] shadow-sm appearance-none border border-neutral-300 w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline ${
                      orientation === "rtl"
                        ? " rounded-bl-md rounded-tl-md"
                        : " rounded-br-md rounded-tr-md"
                    }`}
                    type="text"
                  />
                </div>
              </div>

              <div className="mb-8 relative">
                <label
                  className="block text-neutral-700 text-sm font-medium mb-1"
                  htmlFor="legal"
                >
                  {language.company.address}
                </label>
                <input
                  id="legal"
                  value={payload?.address}
                  onChange={(e) => onSetPayload(e.target.value, "address")}
                  placeholder={language.company.address}
                  className=" h-[42px] shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                />
              </div>
            </form>
          </section>
        ) : (
          <section className="flex items-start justify-center flex-col">
            <form className="pt-8 mb-4 w-full">
              <div
                key={1}
                className={`mb-4 w-full select-none content-center ${payload.logo ?'bg-cbc-grey-sec p-4 rounded-md' :''}`}
              >
                <div className="block text-neutral-700 text-base font-medium">
                  <span className="inline-flex w-full items-center justify-between">
                    <span className="inline-flex flex-col">
                        
                      <div>{language.syndicate.logo}</div>
                      <div className="block">
                      <small className="text-neutral-500 font-normal">{language.company.uploadCompLogo}</small>

                      <small className="relative font-normal text-cc-blue cursor-pointer" onMouseEnter={() => setShowHoverModal(true)} onMouseLeave={() => setShowHoverModal(false)}>
                                &nbsp;<span>{language.common.example}</span>
                                {showHoverModal && (
                                    <HoverModal>
                                        <section className="inline-flex flex-row items-center justify-evenly h-full">
                                            <img src={SampleImage_2} alt={language.syndicate.logo} className="max-h-[90px]" />
                                            <img src={SampleImage} alt={language.syndicate.logo} className="max-h-[140px]" />
                                        </section>
                                    </HoverModal>
                                )}
                            </small>
                            </div>
                    </span>
                   {payload.logo && typeof payload.logo === "string" &&  <EditIcon
                      stroke="#fff"
                      className="w-7 h-7 float-right cursor-pointer rounded-md p-1"
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.078)",
                      }}
                      onClick={() => onSetPayload(null, "logo")}
                    />}
                  </span>
                  <div className="content-center text-center mt-2  main-embed  h-[200px] overflow-hidden relative">
                    {payload.logo && typeof payload.logo === "string" ? (
                      <img
                        alt="Logo"
                        src={payload.logo}
                        // src={
                        //   "https://images.unsplash.com/photo-1686668108582-5c7074494753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                        // }
                        className="block w-[110%] h-[110%] overflow-hidden object-contain"
                      />
                    ) : (
                      <FileUpload
                        uploadDirect={false}
                        id={"logo"}
                        title={"Logo"}
                        file={file}
                        setFile={setFile}
                        removeFile={removeFile}
                        setModalOpen={(e: any) => {
                          setModalOpen(e.open ? e.url : null);
                          e.type && setFileType(e.type);
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-8 relative">
                <label
                  className="block text-neutral-700 text-sm font-medium mb-1"
                  htmlFor="biz"
                >
                  {language.company.descBusQues}
                </label>
                <textarea
                  id="biz"
                  value={payload?.business}
                  onChange={(e) => onSetPayload(e.target.value, "business")}
                  placeholder={language.company.descBus}
                  className=" h-[100px] shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                ></textarea>
              </div>

              <div className="mb-8 relative">
                <section className="w-full mt-2 p-[18px] rounded-lg check-background border border-grey">
                  <h3 className="block text-neutral-700 text-sm font-medium mb-1">
                    {language.company.ceoDet}
                  </h3>
                  <div className="mt-5">
                    <input
                      value={payload?.name}
                      onChange={(e) => onSetPayload(e.target.value, "name")}
                      placeholder={language.company.name}
                      className=" h-[42px] shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                    />
                  </div>
                  <div className="mt-3">
                    <input
                      value={payload?.email}
                      onChange={(e) => onSetPayload(e.target.value, "email")}
                      placeholder={language.company.dummyemail}
                      className=" h-[42px] shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                    />
                  </div>
                </section>
              </div>

              <div className="mb-8 relative">
                <label className="block text-neutral-700 text-sm font-medium mb-1">
                  {language.common.selectCurrency}
                </label>
                <Selector
                  options={currencies}
                  value={payload.currency}
                  onChange={(item: any) => {
                    onSetPayload(item, "currency");
                  }}
                />
              </div>

              <div className="mb-8 relative inline-flex w-full flex-col">
                <label
                  className="block text-neutral-700 text-sm font-medium mb-1"
                  htmlFor="raised"
                >
                  {language.company.capRaised}
                </label>
                <span className="inline-flex flex-row">
                  <input
                    id="raised"
                    value={payload?.raised}
                    onChange={(e) => {
                      const enteredValue = e.target.value;
                      const numericValue = enteredValue.replace(/[^0-9]/g, "");
                      onSetPayload(numericValue, "raised");
                    }}
                    placeholder={language.company.addCapRaise}
                    className={`h-[42px] shadow-sm appearance-none border border-neutral-300 w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline ${
                      orientation === "rtl"
                        ? "rounded-br-md rounded-tr-md"
                        : "rounded-bl-md rounded-tl-md"
                    }`}
                    type="text"
                  />
                  <input
                    type="disabled"
                    value={payload.currency.value}
                    className={`text-neutral-500 text-base font-normal check-background border-t border-b border-neutral-300 h-[42px] w-[70px] ${
                      orientation === "rtl"
                        ? "pr-4 border-l rounded-bl-md rounded-tl-md"
                        : "pl-4 border-r rounded-br-md rounded-tr-md"
                    }`}
                  />
                </span>
              </div>

              <div className="mb-8 relative inline-flex w-full flex-col">
                <label
                  className="block text-neutral-700 text-sm font-medium mb-1"
                  htmlFor="target"
                >
                  {language.company.capTarget}
                </label>
                <span className="inline-flex flex-row">
                  <input
                    id="target"
                    value={payload?.target}
                    onChange={(e) => {
                      const enteredValue = e.target.value;
                      const numericValue = enteredValue.replace(/[^0-9]/g, "");
                      onSetPayload(numericValue, "target");
                    }}
                    placeholder={language.company.addCapTarget}
                    className={`h-[42px] shadow-sm appearance-none border border-neutral-300 w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline ${
                      orientation === "rtl"
                        ? "rounded-br-md rounded-tr-md"
                        : "rounded-bl-md rounded-tl-md"
                    }`}
                    type="text"
                  />
                  <input
                    type="disabled"
                    value={payload.currency.value}
                    className={`text-neutral-500 text-base font-normal check-background border-t border-b border-neutral-300 h-[42px] w-[70px] ${
                      orientation === "rtl"
                        ? "pr-4 border-l rounded-bl-md rounded-tl-md"
                        : "pl-4 border-r rounded-br-md rounded-tr-md"
                    }`}
                  />
                </span>
              </div>
            </form>
          </section>
        );
    };
    return (
        load ? <Loader /> : startupUI()
    )
}

export default StartupStepper;
import { useState, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCountries } from "../../../../apis/countries.api";
import { saveToken } from "../../../../redux-toolkit/slicer/auth.slicer";
import HoverModal from "../../../../shared/components/HoverModal";
import FileUpload from "../../../../shared/components/FileUpload";
import SampleImage from "../../../../assets/example_id.png";
import SampleImage_2 from "../../../../assets/example_id_2.png";
import CountrySelector from "../../../../shared/components/CountrySelector";
import Selector from "../../../../shared/components/Selector";
import { getAllIndustries } from "../../../../apis/fakeData.api";

const StartupStepper = ({ language, payload, onSetPayload, authToken, step, removeFile, setFile, setModalOpen, setFileType }: any) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showHoverModal, setShowHoverModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [countries, setCountries] = useState({ all: [], names: [] });
    const [industries, setIndustries] = useState([]);

    useLayoutEffect(() => {
        getAllCountries();
        bootstrapData();
    }, []);

    const getAllCountries = async () => {
        setLoading(true);
        try {
            let { status, data } = await getCountries(authToken);
            if (status === 200) {
                let names = data.status.data.map((c: any) => c.name);
                setCountries({ all: data.status.data, names });
            }
        } catch (error: any) {
            console.error("Error in countries: ", error);
            if (error.response && error.response.status === 401) {
                dispatch(saveToken(""));
                navigate("/login", { state: "complete-details" });
            }
        } finally {
            setLoading(false);
        }
    };

    const bootstrapData = async () => {
        try {
            let industryRes: any = await getAllIndustries();
            if (industryRes.status === 200) {
                let data = industryRes.data.business.map((item: any) => { return { label: item.name, value: item.name } })
                setIndustries(data);
            }
        } catch (error) {
            console.error("Error in industries: ", error);
        }
    };

    return (
        step === 1 ? (
            <section className="flex items-start justify-center flex-col">
                <form className="pt-12 mb-4 w-full">
                    <div className="mb-8 relative">
                        <label className="block text-neutral-700 text-sm font-medium" htmlFor="comp">{language.company.compName}</label>
                        <input id="comp" value={payload?.company} onChange={(e) => onSetPayload(e.target.value, "company")} placeholder={language.company.compName} className=" h-[42px] shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline" type="text" />
                    </div>

                    <div className="mb-8 relative">
                        <label className="block text-neutral-700 text-sm font-medium" htmlFor="legal">{language.company.legal}</label>
                        <input id="legal" value={payload?.legal} onChange={(e) => onSetPayload(e.target.value, "legal")} placeholder={language.company.legal} className=" h-[42px] shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline" type="text" />
                    </div>

                    <div className="mb-8 w-full">
                        <label className="block text-neutral-700 text-sm font-medium" htmlFor="full-name" >
                            {language?.company?.market}
                        </label>
                        <Selector
                            onChange={(v: any) => onSetPayload(v.value, "market")}
                            options={industries}
                            defaultValue={{label: payload.market, value: payload.market} || ""}
                        />
                    </div>

                    <div className="mb-8 w-full relative" style={{ zIndex: 90 }}>
                        <label className="block text-neutral-700 text-sm font-medium" htmlFor="full-name" >
                            {language?.company?.country}
                        </label>
                        <CountrySelector
                            onChange={(v: any) => onSetPayload(countries.all.find((c:any) => c.name === v.value), "country")}
                            selectedValue={{label: payload?.country?.name, value: payload?.country?.name}}
                            allCountries={countries.names}
                            value={payload?.country?.name || ""}
                            defaultValue={{label: payload?.country?.name, value: payload?.country?.name} || ""}
                        />
                    </div>

                    <div className="mb-8 relative">
                        <label className="block text-neutral-700 text-sm font-medium" htmlFor="link">{language.company.compWeb}</label>
                        <div className="relative inline-flex w-full">
                            <input type="disabled" value={"https://"} className="text-neutral-500 text-base font-normal check-background border-l border-t border-b border-neutral-300 pl-2 rounded-bl-md rounded-tl-md h-[42px] w-[70px]" />
                            <input id="link" value={payload?.web} onChange={(e) => onSetPayload(e.target.value, "web")} placeholder="www.example.com" className=" h-[42px] shadow-sm appearance-none border border-neutral-300 rounded-br-md rounded-tr-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline" type="text" />
                        </div>
                    </div>

                    <div className="mb-8 relative">
                        <label className="block text-neutral-700 text-sm font-medium" htmlFor="legal">{language.company.address}</label>
                        <input id="legal" value={payload?.address} onChange={(e) => onSetPayload(e.target.value, "address")} placeholder={language.company.address} className=" h-[42px] shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline" type="text" />
                    </div>
                </form>
            </section>
        ) : (
            <section className="flex items-start justify-center flex-col">
                <form className="pt-12 mb-4 w-full">
                    <div className="mb-8 w-full">
                        <div className="text-neutral-700 text-sm font-medium">{language.syndicate.logo}</div>
                        <small className="text-neutral-500 font-normal">{language.syndicate.uploadCompLogo}</small>
                        <small className="relative font-normal color-blue cursor-pointer" onMouseEnter={() => setShowHoverModal(true)} onMouseLeave={() => setShowHoverModal(false)}>
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
                        <FileUpload id={'logo'} setFile={setFile} removeFile={removeFile} setModalOpen={(e: any) => {
                            setModalOpen(e.open ? e.url : null);
                            e.type && setFileType(e.type);
                        }} />
                    </div>

                    <div className="mb-8 relative">
                        <label className="block text-neutral-700 text-sm font-medium" htmlFor="biz">{language.company.descBusQues}</label>
                        <textarea id="biz" value={payload?.business} onChange={(e) => onSetPayload(e.target.value, "business")} placeholder={language.company.descBus} className=" h-[100px] shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                    </div>

                    <div className="mb-8 relative">
                        <section className="w-full mt-2 p-[18px] rounded-lg check-background border border-grey">
                            <h3 className="block text-neutral-700 text-sm font-medium">{language.company.ceoDet}</h3>
                            <small className="font-normal text-sm text-neutral-500">{language.company.ceoDetSub}</small>
                            <div className="mt-5">
                                <input value={payload?.name} onChange={(e) => onSetPayload(e.target.value, "name")} placeholder={language.company.name} className=" h-[42px] shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline" type="text" />
                            </div>
                            <div className="mt-3">
                                <input value={payload?.email} onChange={(e) => onSetPayload(e.target.value, "email")} placeholder={language.company.dummyemail} className=" h-[42px] shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline" type="text" />
                            </div>
                        </section>
                    </div>

                    <div className="mb-8 relative">
                        <label className="block text-neutral-700 text-sm font-medium" htmlFor="raised">{language.company.capRaised}</label>
                        <input id="raised" value={payload?.raised} onChange={(e) => onSetPayload(e.target.value, "raised")} placeholder={language.company.addCapRaise} className=" h-[42px] shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline" type="text" />
                    </div>

                    <div className="mb-8 relative">
                        <label className="block text-neutral-700 text-sm font-medium" htmlFor="target">{language.company.capTarget}</label>
                        <input id="target" value={payload?.target} onChange={(e) => onSetPayload(e.target.value, "target")} placeholder={language.company.addCapTarget} className=" h-[42px] shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline" type="text" />
                    </div>
                </form>
            </section>
        )
    )
}

export default StartupStepper;
import { useState } from "react";
import { useSelector } from "react-redux";
import CountrySelector from "../../../../shared/components/CountrySelector"
import Input from "../../../../shared/components/Input"
import { RootState } from "../../../../redux-toolkit/store/store";
import { getCountries } from "../../../../apis/bootstrap.api";

const DetailUI = ({language}:any) => {
    const authToken: any = useSelector((state: RootState) => state.auth.value);
    const event: any = useSelector((state: RootState) => state.event.value);

    const [countries, setCountries] = useState({ all: [], names: [] });
    const [loading, setLoading] = useState(false);

    const getAllCountries = async () => {
        setLoading(true);
        try {
            let { status, data } = await getCountries(authToken);
            if (status === 200) {
                let names = data.status.data.map((c: any) => c[event].name);
                setCountries({ all: data.status.data, names });
            }
        } catch (error: any) {
        } finally {
            setLoading(false);
        }
    };
    return (
        <section className="flex items-start justify-center flex-col mt-10 max-w-[420px] screen500:max-w-[300px]">
            <div className="mb-7">
                <h3 className="text-neutral-700 font-medium text-base w-[420px]">Title</h3>
                <Input type="text" placeholder="Add Text" />
            </div>

            <div className="mb-7">
                <h3 className="text-neutral-700 font-medium text-base w-[420px]">Location</h3>
                <section className="w-full mt-2 p-[18px] rounded-lg check-background border border-grey flex flex-col">
                    <div className="inline-flex items-center gap-3 w-full">
                        <span className="w-1/2">
                            <label className="font-medium text-sm text-neutral-700">Country</label>
                            <div className="w-full mt-2"><CountrySelector allCountries={countries.names} onChange={(v: any) => { }} selectedValue={""} defaultValue={""} /></div>
                        </span>
                        <span className="w-1/2">
                            <label className="font-medium text-sm text-neutral-700">State</label>
                            <Input type="text" />
                        </span>
                    </div>
                    <div className="inline-flex items-center gap-3 mt-5">
                        <span className="w-1/2">
                            <label className="font-medium text-sm text-neutral-700">City</label>
                            <Input type="text" />
                        </span>
                        <span className="w-1/2">
                            <label className="font-medium text-sm text-neutral-700">Area</label>
                            <Input type="text" />
                        </span>
                    </div>
                    <div className="inline-flex items-start flex-col mt-5">
                        <label className="font-medium text-sm text-neutral-700">Building Name</label>
                        <Input type="text" />
                    </div>
                    <div className="inline-flex items-start flex-col mt-5">
                        <label className="font-medium text-sm text-neutral-700">Street Address</label>
                        <Input type="text" />
                    </div>
                </section>
            </div>

            <div className="flex items-start justify-center flex-col mt-10 max-w-[420px] screen500:max-w-[300px] mb-7">
                <h3 className="text-neutral-700 font-medium text-base w-[420px] mb-[-10px]">
                    Size
                </h3>

                <section className="mb-8 w-full relative mt-3">
                    <Input placeholder={`500 sqft`} type="text" />

                    <ul className="inline-flex items-center gap-3 mt-3">
                        <li className="cursor-pointer py-2 px-3 h-9 w-24 bg-cbc-grey-sec rounded-md text-center text-sm font-normal text-neutral-900">500 sqft</li>
                        <li className="cursor-pointer py-2 px-3 h-9 w-24 bg-cbc-grey-sec rounded-md text-center text-sm font-normal text-neutral-900">750 sqft</li>
                        <li className="cursor-pointer py-2 px-3 h-9 w-24 bg-cbc-grey-sec rounded-md text-center text-sm font-normal text-neutral-900">1000 sqft</li>
                        <li className="cursor-pointer py-2 px-3 h-9 w-24 bg-cbc-grey-sec rounded-md text-center text-sm font-normal text-neutral-900">1200 sqft</li>
                    </ul>
                </section>
            </div>

            <div className="mb-7">
                <h3 className="text-neutral-700 font-medium text-base w-[420px]">Features</h3>
                <section className="w-full mt-2 p-[18px] rounded-lg check-background border border-grey flex flex-col">
                    <div className="inline-flex items-start mt-5 justify-between">
                        <label className="font-medium text-sm text-neutral-700">Bedrooms</label>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" checked={true} />
                            <div className="w-11 h-6 bg-cyan-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-800"></div>
                        </label>
                    </div>

                    <div className="inline-flex items-start mt-5 justify-between">
                        <label className="font-medium text-sm text-neutral-700">Kitchen</label>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" checked={true} />
                            <div className="w-11 h-6 bg-cyan-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-800"></div>
                        </label>
                    </div>
                    <div className="inline-flex items-start mt-5 justify-between">
                        <label className="font-medium text-sm text-neutral-700">Washroom</label>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" checked={true} />
                            <div className="w-11 h-6 bg-cyan-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-800"></div>
                        </label>
                    </div>
                    <div className="inline-flex items-start mt-5 justify-between">
                        <label className="font-medium text-sm text-neutral-700">Parking</label>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" checked={true} />
                            <div className="w-11 h-6 bg-cyan-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-800"></div>
                        </label>
                    </div>
                    <div className="inline-flex items-start mt-5 justify-between">
                        <label className="font-medium text-sm text-neutral-700">Swimming pool</label>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" checked={true} />
                            <div className="w-11 h-6 bg-cyan-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-800"></div>
                        </label>
                    </div>
                    <div className="inline-flex items-start mt-5 justify-between">
                        <label className="font-medium text-sm text-neutral-700">Property on a rent?</label>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" checked={true} />
                            <div className="w-11 h-6 bg-cyan-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-800"></div>
                        </label>
                    </div>

                </section>
            </div>
        </section>
    )
}

export default DetailUI
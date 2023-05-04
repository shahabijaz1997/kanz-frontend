import React, { MutableRefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getCountries } from "../../../apis/countries.api";
import Chevrond from "../../../ts-icons/chevrond.svg";

export default function CountrySelector({
    disabled = false,
    onChange,
    selectedValue
}: any) {
    const ref = useRef<HTMLDivElement>(null);
    const [countries, setCountries] = useState([]);
    const [open, setOpen] = useState(false);

    useLayoutEffect(() => {
        getAllCountries();
    }, []);

    const getAllCountries = async () => {
        try {
            let { data } = await getCountries();
            const filteredCountries = data.filter((country: any) => country.alpha2Code !== 'US' && country.alpha2Code !== 'UM');
            setCountries(filteredCountries);
        } catch (error) {
            console.error("Error while getting countries: ", error);
        }
    };
    useEffect(() => {
        const mutableRef = ref as MutableRefObject<HTMLDivElement | null>;

        const handleClickOutside = (event: any) => {
            if (mutableRef.current && !mutableRef.current.contains(event.target) && open) {
                setOpen(!open);
                setQuery("");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    const [query, setQuery] = useState("");

    return (
        <div ref={ref}>
            <div className="relative w-full" style={{ zIndex: 99 }}>
                {selectedValue ? (
                    <button type="button" className={`${disabled ? "bg-neutral-100" : "bg-white" } relative w-full border border-gray-300 rounded-md pl-3 pr-10 py-2 text-left cursor-default focus:outline-none sm:text-sm`}
                        aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label" onClick={() => setOpen(!open)} disabled={disabled} >
                        <span className="truncate flex items-center">
                            <img alt={`${selectedValue?.name}`} src={selectedValue?.flag} className={"inline mr-2 h-4 rounded-sm"} />
                            {selectedValue?.name}
                        </span>
                    </button>
                ) : (
                    <button type="button" className={`${disabled ? "bg-neutral-100" : "bg-white"} relative w-full border border-gray-300 rounded-md pl-3 pr-10 py-2 text-left cursor-default focus:outline-none sm:text-sm`}
                        aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label" onClick={() => setOpen(!open)} disabled={disabled} >
                        <span className="truncate flex items-center">
                          &nbsp;
                        </span>
                    </button>
                )
                }
                <span className={`absolute top-[12px] right-0 flex items-center pr-2 pointer-events-none}`} style={{ zIndex: 99 }}>
                    <Chevrond stroke="#737373" />
                </span>

                {
                    open && (
                        <AnimatePresence>
                            <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }}
                                className="absolute z-10 mt-1 w-full bg-white h[38px] rounded-md text-base focus:outline-none sm:text-sm border border-neutral-300 overflow-hidden"
                                tabIndex={-1} role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3" >
                                <div className="sticky top-0 z-10 bg-white">
                                    <li className=" text-gray-900 cursor-default select-none relative py-2 px-3">
                                        <input type="text" name="search" autoComplete={"off"} className="focus:outline-none block w-full sm:text-sm rounded-md" onChange={(e) => setQuery(e.target.value)} />
                                    </li>
                                    <hr />
                                </div>
                                <div className={"max-h-64 scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-600 scrollbar-thumb-rounded scrollbar-thin overflow-y-scroll"}>
                                    {countries.filter((country: any) =>
                                        country?.name.toLowerCase().startsWith(query.toLowerCase())
                                    ).length === 0 ? (
                                        <li className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9">
                                            No countries found
                                        </li>
                                    ) : (
                                        React.Children.toArray(
                                            countries.filter((country: any) =>
                                                country.name.toLowerCase().startsWith(query.toLowerCase())
                                            ).map((value: any, index) => {
                                                return (
                                                    <li className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 flex items-center hover:bg-gray-50 transition"
                                                        id="listbox-option-0" role="option"
                                                        onClick={() => {
                                                            onChange(value);
                                                            setQuery("");
                                                            setOpen(!open);
                                                        }}
                                                    >
                                                        <img alt={`${value?.name}`} src={value?.flag} className={"inline mr-2 h-4 rounded-sm"} />

                                                        <span className="font-normal truncate">
                                                            {value?.name}
                                                        </span>
                                                        {value?.name === selectedValue?.name ? (
                                                            <span className="text-blue-600 absolute inset-y-0 right-0 flex items-center pr-8">
                                                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" >
                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                            </span>
                                                        ) : null}
                                                    </li>
                                                );
                                            })
                                        )
                                    )}
                                </div>
                            </motion.ul>
                        </AnimatePresence>
                    )
                }
            </div>
        </div>
    );
}
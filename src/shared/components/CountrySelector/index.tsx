import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import { getCountries } from "../../../apis/countries.api";
import Chevrond from "../../../ts-icons/chevrond.svg";
import Selector from "../Selector";

export default function CountrySelector({
  disabled = false,
  onChange,
  selectedValue,
}: any) {
  const language: any = useSelector((state: RootState) => state.language.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const ref = useRef<HTMLDivElement>(null);
  const [countries, setCountries] = useState([]);
  const [open, setOpen] = useState(false);

  useLayoutEffect(() => {
    getAllCountries();
  }, []);

  const getAllCountries = async () => {
    try {
      let { status, data } = await getCountries(authToken);
      if (status === 200) {
        setCountries(data.status.data.countries);
      }
    } catch (error) {
      console.error("Error while getting countries: ", error);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target) && open) {
        setOpen(false);
        setQuery("");
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [query, setQuery] = useState("");

  const dropDownOptions = countries?.map((item: any) => {
    return {
      label: item.country_name,
      value: item.country_name,
    };
  });

  return (
    <div ref={ref}>
      <div className="relative w-full" style={{ zIndex: 99 }}>
        <Selector
          disabled={disabled}
          options={dropDownOptions && dropDownOptions}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

import React from "react";
import SearchIcon from "../../../ts-icons/searchIcon.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import CrossIcon from "../../../ts-icons/crossIcon.svg";

const Search = ({apiFunction, searchQuery, setSearchQuery, placeholder, width}:any) =>{
  const language: any = useSelector((state: RootState) => state.language.value);
    return (
        <div className={`rounded-md shadow-cs-6 bg-white border-[1px] border-gray-200 h-9 overflow-hidden ${width ?  `w-${width}` : `max-w-[310px]`}  inline-flex items-center px-2`}>
        <SearchIcon
          onClick={() => {
            apiFunction(searchQuery);
          }}
        />
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              apiFunction(searchQuery);
            }
          }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          className="h-full w-full outline-none pl-2 text-sm font-normal "
          placeholder={placeholder || language?.v3?.common?.search}
        />
        {searchQuery !== ""  && (
           <CrossIcon
           onClick={()=>{
            setSearchQuery("")
            apiFunction("")
           
          }} stroke="#171717" className="w-5 h-5"/>
        ) }
      
      </div>
    )

}
export default Search
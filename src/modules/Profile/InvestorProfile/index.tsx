import { useState } from "react";
import EditIcon from "../../../ts-icons/editIcon.svg"

const InvestorProfile = ({setPhotoUploadModal}:any) => {
    const profileInfo = {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "investorType": "Individual",
        "nationality": "US",
        "residence": "US",
        "address": "123 Main Street, Anytown, CA 12345"
      }
      const [focusedInput, setFocusedInput] = useState(null);
      const handleFocus = (inputName: any) => {
        setFocusedInput(inputName);
      };
    return (
        <section className="inline-flex justify-center w-full">
        <div className="flex flex-col gap-8 w-[50%]">
          <span
            className={`rounded-lg border-[1px] overflow-hidden w-[60%]  ${focusedInput === "input1"
            ? "border-[1px] border-[#155E75]" 
            :"border-[1px] border-#E0E0E0"} inline-flex`}
          >
            <p className="bg-white p-[0.5rem] text-xs font-medium ">Name</p>
            <input
              onFocus={() => handleFocus("input1")}
              className="px-2 w-full text-[10px]"
              type="text"
            />
          </span>
          <span className={`rounded-lg border-[1px] overflow-hidden w-[60%]  ${focusedInput === "input2"
            ? "border-[1px] border-[#155E75]" 
            :"border-[1px] border-#E0E0E0"} inline-flex`}>
            <p className="bg-white p-[0.5rem] text-xs font-medium ">
              Email
            </p>
            <input
            value={profileInfo?.email}
              onFocus={() => handleFocus("input2")}
              disabled
              className="px-2 text-[10px] w-full cursor-not-allowed"
              type="text"
            />
          </span>
          <span  className={`rounded-lg border-[1px] overflow-hidden w-[60%]  ${focusedInput === "input3"
            ? "border-[1px] border-[#155E75]" 
            :"border-[1px] border-#E0E0E0"} inline-flex`}>
            <p className="bg-white p-[0.5rem] text-xs font-medium whitespace-nowrap">
              Investor Type
            </p>
            <input
            value={profileInfo?.investorType}
            disabled
              onFocus={() => handleFocus("input3")}
              className="px-2 text-[10px] w-full  cursor-not-allowed"
              type="text"
            />
          </span>
          <span className={`rounded-lg border-[1px] overflow-hidden w-[60%]  ${focusedInput === "input4"
            ? "border-[1px] border-[#155E75]" 
            :"border-[1px] border-#E0E0E0"} inline-flex`}>
            <p className="bg-white p-[0.5rem] text-xs font-medium ">
              Nationality
            </p>
            <input
            disabled
            value={profileInfo?.nationality}
              onFocus={() => handleFocus("input4")}
              className="px-2 text-[10px] w-full"
              type="text"
            />
          </span>
          <span className={`rounded-lg border-[1px] overflow-hidden w-[60%]  ${focusedInput === "input5"
            ? "border-[1px] border-[#155E75]" 
            :"border-[1px] border-#E0E0E0"} inline-flex`}>
            <p className="bg-white p-[0.5rem] text-xs font-medium ">
              Residence
            </p>
            <input
            disabled
            value={profileInfo?.residence}
              onFocus={() => handleFocus("input5")}
              className="px-2 w-full text-[10px]"
              type="text"
            />
          </span>
          <span className={`rounded-lg border-[1px] overflow-hidden w-[60%]  ${focusedInput === "input6"
            ? "border-[1px] border-[#155E75]" 
            :"border-[1px] border-#E0E0E0"} inline-flex`}>
            <p className="bg-white p-[0.5rem] text-xs font-medium ">
              Address
            </p>
            <input
            disabled
            value={profileInfo?.address}
              onFocus={() => handleFocus("input6")}
              className="px-2 w-full text-[10px]"
              type="text"
            />
          </span>
        </div>
        <span>
          <div>
            <div className="relative ">
              <img
                className="w-48 h-48 rounded-full bg-slate-100 border-[1px] shadow-lg"
                style={{
                  objectFit: "cover",
                  aspectRatio: "1",
                }}
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
              <span onClick={() => {setPhotoUploadModal(true)}} className="bottom-0 left-9 absolute cursor-pointer w-6 h-6 hover:bg-slate-100 bg-white rounded-full flex items-center justify-center">
                <EditIcon className="w-4 h-4" stroke="#000" />
              </span>
            </div>
          </div>
        </span>
      </section>
    )
}

export default InvestorProfile
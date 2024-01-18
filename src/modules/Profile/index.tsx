import React, { useEffect, useState } from "react";
import Header from "../../shared/components/Header";
import { useSelector } from "react-redux";
import { RootState } from "../../redux-toolkit/store/store";
import Sidebar from "../../shared/components/Sidebar";
import { KanzRoles } from "../../enums/roles.enum";
import EditIcon from "../../ts-icons/editIcon.svg";

const Profile = () => {
  const metadata: any = useSelector((state: RootState) => state.metadata.value);
  const [focusedInput, setFocusedInput] = useState(null);
  const handleFocus = (inputName: any) => {
    setFocusedInput(inputName);
  };

  

  useEffect(() => {
    console.log(focusedInput);
  }, [focusedInput]);

const profileInfo = {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "investorType": "Individual",
    "nationality": "US",
    "residence": "US",
    "address": "123 Main Street, Anytown, CA 12345"
  }

  return (
    <main className="max-h-full">
      <Header />
      <aside className="w-full h-full flex items-start justify-start">
        <Sidebar type={KanzRoles.SYNDICATE} />
        <section
          style={{ width: "calc(100% - 250px)" }}
          className="bg-cbc-auth  p-[3rem] min-h-[100vh] relative w-full"
        >
          <div className="">
            <section className="inline-flex justify-between  items-start w-full">
              <div className="w-full">
                <h1 className="text-black font-medium text-xl mb-2">
                  {"Profile Management"}
                </h1>
              </div>
            </section>
            <p className="mt-5">
              <span className="font-medium text-lg">
                Hello {metadata?.name}!
              </span>
            </p>
            <aside className="w-full justify-center flex items-center">
              <div className="justify-center w-[80%] flex flex-col p-[2rem] border-[1px] rounded-lg shadow-lg mt-10">
                <span className="pb-5 text-lg font-medium">Edit Profile</span>
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
                  <span className="rounded-lg border-[1px] h-[80%] overflow-hidden border-neutral-200 w-[30%] flex flex-col">
                    <p className="bg-white p-[0.5rem] text-lg inline-flex items-center justify-start">
                      {" "}
                      <span className="text-xs font-medium">Profile Image</span>
                    </p>
                    <div className="w-full flex bg-white items-center justify-center p-3">
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
                        <span onClick={() => {console.log("Are you sure you want to edit")}} className="bottom-0 left-7 absolute cursor-pointer w-9 h-9 border-2 hover:bg-slate-100 border-white bg-white dark:border-gray-800 rounded-full flex items-center justify-center">
                          <EditIcon className="w-6 h-6" stroke={"#000"} />
                        </span>
                      </div>
                    </div>
                  </span>
                </section>
              </div>
            </aside>
          </div>
        </section>
      </aside>
    </main>
  );
};

export default Profile;

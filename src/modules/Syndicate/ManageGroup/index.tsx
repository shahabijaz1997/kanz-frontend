import React, {   useState } from "react";
import { KanzRoles } from "../../../enums/roles.enum";
import Header from "../../../shared/components/Header";
import Sidebar from "../../../shared/components/Sidebar";
import Spinner from "../../../shared/components/Spinner";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import Button from "../../../shared/components/Button";
import GroupMembers from "./GroupMembers";
import Applications from "./Applications";
import Invites from "./Invites";
import AllInvestors from "./AllInvestors";

const ManageGroup = ({}: any) => {
  const language: any = useSelector((state: RootState) => state.language.value);
  const tabs = [
    { id: 1, title: language?.v3?.investor?.group_members },
    { id: 2, title: language?.v3?.investor?.applications},
    { id: 3, title: language?.v3?.investor?.invites},
    { id: 4, title: language?.v3?.investor?.investors},
  ];
  const openModal = () =>{
    setModalOpen(true)
  }


  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [reloadMembers, setReloadMembers] = useState<boolean>(false);
  const [selected, setSelected]: any = useState(tabs[0]);
  const [loading, setLoading]: any = useState(false);


  return (
    <main className="h-full max-h-full overflow-y-hidden">
      <section>
        <Header/>
      </section>
      <aside className="w-full h-full flex items-start justify-start">
        <Sidebar
          type={
            KanzRoles.SYNDICATE 
          }
        />
        {loading ? (
          <div
            className="absolute left-0 top-0 w-full h-full grid place-items-center"
            style={{ backgroundColor: "rgba(255, 255, 255, 1)", zIndex: 50 }}
          >
            <Spinner />
          </div>
        ) : (
          <section
            className="bg-cbc-auth h-full p-[5rem] overflow-y-auto"
            style={{ width: "calc(100% - 250px)" }}
          >
            <section className="inline-flex justify-between items-center w-full mb-4">
              <h1 className="text-black font-medium text-2xl">
                {language?.v3?.syndicate?.manage_group}
              </h1>
              {
                selected?.id !== 4 &&(
                  <Button
                  onClick={() => {
                    setSelected(tabs[3])
                  }}
                  className="w-[170px]"
                >
                  { language?.v3?.syndicate?.add_new_member}
                </Button>
                )
              }
   
          
            </section>
           
            <section>
              <ul className="flex border-neutral-200 border-b-[1px]">
                {React.Children.toArray(
                  tabs.map((tab) => (
                    <li
                      className={`${
                        selected?.id === tab?.id
                          ? "border-cyan-800 border-b-[1px] text-cyan-800"
                          : "text-neutral-500"
                      } cursor-pointer font-medium text-sm py-4 mr-9 px-2 transition-all`}
                      onClick={() => setSelected(tab)}
                    >
                      {tab.title}
                    </li>
                  ))
                )}
              </ul>

              <div className="mt-10 mb-4">
              </div>
            </section>
              {selected.id===1 && <GroupMembers openModal={openModal} reloadMembers={reloadMembers}/>}
              {selected.id===2 && <Applications />}
              {selected.id===3 && <Invites />}
              {selected.id===4 && <AllInvestors />}
          </section>
        )}
      </aside>
{/*       <Modal
        className={"w-[700px] screen1024:w-[300px]"}
        show={modalOpen ? true : false}
      >
        <AddMembersModal closeModal={closeModal} reloadgetMembers={reloadgetMembers}  openModal={openModal}  />
      </Modal> */}
    </main>
  );
};
export default ManageGroup;

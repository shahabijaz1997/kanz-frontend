import { useSelector } from "react-redux";
import { RootState } from "../../redux-toolkit/store/store";
import { KanzRoles } from "../../enums/roles.enum";
import Button from "../../shared/components/Button";
import Header from "../../shared/components/Header";
import Sidebar from "../../shared/components/Sidebar";
import SearchIcon from "../../ts-icons/searchIcon.svg";
import Table from "../../shared/components/Table";

const columns = ['Subject', 'Status', 'Status', 'Sent By', 'Sent At', 'Createdt At'];
const data: any = [];

const DataRooms = () => {
    const language: any = useSelector((state: RootState) => state.language.value);

    return (
        <main className="h-full max-h-full overflow-y-auto">
            <section>
                <Header />
            </section>
            <aside className="w-full h-full flex items-start justify-start">
                <Sidebar type={KanzRoles.STARTUP} />
                <section className="bg-cbc-auth h-full p-[5rem]" style={{ width: "calc(100% - 250px)" }}>
                    <section className="inline-flex justify-between items-center w-full">
                        <div className="w-full">
                            <h1 className="text-black font-medium text-2xl mb-2">{language?.v3?.startup?.sidebar?.data_rooms}</h1>
                        </div>
                        <Button className="w-[70px]">{language?.v3?.button?.new}</Button>
                    </section>

                    <section className="inline-flex justify-between items-center w-full">
                        <span className="w-full flex items-center gap-5">
                            <div className="rounded-md shadow-cs-6 bg-white border-[1px] border-gray-200 h-9 overflow-hidden max-w-[310px] inline-flex items-center px-2">
                                <SearchIcon />
                                <input type="search" className="h-full w-full outline-none pl-2 text-sm font-normal text-gray-400" placeholder={language?.v3?.common?.search} />
                            </div>
                        </span>
                    </section>

                    <section className="inline-flex justify-between items-center w-full mt-3">
                        <Table columns={columns} data={data} />
                    </section>
                </section>
            </aside>
        </main >
    )
}

export default DataRooms;
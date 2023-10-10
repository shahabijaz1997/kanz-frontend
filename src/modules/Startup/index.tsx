import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { KanzRoles } from "../../enums/roles.enum";
import Header from "../../shared/components/Header";
import Sidebar from "../../shared/components/Sidebar";
import { RootState } from "../../redux-toolkit/store/store";
import SearchIcon from "../../ts-icons/searchIcon.svg";
import Spinner from "../../shared/components/Spinner";
import Button from "../../shared/components/Button";
import Table from "../../shared/components/Table";
import { StartupRoutes } from "../../enums/routes.enum";
import Modal from "../../shared/components/Modal";
import CrossIcon from "../../ts-icons/crossIcon.svg";
import DealTable from "../../shared/components/DealTable";
import { saveDataHolder } from "../../redux-toolkit/slicer/dataHolder.slicer";
import { getDeals } from "../../apis/deal.api";
import { numberFormatter } from "../../utils/object.utils";

const columns = ['Title', 'Type', 'Status', 'Stage', 'Round', 'Target'];

const Startup = ({ }: any) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const language: any = useSelector((state: RootState) => state.language.value);
    const authToken: any = useSelector((state: RootState) => state.auth.value);

    const [pagination, setPagination] = useState({ items_per_page: 5, total_items: [], current_page: 1, total_pages: 0 });
    const [selectedTab, setSelectedTab] = useState();
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tabs] = useState([language?.v3?.startup?.overview?.all, language?.v3?.startup?.overview?.raising, language?.v3?.startup?.overview?.closed]);
    const [deals, setDeals] = useState([]);

    useEffect(() => {
        dispatch(saveDataHolder(""));
        getAllDeals();
    }, []);

    const getAllDeals = async () => {
        try {
            setLoading(true);
            let { status, data } = await getDeals(authToken);
            if (status === 200) {
                let deals = data?.status?.data?.map((deal: any) => {
                    return {
                        id: deal?.id,
                        Title: deal?.title || "N/A",
                        Target: `$${numberFormatter(Number(deal?.target))}`,
                        Stage: deal?.title || "N/A",
                        Round: deal?.round,
                        Status: deal?.status,
                        Type: deal?.instrument_type,
                        State: deal?.current_state,
                        Valuation: `$${numberFormatter(Number(deal?.valuation))} ${language?.v3?.deal?.valuation}`
                    }
                });
                setPagination(prev => {
                    return { ...prev, total_items: deals.length, current_page: 1, total_pages: Math.ceil(deals.length / prev.items_per_page), data: deals?.slice(0, prev.items_per_page) }
                });
                setDeals(deals);
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
    };

    const paginate = (type: string) => {
        if (type === "next" && pagination.current_page < pagination.total_pages) {
            setPagination((prev: any) => {
                const nextPage = prev.current_page + 1;
                const startIndex = (nextPage - 1) * prev.items_per_page;
                const endIndex = startIndex + prev.items_per_page;
                const data = deals.slice(startIndex, endIndex);
                return { ...prev, current_page: nextPage, data };
            });
        } else if (type === "previous" && pagination.current_page > 1) {
            setPagination((prev: any) => {
                const prevPage = prev.current_page - 1;
                const startIndex = (prevPage - 1) * prev.items_per_page;
                const endIndex = startIndex + prev.items_per_page;
                const data = deals.slice(startIndex, endIndex);

                return { ...prev, current_page: prevPage, data };
            });
        }
    };

    return (
        <main className="h-full max-h-full overflow-y-auto">
            <section>
                <Header />
            </section>
            <aside className="w-full h-full flex items-start justify-start">
                <Sidebar type={KanzRoles.STARTUP} />
                <section className="bg-cbc-auth h-full p-[5rem] relative" style={{ width: "calc(100% - 250px)" }}>
                    {loading ? (
                        <div className="absolute left-0 top-0 w-full h-full grid place-items-center">
                            <Spinner />
                        </div>
                    ) : (
                        <React.Fragment>
                            <section className="inline-flex justify-between items-center w-full">
                                <h1 className="text-black font-medium text-2xl mb-2">{language?.v3?.startup?.overview?.heading_2}</h1>
                            </section>

                            <section className="mt-10 mb-16">
                                <DealTable />
                            </section>

                            <section className="inline-flex justify-between items-center w-full">
                                <div className="w-full">
                                    <h1 className="text-black font-medium text-2xl mb-2">{language?.v3?.startup?.overview?.heading}</h1>

                                    <span className="w-full flex items-center gap-5">
                                        <div className="rounded-md shadow-cs-6 bg-white border-[1px] border-gray-200 h-9 overflow-hidden max-w-[310px] inline-flex items-center px-2">
                                            <SearchIcon />
                                            <input type="search" className="h-full w-full outline-none pl-2 text-sm font-normal text-gray-400" placeholder={language?.v3?.common?.search} />
                                        </div>

                                        <ul className="inline-flex items-center">
                                            {React.Children.toArray(tabs.map(tab => <li onClick={() => setSelectedTab(tab)} className={`py-2 px-3 font-medium cursor-pointer rounded-md transition-all ${selectedTab === tab ? "text-neutral-900 bg-neutral-100" : "text-gray-500"} `}>{tab} &nbsp;(0)</li>))}
                                        </ul>
                                    </span>
                                </div>
                                <Button onClick={() => setModalOpen(true)} className="w-[170px]">{language?.v3?.button?.new_deal}</Button>
                            </section>

                            <section className="mt-10">
                                <Table columns={columns} pagination={pagination} paginate={paginate} onclick={(row: any) => {
                                    dispatch(saveDataHolder(row.id));
                                    navigate(`/create-deal/${row?.State?.current_step + 1}`);
                                }} noDataNode={<Button onClick={() => setModalOpen(true)} className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">{language?.v3?.button?.new_deal}</Button>} />
                            </section>
                        </React.Fragment>
                    )}
                </section>
            </aside>

            <Modal show={modalOpen}>
                <div className="relative p-12 rounded-md shadow-cs-1 flex flex-col items-center w-full bg-white outline-none focus:outline-none screen800:px-3">
                    <div className="rounded-md h-8 w-8 inline-grid place-items-center cursor-pointer absolute right-2 top-2">
                        <CrossIcon stroke="#171717" className="w-6 h-6" onClick={() => setModalOpen(false)} />
                    </div>

                    <aside>
                        <h2 className="font-bold text-xl text-center text-neutral-900">{language?.v3?.common?.disclaimer}</h2>
                        <p className="text-sm font-normal text-center text-neutral-500 mt-8 mb-12">{language?.v3?.common?.disclaimer_desc}</p>
                        <div className="py-3 border-t-[1px] border-neutral0=-200 inline-flex justify-between w-full">
                            <span>
                                <h2 className="font-medium text-neutral-700 text-xl">Disclaimer 1</h2>
                                <p className="font-normal text-neutral-500 text-sm">Description of Disclaimer</p>
                            </span>
                            <input type="checkbox" />
                        </div>
                        <div className="py-3 border-t-[1px] border-neutral0=-200 inline-flex justify-between w-full">
                            <span>
                                <h2 className="font-medium text-neutral-700 text-xl">Disclaimer 2</h2>
                                <p className="font-normal text-neutral-500 text-sm">Description of Disclaimer</p>
                            </span>
                            <input type="checkbox" />
                        </div>
                        <div className="w-full inline-flex items-center justify-center gap-3 mt-10">
                            <Button className="bg-transparent border-cyan-800 border-[1px] !text-cyan-800 w-[100px]" onClick={() => setModalOpen(false)}>{language?.v3?.button?.cancel}</Button>
                            <Button className="w-[100px]" onClick={() => navigate(`${StartupRoutes.CREATE_DEAL}/1`)}>{language?.buttons?.continue}</Button>
                        </div>
                    </aside>
                </div>
            </Modal>
        </main>
    );
};
export default Startup;
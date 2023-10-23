import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import DocViewer, { PDFRenderer, PNGRenderer } from "react-doc-viewer";
import { KanzRoles } from "../../enums/roles.enum";
import { RootState } from "../../redux-toolkit/store/store";
import Header from "../../shared/components/Header";
import Sidebar from "../../shared/components/Sidebar";
import Chevrond from "../../ts-icons/chevrond.svg";
import Button from "../../shared/components/Button";
import Spinner from "../../shared/components/Spinner";
import ArrowIcon from "../../ts-icons/arrowIcon.svg";
import DownloadIcon from "../../ts-icons/downloadIcon.svg";
import Modal from "../../shared/components/Modal";

const SyndicateDealOverview = ({ }: any) => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const language: any = useSelector((state: RootState) => state.language.value);
    const authToken: any = useSelector((state: RootState) => state.auth.value);

    const docs = [{ uri: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" }];
    const [loading, setLoading]: any = useState(false);
    const [modalOpen, setModalOpen]: any = useState(null);

    return (
        <main className="h-full max-h-full overflow-y-auto">
            <section>
                <Header />
            </section>
            <aside className="w-full h-full flex items-start justify-start">
                <Sidebar type={KanzRoles.STARTUP} />
                {loading ? (
                    <div className="absolute left-0 top-0 w-full h-full grid place-items-center" style={{ backgroundColor: "rgba(255, 255, 255, 1)", zIndex: 50 }} >
                        <Spinner />
                    </div>
                ) : (
                    <section className="bg-cbc-auth h-full p-[5rem] flex items-start" style={{ width: "calc(100% - 250px)" }}>
                        <section className="w-[60%]">
                            <div className="w-full inline-flex pb-4 items-center gap-2 relative top-[-25px] cursor-pointer border-b-[1px] border-b-neutral-200" onClick={() => navigate(-1)}>
                                <Chevrond stroke="#000" className="rotate-90 w-4 h-4" />
                                <small className="text-neutral-500 text-sm font-medium">{language?.v3?.common?.investments}</small>
                            </div>

                            <div className="inline-flex justify-between w-full mb-4">
                                <h1 className="text-black font-medium text-2xl">Deck</h1>
                                <Button type="outlined">Open in New Tab</Button>
                            </div>

                            <DocViewer
                                documents={docs}
                                pluginRenderers={[PDFRenderer, PNGRenderer]}
                            />

                            <div className="inline-flex justify-between w-full my-10">
                                <h1 className="text-black font-medium text-2xl">Risk & Disclaimers</h1>
                                <p className="text-sm font-medium"></p>
                            </div>

                            <Button className="w-full">Approve</Button>
                        </section>
                        <section className="w-[10%]"></section>
                        <section className="w-[30%]">
                            <div className="w-full inline-flex justify-end gap-4">
                                <Button type="outlined" onClick={() => setModalOpen(true)}>Request Changes</Button>
                                <Button>Interested</Button>
                            </div>

                            <aside className="border-[1px] border-neutral-200 rounded-md w-full p-3 mt-5">
                                <h2 className="text-neutral-700 text-xl font-medium">Investment Details</h2>
                                <small className="text-neutral-500 text-sm font-normal">Minimum is $2500  Invest by Oct 2</small>

                                <span className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3 mt-8">
                                    <h3>Instrument Type</h3>
                                    <small>Equity</small>
                                </span>

                                <span className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 mt-6">
                                    <h3>Instrument Type</h3>
                                    <small>Equity</small>
                                </span>
                            </aside>

                            <aside className="border-[1px] border-neutral-200 rounded-md w-full p-3 mt-5 bg-cbc-check">
                                <section className="rounded-md bg-white px-3 py-1 inline-flex items-center justify-between w-full border-[1px] border-neutral-200">
                                    <span className="inline-flex items-center">
                                        <div className="bg-white w-14 h-14 inline-flex justify-center flex-col w-full">
                                            <h4 className="inline-flex items-center gap-3 w-[200px] cursor-pointer" onClick={() => setModalOpen({ url: "", open: true, type: "" })}>
                                                <div className="text-sm text-black font-medium ">View Doc</div>
                                                <ArrowIcon stroke="#000" />
                                            </h4>
                                            <h2 className="text-sm font-medium text-neutral-500 max-w-xl truncate" title={"doc?.name"}>{"doc?.name"}</h2>
                                        </div>
                                    </span>

                                    <div className="h-10 w-10 rounded-lg inline-flex items-center flex-row justify-center gap-2 bg-white cursor-pointer border-[1px] border-neutral-200">
                                        <DownloadIcon />
                                    </div>
                                </section>
                            </aside>
                        </section>
                    </section>
                )}
            </aside>

            <Modal show={modalOpen ? true : false} className="w-full">
                <div className="rounded-md inline-grid place-items-center cursor-pointer absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]" style={{ backgroundColor: "rgba(0, 0, 0, 0.078" }}>
                    <aside className="bg-white w-[400px] rounded-md px-4 py-3">
                       <header className="bg-cbc-grey-sec"></header>

                        <footer className="w-full inline-flex justify-end gap-3">
                            <Button className="w-[80px]" onClick={() => { }}>{language?.buttons?.yes}</Button>
                            <Button className="bg-transparent border-cyan-800 border-2 w-[80px] !text-cyan-800 hover:bg-transparent" onClick={() => setModalOpen(false)}>{language?.buttons?.no}</Button>
                        </footer>
                    </aside>
                </div>
            </Modal>
        </main>
    );
};
export default SyndicateDealOverview;
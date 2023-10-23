import { ChangeEvent, useState } from "react";
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
import CrossIcon from "../../ts-icons/crossIcon.svg";
import UploadIcon from "../../ts-icons/uploadIcon.svg";

const SyndicateDealOverview = ({ }: any) => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const language: any = useSelector((state: RootState) => state.language.value);
    const authToken: any = useSelector((state: RootState) => state.auth.value);

    const docs = [{ uri: "https://kanz-attachments-production.s3.amazonaws.com/Deal/118/8yy87cbgtaczibxvvlnwvud896v4?response-content-disposition=inline%3B%20filename%3D%22sample.pdf%22%3B%20filename%2A%3DUTF-8%27%27sample.pdf&response-content-type=application%2Fpdf&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUZ3BKAW2TBYTKAHD%2F20231023%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231023T111135Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=e45b5109d9375fb5b46baed58e9ec6d93f28a38f7a15fde8d5bd8f57572cd310" }];
    const [loading, setLoading]: any = useState(false);
    const [modalOpen, setModalOpen]: any = useState(null);
    const [changes, setChanges]: any = useState({ comment: "", action: "", document: null });

    const handleFileUpload = (e: any) => {
    };

    return (
        <main className="h-full max-h-full overflow-y-auto">
            <section>
                <Header />
            </section>
            <aside className="w-full h-full flex items-start justify-start">
                <Sidebar type={KanzRoles.SYNDICATE} />
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
                <div className="rounded-md overflow-hidden inline-grid place-items-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]" style={{ backgroundColor: "rgba(0, 0, 0, 0.078" }}>
                    <aside className="bg-white w-[400px] rounded-md h-full">
                        <header className="bg-cbc-grey-sec h-16 py-2 px-3 inline-flex w-full justify-between items-center">
                            <h3 className="text-xl font-medium text-neutral-700">Deal Approval</h3>
                            <div className="bg-white h-8 w-8 border-[1px] border-black rounded-md shadow shadow-cs-6 p-1 cursor-pointer" onClick={() => {
                                setModalOpen(false);
                                setChanges({ comment: "", action: "", document: null })
                            }}>
                                <CrossIcon stroke="#000" />
                            </div>
                        </header>

                        <section className="py-3 px-4">
                            <div className="mb-6">
                                <label htmlFor="" className="text-neutral-900 font-medium text-sm">Add Comment</label>
                                <textarea
                                    value={changes?.comment}
                                    onChange={(e) => setChanges((prev: any) => {
                                        return { ...prev, comment: e.target.value }
                                    })}
                                    placeholder="Add Comment"
                                    className=" h-[100px] mt-1 shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                                ></textarea>
                            </div>
                            <div className="mb-8">
                                <label htmlFor="" className="text-neutral-900 font-medium text-sm block">Action</label>

                                <div className="flex flex-row mt-1">
                                    <li className={`pr-4 text-sm font-medium cursor-pointer inline-flex items-center justify-start first:rounded-t-md last:rounded-b-md screen500:w-full`}
                                        onClick={() => {
                                            setChanges((prev: any) => {
                                                return { ...prev, action: "request_changes" }
                                            })
                                        }}>
                                        <input onChange={(e) => { }} className="accent-cyan-800 relative float-left mr-2 h-3 w-3 rounded-full border-2 border-solid border-cyan-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04]"
                                            type="radio" checked={changes.action === "request_changes" ? true : false} />
                                        <div className="text-sm font-medium text-neutral-700">Request Change</div>
                                    </li>

                                    <li className={`pr-4 text-sm font-medium cursor-pointer inline-flex items-center justify-start first:rounded-t-md last:rounded-b-md screen500:w-full`}
                                        onClick={() => {
                                            setChanges((prev: any) => {
                                                return { ...prev, action: "verify" }
                                            })
                                        }}>
                                        <input onChange={(e) => { }} className="accent-cyan-800 relative float-left mr-2 h-3 w-3 rounded-full border-2 border-solid border-cyan-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04]"
                                            type="radio" checked={changes.action === "verify" ? true : false} />
                                        <div className="text-sm font-medium text-neutral-700">Verify</div>
                                    </li>
                                </div>
                            </div>

                            <div className="mb-6">
                                <div className="flex flex-row">
                                    <label htmlFor="doc-uploader">
                                        <button className="bg-cbc-grey-sec rounded-lg inline-flex items-center gap-2 px-4 py-3">
                                            <UploadIcon />
                                            <small className="text-cyan-800 text-sm font-medium">Upload a Document</small>
                                        </button>
                                        <input type="file" className="hidden" id="doc-uploader" onChange={handleFileUpload} />
                                    </label>
                                </div>
                            </div>
                        </section>

                        <footer className="w-full inline-flex justify-between gap-3 py-2 px-3 w-full">
                            <Button className="bg-transparent border-cyan-800 border-2 w-full !text-cyan-800 hover:bg-transparent" onClick={() => setModalOpen(false)}>Cancel</Button>
                            <Button className="w-full" onClick={() => { }}>Submit</Button>
                        </footer>
                    </aside>
                </div>
            </Modal>
        </main>
    );
};
export default SyndicateDealOverview;
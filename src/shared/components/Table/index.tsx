import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";

const Table = ({ columns, data, noDataNode, onclick, pagination, paginate }: any) => {
    const orientation: any = useSelector((state: RootState) => state.orientation.value);

    const renderPaginationUI = () => {
        let pages: number[] = [];
        for (let i = 1; i <= pagination?.total_pages; i++) pages.push(i);
        return (
            React.Children.toArray(
                pages?.map((page, index) => {
                    return (
                        <li className={`${index !== (pages.length - 1) ? "mr-1" : "mr-0"}`}>
                            <a className={`${page === pagination?.current_page ? "bg-cyan-900 text-white" : "bg-transparent text-cyan-800"} transition-all block rounded border-[1px] border-cyan-800 px-3 py-1.5 text-sm font-medium`} href="#!">{page}</a>
                        </li>
                    )
                })
            )
        )
    };

    return (
        <section className="rounded-lg shadow-cs-5 border-[1px] border-neutral-200 w-full">
            <table className="min-w-full overflow-hidden rounded-lg bg-white">
                <thead className="bg-neutral-50">
                    <tr>
                        {React.Children.toArray(
                            columns.map((column: any, index: number) => (
                                <th scope="col" className={`px-3 py-3 text-xs font-bold text-neutral-500 uppercase ${(index === columns.length - 1) ? `${orientation !== "rtl" ? "text-right" : "text-left"}` : `${orientation !== "rtl" ? "text-left" : "text-right"}`} }`}>
                                    {column}
                                </th>
                            ))
                        )}
                    </tr>
                </thead>
                <tbody className={`relative divide-y divide-gray-200 ${(!pagination?.data || !pagination?.data?.length) && "h-[13rem]"}`}>
                    {
                        pagination?.data?.length > 0 ? (
                            React.Children.toArray(
                                pagination?.data.map((row: any) => (
                                    <tr onClick={() => onclick(row)} className="cursor-pointer transition-all hover:bg-cbc-transparent">
                                        {React.Children.toArray(
                                            columns.map((column: any, index: number) => (
                                                index === 0 ? (
                                                    <td className={`px-3 h-10 text-sm font-medium text-gray-800 whitespace-nowrap max-w-[150px] truncate inline-flex items-center ${index === columns.length - 1 && `text-right`} }`}>
                                                        <aside className="inline-flex flex-col items-center pl-2">
                                                            {row[column]}
                                                        </aside>
                                                        {index === 0 && <small className="text-neutral-500 font-normal">{row["Valuation"]}</small>}
                                                    </td>
                                                ) : (
                                                    <td className={`px-3 h-10 text-sm font-medium text-gray-800 whitespace-nowrap max-w-[150px] truncate ${index === columns.length - 1 && `text-right`} }`}>
                                                            {row[column]}
                                                    </td>
                                                )
                                            ))
                                        )}
                                    </tr>
                                ))
                            )
                        ) : (noDataNode)
                    }
                </tbody>
            </table>
            {pagination?.data?.length > 0 && (
                <nav className="my-5">
                    <ul className="list-style-none flex items-center justify-center">
                        <li className="pr-2" onClick={() => paginate("previous")}> <a className={`${pagination?.current_page === 1 ? "cursor-not-allowed" : "cursor-pointer"} text-cyan-800 px-3 py-1.5 text-2xl`}><span aria-hidden="true">&laquo;</span></a></li>
                        {renderPaginationUI()}
                        <li className="pl-2" onClick={() => paginate("next")}><a className={`${pagination?.current_page === pagination?.total_pages ? "cursor-not-allowed" : "cursor-pointer"} text-cyan-800 px-3 py-1.5 text-2xl`} href="#!"><span aria-hidden="true">&raquo;</span></a></li>
                    </ul>
                </nav>
            )}
        </section>

    );
}

export default Table;
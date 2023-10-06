import React from "react";

const Table = ({ columns, data, noDataNode, onclick }: any) => {
    return (
        <section className="rounded-lg shadow-cs-5 border-[1px] border-neutral-200 w-full">
            <table className="min-w-full overflow-hidden rounded-lg bg-white">
                <thead className="bg-neutral-50">
                    <tr>
                        {React.Children.toArray(
                            columns.map((column: any, index: number) => (
                                <th scope="col" className={`px-3 py-3 text-xs font-bold text-left text-neutral-500 uppercase ${index === columns.length - 1 && `text-right`}
                                    }`}>
                                    {column}
                                </th>
                            ))
                        )}
                    </tr>
                </thead>
                <tbody className={`relative divide-y divide-gray-200 ${data?.length === 0 && "h-[13rem]"}`}>
                    {
                        data?.length > 0 ? (
                            React.Children.toArray(
                                data.map((row: any) => (
                                    <tr onClick={()=>onclick(row)} className="cursor-pointer">
                                        {columns.map((column: any, index: number) => (
                                            index === 0 ? (
                                                <div className="inline-flex flex-col items-center">
                                                    <td className={`px-3 pt-4 text-sm font-medium text-gray-800 whitespace-nowrap ${index === columns.length - 1 && `text-right`}
                                                }`}>
                                                        {row[column]}

                                                    </td>
                                                    {index === 0 && <small className="text-neutral-500 font-normal">{row["Valuation"]}</small>}
                                                </div>
                                            ) : (
                                                <td className={`px-3 py-4 text-sm font-medium text-gray-800 whitespace-nowrap ${index === columns.length - 1 && `text-right`}
                                            }`}>
                                                    {row[column]}

                                                </td>
                                            )
                                        ))}
                                    </tr>
                                ))
                            )
                        ) : (noDataNode)
                    }
                </tbody>
            </table>
        </section>

    );
}

export default Table;
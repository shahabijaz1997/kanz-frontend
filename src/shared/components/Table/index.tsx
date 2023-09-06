import React from "react";

const Table = ({ columns, data }: any) => {
    return (
        <section className="rounded-lg shadow-cs-5 border-[1px] border-neutral-200">
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
                <tbody className="divide-y divide-gray-200">
                    {React.Children.toArray(
                        data.map((row: any) => (
                            <tr>
                                {columns.map((column: any, index: number) => (
                                    <td  className={`px-3 py-4 text-sm font-medium text-gray-800 whitespace-nowrap ${index === columns.length - 1 && `text-right`}
                                        }`}>
                                        {row[column]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </section>
    );
}

export default Table;
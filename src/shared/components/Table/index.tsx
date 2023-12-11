import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import Chevrond from "../../../ts-icons/chevrond.svg";

const Table = ({
  columns,
  noDataNode,
  onclick = () => {},
  pagination,
  paginate,
  goToPage = () => {},
  removeHref = false
}: any) => {
  const orientation: any = useSelector(
    (state: RootState) => state.orientation.value
  );

  const renderPaginationUI = () => {
    let pages: number[] = [];
    for (let i = 1; i <= pagination?.total_pages; i++) pages.push(i);
    return React.Children.toArray(
      pages?.map((page, index) => {
        return (
          <li
            className={`${index !== pages.length - 1 ? "" : "mr-0"}`}
            onClick={() => {
              goToPage(page);
            }}
          >
            <a
              className={`${
                page === pagination?.current_page
                  ? "border-[1px] border-l-[1px]  border-r-[1px] border-[#155E75] bg-[#F5F5F5] text-[#155E75]"
                  : "bg-transparent text-[#737373] border-[1px] border-l-[#D4D4D4]border-r-[#D4D4D4]"
              } transition-all block   px-3 py-1.5 text-sm font-medium`}
              href={removeHref ?  undefined : "#!"}
            >
              {page}
            </a>
          </li>
        );
      })
    );
  };

  return (
    <section className="rounded-lg shadow-xl overflow-hidden border-[1px] border-neutral-200 w-full">
      <table className="min-w-full overflow-hidden bg-white">
        <thead className="bg-neutral-50">
          <tr>
            {React.Children.toArray(
              columns.map((column: any, index: number) => (
                <th
                  scope="col"
                  className={`px-3 py-3 text-xs font-bold text-neutral-500 uppercase ${
                    index === columns.length - 1
                      ? `${orientation !== "rtl" ? "text-right" : "text-left"}`
                      : `${orientation !== "rtl" ? "text-left" : "text-right"}`
                  } }`}
                >
                  {column}
                </th>
              ))
            )}
          </tr>
        </thead>
        <tbody
          className={`relative divide-y divide-gray-200 ${
            (!pagination?.data || !pagination?.data?.length) && "h-[13rem]"
          }`}
        >
          {pagination?.data?.length > 0
            ? React.Children.toArray(
                pagination?.data.map((row: any) => (
                  <tr
                    onClick={() => onclick(row)}
                    className="cursor-pointer transition-all hover:bg-cbc-transparent border-none"
                  >
                    {React.Children.toArray(
                      columns.map((column: any, index: number) =>
                        index === 0 ? (
                          <td
                            className={`px-3 h-12 text-sm font-medium text-gray-800 whitespace-nowrap max-w-[150px] truncate inline-flex items-center ${
                              index === columns.length - 1 && `text-right`
                            } }`}
                          >
                            <aside className="inline-flex flex-col items-center pl-2">
                              {row[column]}
                            </aside>
                            {index === 0 && (
                              <small className="text-neutral-500 font-normal">
                                {row["Valuation"]}
                              </small>
                            )}
                          </td>
                        ) : (
                          <td
                            className={`px-3 h-10 text-sm font-medium text-gray-800 whitespace-nowrap max-w-[150px] truncate ${
                              index === columns.length - 1 && `text-right`
                            } }`}
                          >
                            {row[column]}
                          </td>
                        )
                      )
                    )}
                  </tr>
                ))
              )
            : noDataNode}
        </tbody>
      </table>
      {pagination?.data?.length > 0 && (
        <nav className="py-2 flex justify-end bg-white border-t-[1px] border-[#D4D4D4]">
          <ul className="list-style-none  flex items-center justify-center border-[#D4D4D4] border-[1px] rounded-md w-fit mx-10">
            <li
              className="pr-2"
              onClick={() => {
                if (pagination?.current_page === 1) return;
                paginate("previous");
              }}
            >
              {" "}
              <a
                className={`${
                  pagination?.current_page === 1
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                } text-cyan-800 w-fit pl-2 h-fit flex`}
              >
                <span className=" flex h-fit" aria-hidden="true"><Chevrond strokeWidth={3} stroke="#000" className="rotate-90 w-3 h-3" /></span>
              </a>
            </li>
            {renderPaginationUI()}
            <li
              className="pl-2"
              onClick={() => {
                if (pagination?.current_page === pagination?.total_pages)
                  return;

                paginate("next");
              }}
            >
              <a
                className={`${
                  pagination?.current_page === pagination?.total_pages
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                } text-cyan-800  w-fit  h-fit flex pr-2 `}
                href={removeHref ?  undefined : "#!"}
              >
                <span aria-hidden="true" className="flex h-fit"><Chevrond stroke="#000" className="w-3 h-3" style={{ transform: 'rotate(270deg)',strokeWidth: '3' }} /></span>
              </a>
            </li>
          </ul>
        </nav>
      )}
    </section>
  );
};

export default Table;

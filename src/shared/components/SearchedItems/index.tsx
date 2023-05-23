import React from "react";

const SearchedItems = ({ items, searchString }: any) => {
    const renderSegregatedItems = () => {
        let filtered = items.map((it: any) => {
            if (it.name.toLowerCase().includes(searchString.toLowerCase())) it.blue = true;
            else it.blue = false;
            return it;
        });

        return (
            React.Children.toArray(
                filtered.map((it: any) => <div className={`rounded-md py-1 px-2 check-background text-neutral-700 font-normal text-sm ${it.blue && "border-2 border-blue-500"}`}>{it.name}</div>)
            ))
    };


    return (
        <aside className="flex flex-wrap gap-4 mt-4 max-h-[350px] overflow-y-auto">
            {renderSegregatedItems()}
        </aside>
    )
};
export default SearchedItems;
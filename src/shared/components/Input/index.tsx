import React from "react";

const Input = (props: any) => {
    const { title, type, id } = props;
    return (
        <React.Fragment>
            <label className="block text-neutral-700 text-[14px] font-semibold mb-2" htmlFor={id}>{title}</label>
            <input className="h-[42px] shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id={id} type={type} />
        </React.Fragment>
    )
};
export default Input;
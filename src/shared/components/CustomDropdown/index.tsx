import React, { useEffect, useRef, useState } from "react";

const CustomDropdown = ({ mainNode, options = ["Item","Test1","Test2","Test3"], className = "", onClick }: any) => {
    const ref: any = useRef();
    const [isOpen, setOpen] = useState(false);


    useEffect(() => {
        const handleOutsideClick = (event: any) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        };
        window.addEventListener('click', handleOutsideClick);
        return () => {
            window.removeEventListener('click', handleOutsideClick);
        };
    }, []);



    return (
        <div ref={ref} className={`relative w-full cursor-pointer ${className}`} onClick={() => setOpen(!isOpen)}>
            {mainNode}

            {isOpen && (
                <ul className="absolute bg-white border-[1px] border-neutral-200 rounded-md min-w-[180px] right-0 top-[100%]">
                    {React.Children.toArray(
                        options.map((opt: any) => <li className="cursor-pointer px-2 py-1 hover:bg-sidebar-item-hover text-neutral-500" onClick={() => onClick(opt)}>{opt}</li>)
                    )}
                </ul>
            )}
        </div>
    )
};
export default CustomDropdown;
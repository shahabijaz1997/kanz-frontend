import React, { useState, useEffect, useRef } from 'react';

const Dropdown = (props: any) => {
    const { style, dropdownItems } = props;
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef: any = useRef(null);
    const [selected] = useState(dropdownItems[0]);

    useEffect(() => {
        const handleOutsideClick = (event: any) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        window.addEventListener('click', handleOutsideClick);

        return () => {
            window.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={style} ref={dropdownRef}>
            <div>
                <button type="button"
                    className="inline-flex justify-center items-center gap-x-1.5 px-3 py-2 text-sm font-medium hover:bg-gray-50 text-neutral-700"
                    id="menu-button" aria-expanded={isOpen} aria-haspopup="true" onClick={handleToggleDropdown} >
                    {selected.icon && <img src={selected?.icon} alt={selected.title} />}
                    {selected.title}
                    <svg
                        className="-mr-1 h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="#404040"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div
                    className="absolute right-6 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex={-1}
                >
                    <div className="py-1 inline-flex justify-start items-center w-full" role="none">
                        {React.Children.toArray(
                            dropdownItems.map((item: any) => {
                                return (
                                    <a href="#" className="text-gray-700 px-4 py-2 text-sm inline-flex gap-2" role="menuitem" tabIndex={-1} id="menu-item-0" onClick={()=>setIsOpen(false)}>
                                        {item.icon && <img src={item.icon} alt={item.title} />}
                                        <small className="text-[14px] font-medium">{item.title}</small>
                                    </a>
                                )
                            })
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;

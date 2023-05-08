const HoverModal = ({ children, isOpen, setIsOpen }: any) => {
    return (
        <aside className={"w-[280px] h-[180px] absolute top-[-10px] left-[90px] right-0 transition-all"}>
            <div className="h-3 w-3 absolute left-[-6px] top-[15px] bg-white z-[50] rotate-[45deg] bg-cbc-1 border-l-2 border-b-2 border-cyan-800"></div>
            <article className="relative w-full p-3 flex flex-col bg-cbc-1 border-2 border-cyan-800 rounded-md space-y-6 overflow-y-scroll h-full">
                {children}
            </article>
        </aside>
    )
};
export default HoverModal;


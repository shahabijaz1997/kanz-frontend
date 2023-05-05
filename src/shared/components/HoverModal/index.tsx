const HoverModal = ({ children, isOpen, setIsOpen }: any) => {
    return (
        <main className={"w-[320px] h-[80%] absolute top-[20px] left-[300px] transition-all"}>
            <div className="h-3 w-3 absolute left-[-6px] top-[15px] bg-white z-[50] rotate-[45deg] bg-cbc-1 border-l-2 border-b-2 border-cyan-800"></div>
            <article className="relative w-full p-6 flex flex-col bg-cbc-1 border-2 border-cyan-800 rounded-md space-y-6 overflow-y-scroll h-full">

                {children}
            </article>
        </main>
    )
};
export default HoverModal;


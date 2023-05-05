import CrossIcon from "../../../ts-icons/crossIcon.svg";

const Drawer = ({ children, isOpen, setIsOpen }: any) => {

    return (
        <main className={"fixed overflow-hidden z-10 inset-0 transform ease-in-out " +
            (isOpen ? " transition-opacity opacity-100 duration-500 translate-x-0  " : " transition-all delay-500 opacity-0 translate-x-full  ")}>
            <section className={"w-[320px] right-5 top-1/2 translate-y-[-50%] absolute bg-white h-[80%] shadow-cs-2 delay-400 duration-500 ease-in-out transition-all transform  " +
                (isOpen ? " translate-x-0 " : " translate-x-full ")}>
                <article className="relative w-full p-6 flex flex-col space-y-6 overflow-y-scroll h-full">
                    <div className="cursor-pointer" onClick={() => setIsOpen(false)}>
                        <CrossIcon stroke="#171717" className="absolute h-6 w-6 right-4 top-4" />
                    </div>
                    {children}
                </article>
            </section>
        </main>
    );
};
export default Drawer;
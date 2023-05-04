const CustomHeader = ({ leftMenu, button }: any) => {
    return (
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-colorBlack1">{leftMenu}</h2>
            <button className="text-neutral-900 font-bold text-sm w-[150px] h-9 border border-black shadow-sm">{button}</button>
        </div>
    )
};
export default CustomHeader;
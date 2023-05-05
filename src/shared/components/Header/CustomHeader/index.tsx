const CustomHeader = ({ leftMenu, button }: any) => {
    return (
        <div className="container mx-auto px-12 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-colorBlack1">{leftMenu}</h2>
            {button}
        </div>
    )
};
export default CustomHeader;
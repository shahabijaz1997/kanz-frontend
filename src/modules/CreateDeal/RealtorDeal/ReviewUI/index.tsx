const ReviewUI = ({ language }: any) => {
    return (
        <section className="flex items-start justify-center flex-col mt-10 max-w-[420px] min-w-[400px] screen500:max-w-[300px]">
            <div className="py-4 border-b-[1px] border-b-neutral-200 w-full">
                <h3 className="text-neutral-900 font-medium text-sm">Details</h3>
                <p className="text-neutral-500 font-normal text-sm">Angel Round</p>
            </div>
            <div className="py-4 border-b-[1px] border-b-neutral-200 w-full">
                <h3 className="text-neutral-900 font-medium text-sm">Attachments</h3>
                <p className="text-neutral-500 font-normal text-sm">Equity</p>
            </div>
            <div className="py-4 border-b-[1px] border-b-neutral-200 w-full">
                <h3 className="text-neutral-900 font-medium text-sm">Selling Price</h3>
                <p className="text-neutral-500 font-normal text-sm">Common</p>
            </div>
            <div className="py-4 border-b-[1px] border-b-neutral-200 w-full">
                <h3 className="text-neutral-900 font-medium text-sm">Expected Return</h3>
                <p className="text-neutral-500 font-normal text-sm">$0.00</p>
            </div>
            <div className="py-4 border-b-[1px] border-b-neutral-200 w-full">
                <h3 className="text-neutral-900 font-medium text-sm">Terms</h3>
                <p className="text-neutral-500 font-normal text-sm">$10,000,000 (Pre-money)</p>
            </div>
            <div className="py-4 border-b-[1px] border-b-neutral-200 w-full">
                <h3 className="text-neutral-900 font-medium text-sm">Review</h3>
                <p className="text-neutral-500 font-normal text-sm">PDF 2MB</p>
            </div>
        </section>
    )
};
export default ReviewUI;
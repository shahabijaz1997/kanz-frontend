const ExpectedReturnUI = ({ language }: any) => {

    return (
        <section className="flex items-start justify-center flex-col mt-10 max-w-[420px] screen500:max-w-[300px]">
            <h3 className="text-neutral-700 font-medium text-base w-[420px]">
                {language?.v3?.deal?.exp_ret}
            </h3>

            <section className="mb-8 w-full relative mt-3">
                <div className="relative rounded-md w-full h-10 border-[1px] border-neutral-300 overflow-hidden inline-flex items-center px-3">
                    <input placeholder={`% 8.5`} type="text" className="outline-none w-full h-full placeholder-neutral-500" />
                </div>

                <ul className="inline-flex items-center gap-3 mt-3">
                    <li className="cursor-pointer py-2 px-3 h-9 w-24 bg-cbc-grey-sec rounded-md text-center text-sm font-normal text-neutral-900">% 5</li>
                </ul>
            </section>

            <h3 className="text-neutral-700 font-medium text-base w-[420px] mt-7">
                {language?.v3?.deal?.exp_ann}
            </h3>

            <section className="mb-8 w-full relative mt-3">
                <div className="relative rounded-md w-full h-10 border-[1px] border-neutral-300 overflow-hidden inline-flex items-center px-3">
                    <input placeholder={`% 8.5`} type="text" className="outline-none w-full h-full placeholder-neutral-500" />
                </div>

                <ul className="inline-flex items-center gap-3 mt-3">
                    <li className="cursor-pointer py-2 px-3 h-9 w-24 bg-cbc-grey-sec rounded-md text-center text-sm font-normal text-neutral-900">% 5</li>
                </ul>
            </section>
        </section>
    )
};
export default ExpectedReturnUI;
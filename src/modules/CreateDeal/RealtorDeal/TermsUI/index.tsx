const TermsUI = ({ language }: any) => {
    return (
        <section className="flex items-start justify-center flex-col mt-10 max-w-[420px] screen500:max-w-[300px]">
            <div dangerouslySetInnerHTML={{ __html: "" }} />

            <section className="w-full inline-flex items-center gap-2 rounded-md border border-grey w-[420px] p-4 check-background cursor-pointer" >
                <input type="checkbox" className="accent-cyan-800 h-3 w-3 cursor-pointer" checked={false} />
                <span className="inline-flex flex-col">
                    <p className="text-neutral-700 text-sm font-medium">
                        {language?.v3?.common?.i_agree}
                    </p>
                    <p className="text-neutral-500 text-sm font-normal">
                        {language?.v3?.common?.i_agree_desc}
                    </p>
                </span>
            </section>
        </section>
    )
};
export default TermsUI;
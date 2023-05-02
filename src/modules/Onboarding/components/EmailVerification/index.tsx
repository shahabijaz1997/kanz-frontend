const EmailVerification = () => {
    return (
        <section className="w-[428px] max-w-md">
            <h2 className="text-[24px] font-bold text-left text-neutral-900 mb-4">Verification Code</h2>
            <h3 className="text-[16px] font-normal text-left text-neutral-700">Enter the 4 digit verification code sent to your email</h3>
            <form className="pt-8 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-neutral-700 text-[14px] font-semibold mb-2" htmlFor="code">Enter code</label>
                    <input className="h-[42px] shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline" id="code" type="text" />
                </div>
                <div className="text-right text-neutral-500 font-normal text-[14px]">Code has been sent to your email (you@example.com) <span className="color-blue">Edit </span></div>
                <button className="text-white font-semibold rounded-md focus:outline-none focus:shadow-outline w-full primary-bg h-[38px] mt-10" type="submit">
                    Verify
                </button>
            </form>
        </section>
    )
};

export default EmailVerification
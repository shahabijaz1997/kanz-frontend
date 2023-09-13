import { useState } from "react";
import FileUpload from "../../../../shared/components/FileUpload";
import AddIcon from "../../../../assets/icons/add.svg";

const AttachmentUI = ({ language, orientation }: any) => {
    const [open, setOpen]: any = useState(false);

    return (
        <section className="flex items-start justify-center flex-col mt-10 max-w-[420px] min-w-[400px] screen500:max-w-[300px]">
            <h3 className="text-neutral-700 font-medium text-base w-[420px]">
                <span>Upload the necessary documents.</span>&nbsp;<span className="text-cc-blue font-medium cursor-pointer" onClick={() => setOpen(true)} >
                    {language.philosophyGoals.whyToDo}
                </span>
            </h3>
            <h3 className="text-neutral-700 font-medium text-base w-[420px] mt-4">
                Property Images
            </h3>
            <p className="text-neutral-500 font-normal text-sm">
                <span>Upload Images of your Property</span>&nbsp;
                <span className="text-cc-blue font-medium cursor-pointer" onClick={() => setOpen(true)} >
                    {language.common.example}
                </span>
            </p>

            <FileUpload id={1} fid={1} file={{}} setModalOpen={() => { }} setFile={() => { }} removeFile={() => { }} title={"Document"} className="w-full" />


            <h3 className="text-neutral-700 font-medium text-base w-[420px] mt-6">
                Property Video
            </h3>
            <p className="text-neutral-500 font-normal text-sm">
                <span>Upload a Video of your Property</span>&nbsp;
                <span className="text-cc-blue font-medium cursor-pointer" onClick={() => setOpen(true)} >
                    {language.common.example}
                </span>
            </p>

            <FileUpload id={2} fid={2} file={{}} setModalOpen={() => { }} setFile={() => { }} removeFile={() => { }} title={"Video"} video={true} className="w-full" />


            <h3 className="text-neutral-700 font-medium text-base w-[420px] mt-6">
                Add Links
            </h3>
            <div className="w-full mt-2 p-[18px] rounded-lg check-background border border-grey flex flex-col">
                <div className="relative inline-flex w-full">
                    <input
                        type="disabled"
                        value={"https://"}
                        className={`text-neutral-500 text-base font-normal border-t border-b border-neutral-300 h-[42px] w-[70px] ${orientation === "rtl"
                            ? "border-r rounded-br-md rounded-tr-md pr-2"
                            : "border-l rounded-bl-md rounded-tl-md pl-2"
                            }`}
                    />
                    <input id="link" value={""} onChange={(e) => { }} placeholder="www.example.com"
                        className={`h-[42px] shadow-sm appearance-none border border-neutral-300 w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline ${orientation === "rtl"
                            ? " rounded-bl-md rounded-tl-md"
                            : " rounded-br-md rounded-tr-md"
                            }`} type="text"
                    />
                </div>

                <button className="cursor-pointer py-[9px] px-[17px] w-full rounded-md border-[1px] border-neutral-900 inline-flex justify-center gap-2 items-center bg-white mt-3">
                    <img src={AddIcon} alt="Add" />
                    <small className="text-sm font-medium text-neutral-900">Add New Link</small>
                </button>
            </div>
        </section>
    )
}

export default AttachmentUI;
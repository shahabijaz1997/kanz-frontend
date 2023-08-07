import React from "react";
import { RoutesEnums } from "../../../enums/routes.enum";

const AddAttachmentBanner = ({ language, navigate, currentStepper }: any) => {
    return (
        <div className="w-full bg-cyan-800 h-12 inline-flex items-center justify-center screen800:flex-col screen800:h-20 screen800:gap-2">
            { currentStepper == 5 && ( 
                <React.Fragment>
                    <small className="text-white text-base font-semibold mr-4 screen800:text-xs screen800:text-center">{language?.common?.attachmentPending}</small>
                    <button className="bg-white rounded-md py-2 px-3 text-neutral-900 font-medium text-xs" onClick={() => navigate(RoutesEnums.ADD_ATTACHMENTS)}>{language?.buttons?.addAttachment}</button>
                </React.Fragment>
            )}
        </div>
    )
};
export default AddAttachmentBanner;
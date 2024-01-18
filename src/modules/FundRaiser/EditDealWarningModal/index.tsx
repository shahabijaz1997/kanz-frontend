import { useDispatch, useSelector } from "react-redux";
import { saveDataHolder } from "../../../redux-toolkit/slicer/dataHolder.slicer";
import Button from "../../../shared/components/Button";
import { ApplicationStatus } from "../../../enums/types.enum";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux-toolkit/store/store";
import { convertStatusLanguage } from "../../../utils/string.utils";
import { RoutesEnums } from "../../../enums/routes.enum";

const EditDealWarningModal = ({
  handleWarningModal,
  dealId,
  dealStatus,
  dealStep,
}: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const language: any = useSelector((state: RootState) => state.language.value);

  return (
    <div
      className="rounded-md overflow-hidden inline-grid place-items-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.078" }}
    >
      <aside className="bg-white w-[400px] rounded-md h-full">
        <section className="py-3 px-10">
          <div className="mb-6 pt-5 text-center">
            <label
              htmlFor=""
              className="text-neutral-900 text-center font-bold text-xl"
            >
              {language?.v3?.fundraiser?.warning}
            </label>
            <p className="pt-5">
             {language?.v3?.fundraiser?.edit_approved_deal_confirmation}
            </p>
          </div>
        </section>

        <footer className="w-full inline-flex justify-center gap-3 py-2 px-3 ">
          <Button
            type="outlined"
            className="w-full !py-1"
            divStyle="flex items-center justify-center w-6/12"
            onClick={handleWarningModal}
          >
            {language?.v3?.investor?.cancel}
          </Button>
          <Button
            className="w-full !py-1"
            divStyle="flex items-center justify-center w-6/12"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(saveDataHolder(dealId));
              if (convertStatusLanguage(dealStatus) === ApplicationStatus.APPROVED) {
                navigate(RoutesEnums.CREATE_DEAL);
              } else if (convertStatusLanguage(dealStatus) === ApplicationStatus.REOPENED) {
               /*  navigate(`/create-deal/${dealStep + 1}`); */
               navigate (RoutesEnums.CREATE_DEAL, {state: dealStep + 1})
              } else {
                navigate(RoutesEnums.CREATE_DEAL, {state: dealStep + 2});
                /* navigate(`/create-deal/${dealStep + 2}`); */
              }
            }}
          >
            {language?.v3?.syndicate?.continue}
          </Button>
        </footer>
      </aside>
    </div>
  );
};

export default EditDealWarningModal;
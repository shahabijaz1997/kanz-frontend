import { useDispatch } from "react-redux";
import { saveDataHolder } from "../../../redux-toolkit/slicer/dataHolder.slicer";
import Button from "../../../shared/components/Button";
import { ApplicationStatus } from "../../../enums/types.enum";
import { useNavigate } from "react-router-dom";

const EditDealWarningModal = ({
  handleWarningModal,
  dealId,
  dealStatus,
  dealStep,
}: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
              Warning!
            </label>
            <p className="pt-5">
              Editing an approved deal will impact its status and would require
              re-approval. Are you sure you want to proceed with editing?
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
            Cancel
          </Button>
          <Button
            className="w-full !py-1"
            divStyle="flex items-center justify-center w-6/12"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(saveDataHolder(dealId));
              if (dealStatus === ApplicationStatus.APPROVED) {
                navigate(`/create-deal/1`);
              } else if (dealStatus === ApplicationStatus.REOPENED) {
                navigate(`/create-deal/${dealStep + 1}`);
              } else {
                navigate(`/create-deal/${dealStep + 2}`);
              }
            }}
          >
            Continue
          </Button>
        </footer>
      </aside>
    </div>
  );
};

export default EditDealWarningModal;

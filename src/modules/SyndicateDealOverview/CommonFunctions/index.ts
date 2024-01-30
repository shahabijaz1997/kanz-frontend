import { toast } from "react-toastify";
import { getRevertTransaction } from "../../../apis/deal.api";
import { toastUtil } from "../../../utils/toast.utils";

export const revertInvestment = async ({
  dealId,
  authToken,
  getDealDetail,
  setLoading,
}: any) => {
  try {
    setLoading(true);
    let { status, data } = await getRevertTransaction(dealId, authToken);
    if (status === 204) {
      toast.success("Reverted Successfully", toastUtil);
      getDealDetail();
    }
  } catch (error) {
    toast.error("Something went wrong", toastUtil);
  } finally {
    setLoading(false);
  }
};

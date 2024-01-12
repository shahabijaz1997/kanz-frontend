import store from "../redux-toolkit/store/store";
const event = store.getState().event.value;

  
  type DealStatus = {
    ACCEPTED: string;
    LIVE: string;
    PENDING: string;
  };
  
  
  
 export const dealStatus: DealStatus = {
    ACCEPTED: event === "ar" ? "قبلت" : "accepted",
    LIVE: event === "ar" ? "مباشرة" : "live",
    PENDING: event === "ar" ? "قيد الانتظار" : "pending",
  };
  

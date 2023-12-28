import store from "../redux-toolkit/store/store";
const event = store.getState().event.value;
console.log('====================================');
console.log("EVENT VALUE", event);
console.log('====================================');
/* export enum ApplicationStatus {
    IN_PROGRESS = "inprogress",
    APPROVED = "approved",
    SUBMITTED = "submitted",
    OPENED = "opened",
    REOPENED = "reopened",
    DRAFT = "draft",
    VERIFIED = "verified",
    REJECTED = "rejected",
  } */
  
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
/*   
  
  export enum DealType {
    STARTUP = "startup_deal",
    PROPERTY_OWNER = "property_deal",
  }
  export enum DealCheckType {
    STARTUP = "startup",
    PROPERTY = "property",
  }
  
  export enum DealPromotionType {
    CLASSIC = "classic",
    SYNDICATE = "syndicate",
  }
  export enum InputType {
    CURRENCY = "currency",
    PERCENT = "percent",
    NUMERIC="numeric",
    SQFT="sqft"
  } */
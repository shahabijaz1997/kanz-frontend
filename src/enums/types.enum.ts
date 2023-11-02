export enum InvestorType {
  INDIVIDUAL = "Individual Investor",
  FIRM = "Investment Firm",
}

export enum PromptMessage {
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
}

export enum FileType {
  IMAGE = "image",
  VIDEO = "video",
  PDF = "pdf",
}

export enum ApplicationStatus {
  IN_PROGRESS = "inprogress",
  APPROVED = "approved",
  SUBMITTED = "submitted",
  OPENED = "opened",
  REOPENED = "reopened",
  DRAFT = "draft",
  VERIFIED = "verified",
  REJECTED = "rejected",
}

export enum DealStatus {
  ACCEPTED = "accepted",
  LIVE = "live",
  PENDING = "pending",
}

export enum DealType {
  STARTUP = "startup_deal",
  REALTOR = "property_deal",
}

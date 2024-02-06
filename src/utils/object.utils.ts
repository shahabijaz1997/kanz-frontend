import { DealCheckType } from "../enums/types.enum";

export const isEmpty = (value: any) => {
  if (typeof value === "object" && value !== null) {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return Object.keys(value).length === 0;
    }
  } else if (typeof value === "string") {
    return value.trim().length === 0;
  }

  return true;
};

export const filterObjectsByTrueValue = (objectsArray: any, key: any) => {
  return objectsArray
    .filter((obj: any) => obj[key] === true)
    .map((obj1: any) => obj1.id);
};

export const numberFormatter = (
  number: number,
  dealType: string | null = null,
  isArabic: boolean | null = null
) => {
  if (isNaN(number) || !number) return 0;
  let formattedNumber = "";
  if (isArabic) {
    if (number >= 1000000000) {
      formattedNumber = ` ${(number / 1000000000).toFixed(1)} مليار`;
    } else if (number >= 1000000) {
      formattedNumber = `${(number / 1000000).toFixed(1)} مليون`;
    } else if (number >= 1000) {
      formattedNumber = `${(number / 1000).toFixed(1)} ألف`;
    } else {
      formattedNumber = number.toString();
    }
  } else {
    if (number >= 1000000000) {
      formattedNumber = (number / 1000000000).toFixed(1) + "B";
    } else if (number >= 1000000) {
      formattedNumber = (number / 1000000).toFixed(1) + "M";
    } else if (number >= 1000) {
      formattedNumber = (number / 1000).toFixed(1) + "K";
    } else {
      formattedNumber = number.toString();
    }
  }
  if (dealType === null || dealType === undefined) {
    return formattedNumber;
  }
  if ((dealType !== null || dealType !== undefined) && !isArabic) {
    if (dealType === DealCheckType.STARTUP) {
      formattedNumber = `$${formattedNumber}`;
    } else {
      formattedNumber = `AED ${formattedNumber}`;
    }
  }
  if ((dealType !== null || dealType !== undefined) && isArabic) {
    if (dealType === DealCheckType.PROPERTY) {
      formattedNumber = `د.إ ${formattedNumber}`;
    } else {
      formattedNumber = `$ ${formattedNumber}`;
    }
  }
  return formattedNumber;
};

export const eng_arb_commaFormattedNumber = (
  value: any,
  dealType: string | null = null,
  event: any
) => {
  if (!value || isNaN(Number(value))) return value;
  if (event === 'ar') {
    return comaFormattedNumber(value, dealType, true);
  }
  else return comaFormattedNumber(value, dealType, false);
};

export const comaFormattedNumber = (
  value: any,
  dealType: string | null = null,
  isArabic: boolean | null = null
) => {
  if (!value || isNaN(Number(value))) return value;
  const formattedValue = String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (dealType !== null && !isArabic) {
    if (dealType === DealCheckType.STARTUP) {
      return `$${formattedValue}`;
    } else {
      return `AED ${formattedValue}`;
    }
  }
  if (dealType !== null && isArabic) {
    if (dealType === DealCheckType.STARTUP) {
      return `$${formattedValue}`;
    } else {
      return `د.إ ${formattedValue}`;
    }
  }
  return formattedValue;
};

export const formatDate = (value: string = "") => {
  if (!value) return value;
  const inputDate = new Date(value);
  const options: any = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = inputDate.toLocaleDateString("en-US", options);
  return formattedDate;
};

export const uniqueArray = (arr: any[]) => {
  const seen = new Set();
  return arr.filter((item) => {
    const itemStr = JSON.stringify(item);
    if (!seen.has(itemStr)) {
      seen.add(itemStr);
      return true;
    }
    return false;
  });
};

export const timeAgo = (
  created_at: string,
  isArabic: boolean | null = null
) => {
  const parts = created_at.match(
    /(\d+)\/(\d+)\/(\d+) (\d+):(\d+):(\d+) (AM|PM)/
  );
  if (!parts) {
    return "Invalid date";
  }

  const day = parseInt(parts[1]);
  const month = parseInt(parts[2]) - 1;
  const year = parseInt(parts[3]);
  let hour = parseInt(parts[4]);
  const minute = parseInt(parts[5]);
  const second = parseInt(parts[6]);
  const isPM = parts[7] === "PM";

  if (isPM && hour !== 12) {
    hour += 12;
  } else if (!isPM && hour === 12) {
    hour = 0;
  }

  const createdAtDate: any = new Date(year, month, day, hour, minute, second);
  const currentDate: any = new Date();

  const timeDifference = currentDate - createdAtDate;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const timeUnits = isArabic
    ? {
        month: "شهر",
        day: "يوم",
        hour: "ساعة",
        minute: "دقيقة",
        second: "ثانية",
      }
    : {
        month: "month",
        day: "day",
        hour: "hour",
        minute: "minute",
        second: "second",
      };

  if (months >= 1) {
    return `${months} ${timeUnits.month}${months > 1 ? "s" : ""} ${
      isArabic ? "منذ" : "ago"
    }`;
  } else if (days >= 1) {
    return `${days} ${timeUnits.day}${days > 1 ? "s" : ""} ${
      isArabic ? "منذ" : "ago"
    }`;
  } else if (hours >= 1) {
    return `${hours} ${timeUnits.hour}${hours > 1 ? "s" : ""} ${
      isArabic ? "منذ" : "ago"
    }`;
  } else if (minutes >= 1) {
    return `${minutes} ${timeUnits.minute}${minutes > 1 ? "s" : ""} ${
      isArabic ? "منذ" : "ago"
    }`;
  } else {
    return `${seconds} ${timeUnits.second}${seconds > 1 ? "s" : ""} ${
      isArabic ? "منذ" : "ago"
    }`;
  }
};

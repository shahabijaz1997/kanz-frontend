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

export const numberFormatter = (number: number) => {
  if (isNaN(number) || !number) return 0;
  if (number >= 1000000000) return (number / 1000000000).toFixed(1) + "B";
  else if (number >= 1000000) return (number / 1000000).toFixed(1) + "M";
  else if (number >= 1000) return (number / 1000).toFixed(1) + "K";
  else return number.toString();
};

export const comaFormattedNumber = (value: string) => {
  if (!value || isNaN(Number(value))) return value;
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

export const timeAgo = (created_at: string) => {
  // Parse the input date using a custom date parser
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
 

  if (months >= 1) {
    return months + " month" + (months > 1 ? "s" : "") + " ago";
  } else if (days >= 1) {
    return days + " day" + (days > 1 ? "s" : "") + " ago";
  } else if (hours >= 1) {
    return hours + " hour" + (hours > 1 ? "s" : "") + " ago";
  } else if (minutes >= 1) {
    return minutes + " minute" + (minutes > 1 ? "s" : "") + " ago";
  } else {
    return seconds + " second" + (seconds > 1 ? "s" : "") + " ago";
  }
};

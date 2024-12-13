import { differenceInYears, format, formatDistance } from "date-fns";

export function calculateAge(dob: Date) {
  if (!(dob instanceof Date) || isNaN(dob.getTime())) {
    throw new Error("Invalid date provided.");
  }
  return differenceInYears(new Date(), dob);
}

export const formatShortDateTime = (date: Date) => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error("Invalid date provided.");
  }
  return format(date, "MMM dd yyyy, h:mm a");
};

export const createChatId = (a: string, b: string) => {
  return a > b ? `${b}-${a}` : `${a}-${b}`;
};

export const timeAgo = (date: string) => {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    throw new Error("Invalid date string provided.");
  }
  return formatDistance(parsedDate, new Date());
};

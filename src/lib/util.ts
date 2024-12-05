import { differenceInYears, format, formatDistance } from "date-fns";

export function calculateAge(dob: Date) {
  return differenceInYears(new Date(), dob);
}

export const formatShortDateTime = (date: Date) => {
  return format(date, "MMM dd yyyy, h:mm a");
};

export const createChatId = (a: string, b: string) => {
  return a > b ? `${b}-${a}` : `${a}-${b}`;
};

export const timeAgo = (date: string) => {
  return formatDistance(new Date(date), new Date());
};

import { differenceInYears, format } from "date-fns";

export function calculateAge(dob: Date) {
  return differenceInYears(new Date(), dob);
}

export const formatShortDateTime = (date: Date) => {
  return format(date, "dd MM yy h:mm:ss");
};

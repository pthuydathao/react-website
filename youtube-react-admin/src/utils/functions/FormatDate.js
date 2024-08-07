import { format } from "date-fns";
import { utcToZonedTime, format as formatTZ } from "date-fns-tz";

export const FormatUTCDate = (date) => {
  const zonedDate = utcToZonedTime(date, "UTC");
  return formatTZ(zonedDate, "EEE MMM dd yyyy HH:mm:ss 'GMT'XXX", {
    timeZone: "UTC",
  });
};

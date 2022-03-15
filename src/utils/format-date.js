import { DateTime } from "luxon";

export function formatDate(timestamp) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(timestamp));
}

export function formatDateTime(timestamp, keepTimeZone = false) {
  return DateTime
    .fromISO(timestamp, { setZone: keepTimeZone })
    .setLocale('en-US')
    .toLocaleString({
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    });
}
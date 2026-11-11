import { useEffect, useState } from "react";

const format = (timeZone) =>
  new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone,
  }).format(new Date());

/** HH:MM in the given IANA time zone, updated every 30 seconds (no seconds shown, so it stays calm). */
export function useLocalTime(timeZone) {
  const [time, setTime] = useState(() => format(timeZone));

  useEffect(() => {
    const id = setInterval(() => setTime(format(timeZone)), 30000);
    return () => clearInterval(id);
  }, [timeZone]);

  return time;
}

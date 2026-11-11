import { useCallback, useEffect, useState } from "react";
import { fetchGithubActivity } from "../lib/github";

/** @returns {{status: "loading"|"success"|"error", data: object|null, retry: () => void}} */
export function useGithubActivity(username) {
  const [state, setState] = useState({ status: "loading", data: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    const timer = setTimeout(() => controller.abort(), 10000);

    fetchGithubActivity(username, controller.signal)
      .then((data) => active && setState({ status: "success", data }))
      .catch(() => active && setState({ status: "error", data: null }))
      .finally(() => clearTimeout(timer));

    return () => {
      active = false;
      controller.abort();
      clearTimeout(timer);
    };
  }, [username, attempt]);

  const retry = useCallback(() => {
    setState({ status: "loading", data: null });
    setAttempt((n) => n + 1);
  }, []);

  return { ...state, retry };
}

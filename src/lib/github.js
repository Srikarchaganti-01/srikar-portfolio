/**
 * GitHub activity service. Keyless and frontend-only:
 *  - contributions: public third-party service built on GitHub's contribution graph
 *  - repo count:    GitHub's public REST API (unauthenticated, rate-limited)
 * No tokens are used. If you ever need guaranteed uptime, replace the body of
 * `fetchGithubActivity` with a call to your own serverless function.
 */

const CACHE_TTL_MS = 60 * 60 * 1000;

const readCache = (key) => {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const { savedAt, value } = JSON.parse(raw);
    return Date.now() - savedAt < CACHE_TTL_MS ? value : null;
  } catch {
    return null;
  }
};

const writeCache = (key, value) => {
  try {
    sessionStorage.setItem(key, JSON.stringify({ savedAt: Date.now(), value }));
  } catch {
    /* storage unavailable: ignore */
  }
};

async function getJson(url, signal) {
  const res = await fetch(url, { signal, headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

/**
 * @returns {Promise<{days: {date: string, count: number, level: number}[], total: number, repos: number | null}>}
 * @throws when contribution data is unavailable.
 */
export async function fetchGithubActivity(username, signal) {
  const cacheKey = `gh-activity:${username}`;
  const cached = readCache(cacheKey);
  if (cached) return cached;

  const name = encodeURIComponent(username);
  const [contributions, profile] = await Promise.allSettled([
    getJson(`https://github-contributions-api.jogruber.de/v4/${name}?y=last`, signal),
    getJson(`https://api.github.com/users/${name}`, signal),
  ]);

  const raw = contributions.status === "fulfilled" ? contributions.value?.contributions : null;
  if (!Array.isArray(raw) || raw.length === 0) {
    throw new Error("Contribution data unavailable");
  }

  const days = raw
    .map(({ date, count, level }) => ({
      date: String(date),
      count: Number(count) || 0,
      level: Math.min(4, Math.max(0, Number(level) || 0)),
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  const repos =
    profile.status === "fulfilled" && Number.isFinite(profile.value?.public_repos)
      ? profile.value.public_repos
      : null;

  // The total is summed from the daily data, never taken from memory or guessed.
  const result = { days, total: days.reduce((sum, d) => sum + d.count, 0), repos };
  writeCache(cacheKey, result);
  return result;
}

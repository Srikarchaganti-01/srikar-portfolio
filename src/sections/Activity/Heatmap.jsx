import { useEffect, useMemo, useRef } from "react";

const SIZE = 11; // px
const GAP = 3; // px
const LEVEL_COLORS = ["rgb(23 21 15 / 0.08)", "#f4c9b8", "#ee9a7c", "#e0451f", "#b8341a"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_LABELS = { 1: "Mon", 3: "Wed", 5: "Fri" };

const parse = (iso) => new Date(`${iso}T00:00:00`);
const formatDay = (iso) =>
  parse(iso).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });

/** Groups days into Sunday-first weeks, padding the first week so rows line up with weekdays. */
function buildWeeks(days) {
  const weeks = [];
  let week = new Array(parse(days[0].date).getDay()).fill(null);
  for (const day of days) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) weeks.push(week);
  return weeks;
}

/** One dot per day, GitHub-style: columns are weeks, rows are weekdays. */
export default function Heatmap({ days, total }) {
  const scroller = useRef(null);
  const weeks = useMemo(() => buildWeeks(days), [days]);

  const monthLabels = useMemo(() => {
    const labels = [];
    let last = -1;
    weeks.forEach((week, i) => {
      const first = week.find(Boolean);
      if (!first) return;
      const month = parse(first.date).getMonth();
      if (month !== last) {
        // Skip a label that would collide with the previous one.
        if (labels.length === 0 || i - labels[labels.length - 1].col >= 3) {
          labels.push({ col: i, text: MONTHS[month] });
        }
        last = month;
      }
    });
    return labels;
  }, [weeks]);

  // Start scrolled to the most recent weeks (matters on narrow screens).
  useEffect(() => {
    if (scroller.current) scroller.current.scrollLeft = scroller.current.scrollWidth;
  }, [weeks]);

  return (
    <div>
      <div ref={scroller} className="overflow-x-auto pb-3">
        <div
          role="img"
          aria-label={`Contribution graph: ${total} contributions in the last year.`}
          className="inline-grid"
          style={{
            gridTemplateColumns: `auto repeat(${weeks.length}, ${SIZE}px)`,
            gridTemplateRows: `14px repeat(7, ${SIZE}px)`,
            gap: `${GAP}px`,
          }}
        >
          {monthLabels.map(({ col, text }) => (
            <span
              key={`${text}-${col}`}
              className="meta whitespace-nowrap text-[10px] leading-none text-ink-muted"
              style={{ gridRow: 1, gridColumn: col + 2 }}
            >
              {text}
            </span>
          ))}
          {Object.entries(DAY_LABELS).map(([row, text]) => (
            <span
              key={text}
              className="meta pr-2 text-[10px] leading-none text-ink-muted"
              style={{ gridRow: Number(row) + 2, gridColumn: 1, alignSelf: "center" }}
            >
              {text}
            </span>
          ))}
          {weeks.map((week, col) =>
            week.map((day, row) =>
              day ? (
                <span
                  key={day.date}
                  title={`${day.count} ${day.count === 1 ? "contribution" : "contributions"} on ${formatDay(day.date)}`}
                  className="rounded-full"
                  style={{
                    gridRow: row + 2,
                    gridColumn: col + 2,
                    width: SIZE,
                    height: SIZE,
                    backgroundColor: LEVEL_COLORS[day.level],
                  }}
                />
              ) : null,
            ),
          )}
        </div>
      </div>

      <div className="meta mt-3 flex items-center justify-end gap-2 text-ink-muted" aria-hidden="true">
        Less
        {LEVEL_COLORS.map((color) => (
          <span key={color} className="rounded-full" style={{ width: SIZE, height: SIZE, backgroundColor: color }} />
        ))}
        More
      </div>
    </div>
  );
}

/** Loading placeholder with the same footprint as the real graph. */
export function HeatmapSkeleton() {
  return (
    <div role="status" aria-label="Loading GitHub activity" className="overflow-hidden pb-3">
      <div
        className="inline-grid animate-pulse"
        style={{
          gridTemplateColumns: `repeat(53, ${SIZE}px)`,
          gridTemplateRows: `repeat(7, ${SIZE}px)`,
          gridAutoFlow: "column",
          gap: `${GAP}px`,
        }}
      >
        {Array.from({ length: 53 * 7 }, (_, i) => (
          <span key={i} className="rounded-full bg-ink/[0.07]" style={{ width: SIZE, height: SIZE }} />
        ))}
      </div>
    </div>
  );
}

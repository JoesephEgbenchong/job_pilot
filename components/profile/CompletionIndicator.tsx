type Props = {
  percentage: number;
  missingFields: string[];
};

const RADIUS = 46;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function CompletionIndicator({ percentage, missingFields }: Props) {
  if (missingFields.length === 0) {
    return null;
  }

  const offset = CIRCUMFERENCE - (percentage / 100) * CIRCUMFERENCE;

  return (
    <div className="bg-surface border border-border rounded-2xl shadow p-6 flex items-center justify-between gap-6">
      <div>
        <div className="flex items-center gap-2">
          <AlertIcon />
          <h2 className="text-base font-semibold text-text-primary">
            Profile needs attention
          </h2>
        </div>
        <p className="text-sm text-text-secondary mt-2 max-w-md">
          Complete the missing fields to improve your chance of getting tailored matches and
          generating quality resumes.
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          {missingFields.map((field) => (
            <span
              key={field}
              className="uppercase text-xs font-medium text-error bg-error/10 px-2 py-0.5 rounded-full"
            >
              {field}
            </span>
          ))}
        </div>
      </div>

      <div className="relative shrink-0 w-28 h-28">
        <svg viewBox="0 0 104 104" className="w-full h-full -rotate-90">
          <circle
            cx="52"
            cy="52"
            r={RADIUS}
            fill="none"
            strokeWidth="8"
            className="stroke-error/15"
          />
          <circle
            cx="52"
            cy="52"
            r={RADIUS}
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            className="stroke-error"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-text-primary">{percentage}%</span>
        </div>
      </div>
    </div>
  );
}

function AlertIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-error"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

// components/ui/Separator.tsx
export default function Separator() {
  return (
    <div className="w-full max-w-2xl mx-auto overflow-hidden aspect-680/48">
      <svg
        viewBox="0 0 680 80"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
      >
        <defs>
          <mask id="imagine-text-gaps-t55f3c" maskUnits="userSpaceOnUse">
            <rect x="0" y="0" width="680" height="80" fill="white" />
            <rect
              x="104"
              y="25.13"
              width="70.96"
              height="15.29"
              fill="black"
              rx="2"
            />
            <rect
              x="104"
              y="39.13"
              width="70.96"
              height="15.29"
              fill="black"
              rx="2"
            />
            <rect
              x="533.02"
              y="25.13"
              width="42.98"
              height="15.29"
              fill="black"
              rx="2"
            />
            <rect
              x="546.21"
              y="39.13"
              width="29.79"
              height="15.29"
              fill="black"
              rx="2"
            />
          </mask>
        </defs>

        <title>Section separator</title>
        <desc>
          Futuristic HUD-style section separator for Open Sky Paragliding
        </desc>

        <line
          x1="0"
          y1="40"
          x2="680"
          y2="40"
          stroke="var(--border)"
          strokeWidth="0.5"
          mask="url(#imagine-text-gaps-t55f3c)"
        />

        <polyline
          points="40,22 20,22 20,58 40,58"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points="640,22 660,22 660,58 640,58"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <line
          x1="60"
          y1="36"
          x2="60"
          y2="44"
          stroke="#38bdf8"
          strokeWidth="1.5"
          opacity="0.9"
        />
        <line
          x1="76"
          y1="38"
          x2="76"
          y2="42"
          stroke="#38bdf8"
          strokeWidth="1"
          opacity="0.5"
        />
        <line
          x1="90"
          y1="38"
          x2="90"
          y2="42"
          stroke="#38bdf8"
          strokeWidth="1"
          opacity="0.3"
        />

        <line
          x1="620"
          y1="36"
          x2="620"
          y2="44"
          stroke="#38bdf8"
          strokeWidth="1.5"
          opacity="0.9"
        />
        <line
          x1="604"
          y1="38"
          x2="604"
          y2="42"
          stroke="#38bdf8"
          strokeWidth="1"
          opacity="0.5"
        />
        <line
          x1="590"
          y1="38"
          x2="590"
          y2="42"
          stroke="#38bdf8"
          strokeWidth="1"
          opacity="0.3"
        />

        <text
          x="108"
          y="36"
          fontFamily="'Space Mono', monospace"
          fontSize="10"
          letterSpacing="1.5"
          fill="#38bdf8"
          opacity="0.5"
        >
          28.2380°N
        </text>
        <text
          x="108"
          y="50"
          fontFamily="'Space Mono', monospace"
          fontSize="10"
          letterSpacing="1.5"
          fill="#38bdf8"
          opacity="0.5"
        >
          83.9956°E
        </text>

        <text
          x="572"
          y="36"
          textAnchor="end"
          fontFamily="'Space Mono', monospace"
          fontSize="10"
          letterSpacing="1.5"
          fill="#38bdf8"
          opacity="0.5"
        >
          1592M
        </text>
        <text
          x="572"
          y="50"
          textAnchor="end"
          fontFamily="'Space Mono', monospace"
          fontSize="10"
          letterSpacing="1.5"
          fill="#38bdf8"
          opacity="0.5"
        >
          ALT
        </text>

        <polygon
          points="340,28 350,40 340,52 330,40"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1.5"
        />
        <polygon points="340,34 345,40 340,46 335,40" fill="#38bdf8" />

        <line
          x1="220"
          y1="40"
          x2="329"
          y2="40"
          stroke="#38bdf8"
          strokeWidth="1"
          opacity="0.6"
        />
        <line
          x1="351"
          y1="40"
          x2="460"
          y2="40"
          stroke="#38bdf8"
          strokeWidth="1"
          opacity="0.6"
        />

        <line
          x1="180"
          y1="40"
          x2="210"
          y2="40"
          stroke="#38bdf8"
          strokeWidth="0.75"
          strokeDasharray="3 3"
          opacity="0.35"
        />
        <line
          x1="470"
          y1="40"
          x2="500"
          y2="40"
          stroke="#38bdf8"
          strokeWidth="0.75"
          strokeDasharray="3 3"
          opacity="0.35"
        />
      </svg>
    </div>
  );
}

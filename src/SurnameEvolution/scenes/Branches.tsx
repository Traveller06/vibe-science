import React from "react";
import { useCurrentFrame } from "remotion";
import { Frame, Eyebrow, reveal } from "../components/Frame";
import { THEME } from "../theme";
export const Branches: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Frame chapter="02" label="姓与氏">
      <Eyebrow>先秦 · 周代贵族制度示意</Eyebrow>
      <div style={{ display: "flex", gap: 110, alignItems: "center" }}>
        <div style={{ fontSize: 140, fontWeight: 700 }}>姓</div>
        <div style={{ fontSize: 40, color: THEME.muted }}>较大的血缘群体</div>
      </div>
      <svg
        width="1680"
        height="310"
        style={{ position: "absolute", top: 235, left: 0 }}
      >
        <path
          d="M90 0 V80 H1250 M440 80 V170 M840 80 V170 M1250 80 V170"
          fill="none"
          stroke={THEME.red}
          strokeWidth="3"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={1 - reveal(f, 150, 220)}
        />
        {[440, 840, 1250].map((x, i) => (
          <g key={x} opacity={reveal(f, 250 + i * 55, 35)}>
            <circle cx={x} cy="170" r="7" fill={THEME.red} />
            <text
              x={x}
              y="270"
              textAnchor="middle"
              fill={THEME.text}
              fontSize="84"
            >
              氏
            </text>
          </g>
        ))}
      </svg>
      <div
        style={{
          position: "absolute",
          left: 270,
          top: 550,
          fontSize: 38,
          color: THEME.muted,
          opacity: reveal(f, 440, 40),
        }}
      >
        同一树干，也会长出不同枝条。
      </div>
    </Frame>
  );
};

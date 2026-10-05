import React from "react";
import { useCurrentFrame } from "remotion";
import { Frame, Eyebrow, reveal } from "../components/Frame";
import { THEME } from "../theme";
export const Migration: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Frame chapter="05" label="迁徙与传承">
      <Eyebrow>迁徙意象 · 非真实家族路线</Eyebrow>
      <svg
        width="1680"
        height="510"
        style={{ position: "absolute", top: 90, left: 0 }}
      >
        {[0, 1, 2, 3, 4].map((i) => {
          const t = reveal(f, 40 + i * 30, 370);
          const x = 230 + 1150 * t;
          return (
            <g key={i}>
              <path
                d={`M230 220 Q805 220 1380 ${220 + (i - 2) * 90}`}
                fill="none"
                stroke={THEME.red}
                strokeOpacity="0.35"
                strokeWidth="2"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset={1 - t}
              />
              <circle
                cx={x}
                cy={220 + (i - 2) * 90 * t * t}
                r="6"
                fill={THEME.text}
              />
              <text
                x={1380}
                y={220 + (i - 2) * 90 - 18}
                fontSize="32"
                fill={THEME.text}
                opacity={reveal(f, 390 + i * 20, 30)}
              >
                {["王", "李", "陈", "张", "刘"][i]}
              </text>
              <circle
                cx={230}
                cy={220}
                r={13 + i * 12}
                fill="none"
                stroke={THEME.red}
                strokeOpacity={0.25 + 0.1 * Math.sin(f / 25 + i)}
              />
            </g>
          );
        })}
      </svg>
      <div
        style={{
          position: "absolute",
          top: 550,
          left: 160,
          fontSize: 44,
          opacity: reveal(f, 330, 50),
        }}
      >
        人走向远方，姓留在名字里。
      </div>
    </Frame>
  );
};

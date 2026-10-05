import React from "react";
import { useCurrentFrame } from "remotion";
import { Frame, Eyebrow, reveal } from "../components/Frame";
import { THEME } from "../theme";
export const Reform: React.FC = () => {
  const f = useCurrentFrame();
  const t = reveal(f, 160, 140);
  return (
    <Frame chapter="04" label="改姓与交融">
      <Eyebrow>北魏 · 孝文帝改革</Eyebrow>
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 160,
          fontSize: 140,
          fontWeight: 700,
          opacity: 1 - 0.5 * t,
        }}
      >
        拓跋
      </div>
      <svg
        width="460"
        height="120"
        style={{ position: "absolute", left: 620, top: 235 }}
      >
        <path
          d="M0 60 H410 M380 30 L410 60 L380 90"
          fill="none"
          stroke={THEME.red}
          strokeWidth="4"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={1 - t}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          top: 160,
          right: 215,
          fontSize: 176,
          fontWeight: 700,
          color: THEME.red,
          opacity: reveal(f, 220, 80),
          transform: `scale(${0.85 + 0.15 * t})`,
        }}
      >
        元
      </div>
      <div
        style={{
          position: "absolute",
          top: 410,
          left: 160,
          fontSize: 32,
          color: THEME.muted,
        }}
      >
        皇室姓氏
      </div>
      <div
        style={{
          position: "absolute",
          top: 525,
          left: 160,
          fontSize: 44,
          opacity: reveal(f, 360, 40),
        }}
      >
        继承，也会被改写。
      </div>
      <div
        style={{
          position: "absolute",
          top: 600,
          left: 160,
          fontSize: 25,
          color: THEME.muted,
          opacity: reveal(f, 460, 30),
        }}
      >
        此处展示一个历史案例；不代表今天所有元姓具有同一祖源。
      </div>
    </Frame>
  );
};

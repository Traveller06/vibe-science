import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { FONT_FAMILY, THEME } from "../theme";
export const reveal = (frame: number, from = 0, length = 24) =>
  interpolate(frame, [from, from + length], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
export const Frame: React.FC<{
  chapter: string;
  label: string;
  children: React.ReactNode;
}> = ({ chapter, label, children }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        background: THEME.bg,
        color: THEME.text,
        fontFamily: FONT_FAMILY,
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 70% 35%, #35302a66, transparent 65%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 120,
          right: 120,
          top: 64,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
          letterSpacing: 5,
          color: THEME.muted,
        }}
      >
        <span>姓氏 / 名字之前的历史</span>
        <span>
          {chapter} / {label}
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 120,
          right: 120,
          top: 118,
          height: 1,
          background: "#f2ebdd30",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 120,
          right: 120,
          top: 165,
          height: 630,
          opacity: 0.65 + 0.35 * reveal(f, 0, 16),
          transform: `translateY(${(1 - reveal(f, 0, 16)) * 12}px)`,
        }}
      >
        {children}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 42,
          left: 120,
          fontSize: 18,
          letterSpacing: 3,
          color: "#a6aaa980",
        }}
      >
        VIBE SCIENCE · 无配音视觉预览
      </div>
    </AbsoluteFill>
  );
};
export const Eyebrow: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div
    style={{
      fontSize: 26,
      letterSpacing: 8,
      color: THEME.red,
      marginBottom: 28,
    }}
  >
    {children}
  </div>
);

import React from "react";
import { useCurrentFrame } from "remotion";
import { Frame, Eyebrow, reveal } from "../components/Frame";
import { THEME } from "../theme";
export const Convergence: React.FC = () => {
  const f = useCurrentFrame();
  const t = reveal(f, 110, 210);
  return (
    <Frame chapter="03" label="逐渐合流">
      <Eyebrow>从先秦，到秦汉</Eyebrow>
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 360 + t * 300,
          fontSize: 160,
          fontWeight: 700,
        }}
      >
        姓
      </div>
      <div
        style={{
          position: "absolute",
          top: 180,
          right: 360 + t * 300,
          fontSize: 160,
          fontWeight: 700,
          color: THEME.red,
        }}
      >
        氏
      </div>
      <div
        style={{
          position: "absolute",
          left: 210,
          right: 210,
          top: 440,
          height: 2,
          background: "#f2ebdd35",
        }}
      >
        <div
          style={{ width: `${15 + 85 * t}%`, height: 3, background: THEME.red }}
        />
        <span style={{ position: "absolute", top: 28, left: 0, fontSize: 36 }}>
          先秦
        </span>
        <span style={{ position: "absolute", top: 28, right: 0, fontSize: 36 }}>
          秦汉
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 565,
          width: "100%",
          textAlign: "center",
          fontSize: 36,
          color: THEME.muted,
          opacity: reveal(f, 350, 45),
        }}
      >
        称呼的变化背后，是社会秩序的变化。
      </div>
    </Frame>
  );
};

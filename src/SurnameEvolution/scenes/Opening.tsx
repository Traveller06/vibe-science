import React from "react";
import { useCurrentFrame } from "remotion";
import { Frame, reveal } from "../components/Frame";
import { THEME } from "../theme";
export const Opening: React.FC = () => {
  const f = useCurrentFrame();
  const settle = reveal(f, 145, 90);
  const names = ["王", "李", "张", "刘", "陈", "杨", "赵", "黄", "周", "吴"];
  return (
    <Frame chapter="01" label="一个问题">
      {names.map((n, i) => {
        const x = (i % 5) * 330 + 100;
        const y = Math.floor(i / 5) * 320 + 30;
        return (
          <div
            key={n}
            style={{
              position: "absolute",
              left: x + (800 - x) * settle,
              top: y + (270 - y) * settle,
              fontSize: 76,
              opacity: reveal(f, i * 7, 24) * Math.pow(1 - settle, 3) * 0.4,
              color: i === 0 ? THEME.red : THEME.text,
              transform: `translateY(${Math.sin((f + i * 20) / 90) * 12}px)`,
            }}
          >
            {n}
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          top: 205,
          width: "100%",
          textAlign: "center",
          fontSize: 136,
          fontWeight: 700,
          letterSpacing: 16,
        }}
      >
        你姓什么<span style={{ color: THEME.red }}>？</span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 420,
          width: "100%",
          textAlign: "center",
          fontSize: 42,
          color: THEME.muted,
          opacity: reveal(f, 245, 35),
        }}
      >
        一个字，如何穿过千年，来到你身上。
      </div>
      <div
        style={{
          position: "absolute",
          top: 550,
          left: 800,
          width: 80 * reveal(f, 290, 80),
          height: 4,
          background: THEME.red,
        }}
      />
    </Frame>
  );
};

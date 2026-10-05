import React from "react";
import { useCurrentFrame } from "remotion";
import { Frame, reveal } from "../components/Frame";
import { THEME } from "../theme";
export const Closing: React.FC = () => {
  const f = useCurrentFrame();
  const t = reveal(f, 0, 120);
  return (
    <Frame chapter="06" label="回到你我">
      {["王", "李", "张", "刘", "陈", "杨", "赵"].map((n, i) => (
        <div
          key={n}
          style={{
            position: "absolute",
            left: 160 + i * 210,
            top: 90 + 100 * t,
            fontSize: 62,
            color: THEME.muted,
            opacity: (1 - t) * 0.55,
          }}
        >
          {n}
        </div>
      ))}
      <div
        style={{
          position: "absolute",
          top: 210,
          width: "100%",
          textAlign: "center",
          fontSize: 110,
          fontWeight: 700,
          letterSpacing: 8,
        }}
      >
        名字之前，<span style={{ color: THEME.red }}>是历史。</span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 390,
          width: "100%",
          textAlign: "center",
          fontSize: 38,
          color: THEME.muted,
          opacity: reveal(f, 100, 40),
        }}
      >
        你的姓，又从哪里来？
      </div>
      <div
        style={{
          position: "absolute",
          top: 540,
          width: "100%",
          textAlign: "center",
          fontSize: 22,
          lineHeight: 1.7,
          color: THEME.muted,
          opacity: reveal(f, 170, 30),
        }}
      >
        资料：闫爱民《秦汉族制与胡亥母族研究举隅》（2022）
        <br />
        人民日报 / 新华网（2017） · 盐田档案与史志信息网
        <br />
        完整链接与史实边界见项目文档
      </div>
    </Frame>
  );
};

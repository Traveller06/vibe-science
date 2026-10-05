import React from "react";
import { CAPTIONS } from "../script";
import { FONT_FAMILY, THEME } from "../theme";
export const Captions: React.FC<{ frame: number }> = ({ frame }) => {
  const cue = CAPTIONS.find((c) => frame >= c.start && frame < c.end);
  return (
    <div
      style={{
        position: "absolute",
        left: 120,
        right: 120,
        top: 848,
        height: 148,
        borderTop: "1px solid #f2ebdd30",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: THEME.text,
        fontFamily: FONT_FAMILY,
        fontSize: 44,
        lineHeight: 1.55,
        textAlign: "center",
        padding: "14px 48px",
        boxSizing: "border-box",
      }}
    >
      <span>{cue?.text}</span>
    </div>
  );
};

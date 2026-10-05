import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { Captions } from "./components/Captions";
import { Opening } from "./scenes/Opening";
import { Branches } from "./scenes/Branches";
import { Convergence } from "./scenes/Convergence";
import { Reform } from "./scenes/Reform";
import { Migration } from "./scenes/Migration";
import { Closing } from "./scenes/Closing";
export const SurnameEvolution: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={450} name="01 你姓什么">
        <Opening />
      </Sequence>
      <Sequence from={450} durationInFrames={750} name="02 姓与氏">
        <Branches />
      </Sequence>
      <Sequence from={1200} durationInFrames={600} name="03 秦汉合流">
        <Convergence />
      </Sequence>
      <Sequence from={1800} durationInFrames={750} name="04 改姓与交融">
        <Reform />
      </Sequence>
      <Sequence from={2550} durationInFrames={690} name="05 迁徙与传承">
        <Migration />
      </Sequence>
      <Sequence from={3240} durationInFrames={360} name="06 名字之前">
        <Closing />
      </Sequence>
      <Captions frame={frame} />
    </AbsoluteFill>
  );
};

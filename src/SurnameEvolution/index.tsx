import { SCENES } from "./script";
import React from "react";
import {
  AbsoluteFill,
  Audio,
  staticFile,
  Sequence,
  useCurrentFrame,
} from "remotion";
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
      <Sequence durationInFrames={SCENES[0].duration} name="01 你姓什么">
        <Opening />
      </Sequence>
      <Sequence
        from={SCENES[1].start}
        durationInFrames={SCENES[1].duration}
        name="02 姓与氏"
      >
        <Branches />
      </Sequence>
      <Sequence
        from={SCENES[2].start}
        durationInFrames={SCENES[2].duration}
        name="03 秦汉合流"
      >
        <Convergence />
      </Sequence>
      <Sequence
        from={SCENES[3].start}
        durationInFrames={SCENES[3].duration}
        name="04 改姓与交融"
      >
        <Reform />
      </Sequence>
      <Sequence
        from={SCENES[4].start}
        durationInFrames={SCENES[4].duration}
        name="05 迁徙与传承"
      >
        <Migration />
      </Sequence>
      <Sequence
        from={SCENES[5].start}
        durationInFrames={SCENES[5].duration}
        name="06 名字之前"
      >
        <Closing />
      </Sequence>
      <Captions frame={frame} />
      <Audio src={staticFile("surname/soundtrack.ogg")} />
    </AbsoluteFill>
  );
};

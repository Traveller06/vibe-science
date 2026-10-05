import { FPS, SCENES, TOTAL_FRAMES } from "./SurnameEvolution/script";
import { SurnameEvolution } from "./SurnameEvolution";
import { Opening } from "./SurnameEvolution/scenes/Opening";
import { Branches } from "./SurnameEvolution/scenes/Branches";
import { Convergence } from "./SurnameEvolution/scenes/Convergence";
import { Reform } from "./SurnameEvolution/scenes/Reform";
import { Migration } from "./SurnameEvolution/scenes/Migration";
import { Closing } from "./SurnameEvolution/scenes/Closing";
import { Composition, Folder } from "remotion";
import { HelloWorld } from "./HelloWorld";
import { Logo } from "./HelloWorld/Logo";
import { Title } from "./HelloWorld/Title";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SurnameEvolution"
        component={SurnameEvolution}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Folder name="SurnameScenes">
        <Composition
          id="SurnameOpening"
          component={Opening}
          durationInFrames={SCENES[0].duration}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="SurnameBranches"
          component={Branches}
          durationInFrames={SCENES[1].duration}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="SurnameConvergence"
          component={Convergence}
          durationInFrames={SCENES[2].duration}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="SurnameReform"
          component={Reform}
          durationInFrames={SCENES[3].duration}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="SurnameMigration"
          component={Migration}
          durationInFrames={SCENES[4].duration}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="SurnameClosing"
          component={Closing}
          durationInFrames={SCENES[5].duration}
          fps={FPS}
          width={1920}
          height={1080}
        />
      </Folder>
      <Folder name="Elements">
        <Composition
          id="Logo"
          component={Logo}
          durationInFrames={150}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            logoColor1: "#91EAE4",
            logoColor2: "#86A8E7",
          }}
        />
        <Composition
          id="Title"
          component={Title}
          durationInFrames={115}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            titleText: "Welcome to Remotion",
            titleColor: "#000000",
          }}
        />
      </Folder>
      <Composition
        // You can take the "id" to render a video:
        // bunx remotion render HelloWorld
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
        }}
      />
    </>
  );
};

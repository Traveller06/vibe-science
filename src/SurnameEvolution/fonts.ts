import { useEffect, useState } from "react";
import {
  cancelRender,
  continueRender,
  delayRender,
  staticFile,
} from "remotion";
let fontReady: Promise<void> | undefined;
export const useSurnameFont = () => {
  const [handle] = useState(() => delayRender("Loading bundled Chinese font"));
  useEffect(() => {
    if (!fontReady) {
      const font = new FontFace(
        "Surname CJK",
        `url(${staticFile("surname/SurnameCJK.woff2")})`,
      );
      fontReady = font.load().then((loaded) => {
        document.fonts.add(loaded);
      });
    }
    fontReady.then(() => continueRender(handle)).catch(cancelRender);
  }, [handle]);
};

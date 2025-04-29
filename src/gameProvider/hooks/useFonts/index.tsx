import { useCallback } from "react";

import fts from "../../../GameDevSoftware/fonts.json";
import { GameProviderHooksDefaultInterface } from "..";
import { FontObject } from "../../../types";

const fonts: FontObject[] = fts as FontObject[];

export interface useFontsInterface
  extends GameProviderHooksDefaultInterface,
    ReturnType<typeof useFonts> {}

const useFonts = () => {
  const fontExist = useCallback(
    (key: string) => !!fonts.find((font) => font.key === key),
    []
  );

  const FontStyle = useCallback(
    () => (
      <style
        dangerouslySetInnerHTML={{
          __html: fonts
            .map((font) => {
              return `
      @font-face {
        font-family: ${font.key};
        src: url('assets/fonts/${font.file}') format('${font.format}');
      }`;
            })
            .join(" "),
        }}
      />
    ),
    []
  );

  return {
    loaded: true,
    fonts,
    fontExist,
    FontStyle,
  };
};

export default useFonts;

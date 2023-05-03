import { useCallback } from "react";
import fonts from "../../../GameDevSoftware/fonts.json";
import { GameProviderHooksDefaultInterface } from "..";

export interface useuseFontsInterface
  extends GameProviderHooksDefaultInterface,
    ReturnType<typeof useFonts> {}

const useFonts = () => {
  const fontExist = useCallback(
    (key: string) => !!fonts.find((font) => font.key === key),
    []
  );

  const FontStyle = () => (
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
  );

  return {
    loaded: true,
    fonts,
    fontExist,
    FontStyle,
  };
};

export default useFonts;

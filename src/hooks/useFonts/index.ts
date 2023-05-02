import { useCallback } from "react";
import fonts from "../../GameDevSoftware/fonts.json";

const useFonts = () => {
  const fontExist = useCallback(
    (key: string) => !!fonts.find((font) => font.key === key),
    []
  );

  return {
    fonts,
    fontExist,
  };
};

export default useFonts;

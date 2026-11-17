import { useGameProvider } from "../../../../../gameProvider";
import { ColorModeTypes } from "../../../../../types";

type AnswerColors = { correct: string; incorrect: string };

const DEFAULT_ANSWER_COLORS: AnswerColors = {
  correct: "#1b5e20",
  incorrect: "#b71c1c",
};

const LIGHT_ANSWER_COLORS: AnswerColors = {
  correct: "#81c784",
  incorrect: "#ff8a80",
};

const ANSWER_COLORS_BY_MODE: Partial<Record<ColorModeTypes, AnswerColors>> = {
  "high-contrast": LIGHT_ANSWER_COLORS,
};

const useAnswerColors = (): AnswerColors => {
  const {
    parameters: { colorMode },
  } = useGameProvider();

  return ANSWER_COLORS_BY_MODE[colorMode ?? "normal"] ?? DEFAULT_ANSWER_COLORS;
};

export default useAnswerColors;

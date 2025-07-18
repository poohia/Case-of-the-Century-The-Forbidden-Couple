import { useMemo } from "react";

import { useGameProvider } from "../../gameProvider";
import styled from "styled-components";
import { SizeTextTypes } from "../../types";

type TranslationComponentProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
> & {
  id: string;
  values?: { key: string; value: string }[];
  defaultValue?: string;
  capitalize?: boolean;
  toLowercase?: boolean;
  toUppercase?: boolean;
};

export const TranslationComponentSpan = styled.span<{
  $sizeText: SizeTextTypes;
}>`
  font-size: ${({ $sizeText }) => {
    switch ($sizeText) {
      case "small":
        return "70%";
      case "tall":
        return "140%";
      case "normal":
      default:
        return "100%";
    }
  }};
`;

const TranslationComponent = (props: TranslationComponentProps) => {
  const {
    id,
    defaultValue = id,
    values = [],
    toLowercase = false,
    toUppercase = false,
    capitalize = !toLowercase && !toUppercase,
    ...rest
  } = props;
  const {
    parameters: { sizeText = "normal" },
    translateText,
  } = useGameProvider();

  const options = useMemo(
    () => ({ capitalize, toLowercase, toUppercase }),
    [capitalize, toLowercase, toUppercase]
  );

  if (!id) {
    console.warn(`Translation not found ${id}`);
    return <div>Translation not found</div>;
  }

  return (
    // @ts-ignore
    <TranslationComponentSpan $sizeText={sizeText} {...rest}>
      {translateText(id, values, defaultValue, options)}
    </TranslationComponentSpan>
  );
};

export default TranslationComponent;

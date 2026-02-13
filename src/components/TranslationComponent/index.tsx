import { useMemo } from "react";
import styled from "styled-components";

import { useGameProvider } from "../../gameProvider";

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

export const TranslationComponentSpan = styled.span`
  font-size: var(--font-size);
`;

function isValidHtmlId(value: string): boolean {
  if (!value) {
    return false;
  }

  const idRegex = /^[A-Za-z][A-Za-z0-9\-_]*$/;

  return idRegex.test(value);
}

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
  const { translateText } = useGameProvider();

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
    <TranslationComponentSpan id={isValidHtmlId(id) ? id : undefined} {...rest}>
      {translateText(id, values, defaultValue, options)}
    </TranslationComponentSpan>
  );
};

export default TranslationComponent;

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
  srOnly?: boolean;
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
    srOnly = false,
    className: classList = "",
    ...rest
  } = props;
  const {
    parameters: { screenReaderEnabled },
    translateText,
  } = useGameProvider();

  const options = useMemo(
    () => ({ capitalize, toLowercase, toUppercase }),
    [capitalize, toLowercase, toUppercase]
  );

  const text = useMemo(() => {
    return translateText(id, values, defaultValue, options);
  }, [id, translateText]);

  const idHTML = useMemo(() => {
    if (isValidHtmlId(id)) {
      return id;
    }
    return undefined;
  }, [id]);

  const className = useMemo(() => {
    let c = classList;
    if (srOnly) {
      c += "sr-only";
    }
    return c;
  }, [classList, srOnly]);

  if (!id) {
    return <div>Translation not found</div>;
  }

  if (/<\/?[a-z][\s\S]*>/i.test(text)) {
    return (
      // @ts-ignore
      <TranslationComponentSpan
        id={idHTML}
        className={className}
        {...rest}
        dangerouslySetInnerHTML={{
          __html: text,
        }}
      />
    );
  }

  if (screenReaderEnabled && !srOnly) {
    return <>{text}</>;
  }

  return (
    // @ts-ignore
    <TranslationComponentSpan id={idHTML} className={className} {...rest}>
      {text}
    </TranslationComponentSpan>
  );
};

export default TranslationComponent;

import { useState, useEffect } from "react";
import { useGameProvider } from "../../gameProvider";

type TranslationComponentProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
> & {
  id: string;
  values?: { key: string; value: string }[];
  defaultValue?: string;
};

const TranslationComponent = (props: TranslationComponentProps) => {
  const { id, defaultValue = id, values = [], ...rest } = props;
  const { translateText } = useGameProvider();

  return <span {...rest}>{translateText(id, values, defaultValue)}</span>;
};

export default TranslationComponent;

import { useMemo } from "react";
import { useGameProvider } from "../../../../../gameProvider";
import { TranslationComponent } from "../../../../../components";

const TextVersionComponent: React.FC = () => {
  const { getValueFromConstant } = useGameProvider();
  const version = useMemo(() => getValueFromConstant("app_version"), []);
  return <span>{version}</span>;
};

export default TextVersionComponent;

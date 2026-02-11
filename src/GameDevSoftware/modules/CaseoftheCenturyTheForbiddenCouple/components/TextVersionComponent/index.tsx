import { useMemo } from "react";

import { useGameProvider } from "../../../../../gameProvider";

const TextVersionComponent: React.FC = () => {
  const { getValueFromConstant } = useGameProvider();
  const version = useMemo(() => getValueFromConstant("app_version"), []);
  return <span aria-hidden="true">{version}</span>;
};

export default TextVersionComponent;

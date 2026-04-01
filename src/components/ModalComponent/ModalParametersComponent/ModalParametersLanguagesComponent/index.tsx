import styled from "styled-components";
import { useMemo } from "react";

import ModalComponent, { ModalChildrenParametersComponentProps } from "../..";
import { useGameProvider } from "../../../../gameProvider";
import { ButtonClassicType } from "../../../ButtonClassicComponent";
import ButtonClassicGroupComponent, {
  ButtonClassicGroupComponentProps,
} from "../../../ButtonClassicGroupComponent";

const ModalParametersComponentContainer = styled.div``;

export const ParametersLanguagesComponent: React.FC<{
  open: boolean;
  buttonsDirection?: ButtonClassicGroupComponentProps["direction"];
  delayBetweenButtons?: ButtonClassicGroupComponentProps["delayBetweenButtons"];
}> = ({ open, buttonsDirection, delayBetweenButtons }) => {
  const {
    parameters: { locale },
    languages,
    switchLanguage,
  } = useGameProvider();

  const buttonsAction = useMemo<ButtonClassicType[]>(
    () =>
      languages.map((l) => ({
        key: l.code,
        activate: l.code === locale,
        idText: `language-${l.code}`,
      })),
    [locale]
  );

  return (
    <ModalParametersComponentContainer>
      <ButtonClassicGroupComponent
        buttons={buttonsAction}
        show={open}
        direction={buttonsDirection}
        delayBetweenButtons={delayBetweenButtons}
        onClick={(key: string) => {
          switchLanguage(key);
        }}
      />
    </ModalParametersComponentContainer>
  );
};

const ModalParametersLanguagesComponent: React.FC<
  ModalChildrenParametersComponentProps
> = (props) => {
  const { open, ...rest } = props;
  return (
    <ModalComponent
      title="parameters_languages"
      open={open}
      size="small"
      isChildren
      {...rest}
    >
      <ParametersLanguagesComponent open={open} />
    </ModalComponent>
  );
};

export default ModalParametersLanguagesComponent;

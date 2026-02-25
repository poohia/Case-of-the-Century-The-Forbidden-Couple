import styled from "styled-components";
import { useMemo } from "react";

import ModalComponent from "../../components/ModalComponent";
import { ButtonClassicType } from "../../types";
import { useGameProvider } from "../../../../../gameProvider";
import { ModalParametersComponentProps } from "../ModalParametersComponent";
import languages from "../../../../languages.json";
import { ButtonClassicGroupComponent } from "../../../../../components";

const ModalParametersComponentContainer = styled.div`
  padding: 10px;
  overflow-y: auto;
`;

const ModalParametersLanguagesComponent: React.FC<
  ModalParametersComponentProps
> = (props) => {
  const { open, ...rest } = props;
  const {
    parameters: { locale },
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
    <ModalComponent
      title="parameters_languages"
      open={open}
      size="small"
      isChildren
      {...rest}
    >
      <ModalParametersComponentContainer>
        <ButtonClassicGroupComponent
          buttons={buttonsAction}
          show={open}
          onClick={(key: string) => {
            switchLanguage(key);
          }}
        />
      </ModalParametersComponentContainer>
    </ModalComponent>
  );
};

export default ModalParametersLanguagesComponent;

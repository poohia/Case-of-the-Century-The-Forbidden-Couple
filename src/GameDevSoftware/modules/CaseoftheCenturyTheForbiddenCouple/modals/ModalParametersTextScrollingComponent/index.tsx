import styled from "styled-components";
import { useMemo } from "react";

import ModalComponent from "../../components/ModalComponent";
import { ButtonClassicType } from "../../types";
import { useGameProvider } from "../../../../../gameProvider";
import { ModalParametersComponentProps } from "../ModalParametersComponent";
import {
  ButtonClassicGroupComponent,
  TranslationComponent,
} from "../../../../../components";

const ModalParametersComponentContainer = styled.div`
  padding: 10px;
  text-align: center;
  height: calc(100% - 20px) !important;
  > span {
    font-style: italic;
  }
  > div {
    margin-top: 10px;
  }
`;

const ModalParametersTextScrollingComponent: React.FC<
  ModalParametersComponentProps
> = (props) => {
  const { open, ...rest } = props;
  const {
    parameters: { textScrolling },
    setParamsValue,
  } = useGameProvider();

  const buttonsAction = useMemo<ButtonClassicType[]>(
    () => [
      {
        key: "0",
        idText: "message_1749545884163",
        activate: textScrolling === "0" || textScrolling === undefined,
        animate: true,
      },
      {
        key: "1",
        idText: "message_1749547027918",
        activate: textScrolling === "1",
        animate: true,
      },
      {
        key: "2",
        idText: "Normal",
        activate: textScrolling === "2",
        animate: true,
      },
      {
        key: "3",
        idText: "Rapide",
        activate: textScrolling === "3",
        animate: true,
      },
    ],
    [textScrolling]
  );

  return (
    <ModalComponent
      title="parameters_dialogue_speed"
      idDescription="message_1749555349096"
      open={open}
      size="small"
      isChildren
      {...rest}
    >
      <ModalParametersComponentContainer>
        <TranslationComponent id="message_1749555349096" />
        <ButtonClassicGroupComponent
          buttons={buttonsAction}
          show={open}
          onClick={(key: string) => {
            setParamsValue("textScrolling", key);
          }}
        />
      </ModalParametersComponentContainer>
    </ModalComponent>
  );
};

export default ModalParametersTextScrollingComponent;

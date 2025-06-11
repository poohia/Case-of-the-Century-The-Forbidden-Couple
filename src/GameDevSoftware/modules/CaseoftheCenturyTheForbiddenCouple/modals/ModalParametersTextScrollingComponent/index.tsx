import styled from "styled-components";
import { useMemo } from "react";

import ModalComponent from "../../components/ModalComponent";
import { ButtonClassicType } from "../../types";
import ButtonClassicGroupComponent from "../../components/ButtonClassicGroupComponent";
import { useGameProvider } from "../../../../../gameProvider";
import { ModalParametersComponentProps } from "../ModalParametersComponent";
import { TranslationComponent } from "../../../../../components";

const ModalParametersComponentContainer = styled.div`
  padding: 10px;
  overflow-y: auto;
  text-align: center;
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
      },
      {
        key: "1",
        idText: "message_1749547027918",
        activate: textScrolling === "1",
      },
      {
        key: "2",
        idText: "Normal",
        activate: textScrolling === "2",
      },
      {
        key: "3",
        idText: "Rapide",
        activate: textScrolling === "3",
      },
    ],
    [textScrolling]
  );

  return (
    <ModalComponent
      title="message_1749545275975"
      open={open}
      size="small"
      {...rest}
    >
      <ModalParametersComponentContainer>
        <TranslationComponent id="message_1749555349096" />
        <ButtonClassicGroupComponent
          buttons={buttonsAction}
          show={open}
          delayBetweenButtons={0}
          onClick={(key: string) => {
            console.log("🚀 ~ key:", key);
            setParamsValue("textScrolling", key);
            switch (key) {
              case "0":
                break;
              case "1":
                break;
              case "2":
                break;
              case "3":
                break;
            }
          }}
        />
      </ModalParametersComponentContainer>
    </ModalComponent>
  );
};

export default ModalParametersTextScrollingComponent;

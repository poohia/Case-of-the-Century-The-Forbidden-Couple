import { useContext, useEffect } from "react";
import { TranslationComponent } from "../../../../../components";
import { useGameProvider } from "../../../../../gameProvider";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import { ModalContainer } from "./styled/Modal";
import styled from "styled-components";
import RetrospaceadventureButtonComponent from "./styled/RetrospaceadventureButtonComponent";

const MessageInfoContainer = styled(ModalContainer)`
  text-align: center;
  > p {
    margin: 0;
    text-transform: capitalize;
    color: white;
    &:first-child {
      font-size: 6rem;
    }
  }
`;

const MessageInfoActionLooseContainer = styled.div`
  width: 40%;
  max-width: 300px;
`;

const MessageInfoActionWinContainer = styled.div`
  color: white;
  font-size: 0.9rem;
`;

const RetrospacegameadventurefightMessageInfo: React.FC = () => {
  const { push, nextScene } = useGameProvider();

  const {
    messageFightInfoStatus,
    stateGame: { nbTurn, turn },
    nextSceneId,
  } = useContext(RetrospaceadventureGameContext);

  useEffect(() => {
    if (messageFightInfoStatus === "win") {
      setTimeout(() => {
        nextScene(nextSceneId);
      }, 5000);
    }
  }, [messageFightInfoStatus]);

  if (!messageFightInfoStatus) return <></>;
  return (
    <MessageInfoContainer>
      <p>
        <TranslationComponent
          id={`retrospaceadventure_message_fight_info_status_${messageFightInfoStatus.toLowerCase()}`}
        />
      </p>
      {messageFightInfoStatus === "fight" && (
        <p className="animate__animated animate__bounceInLeft">
          <TranslationComponent
            id="retrospaceadventure_max_turns"
            values={[{ key: "nbTurn", value: nbTurn.toString() }]}
          />
        </p>
      )}
      {messageFightInfoStatus === "nextTurn" && (
        <p className="animate__animated animate__bounceInLeft">
          <TranslationComponent
            id="retrospaceadventure_fight_turn"
            values={[
              {
                key: "turn",
                value: turn.toString(),
              },
              { key: "nbTurn", value: nbTurn.toString() },
            ]}
          />
        </p>
      )}
      {messageFightInfoStatus === "loose" && (
        <MessageInfoActionLooseContainer>
          <RetrospaceadventureButtonComponent
            direction="secondary"
            fluid
            onClick={() => push("home")}
            text="retrospaceadventure_label_back_home"
            className="animate__animated animate__bounceInLeft"
          />
        </MessageInfoActionLooseContainer>
      )}
      {messageFightInfoStatus === "win" && (
        <MessageInfoActionWinContainer className="animate__animated animate__bounceInLeft">
          <TranslationComponent id="retrospaceadventure_fight_scene_win_info" />
        </MessageInfoActionWinContainer>
      )}
    </MessageInfoContainer>
  );
};

export default RetrospacegameadventurefightMessageInfo;

import { useContext } from "react";
import { TranslationComponent } from "../../../../../components";
import { useGameProvider } from "../../../../../gameProvider";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import { ModalContainer } from "./styled/Modal";
import styled from "styled-components";

const MessageInfoContainer = styled(ModalContainer)`
  > p {
    margin: 0;
    text-transform: capitalize;
    color: white;
    &:first-child {
      font-size: 6rem;
    }
  }
`;

const RetrospacegameadventurefightMessageInfo: React.FC = () => {
  const { push, nextScene } = useGameProvider();

  const {
    messageFightInfoStatus,
    stateGame: { nbTurn, turn },
    nextSceneId,
  } = useContext(RetrospaceadventureGameContext);

  if (!messageFightInfoStatus) return <></>;
  return (
    <MessageInfoContainer>
      <p className="animate__animated animate__bounceInLeft">
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
      {(messageFightInfoStatus === "loose" ||
        messageFightInfoStatus === "win") && (
        <div>
          <button onClick={() => push("home")}>
            <TranslationComponent id="retrospaceadventure_label_back_home" />
          </button>
          <button onClick={() => nextScene(nextSceneId)}>NextScene</button>
        </div>
      )}
    </MessageInfoContainer>
  );
};

export default RetrospacegameadventurefightMessageInfo;

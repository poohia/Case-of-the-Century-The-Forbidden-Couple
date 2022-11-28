import { useContext } from "react";
import { TranslationComponent } from "../../../../../components";
import { useGameProvider } from "../../../../../gameProvider";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import { ModalContainer } from "./styled/Modal";

const RetrospacegameadventurefightMessageInfo: React.FC = () => {
  const { push } = useGameProvider();
  const { messageFightInfoStatus } = useContext(RetrospaceadventureGameContext);

  if (!messageFightInfoStatus) return <></>;
  return (
    <ModalContainer>
      <p className="animate__animated animate__bounceInLeft">
        <TranslationComponent id={`${messageFightInfoStatus}`} />
      </p>
      {(messageFightInfoStatus === "loose" ||
        messageFightInfoStatus === "win") && (
        <div>
          <button onClick={() => push("home")}>Return to home</button>
        </div>
      )}
    </ModalContainer>
  );
};

export default RetrospacegameadventurefightMessageInfo;

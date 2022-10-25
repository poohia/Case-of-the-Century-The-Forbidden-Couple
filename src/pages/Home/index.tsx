// import objects from "./GameDevSoftware/gameObjects/index.json";
import { useGameProvider } from "../../gameProvider";
import { PageComponent, TranslationComponent } from "../../components";

const Home = () => {
  const { canContinue, startNewGame, startGame, push } = useGameProvider();
  return (
    <PageComponent>
      <button onClick={() => startNewGame()}>
        <TranslationComponent id="start_game" />
      </button>
      <button onClick={() => startGame()} disabled={!canContinue}>
        Continue
      </button>
      <button onClick={() => push("parameters")}>Parameters</button>
    </PageComponent>
  );
};

export default Home;

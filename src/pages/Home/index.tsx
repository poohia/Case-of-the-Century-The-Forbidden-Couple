// import objects from "./GameDevSoftware/gameObjects/index.json";
import { useGameProvider } from "../../gameProvider";
import { PageComponent, TranslationComponent } from "../../components";

const Home = () => {
  const { canContinue, startNewGame, startGame, push } = useGameProvider();
  return (
    <PageComponent>
      <div>
        <button onClick={() => startNewGame()}>
          <TranslationComponent id="label_start_game" />
        </button>
        <button onClick={() => startGame()} disabled={!canContinue}>
          <TranslationComponent id="label_continue" />
        </button>
        <button onClick={() => push("parameters")}>
          <TranslationComponent id="parameters_title" />
        </button>
      </div>
    </PageComponent>
  );
};

export default Home;

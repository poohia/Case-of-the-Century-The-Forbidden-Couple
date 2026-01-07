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
        <button onClick={() => push("saves")}>
          <TranslationComponent id="label_saves" />
        </button>
        <button onClick={() => push("endDemo")}>
          <TranslationComponent id="label_end_demo" />
        </button>
        <button onClick={() => push("credits")}>
          <TranslationComponent id="label_credits" />
        </button>
      </div>
    </PageComponent>
  );
};

export default Home;

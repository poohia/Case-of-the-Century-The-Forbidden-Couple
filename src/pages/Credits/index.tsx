import { useGameProvider } from "../../gameProvider";
import { PageComponent, TranslationComponent } from "../../components";

const Credits = () => {
  const { push } = useGameProvider();
  return (
    <PageComponent>
      <div>
        Credits
        <button onClick={() => push("home")}>
          <TranslationComponent id="label_back_home" />
        </button>
      </div>
    </PageComponent>
  );
};

export default Credits;

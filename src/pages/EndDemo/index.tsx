import { useGameProvider } from "../../gameProvider";
import { PageComponent, TranslationComponent } from "../../components";

const EndDemo = () => {
  const { push } = useGameProvider();
  return (
    <PageComponent>
      <div>
        End Demo
        <button onClick={() => push("home")}>
          <TranslationComponent id="label_back_home" />
        </button>
      </div>
    </PageComponent>
  );
};

export default EndDemo;

import { useCallback, useMemo, useState } from "react";

import { useGameProvider } from "../../gameProvider";
import { ButtonClassicGroupComponent, PageComponent } from "../../components";
import { ButtonClassicType } from "../../components/ButtonClassicComponent";
import ParametersComponent from "../../components/ModalComponent/ModalParametersComponent";

const Home = () => {
  const { canContinue, startNewGame, startGame, push } = useGameProvider();
  const [showParameters, setShowParameters] = useState<boolean>(false);
  const buttonsAction = useMemo<ButtonClassicType[]>(() => {
    const buttons = [
      {
        key: "start_game",
        idText: "label_start_game",
        animate: true,
      },
      {
        key: "continue",
        idText: "label_continue",
        disabled: !canContinue,
        animate: true,
      },
      {
        key: "parameters",
        idText: "parameters_title",
        animate: true,
      },
      {
        key: "saves",
        idText: "label_saves",
        animate: true,
      },
      {
        key: "end_demo",
        idText: "label_end_demo",
        animate: true,
      },
      {
        key: "credits",
        idText: "label_credits",
        animate: true,
      },
    ];
    return buttons;
  }, [canContinue]);

  const handleClickButtonAction = useCallback((key: string) => {
    switch (key) {
      case "start_game":
        startNewGame();
        break;
      case "continue":
        startGame();
        break;
      case "parameters":
        setShowParameters(true);
        break;
      case "saves":
        push("saves");
        break;
      case "end_demo":
        push("endDemo");
        break;
      case "credits":
        push("credits");
        break;
    }
  }, []);

  return (
    <PageComponent>
      <div>
        <ButtonClassicGroupComponent
          buttons={buttonsAction}
          show
          onClick={handleClickButtonAction}
        />
      </div>
      <ParametersComponent
        open={showParameters}
        onClose={() => {
          setShowParameters(false);
        }}
      />
    </PageComponent>
  );
};

export default Home;

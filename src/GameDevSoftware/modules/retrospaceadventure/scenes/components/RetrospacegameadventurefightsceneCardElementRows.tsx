import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import { GameReducerActionData } from "../reducers/gameReducer";
import { ContainerRowFightCenter } from "./RetrospacegameadventurefightsceneStyledComponents";
import CardElement from "./styled/CardElement";

const RetrospacegameadventurefightsceneCardElementRows: React.FC = () => {
  return (
    <RetrospaceadventureGameContext.Consumer>
      {({ dispatchGame }) => (
        <ContainerRowFightCenter>
          <CardElement
            element={1}
            onClick={(heroElementSelect) =>
              dispatchGame({
                type: "selectElement",
                data: {
                  heroElementSelect,
                } as GameReducerActionData,
              })
            }
          />

          <br />
          <CardElement
            element={2}
            onClick={(heroElementSelect) =>
              dispatchGame({
                type: "selectElement",
                data: {
                  heroElementSelect,
                } as GameReducerActionData,
              })
            }
          />
          <br />
          <CardElement
            element={3}
            onClick={(heroElementSelect) =>
              dispatchGame({
                type: "selectElement",
                data: {
                  heroElementSelect,
                } as GameReducerActionData,
              })
            }
          />
        </ContainerRowFightCenter>
      )}
    </RetrospaceadventureGameContext.Consumer>
  );
};

export default RetrospacegameadventurefightsceneCardElementRows;

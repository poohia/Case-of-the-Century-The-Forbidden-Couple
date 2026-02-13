import styled from "styled-components";
import { useContext, useEffect } from "react";

import { ImgComponent, TranslationComponent } from "../../../../../components";
import { ScenarioInterface } from "../../../../game-types";
import ModalComponent from "../../components/ModalComponent";
import { ModalParametersComponentProps } from "../ModalParametersComponent";
import UnlockContext from "../../contexts/UnlockContext";

export const ModalParametersScenariosScenarioComponentContainer = styled.div`
  font-size: ${({ theme }) => theme.fonts.size};
  line-height: ${({ theme }) => theme.fonts.lineHeight};
  img {
    float: right;

    margin-left: 20px;
    margin-bottom: 10px;

    width: 250px;
    height: auto;
    object-fit: contain;
  }
  p span {
    line-height: ${({ theme }) => theme.fonts.lineHeight};
  }
  overflow: auto;
`;

const ModalParametersScenariosScenarioComponent: React.FC<
  ModalParametersComponentProps & { scenario: ScenarioInterface | null }
> = (props) => {
  const { open, scenario, ...rest } = props;
  const { removeScenarioNotify } = useContext(UnlockContext);

  useEffect(() => {
    if (scenario && open) {
      removeScenarioNotify(scenario._id);
    }
  }, [open, scenario]);

  return (
    <ModalComponent
      open={open}
      size="default"
      title={scenario?.name}
      isChildren
      {...rest}
    >
      <ModalParametersScenariosScenarioComponentContainer>
        {scenario && (
          <div>
            <ImgComponent src="scenario.png" forceMaxSize aria-hidden="true" />

            <section>
              {scenario.blocks?.map((block, i) => (
                <p key={`scenario-${scenario._id}-block-${i}`}>
                  <TranslationComponent id={block.content} />
                </p>
              ))}
            </section>
          </div>
        )}
      </ModalParametersScenariosScenarioComponentContainer>
    </ModalComponent>
  );
};

export default ModalParametersScenariosScenarioComponent;

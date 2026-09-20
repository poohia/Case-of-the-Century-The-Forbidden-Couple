import { useContext, useEffect } from "react";

import styled from "styled-components";

import { ImgComponent, TranslationComponent } from "../../../../../components";
import { ScenarioInterface } from "../../../../game-types";
import UnlockContext from "../../contexts/UnlockContext";
import ModalComponent, {
  ModalChildrenParametersComponentProps,
} from "../../../../../components/ModalComponent";
import { useGameObjects } from "../../../../../hooks";

const getGameObjectId = (reference: string) =>
  Number(reference.replace("@go:", ""));

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

const ScenarioReferences = styled.footer`
  clear: both;
  display: grid;
  gap: 6px;
  margin-top: 20px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.16);

  > div {
    display: inline;
    margin-top: 2px;
    margin-bottom: 2px;
  }

  strong {
    margin-right: 4px;
  }
`;

const ModalParametersScenariosScenarioComponent: React.FC<
  ModalChildrenParametersComponentProps & { scenario: ScenarioInterface | null }
> = (props) => {
  const { open, scenario, ...rest } = props;
  const { removeScenarioNotify } = useContext(UnlockContext);
  const { getGameObject } = useGameObjects();

  const characterTitles =
    scenario?.personnages
      ?.map(
        ({ character }) => getGameObject(getGameObjectId(character))?._title
      )
      .filter((title): title is string => Boolean(title)) ?? [];
  const mobileTitles =
    scenario?.mobiles
      ?.map(({ mobile }) => getGameObject(getGameObjectId(mobile))?._title)
      .filter((title): title is string => Boolean(title)) ?? [];

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
            {(characterTitles.length > 0 || mobileTitles.length > 0) && (
              <ScenarioReferences>
                {characterTitles.length > 0 && (
                  <div>
                    <strong>
                      <TranslationComponent id="message_1789910075286" /> :
                    </strong>
                    {characterTitles.map((title, index) => (
                      <span key={`scenario-${scenario._id}-character-${title}`}>
                        {index > 0 && ", "}
                        <TranslationComponent id={title} />
                      </span>
                    ))}
                  </div>
                )}
                {mobileTitles.length > 0 && (
                  <div>
                    <strong>
                      <TranslationComponent id="message_1789910107172" /> :
                    </strong>
                    {mobileTitles.map((title, index) => (
                      <span key={`scenario-${scenario._id}-mobile-${title}`}>
                        {index > 0 && ", "}
                        <TranslationComponent id={title} />
                      </span>
                    ))}
                  </div>
                )}
              </ScenarioReferences>
            )}
          </div>
        )}
      </ModalParametersScenariosScenarioComponentContainer>
    </ModalComponent>
  );
};

export default ModalParametersScenariosScenarioComponent;

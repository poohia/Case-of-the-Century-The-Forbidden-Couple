import styled from "styled-components";
import { ImgComponent } from "../../../../../components";
import { Scenario } from "../../../../game-types";
import ModalComponent from "../../components/ModalComponent";
import { ModalParametersComponentProps } from "../ModalParametersComponent";

const ModalParametersScenariosScenarioComponentContainer = styled.div`
  img {
    float: right; /* C'est la ligne magique ! */

    /* Ajoutons une marge pour que le texte ne colle pas à l'image */
    margin-left: 20px;
    margin-bottom: 10px; /* Un peu d'espace en dessous aussi */

    /* Contrôlons la taille de l'image */
    width: 250px;
    height: auto; /* Garde les proportions */
  }
  p {
    line-height: 32px;
  }
  overflow: auto;
`;

const ModalParametersScenariosScenarioComponent: React.FC<
  ModalParametersComponentProps & { scenario: Scenario | null }
> = (props) => {
  const { open, scenario, ...rest } = props;

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
            <ImgComponent src="scenario.png" forceMaxSize />

            <div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro,
                error, hic rem iusto voluptatem consequatur excepturi, nesciunt
                reiciendis aliquid saepe impedit necessitatibus dolores. Minima
                pariatur, unde vitae eveniet veniam sequi nulla voluptatem
                suscipit atque ipsam numquam dolorem architecto culpa esse
                laborum, nesciunt expedita vero distinctio! Repudiandae aperiam
                dignissimos officiis error. Laudantium inventore numquam saepe
                at tempora quam incidunt illum dignissimos. Ipsa consequuntur
                repellat, maxime corrupti exercitationem possimus.
                Necessitatibus excepturi debitis consectetur, blanditiis
                quibusdam fuga repudiandae quis itaque quidem magni reiciendis
                ut incidunt impedit nemo in, culpa tempora commodi! Odio iusto,
                mollitia culpa totam quae laborum est magni consectetur
                explicabo quia!
              </p>
            </div>
          </div>
        )}
      </ModalParametersScenariosScenarioComponentContainer>
    </ModalComponent>
  );
};

export default ModalParametersScenariosScenarioComponent;

import ModalComponent from "../../components/ModalComponent";
import { ImgComponent, TranslationComponent } from "../../../../../components";
import { ModalParametersCharactersCharacterComponentContainer } from "./styles";
import { ModalParametersComponentProps } from "../ModalParametersComponent";
import { Character } from "../../../../game-types";

const ModalParametersCharactersCharacterComponent: React.FC<
  ModalParametersComponentProps & { character: Character | null }
> = (props) => {
  const { open, character, ...rest } = props;

  return (
    <ModalComponent open={open} size="default" isChildren {...rest}>
      <ModalParametersCharactersCharacterComponentContainer>
        {character && (
          <div>
            <div>
              <div>
                <h3>{character._title}</h3>
                <div>
                  <p>
                    <TranslationComponent id="message_1749661673399" />
                  </p>
                  <p>
                    <b>
                      <TranslationComponent id={character.race} />
                    </b>
                  </p>
                </div>
                <div>
                  <p>
                    <TranslationComponent id="message_1749662004875" />
                  </p>
                  <p>
                    <b>{character.age}</b>
                  </p>
                </div>
                <div>
                  <p>
                    <TranslationComponent id="message_1749651050161" />
                  </p>
                  <p>
                    <b>
                      <TranslationComponent id={character.job} />
                    </b>
                  </p>
                </div>
              </div>
              <div>
                <ImgComponent
                  src={character.idleImage ?? character.primaryImage}
                  className="image-primary"
                  forceMaxSize={!!character.idleImage}
                />
              </div>
            </div>
            <div>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Voluptate veritatis optio dolor necessitatibus, error doloremque
              alias inventore modi hic, debitis sapiente, quisquam consequuntur
              mollitia nam sed? Sapiente aut saepe recusandae delectus,
              adipisci, quidem quod assumenda corporis aperiam distinctio, nihil
              veritatis repellat? Voluptatem neque similique aspernatur
              accusamus fuga aperiam commodi nostrum alias quae maxime, iste
              placeat provident rem eaque saepe nesciunt impedit ipsum a
              expedita dicta eum ipsa ab tempora laborum. Doloribus, recusandae.
              Culpa magni ad ea quis dolore! Facere possimus optio eum laborum
              soluta ipsa, dolorum harum! Nemo molestias laboriosam suscipit
              minus facere iusto odio, nostrum architecto id dicta unde?
            </div>
          </div>
        )}
      </ModalParametersCharactersCharacterComponentContainer>
    </ModalComponent>
  );
};

export default ModalParametersCharactersCharacterComponent;

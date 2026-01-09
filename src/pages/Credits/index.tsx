import { useGameProvider } from "../../gameProvider";
import { PageComponent, TranslationComponent } from "../../components";

const Credits = () => {
  const { push, getCredits } = useGameProvider();
  return (
    <PageComponent>
      <div>
        Credits
        <div>
          {getCredits().map((credit) => (
            <div key={credit.title}>
              <h2>{credit.title}</h2>
              {credit.persons.map((person) => (
                <div key={`${credit.title}-${person.name}`}>
                  <h4>
                    <span>{person.name}</span> -{" "}
                    <TranslationComponent id={person.title} />
                  </h4>
                </div>
              ))}
            </div>
          ))}
        </div>
        <button onClick={() => push("home")}>
          <TranslationComponent id="label_back_home" />
        </button>
      </div>
    </PageComponent>
  );
};

export default Credits;

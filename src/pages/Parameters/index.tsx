import { PageComponent, TranslationComponent } from "../../components";
import languages from "../../GameDevSoftware/languages.json";
import { useGameProvider } from "../../gameProvider";
import { Route } from "../../types";

type ParametersProps = {
  routeBack: Route;
};

const Parameters = (props: ParametersProps) => {
  const { routeBack } = props;
  const {
    parameters: { activedSound, activatedVibration, locale },
    isDev,
    setActivatedSound,
    setActivatedVibration,
    switchLanguage,
    push,
  } = useGameProvider();

  return (
    <PageComponent>
      <div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            return false;
          }}
        >
          <div>
            <h1>
              <TranslationComponent id="parameters_title" />
            </h1>
          </div>
          <div>
            <h2>
              <TranslationComponent id="parameters_activate_sound" />
            </h2>
            <div>
              <label>
                <TranslationComponent id="label_yes" />
                <input
                  type="radio"
                  name="sound"
                  checked={activedSound}
                  onClick={() => setActivatedSound(true)}
                />
              </label>
              <label>
                <TranslationComponent id="label_no" />
                <input
                  type="radio"
                  name="sound"
                  checked={!activedSound}
                  onClick={() => setActivatedSound(false)}
                />
              </label>
            </div>
          </div>
          <div>
            <h2>
              <TranslationComponent id="parameters_activate_vibration" />
            </h2>
            <div>
              <label>
                <TranslationComponent id="label_yes" />
                <input
                  type="radio"
                  name="vibration"
                  checked={activatedVibration}
                  onClick={() => setActivatedVibration(true)}
                />
              </label>
              <label>
                <TranslationComponent id="label_no" />
                <input
                  type="radio"
                  name="vibration"
                  checked={!activatedVibration}
                  onClick={() => setActivatedVibration(false)}
                />
              </label>
            </div>
          </div>
          <div>
            <h2>
              <TranslationComponent id="parameters_languages" />
            </h2>
            <div>
              {languages.map(({ code }) => (
                <label key={code}>
                  {code}
                  <input
                    type="radio"
                    name="locale"
                    checked={locale === code}
                    onClick={() => switchLanguage(code)}
                  />
                </label>
              ))}
            </div>
          </div>
          <div>
            {isDev && routeBack !== "home" && (
              <button onClick={() => push("home")}>Back Home</button>
            )}
            <button type="button" onClick={() => push(routeBack)}>
              <TranslationComponent id="parameters_back" />
            </button>
          </div>
        </form>
      </div>
    </PageComponent>
  );
};

export default Parameters;

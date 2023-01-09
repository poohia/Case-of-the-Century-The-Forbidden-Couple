import { useEffect, useMemo } from "react";
import styled from "styled-components";
import App from "./App";
import { useGameProvider } from "./gameProvider";
import { useAssets } from "./hooks";

const AppContainer = styled.div`
  > div > div {
    width: 822px !important;
    height: 391px !important;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 58px;
    padding: 5px;
    overflow: hidden;
  }
`;

const ImgMobile = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const AppWrapper: React.FC = () => {
  const { setBackgroundColor, getEnvVar } = useGameProvider();
  const { getAsset } = useAssets();

  const activeMobileView: boolean = useMemo(() => {
    const view = getEnvVar<boolean>("MOBILE_VIEW");

    return !!view;
  }, [getEnvVar]);

  useEffect(() => {
    if (activeMobileView) {
      setBackgroundColor(
        "radial-gradient(circle, rgba(77,79,82,1) 0%, rgba(68,70,74,1) 35%)"
      );
    }
  }, [activeMobileView, setBackgroundColor]);

  if (activeMobileView) {
    return (
      <AppContainer>
        <ImgMobile
          src={getAsset("iphone.png", "image") as string}
          alt="phone image"
        />
        <App />
      </AppContainer>
    );
  }

  return <App />;
};

export default AppWrapper;

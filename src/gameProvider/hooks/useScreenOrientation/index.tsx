import styled from "styled-components";
import { OrientationLockCordovaType } from "@awesome-cordova-library/screen-orientation";
import useScreenOrientationLibrary from "@awesome-cordova-library/screen-orientation/lib/react";
import { GameProviderHooksDefaultInterface } from "..";
import config from "../../../config.json";
import { useEffect, useMemo } from "react";
import { useEnvInterface } from "../useEnv";

export interface useuseFontsInterface
  extends GameProviderHooksDefaultInterface,
    ReturnType<typeof useScreenOrientation> {}

const OrientationScreenInformationComponent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.5rem;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
  text-align: center;
  color: white;
  line-height: 3.3rem;
  font-family: auto;
`;

const useScreenOrientation = (
  isMobileDevice: boolean,
  screenorientation: OrientationLockCordovaType,
  getEnv: useEnvInterface["getEnvVar"]
) => {
  const { lock } = useScreenOrientationLibrary();

  const show = useMemo(
    () =>
      isMobileDevice &&
      config.screenOrientation !== "any" &&
      screenorientation !== config.screenOrientation &&
      !getEnv<boolean>("IGNORE_ORIENTATION"),
    [isMobileDevice, screenorientation]
  );

  const ScreenOrientationForce: React.FC = () => {
    if (!show) return <></>;
    return (
      <OrientationScreenInformationComponent>
        <span>
          Bad orientation <br /> Actual orientation:
          <br /> <i>{screenorientation}</i> <br />
          Orientation needed:
          <br /> <i>{config.screenOrientation}</i>
        </span>
      </OrientationScreenInformationComponent>
    );
  };

  useEffect(() => {
    lock(config.screenOrientation as OrientationLockCordovaType);
  }, []);

  useEffect(() => {
    console.warn(
      `Bad orientation \n Actual orientation: ${screenorientation} \n Orientation needed: ${config.screenOrientation}`
    );
  }, [screenorientation]);

  return {
    loaded: true,
    ScreenOrientationForce,
  };
};

export default useScreenOrientation;

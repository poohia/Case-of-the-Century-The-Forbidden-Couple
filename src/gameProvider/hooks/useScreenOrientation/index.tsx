import styled from "styled-components";
import { OrientationLockCordovaType } from "@awesome-cordova-library/screen-orientation";
import useScreenOrientationLibrary from "@awesome-cordova-library/screen-orientation/lib/react";
import { GameProviderHooksDefaultInterface } from "..";
import { useEffect, useMemo, useState } from "react";
import { useEnvInterface } from "../useEnv";
import { ConfigApplication, EnvType } from "../../../types";

export interface useuseFontsInterface
  extends GameProviderHooksDefaultInterface,
    ReturnType<typeof useScreenOrientation> {}

let timeoutScreenOrientation: any = null;
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
  config: ConfigApplication,
  env: EnvType,
  isMobileDevice: boolean,
  screenorientation: OrientationLockCordovaType,
  getEnv: useEnvInterface["getEnvVar"]
) => {
  const [show, setShow] = useState<boolean>(false);
  const { lock } = useScreenOrientationLibrary();

  const ignoreOrientation = useMemo(
    () => env !== "production" && !!getEnv<boolean>("IGNORE_ORIENTATION"),
    [env, getEnv]
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
    // setTimeout(() => {
    lock(config.screenOrientation as OrientationLockCordovaType);
    // }, 2000);
  }, []);

  useEffect(() => {
    if (ignoreOrientation) return;
    if (timeoutScreenOrientation !== null)
      clearTimeout(timeoutScreenOrientation);
    timeoutScreenOrientation = setTimeout(() => {
      if (
        config.screenOrientation === "portrait" &&
        screenorientation.startsWith("portrait")
      ) {
        setShow(false);
      } else if (
        config.screenOrientation === "landscape" &&
        screenorientation.startsWith("landscape")
      ) {
        setShow(false);
      } else {
        setShow(
          isMobileDevice &&
            config.screenOrientation !== "any" &&
            screenorientation !== config.screenOrientation
        );
      }
    }, 1000);
  }, [isMobileDevice, screenorientation, ignoreOrientation, getEnv]);

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

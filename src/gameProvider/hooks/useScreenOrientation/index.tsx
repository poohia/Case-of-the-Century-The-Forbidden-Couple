import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import {
  OrientationLockType,
  ScreenOrientation,
} from "@capacitor/screen-orientation";

import { GameProviderHooksDefaultInterface } from "..";
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
  getEnv: useEnvInterface["getEnvVar"]
) => {
  const [show, setShow] = useState<boolean>(false);
  const [screenOrientation, setScreenOrientation] =
    useState<OrientationLockType>(config.screenOrientation);

  const ignoreOrientation = useMemo(
    () => env !== "production" && !!getEnv<boolean>("IGNORE_ORIENTATION"),
    [env, getEnv]
  );

  const ScreenOrientationForce: React.FC = () => {
    if (!show || isMobileDevice) {
      return <></>;
    }
    return (
      <OrientationScreenInformationComponent>
        <span>
          Bad orientation <br /> Actual orientation:
          <br /> <i>{screenOrientation}</i> <br />
          Orientation needed:
          <br /> <i>{config.screenOrientation}</i>
        </span>
      </OrientationScreenInformationComponent>
    );
  };

  useEffect(() => {
    if (ignoreOrientation) {
      return;
    }
    if (timeoutScreenOrientation !== null) {
      clearTimeout(timeoutScreenOrientation);
    }
    timeoutScreenOrientation = setTimeout(() => {
      if (
        config.screenOrientation === "portrait" &&
        screenOrientation.startsWith("portrait")
      ) {
        setShow(false);
      } else if (
        config.screenOrientation === "landscape" &&
        screenOrientation.startsWith("landscape")
      ) {
        setShow(false);
      } else {
        setShow(
          isMobileDevice &&
            config.screenOrientation !== "any" &&
            screenOrientation !== config.screenOrientation
        );
      }
    }, 1000);
  }, [isMobileDevice, screenOrientation, ignoreOrientation, getEnv]);

  useEffect(() => {
    console.warn(
      `Bad orientation \n Actual orientation: ${screenOrientation} \n Orientation needed: ${config.screenOrientation}`
    );
  }, [screenOrientation]);

  useEffect(() => {
    ScreenOrientation.orientation().then((orientation) =>
      setScreenOrientation((_orientation) => {
        if (_orientation === orientation.type) {
          return _orientation;
        }
        return orientation.type;
      })
    );
    ScreenOrientation.lock({
      orientation: config.screenOrientation as OrientationLockType,
    });
  }, []);

  useEffect(() => {
    if (!isMobileDevice) {
      ScreenOrientation.addListener(
        "screenOrientationChange",
        (orientation) => {
          setScreenOrientation(orientation.type);
        }
      );
      return () => {
        ScreenOrientation.removeAllListeners();
      };
    }
  }, [isMobileDevice]);

  return {
    loaded: true,
    ScreenOrientationForce,
  };
};

export default useScreenOrientation;

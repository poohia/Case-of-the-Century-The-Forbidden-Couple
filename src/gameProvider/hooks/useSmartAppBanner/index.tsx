import { GameProviderHooksDefaultInterface } from "..";
import styled from "styled-components";

import { useMemo, useState } from "react";
import { ConfigApplication, EnvType, Platform } from "../../../types";
import { useEnvInterface } from "../useEnv";
import { TranslationComponent } from "../../../components";

const SmartAppBannerContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background: white;
  z-index: 999;
  display: flex;
  background: #f2f2f2;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  align-items: center;
  font-family: auto;
  background: #f2f2f2;
  padding: 10px 0;
  box-shadow: 0px 4px 8px 1px rgba(0, 0, 0, 0.1);
`;

const SmartAppBannerCloseContainer = styled.div`
  flex-basis: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    display: inline-block;
    vertical-align: middle;
    margin: 0 5px 0 0;
    font-size: 20px;
    text-align: center;
    color: #888;
    text-decoration: none;
    padding: 0 0 1px;
    background-color: transparent;
    -webkit-font-smoothing: subpixel-antialiased;
    border: 0;
    color: #888;
    text-shadow: 0 1px 0 #fff;
    -webkit-font-smoothing: none;
    cursor: pointer;
  }
`;

const SmartAppBannerCenterContainer = styled.div`
  flex-basis: 88%;
  display: flex;
  align-items: center;
  img {
    border-radius: 10px;
  }
`;

const SmartAppBannerCenterTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  > span {
    &:nth-child(1) {
      font-weight: bold;
    }
    &:nth-child(2) {
      font-size: 0.8rem;
    }
  }
`;

const SmartAppBannerExternalLinkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-basis: 7%;
  text-transform: uppercase;
  a {
    text-decoration: none;
    color: #0c71fd;
  }
`;

export interface useuseFontsInterface
  extends GameProviderHooksDefaultInterface,
    ReturnType<typeof useSmartAppBanner> {}

const useSmartAppBanner = (
  config: ConfigApplication,
  env: EnvType,
  platform: Platform | null,
  getEnv: useEnvInterface["getEnvVar"]
) => {
  const [closed, setClosed] = useState<boolean>(false);
  const forceShowBanner = useMemo(
    () => getEnv("FORCE_SHOW_APP_BANNER"),
    [getEnv]
  );

  const isBrowserMobile = useMemo(
    () => platform === "browserandroid" || platform === "browserios",
    [platform]
  );

  const show = useMemo(() => {
    if (forceShowBanner && !closed) return true;
    if (closed || !isBrowserMobile || env !== "production") return false;
    if (platform === "browserios" && config.appStore) return true;
    if (platform === "browserandroid" && config.playStore) return true;
    return false;
  }, [platform, env, closed, forceShowBanner, isBrowserMobile]);

  const storeLink = useMemo(() => {
    if (platform === "browserios" && config.appStore) return config.appStore;

    if (platform === "browserandroid" && config.playStore)
      return config.playStore;
    return "#";
  }, [platform]);

  const SmartAppBanner: React.FC = () => {
    if (!show) return <></>;
    return (
      <SmartAppBannerContainer>
        <SmartAppBannerCloseContainer>
          <button
            type="button"
            aria-label="close"
            onClick={() => setClosed(true)}
          >
            ×
          </button>
        </SmartAppBannerCloseContainer>
        <SmartAppBannerCenterContainer>
          <div>
            <img src="favicon.png" alt="App Icon" />
          </div>
          <SmartAppBannerCenterTextContainer>
            <span>{config.name}</span>
            {platform === "browserios" && (
              <TranslationComponent id="label_on_appstore" />
            )}
            {platform === "browserandroid" && (
              <TranslationComponent id="label_on_playstore" />
            )}
          </SmartAppBannerCenterTextContainer>
        </SmartAppBannerCenterContainer>
        <SmartAppBannerExternalLinkContainer>
          <a href={storeLink} target="_blank" rel="noreferrer">
            View
          </a>
        </SmartAppBannerExternalLinkContainer>
      </SmartAppBannerContainer>
    );
  };

  return { loaded: platform !== null, SmartAppBanner };
};

export default useSmartAppBanner;

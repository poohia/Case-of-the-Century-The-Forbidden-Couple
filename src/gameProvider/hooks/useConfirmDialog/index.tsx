import { useCallback, useMemo, useRef, useState } from "react";
import styled from "styled-components";

import {
  ButtonClassicGroupComponent,
  TranslationComponent,
} from "../../../components";
import { ButtonClassicType } from "../../../components/ButtonClassicComponent";
import { GameProviderHooksDefaultInterface } from "..";

export type ConfirmationType = {
  title: string;
  message?: string;
};

const ConfirmationOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 11;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(3px);
`;

const ConfirmationPanel = styled.div`
  width: min(100%, 440px);
  padding: 24px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background-color: ${({ theme }) =>
    theme.default_dialog_confirm.background_color};
  ${({ theme }) =>
    theme.default_dialog_confirm.background_image
      ? `
    background: url(${theme.default_dialog_confirm.background_image}) no-repeat center;
      `
      : ""}
  color: ${({ theme }) => theme.default_dialog_confirm.color};
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
`;

const ConfirmationHeader = styled.div`
  margin-bottom: 12px;

  h2 {
    margin: 0;
    font-size: clamp(1.1rem, 1rem + 0.3vw, 1.4rem);
    line-height: 1.25;
  }
`;

const ConfirmationBody = styled.div`
  margin-bottom: 24px;

  p {
    margin: 0;
    font-size: 0.98rem;
    line-height: 1.5;
    opacity: 0.92;
  }
`;

const ConfirmationActions = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;

  > div {
    justify-content: center;
  }
  button {
    min-height: 24px;
    font-size: clamp(0.85rem, 0.75rem + 0.2vw, 1rem);
    padding: clamp(0.4rem, 0.3rem + 0.4vw, 0.6rem)
      clamp(1.4rem, 1.2rem + 0.7vw, 1rem);
    max-width: 30%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    padding: 10px;
  }
`;

export interface useConfirmDialogInterface
  extends
    GameProviderHooksDefaultInterface,
    ReturnType<typeof useConfirmDialog> {}

const useConfirmDialog = () => {
  const [confirmation, setConfirmation] = useState<ConfirmationType | null>(
    null
  );
  const resolverRef = useRef<((value: boolean) => void) | null>(null);

  const confirm = useCallback((c: ConfirmationType) => {
    setConfirmation(c);

    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve;
    });
  }, []);

  const closeConfirm = useCallback((result: boolean) => {
    resolverRef.current?.(result);
    resolverRef.current = null;
    setConfirmation(null);
  }, []);

  const buttonsActions = useMemo<ButtonClassicType[]>(
    () => [
      {
        idText: "label_no",
        key: "cancel",
        animate: false,
      },
      {
        idText: "label_yes",
        key: "confirmation",
        animate: false,
      },
    ],
    []
  );

  const ConfirmDialog = useCallback<React.FC>(() => {
    if (!confirmation) {
      return null;
    }

    return (
      <ConfirmationOverlay
        role="presentation"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeConfirm(false);
          }
        }}
      >
        <ConfirmationPanel
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="confirm-dialog-title"
          aria-describedby={
            confirmation.message ? "confirm-dialog-description" : undefined
          }
        >
          <ConfirmationHeader>
            <h2 id="confirm-dialog-title">
              <TranslationComponent id={confirmation.title} />
            </h2>
          </ConfirmationHeader>

          {confirmation.message && (
            <ConfirmationBody>
              <p id="confirm-dialog-description">
                <TranslationComponent id={confirmation.message} />
              </p>
            </ConfirmationBody>
          )}

          <ConfirmationActions>
            <ButtonClassicGroupComponent
              buttons={buttonsActions}
              show
              direction="row"
              delayBetweenButtons={0}
              onClick={(key) => {
                closeConfirm(key === "confirmation");
              }}
            />
          </ConfirmationActions>
        </ConfirmationPanel>
      </ConfirmationOverlay>
    );
  }, [buttonsActions, closeConfirm, confirmation]);

  return {
    loaded: true,
    ConfirmDialog,
    confirm,
  };
};

export default useConfirmDialog;

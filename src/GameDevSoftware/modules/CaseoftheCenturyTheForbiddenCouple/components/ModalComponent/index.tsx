import styled from "styled-components";
import React, {
  useEffect,
  useId,
  useRef,
  MouseEvent,
  useCallback,
  useState,
} from "react";

import "animate.css";

import { TranslationComponent } from "../../../../../components";
import { useGameProvider } from "../../../../../gameProvider";

export type ModalComponentProps = {
  children: React.ReactNode;
  open: boolean;
  title?: string;
  size?: "default" | "small";
  isChildren?: boolean;
  onClose: () => void;
};

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  padding: 5px;
  margin: 0;
  font-size: 1.8rem;
  font-weight: bold;
  line-height: 1;
  color: ${({ theme }) => theme.colors.textLight};
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover,
  &:focus {
    opacity: 0.7;
    outline: none;
  }
`;

const ModalComponentContainer = styled.div<{
  $open: boolean;
  $size: ModalComponentProps["size"];
  $isChildren: ModalComponentProps["isChildren"];
}>`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background: ${({ $isChildren }) =>
    $isChildren ? "transparent" : "rgba(0, 0, 0, 0.5)"};
  z-index: 10;
  display: flex;
  justify-content: flex-end;
  pointer-events: ${(props) => (props.$open ? "auto" : "none")};
  opacity: ${(props) => (props.$open ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;

  > div.modal-panel {
    position: relative;
    width: ${({ $size }) => ($size === "default" ? "80%" : "30%")};
    height: 100%;
    background-color: ${({ theme }) => theme.colors.primary};
    border-left: 3px solid ${({ theme }) => theme.colors.secondary};
    padding: 20px;
    box-shadow: -5px 0px 15px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      height: 36px;
    }

    h2 {
      color: ${({ theme }) => theme.colors.textLight};
      margin: 0;
      flex-grow: 1;
      padding-right: 40px;
      max-width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: 26px;
    }

    > div.modal-content {
      color: ${({ theme }) => theme.colors.textLight};
      flex-grow: 1;
      > div {
        height: calc(100vh - 34px - 40px - 10px);
        max-width: 1000px;
        margin: 0 auto;
        overflow-y: auto;
        overflow-x: hidden;
      }
      @media screen and (min-height: 1080px) {
        > div {
          height: calc(1070px - 34px - 40px - 10px);
        }
      }
    }
  }
`;

const ModalComponent: React.FC<ModalComponentProps> = ({
  children,
  open,
  title,
  size = "default",
  isChildren = false,
  onClose: onCloseProps,
}) => {
  const titleId = useId();
  const { translateText, playSoundEffect, getValueFromConstant, oneTap } =
    useGameProvider();
  const modalPanelRef = useRef<HTMLDivElement>(null);
  const [animateCss, setAnimateCss] = useState<string>("animate__slideInRight");

  const onClose = useCallback(() => {
    setAnimateCss("animate__slideOutRight");
    setTimeout(() => {
      onCloseProps();
      setTimeout(() => {
        setAnimateCss("animate__slideInRight");
      }, 50);
    }, 350);
  }, []);

  useEffect(() => {
    if (open && modalPanelRef.current) {
      const timer = setTimeout(() => {
        modalPanelRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!open) {
    return null;
  }

  return (
    <ModalComponentContainer
      $open={animateCss !== "animate__slideOutRight"}
      $size={size}
      $isChildren={isChildren}
      aria-hidden={!open}
      onClick={handleBackdropClick}
    >
      <div
        ref={modalPanelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={open ? 0 : -1}
        className={`modal-panel animate__animated  animate__faster ${animateCss}`}
      >
        <div className="modal-header">
          {title && (
            <h2 id={titleId}>
              <TranslationComponent id={title} />
            </h2>
          )}
          <CloseButton
            onClick={() => {
              oneTap();
              playSoundEffect({
                sound: "button_click.mp3",
                volume: getValueFromConstant("button_click_volume"),
              });
              onClose();
            }}
            aria-label={translateText("label_modal_close")}
          >
            ×
          </CloseButton>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </ModalComponentContainer>
  );
};

export default ModalComponent;

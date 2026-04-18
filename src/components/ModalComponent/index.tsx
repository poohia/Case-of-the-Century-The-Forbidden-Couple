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
import { useButtonHandleClick } from "../../hooks";
import TranslationComponent from "../TranslationComponent";
import { useGameProvider } from "../../gameProvider";

export type ModalComponentProps = {
  children: React.ReactNode;
  open: boolean;
  title?: string;
  idDescription?: string;
  size?: "default" | "small";
  isChildren?: boolean;
  inert?: boolean;
  onClose?: () => void;
};

export type ModalChildrenParametersComponentProps = Omit<
  ModalComponentProps,
  "children" | "title" | "size"
>;

const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 5px;
  margin: 0;
  font-size: 2.4rem;
  font-weight: bold;
  line-height: 1;
  color: ${({ theme }) => theme.default_modal.color};
  cursor: pointer;
  transition: opacity 0.2s ease;
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
  height: 100%;
  /* max-height: 1080px; */
  background: ${({ $isChildren }) =>
    $isChildren ? "transparent" : "rgba(0, 0, 0, 0.5)"};
  backdrop-filter: ${({ $isChildren }) =>
    $isChildren ? "transparent" : " blur(2px)"};
  z-index: 10;
  display: flex;
  justify-content: flex-end;
  pointer-events: ${(props) => (props.$open ? "auto" : "none")};
  opacity: ${(props) => (props.$open ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;

  > div.modal-panel {
    position: relative;
    width: ${({ $size }) => ($size === "default" ? "76vw" : "30vw")};
    /* max-width: calc(1920px - 220px); */
    max-width: calc(100% - 220px);
    height: 100%;

    background-color: ${({ theme }) => theme.default_modal.background_color};
    ${({ theme }) =>
      theme.default_modal.background_image
        ? `
    background: url(${theme.default_modal.background_image});
          background-repeat: no-repeat;
    background-position: 0% 0%;
    background-size: 100% calc(100% - 40px);
      `
        : ""}

    padding: 20px;
    box-shadow: -5px 0px 15px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;

    border-left: ${({ theme }) => theme.default_modal.border_left};

    &.small {
      max-width: 400px;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      margin-top: 1vh;
      height: 36px;

      h2 {
        color: ${({ theme }) => theme.default_modal.color};
        margin: 0;
        flex-grow: 1;
        padding-right: 40px;
        max-width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 26px;
      }
    }

    > div.modal-content {
      height: 100%;
      // padding modal 40px - taille du header 36px - marge du header 5top 10px bottom
      max-height: calc(100% - 40px - 36px - 10px);
      color: ${({ theme }) => theme.default_modal.color};
      flex-grow: 1;
      overflow-y: auto;
      overflow-x: hidden;
      > div {
        max-width: 1000px;
        margin: 0 auto;
        padding: 10px;
        height: calc(100% - 20px);
      }
    }
  }
`;

const ModalComponent: React.FC<ModalComponentProps> = ({
  children,
  open,
  title,
  idDescription,
  size = "default",
  isChildren = false,
  inert = false,
  onClose: onCloseProps,
}) => {
  const titleId = useId();
  const modalPanelRef = useRef<HTMLDivElement>(null);
  const [animateCss, setAnimateCss] = useState<string>("animate__slideInRight");

  const {
    parameters: { screenReaderEnabled },
  } = useGameProvider();
  const click = useButtonHandleClick();

  const onClose = useCallback(() => {
    if (!onCloseProps) {
      return;
    }
    setAnimateCss("animate__slideOutRight");
    setTimeout(() => {
      onCloseProps();
      setTimeout(() => {
        setAnimateCss("animate__slideInRight");
      }, 50);
    }, 350);
  }, [onCloseProps]);

  useEffect(() => {
    if (screenReaderEnabled && open && modalPanelRef.current) {
      const timer = setTimeout(() => {
        modalPanelRef.current?.focus();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [screenReaderEnabled, open]);

  const handleBackdropClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget && onCloseProps) {
        click(event, {
          playSound: true,
          callback: () => {
            onClose();
          },
        });
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!inert && open) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [inert, open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <ModalComponentContainer
      $open={animateCss !== "animate__slideOutRight"}
      $size={size}
      $isChildren={isChildren}
      onClick={handleBackdropClick}
      className="modal"
    >
      <div
        ref={modalPanelRef}
        className={`modal-panel animate__animated  animate__faster ${animateCss} ${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={idDescription ? idDescription : undefined}
        inert={inert ? "" : undefined}
        tabIndex={-1}
      >
        <div className="modal-header">
          {title && (
            <h2 id={titleId}>
              <TranslationComponent id={title} />
            </h2>
          )}
          {onCloseProps && (
            <CloseButton
              onClick={(e) => {
                click(e, {
                  playSound: true,
                  callback: () => {
                    onClose();
                  },
                });
              }}
            >
              <TranslationComponent id="label_modal_close" srOnly />
              <span aria-hidden="true">×</span>
            </CloseButton>
          )}
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </ModalComponentContainer>
  );
};

export default ModalComponent;

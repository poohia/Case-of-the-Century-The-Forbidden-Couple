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
import { useButtonHandleClick } from "../../../../../hooks";

export type ModalComponentProps = {
  children: React.ReactNode;
  open: boolean;
  title?: string;
  idDescription?: string;
  size?: "default" | "small";
  isChildren?: boolean;
  inert?: boolean;
  onClose: () => void;
};

const CloseButton = styled.button`
  /* position: absolute; */
  /* top: 20px;
  right: 20px; */
  background: none;
  border: none;
  padding: 5px;
  margin: 0;
  font-size: 1.8rem;
  font-weight: bold;
  line-height: 1;
  color: ${({ theme }) => theme.colors.textDark};
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
    max-width: calc(1920px - 220px);
    height: 100%;
    background-color: ${({ theme }) => theme.colors.primary};
    background: url(assets/images/background_menu.png);
    background-size: cover;

    /* border-left: 3px solid ${({ theme }) => theme.colors.primary}; */
    padding: 20px;
    padding-left: calc(20px + 3%);
    box-shadow: -5px 0px 15px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;

    &.small {
      max-width: 400px;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      margin-top: 15px;
      height: 36px;
    }

    h2 {
      color: ${({ theme }) => theme.colors.textDark};
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
      height: 100%;
      margin-bottom: 20px;
      color: ${({ theme }) => theme.colors.textDark};
      flex-grow: 1;
      > div {
        height: calc(100vh - 34px - 40px - 10px - 15px);
        max-width: 1000px;
        margin: 0 auto;
        overflow-y: auto;
        overflow-x: hidden;
      }
      @media screen and (min-height: 1080px) {
        > div {
          height: calc(1070px - 34px - 40px - 10px - 15px);
        }
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
  const { translateText } = useGameProvider();
  const modalPanelRef = useRef<HTMLDivElement>(null);
  const [animateCss, setAnimateCss] = useState<string>("animate__slideInRight");

  const click = useButtonHandleClick();

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
      click(event, {
        playSound: true,
        callback: () => {
          onClose();
        },
      });
    }
  };

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
    >
      <div
        ref={modalPanelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={idDescription ? idDescription : undefined}
        aria-hidden={inert || undefined}
        className={`modal-panel animate__animated  animate__faster ${animateCss} ${size}`}
      >
        <div className="modal-header">
          {title && (
            <h2 id={titleId}>
              <TranslationComponent id={title} />
            </h2>
          )}
          <CloseButton
            onClick={(e) => {
              click(e, {
                playSound: true,
                callback: () => {
                  onClose();
                },
              });
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

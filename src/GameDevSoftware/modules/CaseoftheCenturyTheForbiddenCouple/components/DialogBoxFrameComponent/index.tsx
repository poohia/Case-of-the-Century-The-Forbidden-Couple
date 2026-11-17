import React from "react";

import styled, { useTheme } from "styled-components";

import { ImgComponent } from "../../../../../components";

type ImgProps = React.ComponentProps<typeof ImgComponent>;

/**
 * `visual_novel_texts.box_style` vaut "image" par défaut (cadre illustré) et
 * "solid" en mode contraste élevé (cadre uni, comme les menus).
 */
export const isSolidDialogBox = (theme: object): boolean =>
  (theme as { visual_novel_texts?: { box_style?: string } }).visual_novel_texts
    ?.box_style === "solid";

const SolidFrame = styled.div`
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.default_modal.background_color};
  border: ${({ theme }) => theme.default_button.border || "2px solid #ffffff"};
  border-radius: 10px;
  pointer-events: none;
`;

/**
 * Cadre décoratif d'une boîte de dialogue. La position et la taille viennent
 * du `className` (styled-components), comme pour l'image seule auparavant.
 */
const DialogBoxFrameComponent: React.FC<ImgProps> = ({
  className,
  ...imgProps
}) => {
  const theme = useTheme();

  if (isSolidDialogBox(theme)) {
    return <SolidFrame className={className} aria-hidden="true" />;
  }

  return <ImgComponent {...imgProps} className={className} />;
};

export default DialogBoxFrameComponent;

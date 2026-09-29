import styled, { keyframes } from "styled-components";

import { ImgComponent } from "../../../../../components";

export type VisualNovelTextsTextBox = {
  backgroundImage?: string;
  top: number;
  left: number;
  width: number;
  height: number;
};

export const VisualNovelTextsContainer = styled.div<{
  $nextManually: boolean;
}>`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  ${(props) => props.$nextManually && "cursor: pointer;"}
`;

export const TextBoxFrameImg = styled(ImgComponent)<{
  $textBox: VisualNovelTextsTextBox;
}>`
  position: absolute;
  top: ${(props) =>
    `calc(${props.$textBox.top}% - ${props.theme.visual_novel_texts.textboxframeimg_offset})`};
  left: ${(props) =>
    `calc(${props.$textBox.left}% - ${props.theme.visual_novel_texts.textboxframeimg_offset})`};
  width: ${(props) =>
    `calc(${props.$textBox.width}% + calc(${props.theme.visual_novel_texts.textboxframeimg_offset} * 2))`};
  height: ${(props) =>
    `calc(${props.$textBox.height}% + calc(${props.theme.visual_novel_texts.textboxframeimg_offset} * 2))`};
`;

export const TextBoxContainer = styled.div<{
  $textBox: VisualNovelTextsTextBox;
  $visible: boolean;
}>`
  position: absolute;
  top: ${(props) => props.$textBox.top}%;
  left: ${(props) => props.$textBox.left}%;
  width: ${(props) => props.$textBox.width}%;
  height: ${(props) => props.$textBox.height}%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.visual_novel_texts.size};
  line-height: ${({ theme }) => theme.visual_novel_texts.lineHeight};
  text-align: justify;
  --visualnoveltext-container-padding: 0;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  pointer-events: ${(props) => (props.$visible ? "auto" : "none")};
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

export const ContinueArrowButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 17px;
  transform: rotate(180deg);
  position: absolute;
  bottom: 6%;
  right: 1%;
  cursor: pointer;
  background-color: transparent;
  border: none;
`;

export const ContinueArrow = styled.div`
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 12px solid black;
  animation: ${blink} 1s infinite;
`;

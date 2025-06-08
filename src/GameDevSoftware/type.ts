export interface CaseoftheCenturyTheForbiddenCoupleChapterTitleProps {
  _id: number;
  _title: string;
  backgroundImage: string;
  title1: string;
  title2: string;
}

export interface SceneComicsDoubleProps {
  _id: number;
  _title: string;
  image: string;
  texts: SceneComicsDoubleTextsProps[];
  boxDialog: SceneComicsDoubleBoxDialogProps;
}

export interface SceneComicsDoubleTextsProps {
  content: string;
  character: string;
}

export interface SceneComicsDoubleBoxDialogProps {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface SceneGifWithTextProps {
  _id: number;
  _title: string;
  backgroundImage: string;
  character: string;
  texts: SceneGifWithTextTextsProps[];
}

export interface SceneGifWithTextTextsProps {
  content: string;
}

export interface Character {
  _id: number;
  _title: string;
  name: CharacterName;
  fontFamily: string;
}

interface CharacterName {
  label: string;
  core: string;
}

export type AnimationAnimatecssTimeout = 1000;
export type AnimationAnimatecssTimeoutFast = 600;
export type ButtonClickVolume = 1;
export type ImageBackgroundHome = "police_station_background.png";

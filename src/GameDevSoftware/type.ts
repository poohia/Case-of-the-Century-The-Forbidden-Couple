export interface CaseoftheCenturyTheForbiddenCoupleChapterTitleProps {
  _id: number;
  _title: string;
  backgroundImage: string;
  title1: string;
  title2: string;
}

export interface SceneGifWithTextProps {
  _id: number;
  _title: string;
  backgroundImage: string;
  character: string;
  texts: SceneGifWithTextTexts[];
}

interface SceneGifWithTextTexts {
  _id: number;
  _title: string;
  content: string;
}

export interface Character {
  _id: number;
  _title: string;
  title?: CharacterTitle;
  fontFamily: any;
}

interface CharacterTitle {
  label: string;
  core: string;
}

export type AnimationAnimatecssTimeout = 1000;
export type AnimationAnimatecssTimeoutFast = 600;
export type ButtonClickVolume = 1;
export type ImageBackgroundHome = "police_station_background.png";

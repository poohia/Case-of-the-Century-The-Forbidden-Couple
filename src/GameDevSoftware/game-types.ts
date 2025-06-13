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
  texts: Texts[];
  boxDialog: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
}

export interface Texts {
  content: string;
  character: string;
  backgroundImage: string;
}

export interface SceneDialogueProps {
  _id: number;
  _title: string;
  backgroundImage: string;
  firstDialogue: string;
  characterResponse: string;
  boxDialogImg: string;
  boxDialog: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
}

export interface SceneGifWithTextProps {
  _id: number;
  _title: string;
  backgroundImage: string;
  character: string;
  texts: Texts[];
}

export interface Character {
  _id: number;
  _title: string;
  name: { label: string; core: string; };
  fontFamily: string;
  primaryImage: string;
  job: string;
  race: string;
  age: number;
  idleImage: string;
  angryImage: string;
}

export interface Dialogue {
  _id: number;
  _title: string;
  character: string;
  animation: string;
  texts: DialogueTexts[];
  sound: string;
  responses: Response[];
}

export interface DialogueTexts {
  content: string;
}

export interface Response {
  _id: number;
  _title: string;
  text: string;
  dialogue: string;
}

export interface Scenario {
  _id: number;
  _title: string;
  name: string;
  description: string;
}

export type AnimationAnimatecssTimeout = 1000;
export type AnimationAnimatecssTimeoutFast = 600;
export type Animations = "idle" | "angry";
export type ButtonClickVolume = 1;
export type DelayScrollText = 4500 | 2700 | 1500;
export type ImageBackgroundHome = "police_station_background.png";
export type TimeoutToShowContinueArrow = 950;
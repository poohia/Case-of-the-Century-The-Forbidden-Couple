export interface CaseoftheCenturyTheForbiddenCoupleChapterTitleProps {
  _id: number;
  _title: string;
  backgroundImage: string;
  title1: string;
  title2: string;
}

export interface EndDemoProps {
  _id: number;
  _title: string;
  backgroundImage: string;
  text: string;
  discordLink: string;
}

export interface SceneComicsDoubleProps {
  _id: number;
  _title: string;
  texts: Text[];
  boxDialog: BoxDialog;
}

export interface Text {
  content: string;
  character: string;
  backgroundImage: string;
  points: number;
  boxCharacterNamePosition: string;
}

export interface BoxDialog {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface SceneDialogueProps {
  _id: number;
  _title: string;
  backgroundImage: string;
  firstDialogue: string;
  characterResponse: string;
  lastWords: string;
  boxDialogImg: string;
  boxDialog: BoxDialog;
}

export interface SceneGifWithTextProps {
  _id: number;
  _title: string;
  backgroundImage: string;
  character: string;
  texts: Text[];
}

// Auto-generated TypeScript interfaces from JSON configuration

export interface Character {
  _id: number;
  _title: string;
  fontFamily: string;
  primaryImage: string;
  job: string;
  race: string;
  age: number;
  idleImage: string;
  angryImage: string;
  bleepSound: string;
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

export interface NoteInspecteur {
  _id: number;
  _title: string;
  name: string;
  blocks: NoteInspecteurBlocks[];
}

export interface NoteInspecteurBlocks {
  content: string;
}

export interface Response {
  _id: number;
  _title: string;
  text: string;
  dialogue: string;
  points: number;
  percentAngry: number;
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
export type BoxCharacterNamePosition = "left" | "right";
export type ButtonClickVolume = 1;
export type DelayScrollText = 4500 | 2700 | 1500;
export type DiscordLink = "https://discord.gg/H8b36mdzgn";
export type ImageBackgroundHome = "police_station_background.png";
export type TimeoutToShowContinueArrow = 950;

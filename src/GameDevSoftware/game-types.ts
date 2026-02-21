/** Scenes **/

export interface CaseoftheCenturyTheForbiddenCoupleChapterTitleProps {
  _id: number;
  _title: string;
  backgroundImages: { image: string }[];
  title1: string;
  title2: string;
}

export interface ComicsArrivedCommisseriatProps {
  _id: number;
  _title: string;
  sceneDescription: string;
  sceneDescription2: string;
  backgroundImages: { image: string }[];
  animationBackgroundImage: string;
  soundOpenDoor: string;
  objectfsText: { content: string }[];
}

export interface Content {
  content: string;
}

export interface ComicsNarratorProps {
  _id: number;
  _title: string;
  sceneDescription: string;
  backgroundImages: { image: string }[];
  textsNarrator: TextNarrator[];
  boxDialog: BoxDialog;
}

export interface TextNarrator {
  content: string;
  points: number;
}

export interface BoxDialog {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface SceneChapitreUnProps {
  _id: number;
  _title: string;
  backgroundImages: string;
  title1: string;
  title2: string;
}

export interface SceneComicsDoubleProps {
  _id: number;
  _title: string;
  texts: Text[];
  boxDialog: BoxDialog;
  unlockTexts?: UnlockText[];
  unlockCharacter?: UnlockCharacter[];
  unlockNoteInspecteur?: UnlockNoteInspecteur[];
  unlockScenario?: UnlockScenario[];
}

export interface Text {
  content: string;
  character: string;
  backgroundImage: string;
  points: number;
  boxCharacterNamePosition: string;
}

export interface UnlockText {
  text: string;
}

export interface UnlockCharacter {
  character: string;
}

export interface UnlockNoteInspecteur {
  noteInspecteur: string;
}

export interface UnlockScenario {
  scenario: string;
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
  defaultResponses: string[];
  tutorialId?: string;
  unlockTexts?: UnlockText[];
  unlockCharacter?: UnlockCharacter[];
  unlockNoteInspecteur?: UnlockNoteInspecteur[];
}

export interface SceneGifWithTextProps {
  _id: number;
  _title: string;
  backgroundImage: string;
  character: string;
  texts: Text[];
  unlockTexts?: UnlockText[];
  unlockCharacter?: UnlockCharacter[];
  unlockScenario?: UnlockScenario[];
  unlockNoteInspecteur?: UnlockNoteInspecteur[];
}

/** Game Objects **/

export interface CharacterInterface {
  _id: number;
  _title: string;
  fontFamily: string;
  primaryImage: string;
  job: string;
  race: string;
  age: number;
  idleImage: string;
  angryImage: string;
  laughtImage: string;
  bleepSound: string;
}

export interface DialogueInterface {
  _id: number;
  _title: string;
  character: string;
  animation: string;
  texts: {
    content: string;
    unlockNoteInspecteur?: { noteInspecteur: string }[];
    unlockScenario?: { scenario: string }[];
    unlockTexts?: { text: string }[];
    unlockCharacter?: { character: string }[];
  }[];
  sound: string;
  responses: string[];
  canShowHistoryResponses: boolean;
}

export interface GameTextsInterface {
  _id: number;
  _title: string;
  value: string;
  object: string;
}

export interface NoteInspecteurInterface {
  _id: number;
  _title: string;
  name: string;
  blocks: { content: string }[];
  images?: { content: string }[];
  order?: number;
}

export interface ResponseInterface {
  _id: number;
  _title: string;
  text: string;
  dialogue: string;
  points: number;
  percentAngry: number;
  dontShowIf?: string;
  unlockNoteInspecteur?: { noteInspecteur: string }[];
  unlockScenario?: { scenario: string }[];
}

export interface ScenarioInterface {
  _id: number;
  _title: string;
  name: string;
  blocks: { content: string }[];
}

/** Constants **/

export type AnimationAnimatecssTimeout = 1000;
export type AnimationAnimatecssTimeoutFast = 600;
export type Animations = "idle" | "angry" | "laught";
export type AppVersion = "1.0000014 - Alpha";
export type BoxCharacterNamePosition = "left" | "right";
export type DelayScrollText = 4500 | 2700 | 1500;
export type DiscordLink = "https://discord.gg/H8b36mdzgn";
export type ImageBackgroundHome = "police_station_background.png";
export type TimeoutToShowContinueArrow = 950;
export type XLink = "https://x.com/DarkblueDungeon";

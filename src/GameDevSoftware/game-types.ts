/** Scenes **/

export interface CaseoftheCenturyTheForbiddenCoupleChapterTitleProps {
  _id: number;
  _title: string;
  backgroundImages: { image: string }[];
  title1: string;
  title2: string;
  withPhoneInteraction: boolean;
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

export interface ComicsNarratorProps {
  _id: number;
  _title: string;
  sceneDescription: string;
  backgroundImages: { image: string }[];
  textsNarrator: { content: string; points: number }[];
  boxDialog: { top: number; left: number; width: number; height: number };
  unlockTexts?: { text: string }[];
  unlockCharacter?: { character: string }[];
  unlockNoteInspecteur?: { noteInspecteur: string }[];
  unlockScenario?: { scenario: string }[];
}

export interface HomeSceneProps {
  _id: number;
  _title: string;
  byScenes: {
    backgroundImages: { image: string }[];
    music: string;
    scenes: string[];
  }[];
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
  texts: {
    content: string;
    character: string;
    backgroundImage: string;
    points: number;
    boxCharacterNamePosition: BoxcharacternamepositionConstant;
  }[];
  boxDialog: { top: number; left: number; width: number; height: number };
  unlockTexts?: { text: string }[];
  unlockCharacter?: { character: string }[];
  unlockNoteInspecteur?: { noteInspecteur: string }[];
  unlockScenario?: { scenario: string }[];
  unlockInterrogatoire?: { interrogatoire: string }[];
  clearSceneDialogDataId?: string;
}

export interface SceneDialogueProps {
  _id: number;
  _title: string;
  backgroundImage: string;
  firstDialogue: string;
  characterResponse: string;
  lastWords: string;
  description: string;
  boxDialogImg: string;
  boxDialog: { top: number; left: number; width: number; height: number };
  tutorialId?: string;
  unlockTexts?: { text: string }[];
  unlockCharacter?: { character: string }[];
  unlockNoteInspecteur?: { noteInspecteur: string }[];
  resumeInformation: {
    title: string;
    notesInspecteurUnlocked: number;
    scenariosUnlocked: number;
    textsCharacterInfoUnlocked: number;
    charactersUnlocked: number;
    animation: string;
  };
}

export interface SceneGifWithTextProps {
  _id: number;
  _title: string;
  backgroundImage: string;
  character: string;
  texts: { content: string; points: number }[];
  unlockTexts?: { text: string }[];
  unlockCharacter?: { character: string }[];
  unlockScenario?: { scenario: string }[];
  unlockNoteInspecteur?: { noteInspecteur: string }[];
}

/** Game Objects **/

export interface ItemInterface {
  _id: number;
  _title: string;
  uniqueKey: string;
  name?: string;
  texts?: {
    content: string;
  }[];
  images?: {
    content: string;
  }[];
  gameObjectTarget?: string;
  order?: number;
}

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
  animation: AnimationsConstant;
  texts: {
    content: string;
    unlockNoteInspecteur?: {
      noteInspecteur: string;
    }[];
    unlockScenario?: {
      scenario: string;
    }[];
    unlockTexts?: {
      text: string;
    }[];
    unlockCharacter?: {
      character: string;
    }[];
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

export interface InterrogatoireInterface {
  _id: number;
  _title: string;
  character: string;
  interrogatoireId: string;
  srDescription: string;
}

export interface NoteInspecteurInterface {
  _id: number;
  _title: string;
  name: string;
  blocks: {
    content: string;
  }[];
  images?: {
    content: string;
  }[];
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
  showIf?: string;
  unlockNoteInspecteur?: {
    noteInspecteur: string;
  }[];
  unlockScenario?: {
    scenario: string;
  }[];
}

export interface ScenarioInterface {
  _id: number;
  _title: string;
  name: string;
  blocks: {
    content: string;
  }[];
  order?: number;
}

/** Constants **/

export type AnimationAnimatecssTimeoutConstant = 1000;
export type AnimationAnimatecssTimeoutFastConstant = 600;
export type AnimationsConstant = "idle" | "angry" | "laught";
export type AppVersionConstant = "1.0000036 - Pre Alpha";
export type BoxcharacternamepositionConstant = "left" | "right";
export type DelayscrolltextConstant = 4500 | 2700 | 1500;
export type DiscordLinkConstant = "https://discord.gg/H8b36mdzgn";
export type ImageBackgroundHomeConstant = "police_station_background.webp";
export type TimeoutToShowContinueArrowConstant = 950;
export type XLinkConstant = "https://x.com/DarkblueDungeon";
export type NoteInspecteurConstant = "note_inspecteur";
export type GoogleFormLinkConstant =
  "https://docs.google.com/forms/d/e/1FAIpQLSdYzlCqsXkfq3oojN53ApOWuL1iHl8hISMICNAQunRUn8LCyg/viewform";
export type PlayerNameConstant = "William Carver";
export type MobilePhoneIconConstant = "mobile-phone.png";

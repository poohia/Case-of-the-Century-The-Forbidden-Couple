export type Item = {
  _id: number;
  _title: string;
  uniqueKey: string;
  name: string;
  texts: string[];
  images: string[];
  gameObjectTarget: string;
  order: number;
};

export interface ChoiceInterface {
  _id: number;
  _title: string;
  text: string;
  dialogue?: string;
  actionUniqKey?: string;
  dontShowIf?: string;
  showIf?: string;
  unLockItem?: string;
}

export interface DialogueInterface {
  _id: number;
  _title: string;
  character: string;
  texts: { text: string }[];
  choices: string[];
}

export interface NpcInterface {
  _id: number;
  _title: string;
  name: string;
  dialogueEnter: string;
  dialogueLeave: string;
}

import { AssertAcceptedType } from "../../../../types";

interface RetrospaceadventureGamePhaserSceneInterface {
  _canStart: boolean;
  config: () => Phaser.Types.Core.GameConfig;
}
export abstract class RetrospaceadventureGamePhaserScene
  extends Phaser.Scene
  implements RetrospaceadventureGamePhaserSceneInterface
{
  _canStart: boolean = false;
  config(): Phaser.Types.Core.GameConfig {
    return {};
  }
}
export type RestrospaceSpriteType = {
  image: string;
  width: number;
  height: number;
  maxFrame: number;
  timeBeetweenSprite: number;
  loop: boolean;
};

export type RetrospaceadventureCharacterJSON = {
  _title: string;
  _id: number;
  _type: string;
  image: string;
  imageIdle: RestrospaceSpriteType;
  imageDamage: RestrospaceSpriteType;
  character_type: "hero" | "enemy";
  minigames?: string[];
  cards?: string[];
};
export type RetrospaceadventureCardEffect =
  | "double_damage"
  | "half_damage"
  | "damage"
  | "use_full_laser"
  | "use_half_laser"
  | "double_heal"
  | "heal"
  | "half_heal"
  | "half_life_target"
  | "half_life_self"
  | "full_life_self"
  | "full_life_target"
  | "protect_self"
  | "suffer_double_damage"
  | "append_damage_to_laser_target"
  | "half_laser_target";

export type EffectStateType = {
  message: "criticalHero" | "echecHero" | "criticalEnemy" | "echecEnemy";
  value: number;
  effect: RetrospaceadventureCardEffect;
  name: string;
};
export type RestrospaceSkillType = {
  _title: string;
  description: string;
  effect: RetrospaceadventureCardEffect;
  image: string;
  atlas: string;
  atlasName: string;
  animation: string;
};

export type RetrospaceadventureTypeCard = {
  _id: number;
  _title: string;
  image: string;
  damage: number;
  laser: number;
  critical_effect: string;
  echec_effect: string;
};

export type RetrospaceadventureCard = {
  id: number;
  _title: string;
  image: string;
  damage: number;
  laser: number;
  critical_effect: RestrospaceSkillType;
  echec_effect: RestrospaceSkillType;
  isEnemyChoice?: boolean;
};

export type RetrospaceadventureCharacter = {
  name: string;
  image: string;
  imageIdle: RestrospaceSpriteType;
  imageDamage: RestrospaceSpriteType;
  character_type: "hero" | "enemy";
  life: number;
  baseLife: number;
  laser: number;
  minigames?: MiniGames[];
  cards: RetrospaceadventureCard[];
};

export type TurnStatus = "win" | "loose";
export type MessageFightInfoStatus =
  | null
  | "fight"
  | "nextTurn"
  | "loose"
  | "win";

export type MiniGames = "touchgame" | "breakout" | "snake";

export type MiniGameProps = {
  showGame: boolean;
  difficulty: "dev" | "tutorial" | "level1" | "level2" | "level3";
  minigame: MiniGames;
  onWin: () => void;
  onLoose: () => void;
};

export type PhaserGameProps = {
  width: number;
  height: number;
  difficulty: MiniGameProps["difficulty"];
  onWin: () => void;
  onLoose: () => void;
  loadSound: (sound: string, volume: number) => void;
  playSound: (sound: string, fadeDuration?: number) => void;
  getAsset: (name: string, type: AssertAcceptedType) => any;
};

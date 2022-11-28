export type RetrospaceadventureElements = 1 | 2 | 3;

export type RetrospaceadventureCharacterJSON = {
  _title: string;
  _id: number;
  _type: string;
  image: string;
  character_type: "hero" | "enemy";
  cards: { card: string }[];
  preferred_element?: RetrospaceadventureElements;
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
  message:
    | "criticalHero"
    | "echecHero"
    | "criticalEnemy"
    | "echecEnemy"
    | "drawHero"
    | "drawEnemy";
  value: number;
  effect: RetrospaceadventureCardEffect;
  name: string;
};

export type RetrospaceadventureCard = {
  id: number;
  name: string;
  image: string;
  damage: number;
  laser: number;
  critical_effect: RetrospaceadventureCardEffect;
  draw_effect: RetrospaceadventureCardEffect;
  echec_effect: RetrospaceadventureCardEffect;
};

export type RetrospaceadventureCharacter = {
  name: string;
  image: string;
  character_type: "hero" | "enemy";
  cards: RetrospaceadventureCard[];
  life: number;
  baseLife: number;
  laser: number;
  preferred_element: RetrospaceadventureElements;
};

export type TurnStatus = "win" | "loose" | "draw";
export type MessageFightInfoStatus = null | "fight" | "loose" | "win";

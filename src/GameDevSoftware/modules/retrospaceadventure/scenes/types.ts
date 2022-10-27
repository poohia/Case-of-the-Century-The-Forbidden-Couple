export type RetrospaceadventureCharacterJSON = {
  _title: string;
  _id: number;
  _type: string;
  image: string;
  character_type: "hero" | "enemy";
  cards: { card: string }[];
};
export type RetrospaceadventureCardEffect =
  | "double_damage"
  | "divise_damage"
  | "damage"
  | "use_full_laser"
  | "use_half_laser";

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
  laser: number;
};

export type RetrospaceadventureElements = 1 | 2 | 3;

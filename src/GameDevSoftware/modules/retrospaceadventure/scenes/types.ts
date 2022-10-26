export type RetrospaceadventureCharacterJSON = {
  _title: string;
  _id: number;
  _type: string;
  image: string;
  character_type: "hero" | "enemy";
  cards: { card: string }[];
};
export type RetrospaceadventureCardEffect = "double_damage" | "divise_damage";

export type RetrospaceadventureCard = {
  name: string;
  image: string;
  damage: number;
  echec_effect: RetrospaceadventureCardEffect;
  critical_effect: RetrospaceadventureCardEffect;
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

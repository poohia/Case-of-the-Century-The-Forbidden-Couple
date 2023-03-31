export type AtlasTypeFrameFrame = {
  w: number;
  h: number;
  x: number;
  y: number;
};
export type AtlasTypeFrame = {
  filename: string;
  frame: AtlasTypeFrameFrame;
  anchor: { x: number; y: number };
};

export type AtlasType = {
  frames: AtlasTypeFrame[];
};
export type AnimationTypeAnimsFrame = {
  key: string;
  frame: string;
};
export type AnimationTypeAnims = {
  key: string;
  type: string;
  repeat: number;
  frameRate: number;
  frames: AnimationTypeAnimsFrame[];
};

export type AnimationType = {
  anims: AnimationTypeAnims[];
};

export type ObjectPosition = { x: number; y: number };
export type ObjectSize = { w: number; h: number };

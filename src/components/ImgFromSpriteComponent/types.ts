export type ObjectPosition = { x: number; y: number };
export type ObjectSize = { w: number; h: number };
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

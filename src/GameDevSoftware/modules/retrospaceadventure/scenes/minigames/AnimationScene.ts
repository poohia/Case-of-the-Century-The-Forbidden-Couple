import Phaser from "phaser";
import { PhaserGameProps } from "../types";

type BreakOutGameProps = Omit<
  PhaserGameProps,
  "difficulty" | "onWin" | "onLoose"
> & {
  animations: {
    phaserAnimation: { anims: Phaser.Types.Animations.Animation[] };
    image: string;
    atlas: Object;
    position: "left" | "right";
    atlasName: string;
  }[];
  onCreated: () => void;
};

class AnimationScene extends Phaser.Scene {
  private a1: Phaser.GameObjects.Sprite | undefined;
  private a2: Phaser.GameObjects.Sprite | undefined;

  constructor(private options: BreakOutGameProps) {
    super("PlayAnimation");
  }

  private getUniqueAtlasAnimation(array: BreakOutGameProps["animations"]) {
    const uniq: any = {};
    return array.filter(
      (obj) => !uniq[obj.atlasName] && (uniq[obj.atlasName] = true)
    );
  }

  preload() {
    const { animations } = this.options;
    this.getUniqueAtlasAnimation(animations).forEach((animation) =>
      this.load.atlas(animation.atlasName, animation.image, animation.atlas)
    );
  }

  create() {
    const { animations, onCreated } = this.options;
    animations.forEach((animation) =>
      animation.phaserAnimation.anims.forEach((animation) =>
        this.anims.create(animation)
      )
    );
    onCreated();
  }

  appendLeftAnimation() {
    const { animations } = this.options;
    const animation = animations.find((a) => a.position === "left");
    if (!animation) return;
    this.a1 = this.add.sprite(64, this.scale.height / 2, animation.atlasName);
    this.a1.play("hit");
  }

  appendRightAnimation() {
    const { animations } = this.options;
    const animation = animations.find((a) => a.position === "right");
    if (!animation) return;
    this.a2 = this.add.sprite(
      this.scale.width - 64,
      this.scale.height / 2,
      `${animation.atlasName}-${animation.position}`
    );
    this.a2.flipX = true;
    this.a2.play("hit");
  }

  update() {
    if (this.a1) {
      this.a1.x += 15;
    }
    if (this.a2) {
      this.a2.x -= 15;
    }
  }

  config(): Phaser.Types.Core.GameConfig {
    const { width, height } = this.options;

    return {
      type: Phaser.AUTO,
      parent: "animationcontent",
      scale: {
        width,
        height,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      // physics: {
      //   default: "arcade",
      // },
      audio: {
        disableWebAudio: true,
        noAudio: true,
      },
      render: {
        transparent: true,
      },
    };
  }
}

export default AnimationScene;

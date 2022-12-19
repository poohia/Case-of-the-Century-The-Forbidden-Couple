import Phaser from "phaser";
import { PhaserGameProps } from "../types";

type BreakOutGameProps = Omit<
  PhaserGameProps,
  "difficulty" | "onWin" | "onLoose"
> & {
  animations: { anims: Phaser.Types.Animations.Animation[] };
  animation: {
    image: string;
    atlas: Object;
    position: "left" | "right";
  };
};

class AnimationScene extends Phaser.Scene {
  private a1: Phaser.GameObjects.Sprite | undefined;
  private a2: Phaser.GameObjects.Sprite | undefined;

  constructor(private options: BreakOutGameProps) {
    super("PlayAnimation");
  }

  preload() {
    const { animation } = this.options;
    // this.load doit absolument se faire au preload peut être chercher la carte directement
    this.load.atlas("laser", animation.image, animation.atlas);
  }

  create() {
    console.log("create");
    // const { animations } = this.options;
    // animations.anims.forEach((animation) => this.anims.create(animation));

    // this.a2 = this.add.sprite(64, this.scale.height / 2, "laser");
    // this.a2.anims.play("hit");
    // tester de passer par un state pour faire appel à la fonction appendLeftAnimation directement mais faire attention que le create sois déjà fait
    document.addEventListener("test", () => {
      console.log("listening");
      const { animations, animation } = this.options;
      // this.load.atlas("laser", animation.image, animation.atlas);
      animations.anims.forEach((animation) => this.anims.create(animation));
      this.appendLeftAnimation({ animationName: "hit" });
    });
  }

  appendLeftAnimation(animation: {
    image?: string;
    atlas?: Object;
    animationName: string;
  }) {
    // this.load.atlas("laser", animation.image, animation.atlas);
    this.a1 = this.add.sprite(64, this.scale.height / 2, "laser");
    this.a1.play(animation.animationName);
  }

  update() {
    if (this.a1) {
      this.a1.x += 15;
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

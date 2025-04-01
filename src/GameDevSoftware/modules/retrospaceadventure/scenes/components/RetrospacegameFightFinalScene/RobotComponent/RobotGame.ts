import {
  PhaserGameProps,
  RetrospaceadventureGamePhaserScene,
} from "../../../types";

export type RobotGameProps = Omit<PhaserGameProps, "onWin" | "onLoose"> & {
  hitRobot: () => void;
};

export class RobotGame extends RetrospaceadventureGamePhaserScene {
  private enableHit = false;
  private image!: Phaser.GameObjects.Image;
  created: boolean = false;
  constructor(private _options: RobotGameProps) {
    super("RobotGame");
  }

  preload() {
    const { getAsset, loadSound } = this._options;

    this.load.atlas(
      "robot_sprites",
      getAsset("robot_sprites.png", "image"),
      getAsset("robot_sprites_atlas.json", "json")
    );

    this.load.image("degat_icon", getAsset("degat_icon.png", "image"));
  }

  create() {
    const {
      _options: { getAsset, hitRobot, hitVibration },
      scale: { width, height },
    } = this;

    this.image = this.add
      .image(width / 2, height - 120, "robot_sprites", "dialog_sprite_1")
      .setInteractive();
    console.log("scale", width / 1920, height / 1080);
    // this.image.setDisplaySize(width / 4, height / 1.4);
    this.image.setScale(width / 1920, height / 1080);
    console.log("i'm here", this.image.width);

    this.image
      .on("pointerover", () => {
        if (this.enableHit) {
          this.input.setDefaultCursor(
            `url(${getAsset("degat_icon.png", "image")}), pointer`
          );
        }
      })
      .on("pointerout", () => {
        this.input.setDefaultCursor("auto");
      })
      .on("pointerdown", (point: any) => {
        if (this.enableHit) {
          const imageDamage = this.add.image(
            point.downX,
            point.downY,
            "degat_icon"
          );
          setTimeout(() => {
            imageDamage.destroy();
          }, 400);
          hitRobot();
          hitVibration();
        }
      });
  }

  update(time: number, delta: number): void {
    if (!this.created) {
      this.created = true;
    }
  }

  config(): Phaser.Types.Core.GameConfig {
    const { width, height } = this._options;
    return {
      type: Phaser.AUTO,
      transparent: true,

      physics: {
        default: "arcade",
      },
      scale: {
        parent: "phaserrobotgamecontent",
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width,
        height,
      },
      audio: {
        disableWebAudio: true,
        noAudio: true,
      },
    };
  }

  setEnableHit(enable: boolean) {
    this.enableHit = enable;
    if (enable) {
      this.image.setFrame("robot_croix");
    } else {
      this.image.setFrame("dialog_sprite_1");
    }
  }

  get options() {
    return this._options;
  }
}

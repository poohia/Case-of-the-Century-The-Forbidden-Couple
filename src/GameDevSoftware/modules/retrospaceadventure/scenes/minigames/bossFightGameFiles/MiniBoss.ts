import { RetrospaceadventureGamePhaserScene } from "../../types";
import BossFightGame from "../BossFightGame";

export class MiniBoss {
  private gameObject;
  public dead = true;
  private speed = 300;

  constructor(
    private scene: RetrospaceadventureGamePhaserScene,
    protected velocityRatio: number,
    private onDestroy: () => void
  ) {
    const {
      options: { getAsset },
    } = this.scene as BossFightGame;
    this.gameObject = this.scene.physics.add
      .image(-24, -24, "assets", "sprite_3")
      .setCollideWorldBounds(true)
      .setBounce(1)
      .setInteractive()
      .setVisible(false);
    const degatIcon = getAsset("degat_icon.png", "image");

    this.gameObject.on("pointerdown", () => this.handleDestroy());
    this.gameObject.on("pointerover", () => {
      this.scene.input.setDefaultCursor(`url(${degatIcon}),pointer`);
    });
    this.gameObject.on("pointerout", () => {
      this.scene.input.setDefaultCursor("auto");
    });
  }

  showMiniBoss(x: number, y: number) {
    this.dead = false;
    this.gameObject.x = x;
    this.gameObject.y = y;
    this.gameObject
      .setVisible(true)
      .setVelocity(
        Phaser.Math.Between(-this.speed, this.speed),
        Phaser.Math.Between(-this.speed, this.speed)
      );
  }

  handleDestroy() {
    const {
      options: { playSound, hitVibration },
    } = this.scene as BossFightGame;
    playSound("Click_Electronic.mp3", 0);
    hitVibration();
    this.dead = true;
    this.gameObject.setVisible(false).setVelocity(0, 0);
    this.onDestroy();
  }

  rotate() {
    this.gameObject.rotation += 0.1;
  }
}

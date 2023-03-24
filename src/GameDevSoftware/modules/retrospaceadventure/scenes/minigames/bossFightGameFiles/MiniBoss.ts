import {
  PhaserGameProps,
  RetrospaceadventureGamePhaserScene,
} from "../../types";
import { getRandomInt, randomFromArray } from "../../utils";

export class MiniBoss {
  private gameObject;
  public dead = true;
  private velocitiesX = [
    [-100, -65],
    [65, 100],
  ];
  private velocitiesY = [
    [-300, -150],
    [150, 300],
  ];
  private velocity;

  constructor(
    private scene: RetrospaceadventureGamePhaserScene,
    protected velocityRatio: number,
    private onDestroy: () => void,
    private playSound: PhaserGameProps["playSound"]
  ) {
    const velocityX = randomFromArray(this.velocitiesX);
    const velocityY =
      velocityX[0] < 0 ? this.velocitiesY[0] : this.velocitiesY[1];

    this.velocity = {
      x: getRandomInt(
        velocityX[0] * velocityRatio,
        velocityX[1] * velocityRatio
      ),
      y: getRandomInt(
        velocityY[0] * velocityRatio,
        velocityY[1] * velocityRatio
      ),
    };

    this.gameObject = this.scene.physics.add
      .image(-24, -24, "assets", "sprite_3")
      .setCollideWorldBounds(true)
      .setBounce(1)
      .setInteractive()
      .setVisible(false);

    this.gameObject.on("pointerdown", () => this.handleDestroy());
  }

  showMiniBoss(x: number, y: number) {
    this.dead = false;
    this.gameObject.x = x;
    this.gameObject.y = y;
    this.gameObject
      .setVisible(true)
      .setVelocity(this.velocity.x, this.velocity.y);
  }

  handleDestroy() {
    this.playSound("Click_Electronic.mp3", 0);
    this.dead = true;
    this.gameObject.setVisible(false).setVelocity(0, 0);
    this.onDestroy();
  }

  rotate() {
    this.gameObject.rotation += 0.1;
  }
}

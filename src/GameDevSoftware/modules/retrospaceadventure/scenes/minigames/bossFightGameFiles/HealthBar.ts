import { RetrospaceadventureGamePhaserScene } from "../../types";
import { calculResultPercent } from "../../utils";

export class HealthBar {
  private bar;
  private value;
  constructor(
    scene: RetrospaceadventureGamePhaserScene,
    private x: number,
    private y: number,
    private width: number
  ) {
    this.bar = new Phaser.GameObjects.Graphics(scene);
    this.value = 100;

    this.draw(100);

    scene.add.existing(this.bar);
  }

  draw(value: number) {
    this.value = value <= 0 ? 0 : value;
    this.bar.clear();

    //  BG
    this.bar.fillStyle(0x000000);
    this.bar.fillRect(this.x, this.y, this.width + 4, 16);

    //  Health
    this.bar.fillStyle(0xffffff);
    this.bar.fillRect(this.x + 2, this.y + 2, this.width, 12);

    if (this.value < 30) {
      this.bar.fillStyle(0xff0000);
    } else if (this.value < 51) {
      this.bar.fillStyle(0xffb300);
    } else {
      this.bar.fillStyle(0x3aaa35);
    }

    this.bar.fillRect(
      this.x + 2,
      this.y + 2,
      calculResultPercent(this.width, this.value),
      12
    );
  }
}

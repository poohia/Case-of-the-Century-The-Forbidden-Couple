import { RetrospaceadventureGamePhaserScene } from "../../types";

export class MiniRobot {
  public gameObject: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private minVelocity = 200;
  private maxVelocity = 500;

  constructor(
    private scene: RetrospaceadventureGamePhaserScene,
    x: number,
    y: number
  ) {
    this.gameObject = this.scene.physics.add
      .sprite(x, y, "snake_sprites", "tile020")
      .setVelocityY(Phaser.Math.Between(this.minVelocity, this.maxVelocity));
    this.gameObject.play("robot");
  }

  update() {
    if (this.gameObject.active && this.gameObject.y > this.scene.scale.height) {
      this.gameObject.destroy();
    }
  }
}

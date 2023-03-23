import { RetrospaceadventureGamePhaserScene } from "../../types";
import { randomFromArray } from "../../utils";

export class Boss {
  private gameObject;
  constructor(
    private scene: RetrospaceadventureGamePhaserScene,
    private width: number,
    private height: number
  ) {
    console.log(height);
    this.gameObject = this.scene.physics.add.image(
      0,
      height / 2,
      "assets",
      "sprite_2"
    );
    this.gameObject.setCollideWorldBounds(true).setBounce(1);
    //   .setVelocity(-65, -275);
  }

  private determinateX(delta: number) {
    const { x } = this.gameObject;
    if (x >= this.width - 30) {
      return (x + delta * 0.7) * -1;
    }
    const values = [x + delta * 0.7, x - delta * 0.7];
    return randomFromArray(values);
  }

  private determinateY(delta: number) {
    const { y } = this.gameObject;
    if (y >= this.height - 30) {
      return (y + delta * 0.7) * -1;
    }
    const values = [y + delta * 0.7, y - delta * 0.7];
    return randomFromArray(values);
  }

  update(time: number, delta: number) {
    const x = this.determinateX(delta);
    const y = this.determinateY(delta);

    this.gameObject.setVelocityX(x);
    this.gameObject.setVelocityY(y);
  }
}

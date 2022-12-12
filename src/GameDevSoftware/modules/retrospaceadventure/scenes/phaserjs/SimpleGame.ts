import Phaser from "phaser";

class SimpleGame extends Phaser.Scene {
  // @ts-ignore
  image: Phaser.GameObjects.Image;
  constructor(private options: { logo: string }) {
    super("PlayGame");
  }
  preload() {
    this.load.image("logo", this.options.logo);
    console.log(this.options);
  }
  create() {
    this.image = this.add.image(200, 200, "logo");
    // this.image.setPosition(400, 300);
  }
  update() {
    this.image.rotation += 0.01;
  }
}

export default SimpleGame;

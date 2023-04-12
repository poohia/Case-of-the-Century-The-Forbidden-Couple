import SnakeGame from "../SnakeGame";

export class BadFood extends Phaser.GameObjects.Sprite {
  constructor(scene: SnakeGame, x: number, y: number) {
    super(scene, x, y, "snake_sprite", "tile015");
    this.setPosition(x * SnakeGame.PIXEL_SIZE, y * SnakeGame.PIXEL_SIZE);
    this.setOrigin(0);
    scene.children.add(this);
  }

  playAnimation() {
    this.play("boulon", false);
    this.setOrigin(0);
  }
}

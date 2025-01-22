import { RetrospaceadventureGamePhaserScene } from "../../types";
import { calculResultPercent } from "../../utils";
import BossFightGame, { DifficultyType } from "../BossFightGame";
import { MiniBoss } from "./MiniBoss";

export class Boss {
  private path: Phaser.Curves.Path;
  private follower: Phaser.GameObjects.PathFollower;
  private graphics: Phaser.GameObjects.Graphics;
  private miniBoss: any[] = [];

  public ended = false;
  public life = 100;

  constructor(
    private scene: RetrospaceadventureGamePhaserScene,
    private width: number,
    private height: number,
    private difficulty: DifficultyType
  ) {
    const {
      options: { playSound, hitVibration, getAsset },
    } = this.scene as BossFightGame;
    this.createMiniBoss();
    const degatIcon = getAsset("degat_icon.png", "image");
    this.graphics = this.scene.add.graphics();
    const firstPoint = [calculResultPercent(this.width, 10), this.height / 2];
    const [firstPointX, firstPointY] = firstPoint;
    const points = [
      [
        calculResultPercent(this.width, 20) + firstPointX,
        calculResultPercent(this.height, 10) + BossFightGame.HEADER_HEIGHT,
      ],
      [
        calculResultPercent(this.width, 40) + firstPointX,
        calculResultPercent(this.height, 5) + BossFightGame.HEADER_HEIGHT,
      ],
      [
        calculResultPercent(this.width, 60) + firstPointX,
        calculResultPercent(this.height, 15) + BossFightGame.HEADER_HEIGHT,
      ],
      [
        calculResultPercent(this.width, 80) + firstPointX,
        calculResultPercent(this.height, 50) + BossFightGame.HEADER_HEIGHT,
      ],
      [
        calculResultPercent(this.width, 65) + firstPointX,
        calculResultPercent(this.height, 70) + BossFightGame.HEADER_HEIGHT,
      ],
      [
        calculResultPercent(this.width, 50) + firstPointX,
        calculResultPercent(this.height, 60) + BossFightGame.HEADER_HEIGHT,
      ],
      [
        calculResultPercent(this.width, 40) + firstPointX,
        calculResultPercent(this.height, 75) + BossFightGame.HEADER_HEIGHT,
      ],
      firstPoint,
    ];
    this.path = new Phaser.Curves.Path(0, firstPointY);
    this.path.moveTo(firstPointX, firstPointY);

    this.path.splineTo(
      points.map((point) => new Phaser.Math.Vector2(point[0], point[1]))
    );
    this.follower = this.scene.add.follower(
      this.path,
      10,
      this.height / 2,
      "assets",
      "sprite_1"
    );
    this.follower
      .startFollow({
        duration: this.difficulty.durationBoss,
        yoyo: false,
        repeat: -1,
        startAt: Math.random(),
      })
      .setVisible(false);
    this.follower.setInteractive().on("pointerdown", () => {
      playSound("Click_Electronic.mp3", 0);
      hitVibration();
      this.life -= this.difficulty.hitDamage;
      if (this.life < 100 && this.life % 10 === 0) {
        this.follower.setVisible(false);
        this.miniBoss.forEach((m) =>
          m.showMiniBoss(this.follower.x, this.follower.y)
        );
      }
      this.follower.setFrame("sprite_2");
      setTimeout(() => {
        this.follower.setFrame("sprite_1");
      }, 200);
    });

    if (this.difficulty.showPath) {
      this.graphics.lineStyle(2, 0xffffff, 1);
      this.path.draw(this.graphics);
    }

    this.follower.on("pointerover", () => {
      this.scene.input.setDefaultCursor(`url(${degatIcon}),pointer`);
    });
    this.follower.on("pointerout", () => {
      this.scene.input.setDefaultCursor("auto");
    });
  }

  async createMiniBoss() {
    for (let i = 0; i < this.difficulty.nbMiniBoss; i++) {
      this.miniBoss.push(
        new MiniBoss(this.scene, this.difficulty.velocityRatio, () => {
          this.life -= this.difficulty.hitMiniBossDamage;
          if (this.miniBoss.find((m) => !m.dead) === undefined) {
            this.follower.setVisible(true);
          }
        })
      );
    }
  }

  startGame() {
    this.follower.setVisible(true);
  }

  update() {
    if (this.ended) {
      this.scene.input.setDefaultCursor("auto");
      this.follower.pauseFollow().off("pointerdown").off("pointerover");
      return;
    }
    if (this.life <= 0) {
      this.ended = true;
    } else {
      this.follower.rotation += 0.1;
      this.miniBoss.forEach((m) => m.rotate());
    }
  }
}

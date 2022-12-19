import Phaser from "phaser";
import { PhaserGameProps } from "../types";

type BreakOutGameProps = PhaserGameProps & {
  breakoutImage: string;
  breakoutConfig: Object;
};

class BreakOutGame extends Phaser.Scene {
  private bricks: any;
  private ball: Phaser.Types.Physics.Arcade.ImageWithDynamicBody | undefined;
  private paddle: any;
  private padDimension = {
    width: 104,
    height: 24,
  };
  private blockDimension = {
    width: 64,
    height: 32,
  };
  private isFinish = false;

  static tutorial = {
    frame: ["blue1"],
    frameQuantity: 5,
    velocity: {
      x: -50,
      y: -250,
    },
  };

  static level1 = {
    frame: ["blue1"],
    frameQuantity: 5,
    velocity: {
      x: -75,
      y: -300,
    },
  };

  static level2 = {
    frame: ["blue1", "red1", "green1"],
    frameQuantity: 5,
    velocity: {
      x: -75 * 1.5,
      y: -300 * 1.5,
    },
  };

  static level3 = {
    frame: ["blue1", "red1"],
    frameQuantity: 5,
    velocity: {
      x: -75 * 2,
      y: -300 * 2,
    },
  };

  private currentDifficulty;

  constructor(private options: BreakOutGameProps) {
    super("PlayGame");
    const { difficulty } = options;
    switch (difficulty) {
      case "level1":
        this.currentDifficulty = BreakOutGame.level1;
        break;
      case "level2":
        this.currentDifficulty = BreakOutGame.level2;
        break;
      case "level3":
        this.currentDifficulty = BreakOutGame.level3;
        break;
      case "dev":
        this.currentDifficulty = BreakOutGame.tutorial;
        break;
      case "tutorial":
      default:
        this.currentDifficulty = BreakOutGame.tutorial;
    }
  }

  private hitBrick(ball: any, brick: any) {
    const { playSound } = this.options;
    brick.disableBody(true, true);
    playSound("block_destroy.mp3");
    if (this.bricks.countActive() === 0) {
      this.resetBall();
      this.options.onWin();
      this.isFinish = true;
    }
  }

  private resetBall() {
    this.ball?.setVelocity(0);
    this.ball?.setPosition(
      this.paddle.x,
      this.scale.height - this.padDimension.height - 30
    );
    this.ball?.setData("onPaddle", true);
  }

  private hitPaddle(ball: any, paddle: any) {
    const { playSound } = this.options;
    var diff = 0;
    playSound("ball_hit_paddle.mp3");
    if (ball.x < paddle.x) {
      //  Ball is on the left-hand side of the paddle
      diff = paddle.x - ball.x;
      ball.setVelocityX(-10 * diff);
    } else if (ball.x > paddle.x) {
      //  Ball is on the right-hand side of the paddle
      diff = ball.x - paddle.x;
      ball.setVelocityX(10 * diff);
    } else {
      //  Ball is perfectly in the middle
      //  Add a little random X to stop it bouncing straight up!
      ball.setVelocityX(2 + Math.random() * 8);
    }
  }

  preload() {
    const { breakoutImage, breakoutConfig, loadSound } = this.options;
    this.load.atlas("assets", breakoutImage, breakoutConfig);
    loadSound("ball_throw.mp3", 1);
    loadSound("block_destroy.mp3", 1);
    loadSound("ball_hit_paddle.mp3", 1);
  }

  create() {
    const { playSound } = this.options;
    const { width, height } = this.scale;

    //  Enable world bounds, but disable the floor
    this.physics.world.setBoundsCollision(true, true, true, false);

    //  Create the bricks in a 10x6 grid
    this.bricks = this.physics.add.staticGroup({
      key: "assets",
      frame: this.currentDifficulty.frame,
      frameQuantity: this.currentDifficulty.frameQuantity,
      gridAlign: {
        width: this.currentDifficulty.frameQuantity,
        height: 12,
        cellWidth: this.blockDimension.width,
        cellHeight: this.blockDimension.height,
        x: (width - 5 * this.blockDimension.width) / 2 + 30,
        y: 20,
      },
    });

    this.ball = this.physics.add
      .image(
        width / 2,
        height - this.padDimension.height - 30,
        "assets",
        "ball1"
      )
      .setCollideWorldBounds(true)
      .setBounce(1);
    this.ball.setData("onPaddle", true);

    this.paddle = this.physics.add
      .image(width / 2, height - this.padDimension.height, "assets", "paddle1")
      .setImmovable();

    //  Our colliders
    this.physics.add.collider(
      this.ball,
      this.bricks,
      this.hitBrick,
      undefined,
      this
    );
    this.physics.add.collider(
      this.ball,
      this.paddle,
      this.hitPaddle,
      undefined,
      this
    );

    //  Input events
    this.input.on(
      "pointermove",
      (pointer: any) => {
        //  Keep the paddle within the game
        this.paddle.x = Phaser.Math.Clamp(
          pointer.x,
          this.padDimension.width / 2,
          this.scale.width - this.padDimension.width / 2
        );

        if (this.ball?.getData("onPaddle")) {
          this.ball.x = this.paddle.x;
        }
      },
      this
    );

    this.input.on(
      "pointerup",
      (pointer: any) => {
        if (this.ball?.getData("onPaddle")) {
          playSound("ball_throw.mp3");
          this.ball.setVelocity(
            this.currentDifficulty.velocity.x,
            this.currentDifficulty.velocity.y
          );
          this.ball.setData("onPaddle", false);
        }
      },
      this
    );
  }
  update() {
    if (this.isFinish) return;
    if (this.ball && this.ball.y > this.scale.height) {
      this.resetBall();
      this.options.onLoose();
      this.isFinish = true;
    }
  }

  config(): Phaser.Types.Core.GameConfig {
    const { width, height } = this.options;
    return {
      type: Phaser.AUTO,
      parent: "phasergamecontent",
      scale: {
        width,
        height,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      physics: {
        default: "arcade",
      },
      audio: {
        disableWebAudio: true,
        noAudio: true,
      },
    };
  }
}

export default BreakOutGame;

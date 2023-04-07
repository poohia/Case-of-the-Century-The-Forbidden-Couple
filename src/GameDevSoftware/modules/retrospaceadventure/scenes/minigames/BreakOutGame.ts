import Phaser from "phaser";
import { RetrospaceadventureGamePhaserScene, PhaserGameProps } from "../types";

class BreakOutGame extends RetrospaceadventureGamePhaserScene {
  private bricks: any;
  // @ts-ignore
  private ball: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private paddle: any;
  private padDimension = {
    width: 156,
    height: 36,
  };
  private blockDimension = {
    width: 98,
    height: 50,
  };
  private isFinish = false;

  static tutorial = {
    frame: ["block_1"],
    frameQuantity: 5,
    velocity: {
      x: -50,
      y: -250,
    },
  };

  static level1 = {
    frame: ["block_1"],
    frameQuantity: 7,
    velocity: {
      x: -65,
      y: -275,
    },
  };

  static level2 = {
    frame: ["block_1"],
    frameQuantity: 4,
    velocity: {
      x: -65 * 1.2,
      y: -275 * 1.2,
    },
  };

  static level3 = {
    frame: ["blue1", "red1"],
    frameQuantity: 7,
    velocity: {
      x: -65 * 1.3,
      y: -275 * 1.3,
    },
  };

  private currentDifficulty;
  public _canStart = false;

  // @ts-ignore
  private cursors;

  constructor(private _options: PhaserGameProps) {
    super("BreakoutGame");
    const { difficulty } = _options;
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
    const { playSound } = this._options;
    brick.disableBody(true, true);
    playSound("block_destroy.mp3", 0);
    if (this.bricks.countActive() === 0) {
      this.resetBall();
      this._options.onWin();
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
    const { playSound } = this._options;
    var diff = 0;
    playSound("ball_hit_paddle.mp3", 0);
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
    const { getAsset, loadSound } = this._options;
    this.load.atlas(
      "breakout_sprites",
      getAsset("breakout_sprites.png", "image"),
      getAsset("breakout_sprites_atlas.json", "json")
    );
    loadSound("ball_throw.mp3", 1);
    loadSound("block_destroy.mp3", 1);
    loadSound("ball_hit_paddle.mp3", 1);
  }

  private startBall() {
    if (this.ball?.getData("onPaddle")) {
      const { playSound } = this._options;
      playSound("ball_throw.mp3", 0);
      this.ball.setVelocity(
        this.currentDifficulty.velocity.x,
        this.currentDifficulty.velocity.y
      );
      this.ball.setData("onPaddle", false);
      this.ball.play("ball_animation", false);
    }
  }

  create() {
    const { width, height } = this.scale;
    const { getAsset } = this._options;
    const phaserAnimation: {
      anims: Phaser.Types.Animations.Animation[];
    } = getAsset("breakout_sprites_anim.json", "json");
    phaserAnimation.anims.forEach((animation) => {
      this.anims.create(animation);
    });
    //  Enable world bounds, but disable the floor
    this.physics.world.setBoundsCollision(true, true, true, false);

    //  Create the bricks in a 10x6 grid
    this.bricks = this.physics.add.staticGroup({
      key: "breakout_sprites",
      frame: this.currentDifficulty.frame,
      frameQuantity: this.currentDifficulty.frameQuantity,
      gridAlign: {
        width: this.currentDifficulty.frameQuantity,
        height: 12,
        cellWidth: this.blockDimension.width,
        cellHeight: this.blockDimension.height,
        x:
          (width -
            this.currentDifficulty.frameQuantity * this.blockDimension.width) /
            2 +
          this.blockDimension.width / 2,
        y: 20,
      },
    });

    this.paddle = this.physics.add
      .image(
        width / 2,
        height - this.padDimension.height,
        "breakout_sprites",
        "paddle"
      )
      .setImmovable();
    this.ball = this.physics.add
      .sprite(
        this.paddle.x,
        this.paddle.y - this.padDimension.height,
        "breakout_sprites",
        "ball_1"
      )
      .setCollideWorldBounds(true)
      .setBounce(1);

    this.ball.setData("onPaddle", true);
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
      () => {
        this.startBall();
      },
      this
    );
    document.addEventListener("keydown", (event) => {
      switch (event.code) {
        case "Space":
          this.startBall();
          break;
        // case "ArrowLeft":
        //   this.paddle.x = Phaser.Math.Clamp(
        //     this.paddle.x - 60,
        //     this.padDimension.width / 2,
        //     this.scale.width - this.padDimension.width / 2
        //   );
        //   if (this.ball?.getData("onPaddle")) {
        //     this.ball.x = this.paddle.x;
        //   }
        //   break;
        // case "ArrowRight":
        //   this.paddle.x = Phaser.Math.Clamp(
        //     this.paddle.x + 60,
        //     this.padDimension.width / 2,
        //     this.scale.width - this.padDimension.width / 2
        //   );
        //   if (this.ball?.getData("onPaddle")) {
        //     this.ball.x = this.paddle.x;
        //   }
        //   break;
      }
    });
    //  Create our keyboard controls
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update(_time: number, delta: number) {
    if (this.isFinish) return;

    if (this.cursors.left.isDown) {
      this.paddle.x = Phaser.Math.Clamp(
        this.paddle.x - delta,
        this.padDimension.width / 2,
        this.scale.width - this.padDimension.width / 2
      );
      if (this.ball?.getData("onPaddle")) {
        this.ball.x = this.paddle.x;
      }
    } else if (this.cursors.right.isDown) {
      this.paddle.x = Phaser.Math.Clamp(
        this.paddle.x + delta,
        this.padDimension.width / 2,
        this.scale.width - this.padDimension.width / 2
      );
      if (this.ball?.getData("onPaddle")) {
        this.ball.x = this.paddle.x;
      }
    }

    if (this.ball && this.ball.y > this.scale.height) {
      this.resetBall();
      this._options.onLoose();
      this.isFinish = true;
    }
  }

  config(): Phaser.Types.Core.GameConfig {
    const { width, height } = this._options;

    return {
      type: Phaser.AUTO,
      parent: "phasergamecontent",
      backgroundColor: "#2d2d2d",
      scale: {
        width: 895,
        height: 424,
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

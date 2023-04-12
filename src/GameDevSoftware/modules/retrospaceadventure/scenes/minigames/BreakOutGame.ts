import Phaser from "phaser";
import { RetrospaceadventureGamePhaserScene, PhaserGameProps } from "../types";
import { MiniRobot } from "./breakoutGameFiles/MiniRobot";

class BreakOutGame extends RetrospaceadventureGamePhaserScene {
  // @ts-ignore
  private bricks: Phaser.Physics.Arcade.StaticGroup;
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

  static ballVelocity = {
    x: -75,
    y: -280,
  };

  static tutorial = {
    frame: ["block_1"],
    frameQuantity: 5,
    velocity: BreakOutGame.ballVelocity,
  };

  static level1 = {
    frame: ["block_1"],
    frameQuantity: 7,
    velocity: {
      x: BreakOutGame.ballVelocity.x * 1.1,
      y: BreakOutGame.ballVelocity.y * 1.1,
    },
  };

  static level2 = {
    frame: ["block_1", "block_1"],
    frameQuantity: 4,
    velocity: {
      x: BreakOutGame.ballVelocity.x * 1.3,
      y: BreakOutGame.ballVelocity.y * 1.3,
    },
  };

  static level3 = {
    frame: ["block_1", "block_1"],
    frameQuantity: 7,
    velocity: {
      x: BreakOutGame.ballVelocity.x * 1.4,
      y: BreakOutGame.ballVelocity.y * 1.4,
    },
  };

  private currentDifficulty;
  public _canStart = false;
  private enableMiniBoos = true;

  // @ts-ignore
  private cursors;
  private miniBossTraps: MiniRobot[] = [];

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

  private hitBrick(_ball: any, brick: any) {
    const { playSound, onLoose } = this._options;
    brick.setFrame("block_2");
    setTimeout(() => {
      brick.disableBody(true, true);
      if (this.bricks.countActive() === 0) {
        this.resetBall();
        this._options.onWin();
        this.isFinish = true;
      } else {
        const random = Phaser.Math.Between(0, 2);
        if (random < 2) {
          const miniRobot = new MiniRobot(this, brick.x, brick.y);
          this.miniBossTraps.push(miniRobot);
          this.physics.add.collider(miniRobot.gameObject, this.paddle, () => {
            onLoose();
          });
        }
      }
    }, 90);
    playSound("block_destroy.mp3", 0);
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
    this.load.atlas(
      "snake_sprite",
      getAsset("snake_sprite.png", "image"),
      getAsset("snake_sprite_atlas.json", "json")
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
    let phaserAnimation: {
      anims: Phaser.Types.Animations.Animation[];
    } = getAsset("breakout_sprites_anim.json", "json");
    phaserAnimation.anims.forEach((animation) => {
      this.anims.create(animation);
    });
    phaserAnimation = getAsset("snake_sprite_anim.json", "json");
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
        height: this.currentDifficulty.frame.length,
        cellWidth: this.blockDimension.width,
        cellHeight: this.blockDimension.height,
        x:
          (width -
            this.currentDifficulty.frameQuantity * this.blockDimension.width) /
            2 +
          this.blockDimension.width / 2,
        y: this.blockDimension.height / 2,
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
    this.miniBossTraps.forEach((t) => t.update());
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
      transparent: true,
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

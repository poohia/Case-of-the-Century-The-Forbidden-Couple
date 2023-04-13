import { PhaserGameProps, RetrospaceadventureGamePhaserScene } from "../types";
import BadFood from "./snakeGameFiles/BadFood";
import Food from "./snakeGameFiles/Food";
import Snake from "./snakeGameFiles/Snake";
export enum DIRECTION {
  Up = 0,
  Down,
  Left,
  Right,
}

export class SnakeGame extends RetrospaceadventureGamePhaserScene {
  static PIXEL_SIZE = 30;
  // @ts-ignore
  private textInfo: Phaser.GameObjects.Text;
  private targetToEat: number;
  private nbBadFood: number;

  static tutorial = {
    startspeed: 100,
    targetToEat: 3,
    increaseSpeedModulo: 3,
    nbBadFood: 2,
  };

  static level1 = {
    startspeed: 80,
    targetToEat: 4,
    increaseSpeedModulo: 3,
    nbBadFood: 4,
  };

  static level2 = {
    startspeed: 75,
    targetToEat: 6,
    increaseSpeedModulo: 2,
    nbBadFood: 6,
  };

  static level3 = {
    startspeed: 70,
    targetToEat: 6,
    increaseSpeedModulo: 2,
    nbBadFood: 8,
  };

  // private currentDifficulty;
  // @ts-ignore
  private badFoods: BadFood[] = [];
  // @ts-ignore
  private food: Food;
  // @ts-ignore
  private snake: Snake;
  _canStart: boolean = false;

  private start = false;
  private x = 0;
  private y = 0;

  constructor(private _options: PhaserGameProps) {
    super("SnakeGame");
    switch (this._options.difficulty) {
      case "dev":
      case "tutorial":
        this.targetToEat = SnakeGame.tutorial.targetToEat;
        this.nbBadFood = SnakeGame.tutorial.nbBadFood;
        break;
      case "level1":
        this.targetToEat = SnakeGame.level1.targetToEat;
        this.nbBadFood = SnakeGame.level1.nbBadFood;
        break;
      case "level2":
        this.targetToEat = SnakeGame.level2.targetToEat;
        this.nbBadFood = SnakeGame.level2.nbBadFood;
        break;
      case "level3":
        this.targetToEat = SnakeGame.level3.targetToEat;
        this.nbBadFood = SnakeGame.level3.nbBadFood;
        break;
    }
  }

  /**
   * We can place the food anywhere in our 40x30 grid
   * *except* on-top of the snake, so we need
   * to filter those out of the possible food locations.
   * If there aren't any locations left, they've won!
   *
   * @method repositionFood
   * @return {boolean} true if the food was placed, otherwise false
   */
  private repositionFood() {
    //  First create an array that assumes all positions
    //  are valid for the new piece of food

    //  A Grid we'll use to reposition the food each time it's eaten
    const testGrid: any = [];
    const { nbRows, nbColumns } = this.snake;
    for (let y = 0; y < nbColumns; y++) {
      testGrid[y] = [];

      for (let x = 0; x < nbRows; x++) {
        if (x >= nbRows - 2 && y <= 2) {
          testGrid[y][x] = false;
        } else {
          testGrid[y][x] = true;
        }
      }
    }
    this.snake.updateGrid(testGrid);

    //  Purge out false positions
    let validLocations: { x: number; y: number }[] = [];

    for (let y = 0; y < nbColumns; y++) {
      for (let x = 0; x < nbRows; x++) {
        if (testGrid[y][x] === true) {
          //  Is this position valid for food? If so, add it here ...
          validLocations.push({ x: x, y: y });
        }
      }
    }

    if (validLocations.length > 0) {
      //  Use the RNG to pick a random food position
      const pos = Phaser.Math.RND.pick(validLocations);
      validLocations = validLocations.filter(
        (v) => !(v.x === pos.x && v.y === pos.y)
      );
      //  And place it
      this.food.setPosition(
        pos.x * SnakeGame.PIXEL_SIZE,
        pos.y * SnakeGame.PIXEL_SIZE
      );
    } else {
      return false;
    }
    this.badFoods.forEach((badFood) => {
      if (validLocations.length > 0) {
        const pos = Phaser.Math.RND.pick(validLocations);
        validLocations = validLocations.filter(
          (v) => !(v.x === pos.x && v.y === pos.y)
        );
        //  And place it
        badFood.setPosition(
          pos.x * SnakeGame.PIXEL_SIZE,
          pos.y * SnakeGame.PIXEL_SIZE
        );
      }
    });
    if (validLocations.length === 0) return false;
    return true;
  }

  private initGesture(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  private applyGesture(x: number, y: number) {
    const deltaX = this.x - x;
    const deltaY = this.y - y;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (x < this.x) {
        this.snake.changeDirection(DIRECTION.Left);
      }
      if (x > this.x) {
        this.snake.changeDirection(DIRECTION.Right);
      }
    } else {
      if (y < this.y) {
        this.snake.changeDirection(DIRECTION.Up);
      }
      if (y > this.y) {
        this.snake.changeDirection(DIRECTION.Down);
      }
    }
  }

  preload() {
    const { getAsset, loadSound } = this._options;
    this.load.atlas(
      "snake_sprites",
      getAsset("snake_sprites.png", "image"),
      getAsset("snake_sprites_atlas.json", "json")
    );
    loadSound("ball_throw.mp3", 1);
  }

  create() {
    const {
      _options: { getAsset },
      nbBadFood,
      scale: { width },
    } = this;

    const phaserAnimation: {
      anims: Phaser.Types.Animations.Animation[];
    } = getAsset("snake_sprites_anim.json", "json");
    phaserAnimation.anims.forEach((animation) => {
      this.anims.create(animation);
    });
    this.snake = new Snake(this);
    this.food = new Food(this, 2, 2);

    for (let i = 0; i < nbBadFood; i++) {
      this.badFoods.push(
        new BadFood(this, this.snake.nbRows - 2, this.snake.nbColumns / 2)
      );
    }
    this.textInfo = this.add.text(
      width - SnakeGame.PIXEL_SIZE,
      0,
      this.targetToEat.toString(),
      {
        color: "white",
        fontSize: `${SnakeGame.PIXEL_SIZE}px`,
        fontFamily: "Audiowide",
      }
    );
    this.add.image(
      width - SnakeGame.PIXEL_SIZE * 2,
      SnakeGame.PIXEL_SIZE / 2,
      "snake_sprites",
      "tile020"
    );

    document.addEventListener("touchstart", (e) => {
      if (this._canStart && !this.start) {
        this.startMove();
      } else if (!this.start) {
        return;
      }
      const { screenX, screenY } = e.touches[0];
      this.initGesture(screenX, screenY);
    });

    document.addEventListener("mousedown", (e) => {
      if (this._canStart && !this.start) {
        this.startMove();
      } else if (!this.start) {
        return;
      }
      const { screenX, screenY } = e;
      this.initGesture(screenX, screenY);
    });
    document.addEventListener("mouseup", (e) => {
      if (this._canStart && !this.start) {
        this.startMove();
      } else if (!this.start) {
        return;
      }
      const { screenX, screenY } = e;
      this.applyGesture(screenX, screenY);
    });

    // document
    //   .getElementById("phasergamecontent")
    //   ?.addEventListener("mousemove", (e) => {
    //     const { screenX, screenY } = e;
    //     this.applyGesture(screenX, screenY);
    //   });

    document.addEventListener("touchmove", (e) => {
      if (this._canStart && !this.start) {
        this.startMove();
      } else if (!this.start) {
        return;
      }
      const { screenX, screenY } = e.changedTouches[0];
      this.applyGesture(screenX, screenY);
    });

    document.addEventListener("keydown", (event) => {
      if (this._canStart && !this.start) {
        this.startMove();
      } else if (!this.start) {
        return;
      }

      switch (event.code) {
        case "ArrowUp":
          this.snake.changeDirection(DIRECTION.Up);
          break;
        case "ArrowDown":
          this.snake.changeDirection(DIRECTION.Down);
          break;
        case "ArrowRight":
          this.snake.changeDirection(DIRECTION.Right);
          break;
        case "ArrowLeft":
          this.snake.changeDirection(DIRECTION.Left);
          break;
      }
      // do something
    });
  }

  startMove() {
    this.start = true;
    this.food.playAnimation();
    this.badFoods.forEach((f) => f.playAnimation());
  }

  update(time: number) {
    // this.food.playAnimation();
    const { onWin, onLoose } = this._options;
    if (this.food.total === this.targetToEat) {
      onWin();
      return false;
    }

    if (!this.start) return;
    Promise.all([
      new Promise<void>((resolve) => {
        this.food.setOrigin(0);
        this.badFoods.forEach((f) => f.setOrigin(0));
        resolve();
      }),
      new Promise<void>((resolve) => {
        if (this.snake.update(time)) {
          //  If the snake updated, we need to check for collision against food

          if (this.snake.collideWithFood(this.food)) {
            this.repositionFood();
            this.textInfo.text = String(this.targetToEat - this.food.total);
          } else {
            this.badFoods.forEach((badFood) => {
              if (this.snake.collideWithBadFood(badFood)) {
                badFood.destroy();
                onLoose();
              }
            });
          }
        }
        resolve();
      }),
    ]);
  }

  config(): Phaser.Types.Core.GameConfig {
    const { width, height } = this._options;

    return {
      type: Phaser.AUTO,
      transparent: true,

      physics: {
        default: "arcade",
      },
      scale: {
        parent: "phasergamecontent",
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width,
        height,
      },
      audio: {
        disableWebAudio: true,
        noAudio: true,
      },
    };
  }

  get options() {
    return this._options;
  }
}

export default SnakeGame;

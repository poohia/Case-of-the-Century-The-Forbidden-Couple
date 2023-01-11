import Phaser from "phaser";
import { PhaserGameProps } from "../types";
enum DIRECTION {
  Up = 0,
  Down,
  Left,
  Right,
}

class Food extends Phaser.GameObjects.Image {
  total = 0;
  constructor(scene: SnakeGame, x: number, y: number) {
    super(scene, x, y, "food");
    this.setPosition(x * 16, y * 16);
    this.setOrigin(0);

    this.total = 0;

    scene.children.add(this);
  }

  eat() {
    const {
      options: { playSound },
    } = this.scene as SnakeGame;
    playSound("ball_throw.mp3", 0);

    this.total += 1;
  }
}

class Snake {
  private headPosition;
  private body;
  private head;
  private tail;
  private speed = 60;
  private moveTime = 0;
  private increaseSpeedModulo;
  private heading = DIRECTION.Right;
  private direction = DIRECTION.Right;
  nbRows;
  nbColumns;

  constructor(private scene: SnakeGame, x: number, y: number) {
    const {
      add,
      options: { width, height, difficulty },
    } = scene;
    this.headPosition = new Phaser.Geom.Point(x, y);
    this.body = add.group();
    this.head = this.body.create(x * 16, y * 16, "body");
    this.head.setOrigin(0);
    this.tail = new Phaser.Geom.Point(x, y);
    for (let i = 1; i < 4; i++) {
      let newPart = this.body.create(x * 16 - 16 * i, y * 16, "body");
      newPart.setOrigin(0);
    }

    this.nbRows = Math.floor(width / 16);
    this.nbColumns = Math.floor(height / 16);
    switch (difficulty) {
      case "dev":
      case "tutorial":
        this.increaseSpeedModulo = SnakeGame.tutorial.increaseSpeedModulo;
        this.speed = SnakeGame.tutorial.startspeed;
        break;
      case "level1":
        this.increaseSpeedModulo = SnakeGame.level1.increaseSpeedModulo;
        this.speed = SnakeGame.level1.startspeed;
        break;
      case "level2":
        this.increaseSpeedModulo = SnakeGame.level2.increaseSpeedModulo;
        this.speed = SnakeGame.level2.startspeed;
        break;
      case "level3":
        this.increaseSpeedModulo = SnakeGame.level3.increaseSpeedModulo;
        this.speed = SnakeGame.level3.startspeed;
        break;
    }
  }

  private grow() {
    let newPart = this.body.create(this.tail.x, this.tail.y, "body");

    newPart.setOrigin(0);
  }

  collideWithFood(food: Food) {
    if (this.head.x === food.x && this.head.y === food.y) {
      this.grow();

      food.eat();

      //  For every 5 items of food eaten we'll increase the snake speed a little
      if (this.speed > 20 && food.total % this.increaseSpeedModulo === 0) {
        this.speed -= 5;
      }

      return true;
    } else {
      return false;
    }
  }

  updateGrid(grid: any) {
    //  Remove all body pieces from valid positions list
    this.body.children.each((segment: any) => {
      const s: Phaser.GameObjects.Sprite = segment;
      const bx = s.x / 16;
      const by = s.y / 16;
      grid[by][bx] = false;
    });

    return grid;
  }

  faceLeft() {
    if (this.direction === DIRECTION.Up || this.direction === DIRECTION.Down) {
      this.heading = DIRECTION.Left;
    }
  }

  faceRight() {
    if (this.direction === DIRECTION.Up || this.direction === DIRECTION.Down) {
      this.heading = DIRECTION.Right;
    }
  }

  faceUp() {
    if (
      this.direction === DIRECTION.Left ||
      this.direction === DIRECTION.Right
    ) {
      this.heading = DIRECTION.Up;
    }
  }

  faceDown() {
    if (
      this.direction === DIRECTION.Left ||
      this.direction === DIRECTION.Right
    ) {
      this.heading = DIRECTION.Down;
    }
  }

  update(time: number) {
    if (time >= this.moveTime) {
      return this.move(time);
    }
  }

  move(time: number) {
    /**
     * Based on the heading property (which is the direction the pgroup pressed)
     * we update the headPosition value accordingly.
     *
     * The Math.wrap call allow the snake to wrap around the screen, so when
     * it goes off any of the sides it re-appears on the other.
     */
    switch (this.heading) {
      case DIRECTION.Left:
        this.headPosition.x = Phaser.Math.Wrap(
          this.headPosition.x - 1,
          0,
          this.nbRows
        );
        break;

      case DIRECTION.Right:
        this.headPosition.x = Phaser.Math.Wrap(
          this.headPosition.x + 1,
          0,
          this.nbRows
        );
        break;

      case DIRECTION.Up:
        this.headPosition.y = Phaser.Math.Wrap(
          this.headPosition.y - 1,
          0,
          this.nbColumns
        );
        break;

      case DIRECTION.Down:
        this.headPosition.y = Phaser.Math.Wrap(
          this.headPosition.y + 1,
          0,
          this.nbColumns
        );
        break;
    }

    this.direction = this.heading;

    //  Update the body segments and place the last coordinate into this.tail
    Phaser.Actions.ShiftPosition(
      this.body.getChildren(),
      this.headPosition.x * 16,
      this.headPosition.y * 16,
      1,
      // @ts-ignore
      this.tail
    );

    //  Check to see if any of the body pieces have the same x/y as the head
    //  If they do, the head ran into the body

    const hitBody = Phaser.Actions.GetFirst(
      this.body.getChildren(),
      { x: this.head.x, y: this.head.y },
      1
    );

    if (hitBody) {
      this.scene.options.onLoose();
      return false;
    } else {
      //  Update the timer ready for the next movement
      this.moveTime = time + this.speed;

      return true;
    }
  }
}

class SnakeGame extends Phaser.Scene {
  // @ts-ignore
  private textInfo: Phaser.GameObjects.Text;
  private targetToEat: number;

  static tutorial = {
    startspeed: 100,
    targetToEat: 3,
    increaseSpeedModulo: 3,
  };

  static level1 = {
    startspeed: 70,
    targetToEat: 4,
    increaseSpeedModulo: 3,
  };

  static level2 = {
    startspeed: 60,
    targetToEat: 10,
    increaseSpeedModulo: 2,
  };

  static level3 = {
    startspeed: 40,
    targetToEat: 15,
    increaseSpeedModulo: 1,
  };

  // private currentDifficulty;
  // @ts-ignore
  private food: Food;
  // @ts-ignore
  private snake: Snake;
  // @ts-ignore
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  private start = false;
  private x = 0;
  private y = 0;

  constructor(private _options: PhaserGameProps) {
    super("SnakeGame");
    switch (this._options.difficulty) {
      case "dev":
      case "tutorial":
        this.targetToEat = SnakeGame.tutorial.targetToEat;
        break;
      case "level1":
        this.targetToEat = SnakeGame.level1.targetToEat;
        break;
      case "level2":
        this.targetToEat = SnakeGame.level2.targetToEat;
        break;
      case "level3":
        this.targetToEat = SnakeGame.level3.targetToEat;
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

    for (let y = 0; y < this.snake.nbColumns; y++) {
      testGrid[y] = [];

      for (let x = 0; x < this.snake.nbRows; x++) {
        testGrid[y][x] = true;
      }
    }

    this.snake.updateGrid(testGrid);

    //  Purge out false positions
    const validLocations = [];

    for (let y = 0; y < this.snake.nbColumns; y++) {
      for (let x = 0; x < this.snake.nbRows; x++) {
        if (testGrid[y][x] === true) {
          //  Is this position valid for food? If so, add it here ...
          validLocations.push({ x: x, y: y });
        }
      }
    }

    if (validLocations.length > 0) {
      //  Use the RNG to pick a random food position
      const pos = Phaser.Math.RND.pick(validLocations);

      //  And place it
      this.food.setPosition(pos.x * 16, pos.y * 16);

      return true;
    } else {
      return false;
    }
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
        this.snake.faceLeft();
      }
      if (x > this.x) {
        this.snake.faceRight();
      }
    } else {
      if (y < this.y) {
        this.snake.faceUp();
      }
      if (y > this.y) {
        this.snake.faceDown();
      }
    }
  }

  preload() {
    const { getAsset, loadSound } = this._options;
    this.load.image("food", getAsset("snakefood.png", "image"));
    this.load.image("body", getAsset("snakebody.png", "image"));
    loadSound("ball_throw.mp3", 1);
  }

  create() {
    const { width } = this._options;
    this.food = new Food(this, 8, 4);
    this.snake = new Snake(this, 16, 8);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.textInfo = this.add.text(width - 16, 0, this.targetToEat.toString(), {
      color: "white",
      fontSize: "16px",
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
    });
    this.add.image(width - 16 * 2, 16 / 2, "food");

    document
      .getElementById("phasergamecontent")
      ?.addEventListener("touchstart", (e) => {
        this.start = true;
        const { screenX, screenY } = e.touches[0];
        this.initGesture(screenX, screenY);
      });

    document
      .getElementById("phasergamecontent")
      ?.addEventListener("mousedown", (e) => {
        this.start = true;
        const { screenX, screenY } = e;
        this.initGesture(screenX, screenY);
      });
    document
      .getElementById("phasergamecontent")
      ?.addEventListener("mouseup", (e) => {
        const { screenX, screenY } = e;
        this.applyGesture(screenX, screenY);
      });

    // document
    //   .getElementById("phasergamecontent")
    //   ?.addEventListener("mousemove", (e) => {
    //     const { screenX, screenY } = e;
    //     this.applyGesture(screenX, screenY);
    //   });

    document
      .getElementById("phasergamecontent")
      ?.addEventListener("touchmove", (e) => {
        const { screenX, screenY } = e.changedTouches[0];
        this.applyGesture(screenX, screenY);
      });
  }

  update(time: number) {
    if (this.food.total === this.targetToEat) {
      this._options.onWin();
      return false;
    }
    if (
      !this.start &&
      (this.cursors.left.isDown ||
        this.cursors.right.isDown ||
        this.cursors.up.isDown ||
        this.cursors.down.isDown)
    ) {
      this.start = true;
    }
    if (this.cursors.left.isDown) {
      this.snake.faceLeft();
    } else if (this.cursors.right.isDown) {
      this.snake.faceRight();
    } else if (this.cursors.up.isDown) {
      this.snake.faceUp();
    } else if (this.cursors.down.isDown) {
      this.snake.faceDown();
    }

    if (!this.start) return;

    if (this.snake.update(time)) {
      //  If the snake updated, we need to check for collision against food

      if (this.snake.collideWithFood(this.food)) {
        this.repositionFood();
        this.textInfo.text = String(this.targetToEat - this.food.total);
      }
    }
  }

  config(): Phaser.Types.Core.GameConfig {
    const { width, height } = this._options;
    return {
      type: Phaser.AUTO,
      parent: "phasergamecontent",
      scale: {
        width,
        height,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
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

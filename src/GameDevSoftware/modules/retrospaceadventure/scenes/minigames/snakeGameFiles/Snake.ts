import SnakeGame, { DIRECTION } from "../SnakeGame";
import BadFood from "./BadFood";
import Food from "./Food";

export default class Snake {
  private headPosition;
  private body: Phaser.GameObjects.Group;
  private head: Phaser.GameObjects.Sprite;
  private tail;
  private speed = 60;
  private moveTime = 0;
  private increaseSpeedModulo;
  private heading = DIRECTION.Right;
  private direction = DIRECTION.Right;
  nbRows;
  nbColumns;

  constructor(private scene: SnakeGame) {
    const {
      add,
      options: { difficulty },
      scale: { width, height },
    } = scene;
    this.nbRows = Math.floor(width / SnakeGame.PIXEL_SIZE);
    this.nbColumns = Math.floor(height / SnakeGame.PIXEL_SIZE);
    const x = 4;
    const y = this.nbColumns / 2;
    this.headPosition = new Phaser.Geom.Point(x, y);
    this.body = add.group();
    this.head = this.body
      .create(
        x * SnakeGame.PIXEL_SIZE,
        y * SnakeGame.PIXEL_SIZE,
        "snake_sprites",
        "tile020"
      )
      .setOrigin(0);
    this.tail = new Phaser.Geom.Point(x, y);
    for (let i = 1; i < 4; i++) {
      this.body
        .create(
          x * SnakeGame.PIXEL_SIZE - SnakeGame.PIXEL_SIZE * i,
          y * SnakeGame.PIXEL_SIZE,
          "snake_sprites",
          "tile020"
        )
        .setOrigin(0);
    }

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
    this.body
      .create(this.tail.x, this.tail.y, "snake_sprites", "tile020")
      .setOrigin(0);
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
    }
    return false;
  }

  collideWithBadFood(badFood: BadFood) {
    if (this.head.x === badFood.x && this.head.y === badFood.y) {
      return true;
    }
    return false;
  }

  updateGrid(grid: any) {
    //  Remove all body pieces from valid positions list
    this.body.children.each((segment: any) => {
      const s: Phaser.GameObjects.Sprite = segment;
      const bx = s.x / SnakeGame.PIXEL_SIZE;
      const by = s.y / SnakeGame.PIXEL_SIZE;
      grid[by][bx] = false;
    });

    return grid;
  }

  async changeDirection(direction: DIRECTION) {
    switch (direction) {
      case DIRECTION.Left:
        if (
          this.direction === DIRECTION.Up ||
          this.direction === DIRECTION.Down
        ) {
          this.heading = DIRECTION.Left;
        }
        break;
      case DIRECTION.Right:
        if (
          this.direction === DIRECTION.Up ||
          this.direction === DIRECTION.Down
        ) {
          this.heading = DIRECTION.Right;
        }
        break;
      case DIRECTION.Up:
        if (
          this.direction === DIRECTION.Left ||
          this.direction === DIRECTION.Right
        ) {
          this.heading = DIRECTION.Up;
        }
        break;

      case DIRECTION.Down:
        if (
          this.direction === DIRECTION.Left ||
          this.direction === DIRECTION.Right
        ) {
          this.heading = DIRECTION.Down;
        }
        break;
    }
  }

  update(time: number) {
    if (time >= this.moveTime) {
      return this.move(time);
    }
  }

  move(time: number) {
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
      this.headPosition.x * SnakeGame.PIXEL_SIZE,
      this.headPosition.y * SnakeGame.PIXEL_SIZE,
      1,
      // @ts-ignore
      this.tail
    );

    //  Update the timer ready for the next movement
    this.moveTime = time + this.speed;

    return true;
  }
}

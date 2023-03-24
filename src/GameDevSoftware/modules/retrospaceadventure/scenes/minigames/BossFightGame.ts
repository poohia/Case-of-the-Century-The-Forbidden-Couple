import Phaser from "phaser";
import { RetrospaceadventureGamePhaserScene, PhaserGameProps } from "../types";
import { Boss } from "./bossFightGameFiles/Boss";
import { HealthBar } from "./bossFightGameFiles/HealthBar";

export type DifficultyType = {
  nbMiniBoss: number;
  hitDamage: number;
  hitMiniBossDamage: number;
  velocityRatio: number;
  durationBoss: number;
  timeToTarget: number;
  showPath?: boolean;
};

class BossFightGame extends RetrospaceadventureGamePhaserScene {
  static HEADER_HEIGHT = 4 * 2 + 16;

  static tutorial = {
    nbMiniBoss: 2,
    hitDamage: 5,
    hitMiniBossDamage: 50,
    durationBoss: 6000,
    velocityRatio: 0.5,
    timeToTarget: 8000,
  };

  static level1 = {
    nbMiniBoss: 2,
    hitDamage: 2,
    hitMiniBossDamage: 20,
    durationBoss: 5000,
    velocityRatio: 1.1,
    timeToTarget: 10000,
  };

  static level2 = {
    nbMiniBoss: 4,
    hitDamage: 2,
    hitMiniBossDamage: 10,
    durationBoss: 4800,
    velocityRatio: 1.3,
    timeToTarget: 14000,
  };

  static level3 = {
    nbMiniBoss: 10,
    hitDamage: 1,
    hitMiniBossDamage: 5,
    durationBoss: 4500,
    velocityRatio: 1.3,
    timeToTarget: 18000,
  };

  private started = false;
  private currentDifficulty: DifficultyType;
  public _canStart = false;
  // @ts-ignore
  private boss: Boss;
  private timeout: number;
  // @ts-ignore
  private chronoText: Phaser.GameObjects.Text;
  // @ts-ignore
  private timer: Phaser.Time.TimerEvent;
  // @ts-ignore
  private barLife: HealthBar;

  constructor(private _options: PhaserGameProps) {
    super("FightGame");
    const { difficulty } = _options;
    switch (difficulty) {
      case "level1":
        this.currentDifficulty = BossFightGame.level1;
        break;
      case "level2":
        this.currentDifficulty = BossFightGame.level2;
        break;
      case "level3":
        this.currentDifficulty = BossFightGame.level3;
        break;
      case "dev":
        this.currentDifficulty = { ...BossFightGame.tutorial, showPath: true };
        break;
      case "tutorial":
      default:
        this.currentDifficulty = BossFightGame.tutorial;
    }
    this.timeout = Number(this.currentDifficulty.timeToTarget);
  }

  preload() {
    const { getAsset, loadSound } = this._options;
    this.load.atlas(
      "assets",
      getAsset("boss_fight.png", "image"),
      getAsset("boss_fight_atlas.json", "json")
    );
    loadSound("Click_Electronic.mp3", 1);
  }

  create() {
    const { width, height } = this.scale;
    const widthText = 16 * 5;
    Promise.all([
      new Promise<void>((resolve) => {
        this.boss = new Boss(
          this,
          width,
          height,
          this.currentDifficulty,
          this._options.playSound
        );
        resolve();
      }),
      new Promise<void>((resolve) => {
        this.chronoText = this.add.text(
          width - widthText,
          4,
          `${this.currentDifficulty.timeToTarget.toLocaleString("de-DE")}s`,
          {
            color: "white",
            fontSize: "16px",
            fontFamily: "Audiowide",
          }
        );

        resolve();
      }),
      new Promise<void>((resolve) => {
        this.barLife = new HealthBar(this, 10, 4, width - widthText * 1.5);
        resolve();
      }),
    ]);
  }

  update() {
    if (!this.started && this._canStart) {
      this.started = true;
      this.createTimer();
      this.boss.startGame();
    }
    this.boss.update();
    this.barLife.draw(this.boss.life);
    if (this.boss.isFinish) {
      this._options.onWin();
    }
  }

  private async createTimer() {
    this.timer = this.time.addEvent({
      delay: 100,
      callback: this.updateChrono,
      callbackScope: this,
      loop: true,
    });
  }

  private async updateChrono() {
    this.timeout -= 100;
    if (this.timeout <= 0) {
      this._options.onLoose();
      this.timer.remove();
    }
    this.chronoText.setText(`${this.timeout.toLocaleString("de-DE")}s`);
  }

  config(): Phaser.Types.Core.GameConfig {
    const { width, height } = this._options;

    return {
      type: Phaser.AUTO,
      parent: "phasergamecontent",
      backgroundColor: "#2d2d2d",
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

export default BossFightGame;

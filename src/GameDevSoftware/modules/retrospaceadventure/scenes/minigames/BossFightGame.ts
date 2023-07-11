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
    nbMiniBoss: 3,
    hitDamage: 5,
    hitMiniBossDamage: 16,
    durationBoss: 8000,
    velocityRatio: 0.5,
    timeToTarget: 20000,
  };

  static level1 = {
    nbMiniBoss: 3,
    hitDamage: 2,
    hitMiniBossDamage: 16,
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
    nbMiniBoss: 6,
    hitDamage: 1,
    hitMiniBossDamage: 7,
    durationBoss: 4500,
    velocityRatio: 1.5,
    timeToTarget: 17000,
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
  private ended = false;

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
      getAsset("boss_fight_sprites.png", "image"),
      getAsset("boss_fight_sprites_atlas.json", "json")
    );
    loadSound("Click_Electronic.mp3", 1, false);
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
          this._options.playSound,
          this._options.getAsset
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
    if (this.ended) {
      this.boss.ended = true;
      this.anims.pauseAll();
    }
    this.boss.update();
    this.barLife.draw(this.boss.life);
    if (this.boss.ended) {
      this.ended = true;
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
    if (this.ended) return;
    this.timeout -= 100;
    if (this.timeout <= 0) {
      this.boss.ended = true;
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

export default BossFightGame;

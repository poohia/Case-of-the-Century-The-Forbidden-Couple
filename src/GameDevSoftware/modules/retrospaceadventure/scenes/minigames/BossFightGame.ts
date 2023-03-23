import Phaser from "phaser";
import { RetrospaceadventureGamePhaserScene, PhaserGameProps } from "../types";
import { Boss } from "./bossFightGameFiles/Boss";

class BossFightGame extends RetrospaceadventureGamePhaserScene {
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
    frameQuantity: 7,
    velocity: {
      x: -65,
      y: -275,
    },
  };

  static level2 = {
    frame: ["blue1", "red1"],
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
  private boss: Boss;

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
        this.currentDifficulty = BossFightGame.tutorial;
        break;
      case "tutorial":
      default:
        this.currentDifficulty = BossFightGame.tutorial;
    }
  }

  preload() {
    const { getAsset } = this._options;
    this.load.atlas(
      "assets",
      getAsset("boss_fight.png", "image"),
      getAsset("boss_fight_atlas.json", "json")
    );
  }

  create() {
    const { width, height } = this.scale;
    this.boss = new Boss(this, width, height);
  }

  update(time: number, delta: number) {
    this.boss.update(time, delta);
  }

  config(): Phaser.Types.Core.GameConfig {
    const { width, height } = this._options;

    return {
      type: Phaser.AUTO,
      parent: "phasergamecontent",
      backgroundColor: "#ffffff",
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

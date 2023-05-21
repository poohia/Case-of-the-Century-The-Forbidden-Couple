import { EnvType } from "../../../../../types";
import { RetrospacegameadventurecomicscenetabletactionPropsData } from "../Retrospacegameadventurecomicscenetabletaction";

type ComicTabletSceneProps =
  RetrospacegameadventurecomicscenetabletactionPropsData & {
    env: EnvType;
    width: number;
    height: number;
    onTextsAllShowed: () => void;
  };
class ComicTabletScene extends Phaser.Scene {
  // @ts-ignore
  private hitbox: Phaser.GameObjects.Rectangle;
  private oldStep = -1;
  private step = -1;
  private stepOfStep = 0;
  private timeOut = 120;
  constructor(private _options: ComicTabletSceneProps) {
    super("ComicTabletScene");
  }

  preload() {
    console.log("preload", this._options.primaryImage);
    this.load.image("primaryImage", this._options.primaryImage);
  }

  create() {
    const { width, height, rectToClick, env, texts } = this._options;
    const image = this.add.image(width / 2, height / 2, "primaryImage");
    // Ajuster la taille de l'image pour correspondre à la taille du canvas
    image.setDisplaySize(width, height);
    console.log(this.step, texts);

    // Redimensionner l'échelle de l'image pour remplir le canvas
    // const scaleX = this._options.width / image.width;
    // const scaleY = this._options.height / image.height;
    // image.setScale(scaleX, scaleY);
    setTimeout(() => {
      this.hitbox = this.add
        .rectangle(
          rectToClick.x,
          rectToClick.y,
          rectToClick.width,
          rectToClick.height
        )
        .setInteractive();
      if (env === "development") {
        this.hitbox.setFillStyle(0xff0000, 0.5);
      }
      this.hitbox
        .on("pointerover", () => {
          if (this.step < texts.length - 1) {
            this.input.setDefaultCursor("pointer");
          }
        })
        .on("pointerout", () => {
          this.input.setDefaultCursor("auto");
        })
        .on("pointerdown", () => {
          console.log("i'm here", this.step);
          if (this.stepOfStep === 0 && this.step < texts.length - 1) {
            this.step += 1;
          }
        });
    }, 500);
  }

  private draw() {
    const { texts, onTextsAllShowed } = this._options;

    const text = texts[this.step];
    console.log(text, this.step);
    const timer = setInterval(() => {
      const step = text.step[this.stepOfStep];
      this.stepOfStep += 1;
      if (this.stepOfStep === 4) {
        clearInterval(timer);
        this.stepOfStep = 0;
        if (this.step === texts.length - 1) {
          onTextsAllShowed();
        }
      } else if (this.stepOfStep < 3) {
        this.add
          .graphics()
          .lineStyle(2, 0x000000) // Épaisseur du trait et couleur (noir)
          .moveTo(step.moveToX, step.moveToY) // Coordonnées de départ du trait horizontal
          .lineTo(step.lineToX, step.lineToY) // Coordonnées d'arrivée du trait horizontal
          .stroke();
      } else if (this.stepOfStep === 3) {
        this.add.text(text.text.x, text.text.y, text.text.text, {
          font: "16px Arial",
          color: "#00000",
        });
      }
    }, this.timeOut);
  }

  update(time: number, delta: number): void {
    if (this.step !== this.oldStep) {
      this.oldStep = this.step;
      this.draw();
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

export default ComicTabletScene;

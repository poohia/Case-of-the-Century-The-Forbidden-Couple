import { EnvType } from "../../../../../types";
import { RetrospacegameadventurecomicscenetabletactionPropsData } from "../Retrospacegameadventurecomicscenetabletaction";

type ComicTabletSceneProps =
  RetrospacegameadventurecomicscenetabletactionPropsData & {
    env: EnvType;
    width: number;
    height: number;
  };
class ComicTabletScene extends Phaser.Scene {
  // @ts-ignore
  private hitbox: Phaser.GameObjects.Rectangle;
  private oldStep = 0;
  private step = 0;
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
    console.log("create", this.scale.gameSize, this.sys.game.canvas);
    const { width, height, rectToClick, env } = this._options;
    const image = this.add.image(width / 2, height / 2, "primaryImage");
    // Ajuster la taille de l'image pour correspondre à la taille du canvas
    image.setDisplaySize(width, height);

    // Redimensionner l'échelle de l'image pour remplir le canvas
    // const scaleX = this._options.width / image.width;
    // const scaleY = this._options.height / image.height;
    // image.setScale(scaleX, scaleY);
    // console.log(...Object.values(this._options.rectToClick));
    this.hitbox = this.add
      .rectangle(
        rectToClick.x,
        rectToClick.y,
        rectToClick.width,
        rectToClick.height
      )
      .setInteractive();
    if (env === "production") {
      this.hitbox.setFillStyle(0xff0000, 0.5);
    }
    this.hitbox
      .on("pointerover", () => {
        this.input.setDefaultCursor(`pointer`);
      })
      .on("pointerout", () => {
        this.input.setDefaultCursor("auto");
      })
      .on("pointerdown", () => {
        if (this.stepOfStep === 0) {
          this.step += 1;
        }
      });
  }

  private draw() {
    console.log("draw");
    const timer = setInterval(() => {
      this.stepOfStep += 1;
      if (this.stepOfStep === 4) {
        clearInterval(timer);
        this.stepOfStep = 0;
      } else if (this.stepOfStep === 1) {
        // Dessiner le trait horizontal
        this.add
          .graphics()
          .lineStyle(2, 0x000000) // Épaisseur du trait et couleur (noir)
          .moveTo(1000, 300) // Coordonnées de départ du trait horizontal
          .lineTo(1100, 300) // Coordonnées d'arrivée du trait horizontal
          .stroke();
      } else if (this.stepOfStep === 2) {
        // Dessiner le trait vertical
        this.add
          .graphics()
          .lineStyle(2, 0x000000) // Épaisseur du trait et couleur (noir)
          .moveTo(1100, 300) // Coordonnées de départ du trait vertical (à la fin du trait horizontal)
          .lineTo(1100, 220) // Coordonnées d'arrivée du trait vertical
          .stroke();
      } else if (this.stepOfStep === 3) {
        // Afficher le texte
        this.add.text(1000, 200, "Je me rendais en balade", {
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

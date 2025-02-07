import styled from "styled-components";

import {
  ImgComponent,
  PageComponent,
  TranslationComponent,
} from "../../../../components";
import { useAssets } from "../../../../hooks";
import { SceneComponentProps } from "../../../../types";
import "animate.css";
import RetrospaceadventureNotification from "./components/RetrospaceadventureNotification";

import { useEffect, useMemo, useRef, useState } from "react";

import { useGameProvider } from "../../../../gameProvider";
import { BarLeftLaserComponent } from "./components/styled/Bar";

type RetrospacegameadventurecomicscenetabletactionPropsData = {
  primaryImage: string;
  rectToClick: {
    width: number;
    height: number;
    x: number;
    y: number;
  };
};

export type RetrospacegameadventurecomicscenetabletactionProps =
  SceneComponentProps<
    {},
    RetrospacegameadventurecomicscenetabletactionPropsData
  >;

const Container = styled.div`
  display: flex;
  padding: 5px;
  justify-content: center;
  background: transparent;
  canvas,
  img {
    width: 100%;
    height: calc(100vh - 10px);
    border-radius: 10px;
  }
`;

const timeOut = 200;

const Retrospacegameadventurecomicscenetabletaction: RetrospacegameadventurecomicscenetabletactionProps =
  (props) => {
    const {
      data: { _actions, primaryImage, rectToClick },
    } = props;
    const [loaded, setLoaded] = useState<boolean>(false);

    const {
      nextScene,
      setPrimaryFont,
      setBackgroundColor,
      env,
      innerWidth,
      innerHeight,
    } = useGameProvider();
    const { getAssetImg } = useAssets();

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const image = useMemo(() => {
      const img = new Image();
      img.src = getAssetImg(primaryImage);
      return img;
    }, []);

    const renderText = (
      text: string,
      x: number,
      y: number,
      context: CanvasRenderingContext2D
    ) => {
      const words = text.split(" ");
      let line = "";
      let currentY = y;

      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + " ";
        const { width } = context.measureText(testLine);

        if (width > 300) {
          context.fillText(line, x, currentY);
          line = words[i] + " ";
          currentY += 30;
        } else {
          line = testLine;
        }
      }

      context.fillText(line, x, currentY);
    };

    const draw = (context: CanvasRenderingContext2D) => {
      context.clearRect(0, 0, image.naturalWidth, image.naturalHeight);

      context.drawImage(image, 0, 0);

      context.font = "24px 'ihtacs'";
      if (env === "development") {
        context.globalAlpha = 0.5;
      } else {
        context.globalAlpha = 0;
      }

      context.fillRect(
        rectToClick.x,
        rectToClick.y,
        rectToClick.width,
        rectToClick.height
      );
      context.lineWidth = 2;
      context.globalAlpha = 1;
      setTimeout(() => {
        // Dessiner le trait horizontal
        context.beginPath();
        context.moveTo(1000, 300); // Coordonnées de départ du trait horizontal
        context.lineTo(1100, 300); // Coordonnées d'arrivée du trait horizontal
        context.stroke();
        context.stroke();
        setTimeout(() => {
          // Dessiner le trait vertical
          context.beginPath();
          context.moveTo(1100, 300); // Coordonnées de départ du trait vertical (à la fin du trait horizontal)
          context.lineTo(1100, 220); // Coordonnées d'arrivée du trait vertical
          context.stroke();
          setTimeout(() => {
            renderText("Je me rendais en balade", 1000, 200, context);
          }, timeOut);
        }, timeOut);
      }, timeOut);
    };

    const handleClick = (
      event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
    ) => {
      console.log(event.clientX);
    };

    const handleMouseMove = (
      event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
    ) => {
      if (loaded && canvasRef.current) {
        const { current: canvas } = canvasRef;
        const rect = canvas.getBoundingClientRect();
        const hoverX = event.clientX - rect.left;
        const hoverY = event.clientY - rect.top;
        // Vérifier si les coordonnées du survol se trouvent dans les limites de l'élément
        if (
          hoverX >= rectToClick.x &&
          hoverX <= rectToClick.x + rectToClick.width &&
          hoverY >= rectToClick.y &&
          hoverY <= rectToClick.y + rectToClick.y
        ) {
          // Le curseur est sur l'élément, modifier le style du curseur
          canvas.style.cursor = "pointer";
        } else {
          // Le curseur n'est pas sur l'élément, rétablir le style du curseur par défaut
          canvas.style.cursor = "default";
        }
      }
    };

    useEffect(() => {
      setPrimaryFont("ihtacs");
    }, []);

    useEffect(() => {
      if (loaded && canvasRef.current) {
        const { current: canvas } = canvasRef;

        // const container = canvas.parentElement;
        // if (!container) return;
        // console.log(container.clientWidth);
        // canvas.width = container.clientWidth;
        // canvas.height = container.clientHeight;

        const context = canvas.getContext("2d");
        if (!context) {
          return;
        }
        draw(context);
      }
    }, [canvasRef, loaded]);

    // check img loaded
    useEffect(() => {
      const dispatchImgLoaded = () => {
        setLoaded(true);
      };
      if (image.complete) {
        dispatchImgLoaded();
      } else {
        image.addEventListener("load", dispatchImgLoaded);
        return () => {
          image.removeEventListener("load", dispatchImgLoaded);
        };
      }
    }, []);

    useEffect(() => {
      setBackgroundColor(
        'url("assets/images/backgroundprimary.png") no-repeat'
      );
    }, []);

    return (
      <PageComponent>
        <Container>
          {loaded && (
            <canvas
              width={image.naturalWidth}
              height={image.naturalHeight}
              ref={canvasRef}
              onClick={handleClick}
              onMouseMove={handleMouseMove}
              style={{
                maxWidth: image.naturalWidth,
                maxHeight: image.naturalHeight,
              }}
            />
          )}
        </Container>
      </PageComponent>
    );
  };

export default Retrospacegameadventurecomicscenetabletaction;

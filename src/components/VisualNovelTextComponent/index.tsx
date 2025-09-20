import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { useGameProvider } from "../../gameProvider";
import { TranslationComponentSpan } from "../TranslationComponent";

type VisualNovelTextComponentProps = {
  text: string;
  playSound?: {
    sound: string;
    volume?: number;
    saveSoundEffect?: boolean; // default true
    forcePlaySoundSavedEvenPlayed?: boolean; // default false
  };
  speed?: number;
  paused?: boolean;
  instant?: boolean;
  onDone?: () => void;
};

const punctuationPauses: { [key: string]: number } = {
  ",": 250, // Pause plus courte pour une virgule
  ".": 500, // Pause plus longue pour un point
  "!": 500,
  "?": 500,
  ";": 400,
  ":": 350,
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 8px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  overflow-y: auto;
  scroll-behavior: smooth;
`;

const Text = styled(TranslationComponentSpan)`
  max-width: 100%;
  text-align: left;
  margin-top: auto;
  margin-bottom: auto;
`;

const VisualNovelTextComponent: React.FC<VisualNovelTextComponentProps> = ({
  text,
  speed = 50,
  playSound,
  paused = false,
  instant = speed === 0,
  onDone,
}) => {
  const {
    parameters: { sizeText = "normal", instantTextReveal },
    translateText,
    playSoundEffect,
    releaseSoundEffect,
  } = useGameProvider();

  const finalText = useMemo(
    () => (text ? translateText(text) : ""),
    [text, translateText]
  );
  const [displayed, setDisplayed] = useState("");

  const indexRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("🚀 ~ VisualNovelTextComponent ~ text:", text);

    setDisplayed("");
    indexRef.current = 0;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, [text]);

  useEffect(() => {
    if (indexRef.current + 1 === finalText.length || !finalText) {
      return;
    }
    console.log("VisualNovelTextComponent", instant, instantTextReveal);
    if (instant || instantTextReveal) {
      if (playSound) {
        releaseSoundEffect(playSound?.sound);
      }
      setDisplayed(finalText);
      onDone?.();
      return;
    }

    if (paused || indexRef.current >= finalText.length) {
      return;
    }

    const typeCharacter = () => {
      const currentIndex = indexRef.current;
      setDisplayed(finalText.slice(0, currentIndex + 1));

      if (playSound && finalText[currentIndex] !== " ") {
        playSoundEffect({
          loop: false,
          saveSoundEffect: true,
          forcePlaySoundSavedEvenPlayed: false,
          ...playSound,
        });
      }

      const el = containerRef.current;
      if (el) el.scrollTop = el.scrollHeight;

      if (currentIndex + 1 >= finalText.length) {
        if (playSound) {
          releaseSoundEffect(playSound?.sound);
        }
        onDone?.();
        return;
      }

      indexRef.current += 1;
      const currentChar = finalText[currentIndex];
      const delay = punctuationPauses[currentChar] ?? speed;

      timeoutRef.current = setTimeout(typeCharacter, delay);
    };

    typeCharacter();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    paused,
    instant,
    instantTextReveal,
    speed,
    finalText,
    playSound,
    playSoundEffect,
    onDone,
  ]);

  return (
    <Container ref={containerRef}>
      <Text $sizeText={sizeText}>{displayed}</Text>
    </Container>
  );
};

export default VisualNovelTextComponent;

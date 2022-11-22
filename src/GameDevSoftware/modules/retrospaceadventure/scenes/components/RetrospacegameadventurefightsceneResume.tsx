import React, { useContext, useEffect, useState } from "react";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import { EffectStateType } from "../types";

const RetrospacegameadventurefightsceneResume: React.FC = () => {
  const [messages, setMessages] = useState<EffectStateType[]>([]);
  const {
    stateGame: { effectState },
  } = useContext(RetrospaceadventureGameContext);

  useEffect(() => {
    setMessages((_messages) => {
      if (effectState) {
        return [..._messages, effectState];
      }
      return _messages;
    });
  }, [effectState]);

  return (
    <div>
      <div>
        <h1>Resume</h1>
      </div>
      {messages.map((message, i) => (
        <div key={`fight-resume-message-${i}`}>
          Card name: {message.name} / Message: {message.message} / Effect:{" "}
          {message.effect} / Damage:
          {message.value}
        </div>
      ))}
    </div>
  );
};

export default RetrospacegameadventurefightsceneResume;

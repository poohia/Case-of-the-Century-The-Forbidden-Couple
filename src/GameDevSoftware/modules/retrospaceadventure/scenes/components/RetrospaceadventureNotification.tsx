import styled from "styled-components";
import { TranslationComponent } from "../../../../../components";
import { useEffect, useState } from "react";

const RetrospaceadventureNotificationContainer = styled.div<{
  active?: boolean;
}>`
  position: absolute;
  top: 5px;
  left: 5px;
  min-width: 40%;
  min-height: 5%;
  background: white;
  padding: 5px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 3px;
  font-size: 1.1rem;
  border: 2px solid black;
  color: ${({ active }) => (active ? "#7ed6df" : "black")};
`;
const RetrospaceadventureNotificationContainerHeader = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
`;
const RetrospaceadventureNotificationContainerList = styled.ul`
  font-weight: bold;
  margin: 0;
  margin-top: 5px;
`;

const RetrospaceadventureNotificationContainerListItem = styled.li<{
  active?: boolean;
}>`
  color: ${({ active }) => (active ? "#7ed6df" : "black")};
`;

type RetrospaceadventureNotificationProps = {
  title?: string;
  active?: boolean;
  objectives: { content: string; active?: boolean }[];
};

const RetrospaceadventureNotification: React.FC<
  RetrospaceadventureNotificationProps
> = (props) => {
  const [show, setShow] = useState<boolean>(true);
  const {
    title = "retrospaceadventure_notification_title",
    active,
    objectives,
  } = props;

  useEffect(() => {
    if (active && show) {
      setTimeout(() => setShow(false), 1100);
    }
  }, [active]);

  return (
    <RetrospaceadventureNotificationContainer
      className={`animate__animated animate__faster ${
        show ? "animate__fadeInLeft" : "animate__fadeOutLeft"
      }`}
      active={active}
    >
      <RetrospaceadventureNotificationContainerHeader>
        <TranslationComponent id={title} />
      </RetrospaceadventureNotificationContainerHeader>
      <RetrospaceadventureNotificationContainerList>
        {objectives.map((objective, i) => (
          <RetrospaceadventureNotificationContainerListItem
            key={`retrospaceadventure-notification-item-${i}`}
            active={objective.active}
          >
            <TranslationComponent id={objective.content} />
          </RetrospaceadventureNotificationContainerListItem>
        ))}
      </RetrospaceadventureNotificationContainerList>
    </RetrospaceadventureNotificationContainer>
  );
};

export default RetrospaceadventureNotification;

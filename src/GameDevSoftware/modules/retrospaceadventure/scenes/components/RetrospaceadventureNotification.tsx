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
  background: radial-gradient(
    circle,
    rgba(77, 79, 82, 1) 0%,
    rgba(68, 70, 74, 1) 35%
  );
  padding: 5px 25px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 3px;
  font-size: 1rem;
  color: ${({ active }) => (active ? "#7ed6df" : "#f6e58d")};
`;
const RetrospaceadventureNotificationContainerHeader = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
`;
const RetrospaceadventureNotificationContainerList = styled.ul`
  font-weight: bold;
`;

const RetrospaceadventureNotificationContainerListItem = styled.li<{
  active?: boolean;
}>`
  color: ${({ active }) => (active ? "#7ed6df" : "#f6e58d")};
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
      setTimeout(() => setShow(false), 200);
    }
  }, [active]);

  return (
    <RetrospaceadventureNotificationContainer
      className={`animate__animated animate__faster ${
        show ? "animate__fadeInDown" : "animate__fadeOutUp"
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
            active={objective.active || active}
          >
            <TranslationComponent id={objective.content} />
          </RetrospaceadventureNotificationContainerListItem>
        ))}
      </RetrospaceadventureNotificationContainerList>
    </RetrospaceadventureNotificationContainer>
  );
};

export default RetrospaceadventureNotification;

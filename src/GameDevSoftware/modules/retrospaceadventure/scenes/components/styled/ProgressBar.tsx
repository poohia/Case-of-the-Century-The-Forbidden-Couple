import styled from "styled-components";

type ProgressBarProps = {
  progress: number;
};

const defineColorFromProgess = (progress: number): string => {
  if (progress < 45) {
    return "red";
  }
  if (progress < 75) {
    return "orange";
  }

  return "green";
};

const ProgressBarContainer = styled.div<ProgressBarProps>`
  width: 60%;
  height: 10px;
  background: rgba(255, 255, 255, 0.5);
  position: relative;
  span {
    width: ${({ progress }) => `${progress}%`};
    height: 100%;
    background: ${({ progress }) => defineColorFromProgess(progress)};
    position: absolute;
    top: 0;
    left: 0;
    transition: width 0.5s;
  }
`;

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <ProgressBarContainer progress={progress}>
      <span></span>
    </ProgressBarContainer>
  );
};

export default ProgressBar;
